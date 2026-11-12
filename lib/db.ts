import { Activity, Assignment, GameResult } from './types';
import { supabase, isSupabaseConfigured } from './supabase/client';
import { INITIAL_DEMO_ACTIVITIES } from './mock-data';

const STORAGE_KEY_ACTIVITIES = 'wordwall_activities';
const STORAGE_KEY_ASSIGNMENTS = 'wordwall_assignments';
const STORAGE_KEY_RESULTS = 'wordwall_results';

/**
 * Repository Terpadu: Otomatis memilih Supabase jika tersedia,
 * atau LocalStorage jika dalam Demo/Offline mode.
 */
export const db = {
  // 1. Ambil Semua Aktivitas Publik / Guru
  async getActivities(): Promise<Activity[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data as Activity[];
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage', err);
      }
    }

    // Fallback LocalStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_ACTIVITIES);
        if (stored) {
          return JSON.parse(stored);
        }
        // Simpan demo activities awal
        localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(INITIAL_DEMO_ACTIVITIES));
      } catch (e) {}
    }
    return INITIAL_DEMO_ACTIVITIES;
  },

  // 2. Ambil Aktivitas berdasarkan ID
  async getActivityById(id: string): Promise<Activity | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .eq('id', id)
          .single();

        if (!error && data) return data as Activity;
      } catch (err) {
        console.warn('Supabase fetch single activity failed', err);
      }
    }

    // Fallback LocalStorage & LotusDB cache
    if (typeof window !== 'undefined') {
      try {
        const direct = localStorage.getItem(`activity_${id}`);
        if (direct) return JSON.parse(direct);
        const lotus = JSON.parse(localStorage.getItem('lotus_projects') || '[]');
        const foundLotus = lotus.find((p: any) => p.id === id);
        if (foundLotus) return foundLotus;
      } catch (e) {}
    }

    const all = await this.getActivities();
    return all.find(a => a.id === id) || null;
  },

  // 3. Simpan / Perbarui Aktivitas
  async saveActivity(activity: Activity): Promise<Activity> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('activities')
          .upsert([activity])
          .select()
          .single();

        if (!error && data) return data as Activity;
        console.error('Supabase save activity error:', error);
      } catch (err) {
        console.warn('Supabase save failed, saving locally', err);
      }
    }

    // Fallback LocalStorage
    if (typeof window !== 'undefined') {
      const all = await this.getActivities();
      const existingIdx = all.findIndex(a => a.id === activity.id);
      if (existingIdx >= 0) {
        all[existingIdx] = activity;
      } else {
        all.unshift(activity);
      }
      localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(all));
    }
    return activity;
  },

  // 4. Hapus Aktivitas
  async deleteActivity(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('activities')
          .delete()
          .eq('id', id);

        if (!error) return true;
      } catch (err) {}
    }

    // LocalStorage fallback
    if (typeof window !== 'undefined') {
      const all = await this.getActivities();
      const filtered = all.filter(a => a.id !== id);
      localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(filtered));
      return true;
    }
    return false;
  },

  // 5. Upload Gambar Soal (Hemat Kuota)
  async uploadGameAsset(fileBlob: Blob, fileName: string): Promise<string> {
    if (isSupabaseConfigured && supabase) {
      try {
        const safeName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { error: uploadError } = await supabase.storage
          .from('game-assets')
          .upload(safeName, fileBlob, { contentType: 'image/webp', upsert: true });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('game-assets')
            .getPublicUrl(safeName);

          if (publicUrlData?.publicUrl) {
            return publicUrlData.publicUrl;
          }
        }
      } catch (err) {
        console.warn('Supabase storage upload failed', err);
      }
    }

    // Fallback: Convert to Base64 Data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(fileBlob);
    });
  },

  // 6. Kelola Tugas (Assignments)
  async createAssignment(assignment: Assignment): Promise<Assignment> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('assignments')
          .insert([assignment])
          .select()
          .single();

        if (!error && data) return data as Assignment;
      } catch (err) {}
    }

    // LocalStorage fallback
    if (typeof window !== 'undefined') {
      const stored: Assignment[] = JSON.parse(localStorage.getItem(STORAGE_KEY_ASSIGNMENTS) || '[]');
      stored.unshift(assignment);
      localStorage.setItem(STORAGE_KEY_ASSIGNMENTS, JSON.stringify(stored));
    }
    return assignment;
  },

  async getAssignmentByCode(code: string): Promise<Assignment | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('assignments')
          .select('*, activity:activities(*)')
          .eq('access_code', code)
          .single();

        if (!error && data) return data as Assignment;
      } catch (err) {}
    }

    // LocalStorage fallback
    if (typeof window !== 'undefined') {
      const stored: Assignment[] = JSON.parse(localStorage.getItem(STORAGE_KEY_ASSIGNMENTS) || '[]');
      const found = stored.find(a => a.access_code === code);
      if (found) {
        const act = await this.getActivityById(found.activity_id);
        if (act) found.activity = act;
        return found;
      }
    }
    return null;
  },

  // 7. Simpan & Rekap Hasil Nilai Siswa
  async submitResult(result: GameResult): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('results')
          .insert([result]);

        if (!error) return true;
      } catch (err) {}
    }

    // LocalStorage fallback
    if (typeof window !== 'undefined') {
      const key = `${STORAGE_KEY_RESULTS}_${result.activity_id}`;
      const existing: GameResult[] = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(result);
      localStorage.setItem(key, JSON.stringify(existing));
      return true;
    }
    return false;
  },

  async getResults(activityId?: string, assignmentId?: string): Promise<GameResult[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('results').select('*');
        if (assignmentId) query = query.eq('assignment_id', assignmentId);
        else if (activityId) query = query.eq('activity_id', activityId);

        const { data, error } = await query.order('score', { ascending: false });
        if (!error && data) return data as GameResult[];
      } catch (err) {}
    }

    // LocalStorage fallback
    if (typeof window !== 'undefined' && activityId) {
      const key = `${STORAGE_KEY_RESULTS}_${activityId}`;
      const stored: GameResult[] = JSON.parse(localStorage.getItem(key) || '[]');
      return stored.sort((a, b) => b.score - a.score || a.time_taken_seconds - b.time_taken_seconds);
    }
    return [];
  }
};
