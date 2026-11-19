/**
 * Hanzi Components & Radicals Database (hanzicomponents.js)
 * Comprehensive character decomposition database for Hanzi Drop Puzzle.
 * Structures:
 *  - 'lr': Left-Right (⿰)
 *  - 'tb': Top-Bottom (⿱)
 *  - 'enc': Enclosure / Semi-enclosure (⿴ / ⿵)
 *  - 'tri': 3-Component (⿲ / ⿳ / 品)
 */

var HANZI_COMPONENTS_DB = [
  // ── BOOK 1 & BASIC MEIHUA ──
  {
    hanzi: '明', pinyin: 'míng', meaning: 'Terang / Bright',
    structure: 'lr', parts: ['日', '月'], distractors: ['目', '白', '木'],
    pedagogy: '日 (Matahari) + 月 (Bulan) = 明 (Terang benderang)',
    category: 'meihua_1', book: 1, unit: 4
  },
  {
    hanzi: '好', pinyin: 'hǎo', meaning: 'Baik / Good',
    structure: 'lr', parts: ['女', '子'], distractors: ['亻', '了', '小'],
    pedagogy: '女 (Ibu / Wanita) + 子 (Anak) = 好 (Baik / Kasih sayang)',
    category: 'meihua_1', book: 1, unit: 1
  },
  {
    hanzi: '休', pinyin: 'xiū', meaning: 'Istirahat / Rest',
    structure: 'lr', parts: ['亻', '木'], distractors: ['彳', '禾', '本'],
    pedagogy: '亻 (Orang) bersandar di 木 (Pohon) = 休 (Istirahat)',
    category: 'meihua_1', book: 1, unit: 5
  },
  {
    hanzi: '林', pinyin: 'lín', meaning: 'Hutan kecil / Woods',
    structure: 'lr', parts: ['木', '木'], distractors: ['禾', '本', '林'],
    pedagogy: '木 (Pohon) + 木 (Pohon) = 林 (Kumpulan pohon / Hutan)',
    category: 'meihua_1', book: 1, unit: 6
  },
  {
    hanzi: '森', pinyin: 'sēn', meaning: 'Hutan lebat / Forest',
    structure: 'tri', parts: ['木', '木', '木'], distractors: ['禾', '本', '草'],
    pedagogy: 'Tiga 木 (Pohon) bertumpuk = 森 (Hutan yang sangat lebat)',
    category: 'meihua_1', book: 1, unit: 6
  },
  {
    hanzi: '你', pinyin: 'nǐ', meaning: 'Kamu / You',
    structure: 'lr', parts: ['亻', '尔'], distractors: ['彳', '小', '不'],
    pedagogy: '亻 (Orang) + 尔 = 你 (Menunjuk orang kedua / Kamu)',
    category: 'meihua_1', book: 1, unit: 1
  },
  {
    hanzi: '他', pinyin: 'tā', meaning: 'Dia (Laki-laki) / He',
    structure: 'lr', parts: ['亻', '也'], distractors: ['女', '也', '子'],
    pedagogy: '亻 (Orang) + 也 = 他 (Dia laki-laki)',
    category: 'meihua_1', book: 1, unit: 1
  },
  {
    hanzi: '她', pinyin: 'tā', meaning: 'Dia (Perempuan) / She',
    structure: 'lr', parts: ['女', '也'], distractors: ['亻', '子', '马'],
    pedagogy: '女 (Wanita) + 也 = 她 (Dia perempuan)',
    category: 'meihua_1', book: 1, unit: 1
  },
  {
    hanzi: '们', pinyin: 'men', meaning: 'Akhiran Jamak / Plural suffix',
    structure: 'lr', parts: ['亻', '门'], distractors: ['彳', '口', '日'],
    pedagogy: '亻 (Orang) + 门 (Pintu) = 们 (Banyak orang / Jamak)',
    category: 'meihua_1', book: 1, unit: 1
  },
  {
    hanzi: '爸', pinyin: 'bà', meaning: 'Ayah / Dad',
    structure: 'tb', parts: ['父', '巴'], distractors: ['女', '妈', '白'],
    pedagogy: '父 (Ayah) di atas + 巴 (Bunyi ba) = 爸 (Ayah)',
    category: 'meihua_1', book: 1, unit: 2
  },
  {
    hanzi: '妈', pinyin: 'mā', meaning: 'Ibu / Mom',
    structure: 'lr', parts: ['女', '马'], distractors: ['亻', '鸟', '子'],
    pedagogy: '女 (Wanita) + 马 (Bunyi ma) = 妈 (Ibu tersayang)',
    category: 'meihua_1', book: 1, unit: 2
  },
  {
    hanzi: '哥', pinyin: 'gē', meaning: 'Kakak Laki-laki / Older brother',
    structure: 'tb', parts: ['可', '可'], distractors: ['口', '丁', '寸'],
    pedagogy: 'Dua 可 bertumpuk atas-bawah = 哥 (Kakak laki-laki)',
    category: 'meihua_1', book: 1, unit: 2
  },
  {
    hanzi: '姐', pinyin: 'jiě', meaning: 'Kakak Perempuan / Older sister',
    structure: 'lr', parts: ['女', '且'], distractors: ['亻', '目', '月'],
    pedagogy: '女 (Wanita) + 且 = 姐 (Kakak perempuan)',
    category: 'meihua_1', book: 1, unit: 2
  },
  {
    hanzi: '妹', pinyin: 'mèi', meaning: 'Adik Perempuan / Younger sister',
    structure: 'lr', parts: ['女', '未'], distractors: ['亻', '末', '木'],
    pedagogy: '女 (Wanita) + 未 (Belum dewasa) = 妹 (Adik perempuan)',
    category: 'meihua_1', book: 1, unit: 2
  },
  {
    hanzi: '早', pinyin: 'zǎo', meaning: 'Pagi / Early',
    structure: 'tb', parts: ['日', '十'], distractors: ['白', '木', '一'],
    pedagogy: '日 (Matahari) terbit di atas sepuluh penjuru (十) = 早 (Pagi)',
    category: 'meihua_1', book: 1, unit: 3
  },
  {
    hanzi: '草', pinyin: 'cǎo', meaning: 'Rumput / Grass',
    structure: 'tb', parts: ['艹', '早'], distractors: ['木', '竹', '十'],
    pedagogy: '艹 (Tumbuhan / Rumput) + 早 (Bunyi zao) = 草 (Rumput)',
    category: 'meihua_1', book: 1, unit: 6
  },
  {
    hanzi: '花', pinyin: 'huā', meaning: 'Bunga / Flower',
    structure: 'tb', parts: ['艹', '化'], distractors: ['木', '亻', '匕'],
    pedagogy: '艹 (Tumbuhan) + 化 (Berubah mekar) = 花 (Bunga)',
    category: 'meihua_1', book: 1, unit: 6
  },
  {
    hanzi: '看', pinyin: 'kàn', meaning: 'Melihat / Look',
    structure: 'tb', parts: ['手', '目'], distractors: ['扌', '日', '月'],
    pedagogy: '手 (Tangan di dahi melindungi mata) + 目 (Mata) = 看 (Melihat)',
    category: 'meihua_1', book: 1, unit: 4
  },
  {
    hanzi: '唱', pinyin: 'chàng', meaning: 'Menyanyi / Sing',
    structure: 'lr', parts: ['口', '昌'], distractors: ['日', '日', '舌'],
    pedagogy: '口 (Mulut) + 昌 (Dua matahari bernyanyi ceria) = 唱 (Menyanyi)',
    category: 'meihua_1', book: 1, unit: 7
  },
  {
    hanzi: '吃', pinyin: 'chī', meaning: 'Makan / Eat',
    structure: 'lr', parts: ['口', '乞'], distractors: ['气', '乙', '日'],
    pedagogy: '口 (Mulut) + 乞 = 吃 (Makan)',
    category: 'meihua_1', book: 1, unit: 8
  },
  {
    hanzi: '喝', pinyin: 'hē', meaning: 'Minum / Drink',
    structure: 'lr', parts: ['口', '曷'], distractors: ['氵', '日', '人'],
    pedagogy: '口 (Mulut) + 曷 = 喝 (Minum air)',
    category: 'meihua_1', book: 1, unit: 8
  },
  {
    hanzi: '话', pinyin: 'huà', meaning: 'Kata / Bicara / Words',
    structure: 'lr', parts: ['讠', '舌'], distractors: ['口', '千', '讠'],
    pedagogy: '讠 (Kata/Bahasa) + 舌 (Lidah berbicara) = 话 (Kata / Percakapan)',
    category: 'meihua_1', book: 1, unit: 9
  },
  {
    hanzi: '说', pinyin: 'shuō', meaning: 'Berbicara / Speak',
    structure: 'lr', parts: ['讠', '兑'], distractors: ['口', '儿', '八'],
    pedagogy: '讠 (Kata/Bahasa) + 兑 (Senang bicara) = 说 (Berbicara)',
    category: 'meihua_1', book: 1, unit: 9
  },
  {
    hanzi: '语', pinyin: 'yǔ', meaning: 'Bahasa / Language',
    structure: 'lr', parts: ['讠', '吾'], distractors: ['五', '口', '文'],
    pedagogy: '讠 (Kata) + 吾 (Saya) = 语 (Bahasa yang diucapkan)',
    category: 'meihua_1', book: 1, unit: 9
  },
  {
    hanzi: '问', pinyin: 'wèn', meaning: 'Bertanya / Ask',
    structure: 'enc', parts: ['门', '口'], distractors: ['日', '月', '马'],
    pedagogy: '门 (Di pintu) + 口 (Menggunakan mulut) = 问 (Bertanya)',
    category: 'meihua_1', book: 1, unit: 10
  },
  {
    hanzi: '间', pinyin: 'jiān', meaning: 'Ruangan / Antara / Room',
    structure: 'enc', parts: ['门', '日'], distractors: ['月', '口', '木'],
    pedagogy: '门 (Pintu gerbang) + 日 (Matahari menyinari celah) = 间 (Ruang)',
    category: 'meihua_1', book: 1, unit: 10
  },
  {
    hanzi: '男', pinyin: 'nán', meaning: 'Laki-laki / Male',
    structure: 'tb', parts: ['田', '力'], distractors: ['口', '刀', '十'],
    pedagogy: '田 (Bekerja di sawah) + 力 (Dengan tenaga kuat) = 男 (Laki-laki)',
    category: 'meihua_1', book: 1, unit: 5
  },
  {
    hanzi: '安', pinyin: 'ān', meaning: 'Aman / Damai / Peace',
    structure: 'tb', parts: ['宀', '女'], distractors: ['冖', '子', '口'],
    pedagogy: '宀 (Di dalam rumah/atap) + 女 (Wanita) = 安 (Aman tenteram)',
    category: 'meihua_1', book: 1, unit: 3
  },
  {
    hanzi: '家', pinyin: 'jiā', meaning: 'Rumah / Keluarga / Home',
    structure: 'tb', parts: ['宀', '豕'], distractors: ['犬', '牛', '广'],
    pedagogy: '宀 (Atap rumah) + 豕 (Ternak sejahtera) = 家 (Rumah / Keluarga)',
    category: 'meihua_1', book: 1, unit: 2
  },
  {
    hanzi: '字', pinyin: 'zì', meaning: 'Huruf / Karakter / Character',
    structure: 'tb', parts: ['宀', '子'], distractors: ['女', '了', '冖'],
    pedagogy: '宀 (Di bawah atap sekolah) + 子 (Anak belajar) = 字 (Karakter tulisan)',
    category: 'meihua_1', book: 1, unit: 3
  },
  {
    hanzi: '学', pinyin: 'xué', meaning: 'Belajar / Study',
    structure: 'tb', parts: ['⺌', '冖', '子'], distractors: ['宀', '女', '父'],
    pedagogy: 'Anak (子) di bawah atap (冖) diterangi ilmu = 学 (Belajar)',
    category: 'meihua_1', book: 1, unit: 3
  },

  // ── BOOK 2 & EXPANDED MEIHUA ──
  {
    hanzi: '秋', pinyin: 'qiū', meaning: 'Musim Gugur / Autumn',
    structure: 'lr', parts: ['禾', '火'], distractors: ['木', '日', '米'],
    pedagogy: '禾 (Padi menguning siap panen) + 火 (Warna merah api) = 秋 (Musim Gugur)',
    category: 'meihua_2', book: 2, unit: 1
  },
  {
    hanzi: '阳', pinyin: 'yáng', meaning: 'Matahari / Sinar hangat / Sun',
    structure: 'lr', parts: ['阝', '日'], distractors: ['月', '阝', '白'],
    pedagogy: '阝 (Lereng bukit) + 日 (Matahari bersinar) = 阳 (Sinar matahari / Terang)',
    category: 'meihua_2', book: 2, unit: 1
  },
  {
    hanzi: '海', pinyin: 'hǎi', meaning: 'Laut / Ocean',
    structure: 'lr', parts: ['氵', '每'], distractors: ['冫', '母', '水'],
    pedagogy: '氵 (Air berlimpah) + 每 (Setiap tetes berkumpul) = 海 (Laut luas)',
    category: 'meihua_2', book: 2, unit: 2
  },
  {
    hanzi: '江', pinyin: 'jiāng', meaning: 'Sungai Besar / River',
    structure: 'lr', parts: ['氵', '工'], distractors: ['冫', '土', '王'],
    pedagogy: '氵 (Air mengalir) + 工 (Bunyi jiang) = 江 (Sungai)',
    category: 'meihua_2', book: 2, unit: 2
  },
  {
    hanzi: '河', pinyin: 'hé', meaning: 'Sungai / River',
    structure: 'lr', parts: ['氵', '可'], distractors: ['冫', '口', '丁'],
    pedagogy: '氵 (Air) + 可 (Bunyi he) = 河 (Sungai)',
    category: 'meihua_2', book: 2, unit: 2
  },
  {
    hanzi: '湖', pinyin: 'hú', meaning: 'Danau / Lake',
    structure: 'tri', parts: ['氵', '古', '月'], distractors: ['木', '日', '十'],
    pedagogy: '氵 (Air) + 古 + 月 = 湖 (Danau air tenang)',
    category: 'meihua_2', book: 2, unit: 2
  },
  {
    hanzi: '冰', pinyin: 'bīng', meaning: 'Es / Ice',
    structure: 'lr', parts: ['冫', '水'], distractors: ['氵', '木', '永'],
    pedagogy: '冫 (Titik beku dingin) + 水 (Air) = 冰 (Es batu yang dingin)',
    category: 'meihua_2', book: 2, unit: 3
  },
  {
    hanzi: '冷', pinyin: 'lěng', meaning: 'Dingin / Cold',
    structure: 'lr', parts: ['冫', '令'], distractors: ['氵', '今', '人'],
    pedagogy: '冫 (Titik beku) + 令 = 冷 (Udara dingin menusuk)',
    category: 'meihua_2', book: 2, unit: 3
  },
  {
    hanzi: '打', pinyin: 'dǎ', meaning: 'Memukul / Bermain bola / Hit',
    structure: 'lr', parts: ['扌', '丁'], distractors: ['手', '一', '十'],
    pedagogy: '扌 (Tangan aktif) + 丁 = 打 (Memukul bola / Melakukan aksi tangan)',
    category: 'meihua_2', book: 2, unit: 4
  },
  {
    hanzi: '拍', pinyin: 'pāi', meaning: 'Menepuk / Memotret / Clap',
    structure: 'lr', parts: ['扌', '白'], distractors: ['日', '手', '百'],
    pedagogy: '扌 (Tangan) + 白 (Bunyi pai) = 拍 (Menepuk tangan / Raket)',
    category: 'meihua_2', book: 2, unit: 4
  },
  {
    hanzi: '抱', pinyin: 'bào', meaning: 'Memeluk / Hug',
    structure: 'lr', parts: ['扌', '包'], distractors: ['手', '勹', '巳'],
    pedagogy: '扌 (Tangan) + 包 (Membungkus hangat) = 抱 (Memeluk)',
    category: 'meihua_2', book: 2, unit: 4
  },
  {
    hanzi: '洗', pinyin: 'xǐ', meaning: 'Mencuci / Wash',
    structure: 'lr', parts: ['氵', '先'], distractors: ['冫', '告', '牛'],
    pedagogy: '氵 (Air bersih) + 先 = 洗 (Mencuci tangan/baju)',
    category: 'meihua_2', book: 2, unit: 5
  },
  {
    hanzi: '树', pinyin: 'shù', meaning: 'Pohon / Tree',
    structure: 'tri', parts: ['木', '又', '寸'], distractors: ['禾', '口', '木'],
    pedagogy: '木 (Kayu pohon) + 又 + 寸 = 树 (Pohon rindang berdiri kokoh)',
    category: 'meihua_2', book: 2, unit: 6
  },
  {
    hanzi: '桥', pinyin: 'qiáo', meaning: 'Jembatan / Bridge',
    structure: 'lr', parts: ['木', '乔'], distractors: ['禾', '高', '大'],
    pedagogy: '木 (Kayu penyangga) + 乔 (Melengkung tinggi) = 桥 (Jembatan)',
    category: 'meihua_2', book: 2, unit: 6
  },
  {
    hanzi: '想', pinyin: 'xiǎng', meaning: 'Berpikir / Rindu / Think',
    structure: 'tb', parts: ['相', '心'], distractors: ['木', '目', '必'],
    pedagogy: '相 (Melihat di ingatan) + 心 (Dari dalam hati) = 想 (Berpikir / Rindu)',
    category: 'meihua_2', book: 2, unit: 7
  },
  {
    hanzi: '您', pinyin: 'nín', meaning: 'Anda (Sopan) / You (Polite)',
    structure: 'tb', parts: ['你', '心'], distractors: ['亻', '尔', '必'],
    pedagogy: '你 (Kamu) ditaruh di atas 心 (Hati penuh rasa hormat) = 您 (Anda sopan)',
    category: 'meihua_2', book: 2, unit: 7
  },
  {
    hanzi: '雪', pinyin: 'xuě', meaning: 'Salju / Snow',
    structure: 'tb', parts: ['⻗', '彐'], distractors: ['日', '水', '雨'],
    pedagogy: '⻗ (Hujan dari awan dingin) + 彐 (Bisa disapu tangan) = 雪 (Salju putih)',
    category: 'meihua_2', book: 2, unit: 8
  },
  {
    hanzi: '雷', pinyin: 'léi', meaning: 'Petir / Guntur / Thunder',
    structure: 'tb', parts: ['⻗', '田'], distractors: ['日', '雨', '电'],
    pedagogy: '⻗ (Hujan badai) menggelegar di atas 田 (Sawah) = 雷 (Petir & Guntur)',
    category: 'meihua_2', book: 2, unit: 8
  },
  {
    hanzi: '星', pinyin: 'xīng', meaning: 'Bintang / Star',
    structure: 'tb', parts: ['日', '生'], distractors: ['目', '月', '牛'],
    pedagogy: '日 (Benda langit bersinar) + 生 (Lahir berkelip) = 星 (Bintang di langit)',
    category: 'meihua_2', book: 2, unit: 9
  },
  {
    hanzi: '晴', pinyin: 'qíng', meaning: 'Cerah / Sunny',
    structure: 'lr', parts: ['日', '青'], distractors: ['目', '月', '主'],
    pedagogy: '日 (Matahari) bersinar di langit 青 (Biru jernih) = 晴 (Cuaca cerah)',
    category: 'meihua_2', book: 2, unit: 9
  },
  {
    hanzi: '眼', pinyin: 'yǎn', meaning: 'Mata / Eye',
    structure: 'lr', parts: ['目', '艮'], distractors: ['日', '月', '良'],
    pedagogy: '目 (Organ mata) + 艮 = 眼 (Mata untuk memandang)',
    category: 'meihua_2', book: 2, unit: 10
  },
  {
    hanzi: '睛', pinyin: 'jīng', meaning: 'Bola Mata / Pupil',
    structure: 'lr', parts: ['目', '青'], distractors: ['日', '月', '生'],
    pedagogy: '目 (Mata) + 青 (Kejernihan) = 睛 (Bola mata berbinar)',
    category: 'meihua_2', book: 2, unit: 10
  },

  // ── BOOK 3 & CORE ADVANCED VOCABULARY ──
  {
    hanzi: '谢', pinyin: 'xiè', meaning: 'Terima kasih / Thank',
    structure: 'tri', parts: ['讠', '身', '寸'], distractors: ['口', '月', '寸'],
    pedagogy: '讠 (Kata pujian) + 身 (Tubuh membungkuk hormat) + 寸 = 谢 (Terima kasih)',
    category: 'meihua_3', book: 3, unit: 1
  },
  {
    hanzi: '客', pinyin: 'kè', meaning: 'Tamu / Guest',
    structure: 'tb', parts: ['宀', '各'], distractors: ['冖', '口', '冬'],
    pedagogy: '宀 (Di rumah) menyambut 各 (Berbagai orang yang datang) = 客 (Tamu)',
    category: 'meihua_3', book: 3, unit: 1
  },
  {
    hanzi: '站', pinyin: 'zhàn', meaning: 'Berdiri / Stasiun / Stand',
    structure: 'lr', parts: ['立', '占'], distractors: ['亻', '口', '卜'],
    pedagogy: '立 (Berdiri tegak) + 占 (Menempati posisi) = 站 (Berdiri / Stasiun halte)',
    category: 'meihua_3', book: 3, unit: 2
  },
  {
    hanzi: '骑', pinyin: 'qí', meaning: 'Menaiki / Menunggang / Ride',
    structure: 'lr', parts: ['马', '奇'], distractors: ['鸟', '大', '可'],
    pedagogy: '马 (Kuda) + 奇 (Duduk mengangkang di punggungnya) = 骑 (Menunggang / Naik sepeda)',
    category: 'meihua_3', book: 3, unit: 3
  },
  {
    hanzi: '跑', pinyin: 'pǎo', meaning: 'Berlari / Run',
    structure: 'lr', parts: ['⻊', '包'], distractors: ['扌', '句', '足'],
    pedagogy: '⻊ (Kaki melangkah cepat) + 包 = 跑 (Berlari kencang)',
    category: 'meihua_3', book: 3, unit: 4
  },
  {
    hanzi: '跳', pinyin: 'tiào', meaning: 'Melompat / Jump',
    structure: 'lr', parts: ['⻊', '兆'], distractors: ['扌', '八', '儿'],
    pedagogy: '⻊ (Kaki) menghentak ke atas = 跳 (Melompat tinggi)',
    category: 'meihua_3', book: 3, unit: 4
  },
  {
    hanzi: '踢', pinyin: 'tī', meaning: 'Menendang / Kick',
    structure: 'lr', parts: ['⻊', '易'], distractors: ['扌', '日', '勿'],
    pedagogy: '⻊ (Kaki) mengayun menendang bola = 踢 (Menendang sepak bola)',
    category: 'meihua_3', book: 3, unit: 4
  },
  {
    hanzi: '校', pinyin: 'xiào', meaning: 'Sekolah / School',
    structure: 'lr', parts: ['木', '交'], distractors: ['禾', '父', '文'],
    pedagogy: '木 (Gedung kayu sekolah) + 交 (Bertukar ilmu & teman) = 校 (Sekolah)',
    category: 'meihua_3', book: 3, unit: 5
  },
  {
    hanzi: '园', pinyin: 'yuán', meaning: 'Taman / Kebun / Garden',
    structure: 'enc', parts: ['囗', '元'], distractors: ['口', '二', '儿'],
    pedagogy: '囗 (Pagar sekeliling) + 元 = 园 (Taman rekreasi / Kebun bunga)',
    category: 'meihua_3', book: 3, unit: 5
  },
  {
    hanzi: '国', pinyin: 'guó', meaning: 'Negara / Country',
    structure: 'enc', parts: ['囗', '玉'], distractors: ['口', '王', '一'],
    pedagogy: '囗 (Batas wilayah negara) melindungi 玉 (Harta permata rakyat) = 国 (Negara)',
    category: 'meihua_3', book: 3, unit: 6
  },
  {
    hanzi: '闯', pinyin: 'chuǎng', meaning: 'Menerobos / Rush in',
    structure: 'enc', parts: ['门', '马'], distractors: ['口', '鸟', '日'],
    pedagogy: '马 (Kuda berlari cepat) menerobos 门 (Pintu gerbang) = 闯 (Menerobos masuk)',
    category: 'meihua_3', book: 3, unit: 7
  },
  {
    hanzi: '闹', pinyin: 'nào', meaning: 'Ramai / Ribut / Noisy',
    structure: 'enc', parts: ['门', '市'], distractors: ['口', '日', '巾'],
    pedagogy: '市 (Pasar) di dalam 门 (Gerbang kota) sangat ramai = 闹 (Ramai / Bising)',
    category: 'meihua_3', book: 3, unit: 7
  },
  {
    hanzi: '放', pinyin: 'fàng', meaning: 'Melepas / Libur / Put',
    structure: 'lr', parts: ['方', '攵'], distractors: ['万', '夂', '又'],
    pedagogy: '方 (Arah) + 攵 (Tangan melepas bebas) = 放 (Melepaskan / Libur sekolah)',
    category: 'meihua_3', book: 3, unit: 8
  },
  {
    hanzi: '笔', pinyin: 'bǐ', meaning: 'Pena / Kuas Tulis / Pen',
    structure: 'tb', parts: ['⺮', '毛'], distractors: ['艹', '手', '木'],
    pedagogy: '⺮ (Gagang batang bambu) + 毛 (Bulu kuas tulis) = 笔 (Pena / Kuas kaligrafi)',
    category: 'meihua_3', book: 3, unit: 9
  },
  {
    hanzi: '笑', pinyin: 'xiào', meaning: 'Tersenyum / Tertawa / Smile',
    structure: 'tb', parts: ['⺮', '夭'], distractors: ['艹', '大', '天'],
    pedagogy: '⺮ (Bambu bergoyang ditiup angin) + 夭 = 笑 (Tersenyum bahagia)',
    category: 'meihua_3', book: 3, unit: 10
  }
];

// Helper: Get characters filtered by book or all
function getHanziComponentsByBook(bookNum) {
  if (!bookNum || bookNum === 'all') return HANZI_COMPONENTS_DB;
  return HANZI_COMPONENTS_DB.filter(item => item.book === Number(bookNum));
}

// Export for browser & node test compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HANZI_COMPONENTS_DB, getHanziComponentsByBook };
}
