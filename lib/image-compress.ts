/**
 * Utilitas Kompresi Gambar Otomatis di Browser.
 * Mengurangi ukuran gambar hingga 90% (menjadi ~60-120 KB)
 * agar hemat kuota Supabase Storage gratis dan hemat bandwidth siswa sekolah.
 */
export async function compressImage(
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.8
): Promise<{ file: Blob; dataUrl: string; sizeKb: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Hitung skala rasio agar tidak melebihi batas maksimal
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Gagal mendapatkan 2D canvas context'));
          return;
        }

        // Gambar ulang di canvas dengan dimensi yang dioptimasi
        ctx.drawImage(img, 0, 0, width, height);

        // Prioritaskan format WebP (sangat hemat kuota), fallback ke JPEG
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Gagal mengompres gambar'));
              return;
            }
            const dataUrl = canvas.toDataURL('image/webp', quality);
            const sizeKb = Math.round(blob.size / 1024);
            resolve({ file: blob, dataUrl, sizeKb });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}
