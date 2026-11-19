// Meihua Vocabulary Database
// Books 1-6, Units 1-10 each
// vocab: { char, pinyin, en, id }
// radicals: { char, meaning }
// sentences: key text/dialogue lines
// grammar: grammar pattern examples
// NOTE: MH1-MH3 vocab needs filling in from slides (re-read session)

var _meihuaDB = {

  // ─────────────────────────────────────────────
  // MEIHUA 1
  // ─────────────────────────────────────────────
  "meihua1": {
    "unit1": {
      "title": "你五个，我五个",
      "vocab": [
        {"char":"一","pinyin":"yī","en":"one","id":"satu"},
        {"char":"二","pinyin":"èr","en":"two","id":"dua"},
        {"char":"三","pinyin":"sān","en":"three","id":"tiga"},
        {"char":"四","pinyin":"sì","en":"four","id":"empat"},
        {"char":"五","pinyin":"wǔ","en":"five","id":"lima"},
        {"char":"你","pinyin":"nǐ","en":"you","id":"kamu"},
        {"char":"我","pinyin":"wǒ","en":"I; me","id":"aku; saya"},
        {"char":"个","pinyin":"gè","en":"(measure word)","id":"(kata bantu bilangan)"}
      ],
      "radicals": [],
      "sentences": ["一、二、三、四、五。","你五个。","我五个。"],
      "grammar": []
    },
    "unit2": {
      "title": "六、七、八、九、十",
      "vocab": [
        {"char":"六","pinyin":"liù","en":"six","id":"enam"},
        {"char":"七","pinyin":"qī","en":"seven","id":"tujuh"},
        {"char":"八","pinyin":"bā","en":"eight","id":"delapan"},
        {"char":"九","pinyin":"jiǔ","en":"nine","id":"sembilan"},
        {"char":"十","pinyin":"shí","en":"ten","id":"sepuluh"}
      ],
      "radicals": [],
      "sentences": ["一、二、三、四、五、六、七、八。"],
      "grammar": []
    },
    "unit3": {
      "title": "老师早！",
      "vocab": [
        {"char":"好","pinyin":"hǎo","en":"good","id":"baik"},
        {"char":"你好","pinyin":"nǐ hǎo","en":"hi; hello","id":"halo"},
        {"char":"老师","pinyin":"lǎoshī","en":"teacher","id":"guru"},
        {"char":"您","pinyin":"nín","en":"you (formal)","id":"Anda (formal)"},
        {"char":"早","pinyin":"zǎo","en":"morning","id":"pagi"},
        {"char":"再见","pinyin":"zàijiàn","en":"see you; goodbye","id":"sampai jumpa"}
      ],
      "radicals": [],
      "sentences": ["你早！","老师早！","你好！","您好！","再见！"],
      "grammar": []
    },
    "unit4": {
      "title": "你叫什么名字？",
      "vocab": [
        {"char":"叫","pinyin":"jiào","en":"to be called; to call","id":"dipanggil; memanggil"},
        {"char":"什么","pinyin":"shénme","en":"what","id":"apa"},
        {"char":"名字","pinyin":"míngzi","en":"name","id":"nama"},
        {"char":"他","pinyin":"tā","en":"he","id":"dia (laki-laki)"},
        {"char":"她","pinyin":"tā","en":"she","id":"dia (perempuan)"},
        {"char":"不","pinyin":"bù","en":"no; not","id":"tidak; bukan"},
        {"char":"知道","pinyin":"zhīdào","en":"to know","id":"tahu; mengetahui"}
      ],
      "radicals": [],
      "sentences": ["你叫什么名字？","我叫……。","他叫什么名字？","她叫什么名字？","他/她叫……。"],
      "grammar": []
    },
    "unit5": {
      "title": "你家有几口人？",
      "vocab": [
        {"char":"家","pinyin":"jiā","en":"family; home","id":"keluarga; rumah"},
        {"char":"有","pinyin":"yǒu","en":"to have; there is","id":"mempunyai; ada"},
        {"char":"没有","pinyin":"méiyǒu","en":"do not have","id":"tidak ada; tidak punya"},
        {"char":"几","pinyin":"jǐ","en":"how many","id":"berapa"},
        {"char":"口","pinyin":"kǒu","en":"mouth; (measure word)","id":"mulut; (kata bantu bilangan)"},
        {"char":"人","pinyin":"rén","en":"person","id":"orang"},
        {"char":"爸爸","pinyin":"bàba","en":"father","id":"ayah"},
        {"char":"妈妈","pinyin":"māma","en":"mother","id":"ibu"},
        {"char":"哥哥","pinyin":"gēge","en":"older brother","id":"kakak laki-laki"},
        {"char":"姐姐","pinyin":"jiějie","en":"older sister","id":"kakak perempuan"},
        {"char":"弟弟","pinyin":"dìdi","en":"younger brother","id":"adik laki-laki"},
        {"char":"妹妹","pinyin":"mèimei","en":"younger sister","id":"adik perempuan"},
        {"char":"两","pinyin":"liǎng","en":"two (quantity)","id":"dua (jumlah)"},
        {"char":"和","pinyin":"hé","en":"and","id":"dan"}
      ],
      "radicals": [],
      "sentences": ["你家有几口人？","我家有六口人。","有爸爸、妈妈、两个哥哥、一个姐姐和我。"],
      "grammar": []
    },
    "unit6": {
      "title": "谢谢！",
      "vocab": [
        {"char":"谢谢","pinyin":"xièxie","en":"thank you","id":"terima kasih"},
        {"char":"不客气","pinyin":"bú kèqi","en":"you're welcome","id":"sama-sama"},
        {"char":"对不起","pinyin":"duìbuqǐ","en":"I'm sorry","id":"maaf"},
        {"char":"没关系","pinyin":"méi guānxi","en":"it's alright","id":"tidak apa-apa"}
      ],
      "radicals": [],
      "sentences": ["你一个，我一个。","谢谢！","不客气！","对不起！","没关系！"],
      "grammar": []
    },
    "unit7": {
      "title": "我爸爸是医生",
      "vocab": [
        {"char":"是","pinyin":"shì","en":"to be; yes","id":"adalah"},
        {"char":"的","pinyin":"de","en":"(particle)","id":"(partikel)"},
        {"char":"朋友","pinyin":"péngyou","en":"friend","id":"teman"},
        {"char":"学生","pinyin":"xuésheng","en":"student","id":"murid; pelajar"},
        {"char":"不是","pinyin":"bú shì","en":"not; is not","id":"bukan"},
        {"char":"医生","pinyin":"yīshēng","en":"doctor","id":"dokter"},
        {"char":"吗","pinyin":"ma","en":"(question particle)","id":"(partikel tanya)"}
      ],
      "radicals": [],
      "sentences": ["她是我的朋友。她叫小林。她是学生。","他是学生吗？","不是，他是医生。","我爸爸是医生。"],
      "grammar": []
    },
    "unit8": {
      "title": "你去哪儿？",
      "vocab": [
        {"char":"去","pinyin":"qù","en":"to go to","id":"pergi (ke)"},
        {"char":"哪儿","pinyin":"nǎr","en":"where","id":"mana"},
        {"char":"学校","pinyin":"xuéxiào","en":"school","id":"sekolah"},
        {"char":"医院","pinyin":"yīyuàn","en":"hospital","id":"rumah sakit"},
        {"char":"商店","pinyin":"shāngdiàn","en":"shop","id":"toko"},
        {"char":"回","pinyin":"huí","en":"to return","id":"kembali"},
        {"char":"回家","pinyin":"huí jiā","en":"to come home","id":"pulang ke rumah"}
      ],
      "radicals": [],
      "sentences": ["爸爸，你去哪儿？","我去医院。","我妈妈是老师。她去学校。"],
      "grammar": []
    },
    "unit9": {
      "title": "这是什么？",
      "vocab": [
        {"char":"这","pinyin":"zhè","en":"this","id":"ini"},
        {"char":"书包","pinyin":"shūbāo","en":"school bag","id":"tas sekolah"},
        {"char":"那","pinyin":"nà","en":"that","id":"itu"},
        {"char":"铅笔盒","pinyin":"qiānbǐ hé","en":"pencil case","id":"kotak pensil"},
        {"char":"铅笔","pinyin":"qiānbǐ","en":"pencil","id":"pensil"},
        {"char":"橡皮","pinyin":"xiàngpí","en":"eraser","id":"penghapus"},
        {"char":"尺子","pinyin":"chǐzi","en":"ruler","id":"penggaris"},
        {"char":"书","pinyin":"shū","en":"book","id":"buku"},
        {"char":"本子","pinyin":"běnzi","en":"notebook","id":"buku tulis"}
      ],
      "radicals": [],
      "sentences": ["这是什么？","这是书包。","这是你的书包吗？","不是。这是我姐姐的书包。","那是什么？"],
      "grammar": []
    },
    "unit10": {
      "title": "祝你生日快乐",
      "vocab": [
        {"char":"祝","pinyin":"zhù","en":"to wish","id":"mengucapkan"},
        {"char":"生日","pinyin":"shēngri","en":"birthday","id":"ulang tahun"},
        {"char":"快乐","pinyin":"kuàilè","en":"happy","id":"bahagia; gembira"},
        {"char":"很","pinyin":"hěn","en":"very","id":"sangat"},
        {"char":"高兴","pinyin":"gāoxìng","en":"happy; glad","id":"senang; gembira"},
        {"char":"谁","pinyin":"shuí","en":"who","id":"siapa"},
        {"char":"今天","pinyin":"jīntiān","en":"today","id":"hari ini"},
        {"char":"岁","pinyin":"suì","en":"age; years old","id":"tahun (umur)"},
        {"char":"了","pinyin":"le","en":"(particle)","id":"(partikel)"},
        {"char":"几","pinyin":"jǐ","en":"how many","id":"berapa"}
      ],
      "radicals": [],
      "sentences": ["祝你生日快乐！","谢谢！","今天是姐姐的生日。她很高兴。","你几岁了？"],
      "grammar": []
    }
  },

  // ─────────────────────────────────────────────
  // MEIHUA 2
  // ─────────────────────────────────────────────
  "meihua2": {
    "unit1": {
      "title": "你家的电话号码是多少？",
      "vocab": [
        {"char":"认识","pinyin":"rènshi","en":"to know (someone)","id":"mengenal"},
        {"char":"电话","pinyin":"diànhuà","en":"telephone","id":"telepon"},
        {"char":"打电话","pinyin":"dǎ diànhuà","en":"to make a phone call","id":"menelepon"},
        {"char":"多少","pinyin":"duōshao","en":"how many; how much","id":"berapa"},
        {"char":"号码","pinyin":"hàomǎ","en":"number","id":"nomor"},
        {"char":"零","pinyin":"líng","en":"zero","id":"nol"},
        {"char":"要","pinyin":"yào","en":"to want","id":"mau; ingin"},
        {"char":"给","pinyin":"gěi","en":"for; to give","id":"untuk; memberi"},
        {"char":"手机","pinyin":"shǒujī","en":"mobile phone","id":"ponsel"},
        {"char":"明天","pinyin":"míngtiān","en":"tomorrow","id":"besok"}
      ],
      "radicals": [],
      "sentences": ["丽丽，你认识安妮吗？","认识。","她家的电话号码是多少？","我要给她打电话。","四三二一五六七八。"],
      "grammar": []
    },
    "unit2": {
      "title": "请进！",
      "vocab": [
        {"char":"请","pinyin":"qǐng","en":"please; to invite","id":"silakan; mengundang"},
        {"char":"进","pinyin":"jìn","en":"to enter","id":"masuk"},
        {"char":"坐","pinyin":"zuò","en":"to sit","id":"duduk"},
        {"char":"听","pinyin":"tīng","en":"to listen; to hear","id":"mendengarkan"},
        {"char":"说","pinyin":"shuō","en":"to say","id":"berkata; mengatakan"},
        {"char":"你们","pinyin":"nǐmen","en":"you (plural)","id":"kalian"},
        {"char":"跟","pinyin":"gēn","en":"to follow; with","id":"mengikuti; dengan"},
        {"char":"读","pinyin":"dú","en":"to read (aloud)","id":"membaca (keras)"},
        {"char":"写","pinyin":"xiě","en":"to write","id":"menulis"},
        {"char":"汉字","pinyin":"hànzì","en":"Chinese character","id":"aksara Cina; huruf Mandarin"}
      ],
      "radicals": [],
      "sentences": ["请进！","请坐！","跟我读。","听我说。","我写汉字。","你听什么？","你说什么？"],
      "grammar": []
    },
    "unit3": {
      "title": "这是我的教室",
      "vocab": [
        {"char":"教室","pinyin":"jiàoshì","en":"classroom","id":"ruang kelas"},
        {"char":"里","pinyin":"lǐ","en":"inside","id":"di dalam"},
        {"char":"黑板","pinyin":"hēibǎn","en":"blackboard","id":"papan tulis hitam"},
        {"char":"粉笔","pinyin":"fěnbǐ","en":"chalk","id":"kapur tulis"},
        {"char":"白板","pinyin":"báibǎn","en":"whiteboard","id":"papan tulis putih"},
        {"char":"白板笔","pinyin":"báibǎn bǐ","en":"marker","id":"spidol"},
        {"char":"张","pinyin":"zhāng","en":"(measure word for flat objects)","id":"(kata bantu bilangan)"},
        {"char":"桌子","pinyin":"zhuōzi","en":"table","id":"meja"},
        {"char":"把","pinyin":"bǎ","en":"(measure word for chairs)","id":"(kata bantu bilangan)"},
        {"char":"椅子","pinyin":"yǐzi","en":"chair","id":"kursi"}
      ],
      "radicals": [],
      "sentences": ["这是丽丽的教室。教室里有什么？","教室里有一张黑板、五支粉笔、十一张桌子和十一把椅子。"],
      "grammar": []
    },
    "unit4": {
      "title": "你喜欢吃什么？",
      "vocab": [
        {"char":"吃","pinyin":"chī","en":"to eat","id":"makan"},
        {"char":"喜欢","pinyin":"xǐhuan","en":"to like","id":"suka"},
        {"char":"水果","pinyin":"shuǐguǒ","en":"fruit","id":"buah-buahan"},
        {"char":"汉堡包","pinyin":"hànbǎobāo","en":"hamburger","id":"hamburger"},
        {"char":"热狗","pinyin":"règǒu","en":"hot dog","id":"hot dog"},
        {"char":"炸鸡","pinyin":"zhájī","en":"fried chicken","id":"ayam goreng"},
        {"char":"薯条","pinyin":"shǔtiáo","en":"french fries","id":"kentang goreng"},
        {"char":"面条","pinyin":"miàntiáo","en":"noodles","id":"mie"},
        {"char":"米饭","pinyin":"mǐfàn","en":"rice","id":"nasi"},
        {"char":"炒饭","pinyin":"chǎofàn","en":"fried rice","id":"nasi goreng"},
        {"char":"鸡蛋","pinyin":"jīdàn","en":"chicken egg","id":"telur ayam"},
        {"char":"面包","pinyin":"miànbāo","en":"bread","id":"roti"},
        {"char":"香蕉","pinyin":"xiāngjīao","en":"banana","id":"pisang"},
        {"char":"西瓜","pinyin":"xīguā","en":"watermelon","id":"semangka"},
        {"char":"葡萄","pinyin":"pútáo","en":"grape","id":"anggur"},
        {"char":"苹果","pinyin":"píngguǒ","en":"apple","id":"apel"},
        {"char":"橘子","pinyin":"júzi","en":"orange","id":"jeruk"},
        {"char":"草莓","pinyin":"cǎoméi","en":"strawberry","id":"stroberi"}
      ],
      "radicals": [],
      "sentences": ["你喜欢吃什么？","我喜欢吃……。","你要吃什么？"],
      "grammar": []
    },
    "unit5": {
      "title": "请问，您要喝什么？",
      "vocab": [
        {"char":"喝","pinyin":"hē","en":"to drink","id":"minum"},
        {"char":"饮料","pinyin":"yǐnliào","en":"beverage","id":"minuman"},
        {"char":"问","pinyin":"wèn","en":"to ask","id":"bertanya"},
        {"char":"请问","pinyin":"qǐngwèn","en":"excuse me (before asking)","id":"permisi"},
        {"char":"咖啡","pinyin":"kāfēi","en":"coffee","id":"kopi"},
        {"char":"热","pinyin":"rè","en":"hot","id":"panas"},
        {"char":"巧克力","pinyin":"qiǎokèlì","en":"chocolate","id":"coklat"},
        {"char":"牛奶","pinyin":"niúnǎi","en":"cow's milk","id":"susu sapi"},
        {"char":"苹果汁","pinyin":"píngguǒ zhī","en":"apple juice","id":"jus apel"},
        {"char":"橙汁","pinyin":"chéngzhī","en":"orange juice","id":"jus jeruk"},
        {"char":"茶","pinyin":"chá","en":"tea","id":"teh"},
        {"char":"柠檬茶","pinyin":"níngméng chá","en":"lemon tea","id":"teh lemon"},
        {"char":"珍珠奶茶","pinyin":"zhēnzhū nǎichá","en":"bubble milk tea","id":"teh susu boba"},
        {"char":"可乐","pinyin":"kělè","en":"cola","id":"cola"},
        {"char":"水","pinyin":"shuǐ","en":"water","id":"air"},
        {"char":"矿泉水","pinyin":"kuàngquánshuǐ","en":"mineral water","id":"air mineral"}
      ],
      "radicals": [],
      "sentences": ["请问，您要喝什么？","请给我一杯茶吧。谢谢！"],
      "grammar": []
    },
    "unit6": {
      "title": "我饿了",
      "vocab": [
        {"char":"饿","pinyin":"è","en":"hungry","id":"lapar"},
        {"char":"也","pinyin":"yě","en":"also; too","id":"juga"},
        {"char":"一起","pinyin":"yìqǐ","en":"together","id":"bersama"},
        {"char":"吧","pinyin":"ba","en":"(suggestion particle)","id":"(partikel saran)"},
        {"char":"小","pinyin":"xiǎo","en":"small; little","id":"kecil"},
        {"char":"宝宝","pinyin":"bǎobao","en":"baby; (term of endearment)","id":"bayi; sayang"},
        {"char":"饱","pinyin":"bǎo","en":"full (after eating)","id":"kenyang"},
        {"char":"渴","pinyin":"kě","en":"thirsty","id":"haus"}
      ],
      "radicals": [],
      "sentences": ["我饿了。","我也饿了。","我们一起去吃饭吧。","好。"],
      "grammar": []
    },
    "unit7": {
      "title": "姐姐的头发长",
      "vocab": [
        {"char":"头","pinyin":"tóu","en":"head","id":"kepala"},
        {"char":"头发","pinyin":"tóufa","en":"hair","id":"rambut"},
        {"char":"眼睛","pinyin":"yǎnjīng","en":"eye","id":"mata"},
        {"char":"鼻子","pinyin":"bízi","en":"nose","id":"hidung"},
        {"char":"耳朵","pinyin":"ěrduo","en":"ear","id":"telinga"},
        {"char":"嘴巴","pinyin":"zuǐba","en":"mouth","id":"mulut"},
        {"char":"手","pinyin":"shǒu","en":"hand","id":"tangan"},
        {"char":"脚","pinyin":"jiǎo","en":"foot","id":"kaki"},
        {"char":"个子","pinyin":"gèzi","en":"stature; height","id":"tinggi badan"},
        {"char":"大","pinyin":"dà","en":"big","id":"besar"},
        {"char":"长","pinyin":"cháng","en":"long","id":"panjang"},
        {"char":"短","pinyin":"duǎn","en":"short (length)","id":"pendek (panjang)"},
        {"char":"高","pinyin":"gāo","en":"tall; high","id":"tinggi"},
        {"char":"矮","pinyin":"ǎi","en":"short (height)","id":"pendek (tinggi)"},
        {"char":"胖","pinyin":"pàng","en":"fat","id":"gemuk"},
        {"char":"瘦","pinyin":"shòu","en":"thin","id":"kurus"}
      ],
      "radicals": [],
      "sentences": ["这是我的……","姐姐的头发长。","她的个子高。"],
      "grammar": []
    },
    "unit8": {
      "title": "今天是几月几号？",
      "vocab": [
        {"char":"年","pinyin":"nián","en":"year","id":"tahun"},
        {"char":"月","pinyin":"yuè","en":"month","id":"bulan"},
        {"char":"日","pinyin":"rì","en":"sun; date","id":"hari; tanggal"},
        {"char":"号","pinyin":"hào","en":"number; date","id":"nomor; tanggal"},
        {"char":"星期","pinyin":"xīngqī","en":"week","id":"minggu"},
        {"char":"星期日","pinyin":"xīngqīrì","en":"Sunday","id":"hari Minggu"},
        {"char":"昨天","pinyin":"zuótiān","en":"yesterday","id":"kemarin"},
        {"char":"学习","pinyin":"xuéxí","en":"to study","id":"belajar"},
        {"char":"钢琴","pinyin":"gāngqín","en":"piano","id":"piano"},
        {"char":"英语","pinyin":"yīngyǔ","en":"English","id":"bahasa Inggris"},
        {"char":"芭蕾舞","pinyin":"bālěiwǔ","en":"ballet","id":"balet"},
        {"char":"数学","pinyin":"shùxué","en":"mathematics","id":"matematika"},
        {"char":"中文","pinyin":"zhōngwén","en":"Mandarin","id":"bahasa Mandarin"},
        {"char":"课外活动","pinyin":"kèwài huódòng","en":"extracurricular activities","id":"kegiatan ekstrakurikuler"}
      ],
      "radicals": [],
      "sentences": ["今天是几月几号？","今天是四月二十五号。","昨天是星期几？","昨天是星期天。"],
      "grammar": []
    },
    "unit9": {
      "title": "我的一天",
      "vocab": [
        {"char":"天","pinyin":"tiān","en":"day; sky","id":"hari; langit"},
        {"char":"点","pinyin":"diǎn","en":"o'clock","id":"pukul"},
        {"char":"分","pinyin":"fēn","en":"minute","id":"menit"},
        {"char":"差","pinyin":"chà","en":"less; minus","id":"kurang"},
        {"char":"半","pinyin":"bàn","en":"half","id":"setengah"},
        {"char":"一刻","pinyin":"yí kè","en":"a quarter of an hour","id":"seperempat jam"},
        {"char":"早上","pinyin":"zǎoshang","en":"morning","id":"pagi"},
        {"char":"中午","pinyin":"zhōngwǔ","en":"noon","id":"siang hari"},
        {"char":"下午","pinyin":"xiàwǔ","en":"afternoon","id":"sore hari"},
        {"char":"晚上","pinyin":"wǎnshang","en":"evening; night","id":"malam hari"},
        {"char":"起床","pinyin":"qǐ chuáng","en":"to wake up; get out of bed","id":"bangun tidur"},
        {"char":"早饭","pinyin":"zǎofàn","en":"breakfast","id":"sarapan"},
        {"char":"午饭","pinyin":"wǔfàn","en":"lunch","id":"makan siang"},
        {"char":"晚饭","pinyin":"wǎnfàn","en":"dinner","id":"makan malam"},
        {"char":"上课","pinyin":"shàng kè","en":"to have class","id":"masuk kelas"},
        {"char":"下课","pinyin":"xià kè","en":"to finish class","id":"keluar kelas"},
        {"char":"做","pinyin":"zuò","en":"to do","id":"melakukan"},
        {"char":"作业","pinyin":"zuòyè","en":"homework","id":"pekerjaan rumah"},
        {"char":"洗澡","pinyin":"xǐ zǎo","en":"to take a bath","id":"mandi"},
        {"char":"睡觉","pinyin":"shuì jiào","en":"to sleep","id":"tidur"}
      ],
      "radicals": [],
      "sentences": ["早上六点起床。","六点零五分吃早饭。","差五分七点上课。","下午五点一刻洗澡。","六点半吃晚饭。","晚上九点睡觉。"],
      "grammar": []
    },
    "unit10": {
      "title": "妈妈在哪儿？",
      "vocab": [
        {"char":"在","pinyin":"zài","en":"at; to be at","id":"di; berada di"},
        {"char":"这儿","pinyin":"zhèr","en":"here","id":"di sini"},
        {"char":"那儿","pinyin":"nàr","en":"there","id":"di sana"},
        {"char":"厨房","pinyin":"chúfáng","en":"kitchen","id":"dapur"},
        {"char":"图书馆","pinyin":"túshūguǎn","en":"library","id":"perpustakaan"},
        {"char":"洗手间","pinyin":"xǐshǒujiān","en":"toilet; bathroom","id":"kamar mandi; toilet"},
        {"char":"旁边","pinyin":"pángbiān","en":"next to; beside","id":"di sebelah; di samping"}
      ],
      "radicals": [],
      "sentences": ["妈妈，你在哪儿？","我在这儿。","哪儿？","在厨房。"],
      "grammar": []
    }
  },

  // ─────────────────────────────────────────────
  // MEIHUA 3
  // ─────────────────────────────────────────────
  "meihua3": {
    "unit1": {
      "title": "我的房间很乱",
      "vocab": [
        {"char":"房间","pinyin":"fángjiān","en":"room","id":"kamar"},
        {"char":"乱","pinyin":"luàn","en":"messy","id":"berantakan"},
        {"char":"呢","pinyin":"ne","en":"(particle)","id":"(partikel)"},
        {"char":"看","pinyin":"kàn","en":"to see; to look","id":"melihat"},
        {"char":"床","pinyin":"chuáng","en":"bed","id":"tempat tidur"},
        {"char":"上","pinyin":"shàng","en":"on; above","id":"di atas"},
        {"char":"下","pinyin":"xià","en":"under; below","id":"di bawah"},
        {"char":"枕头","pinyin":"zhěntou","en":"pillow","id":"bantal"},
        {"char":"抱枕","pinyin":"bàozhěn","en":"bolster","id":"bantal peluk"},
        {"char":"原来","pinyin":"yuánlái","en":"actually; as it turns out","id":"ternyata"},
        {"char":"被子","pinyin":"bèizi","en":"blanket","id":"selimut"}
      ],
      "radicals": [],
      "sentences": ["这是我的房间。我的房间很乱。","我的笔在哪儿呢？","我看看床上，床上没有笔。","原来在被子下呢！"],
      "grammar": []
    },
    "unit2": {
      "title": "我们的爱好",
      "vocab": [
        {"char":"爱好","pinyin":"àihào","en":"hobby","id":"hobi"},
        {"char":"画画儿","pinyin":"huà huàr","en":"to draw","id":"menggambar"},
        {"char":"游戏","pinyin":"yóuxì","en":"game","id":"permainan"},
        {"char":"打游戏","pinyin":"dǎ yóuxì","en":"to play a game","id":"bermain game"},
        {"char":"唱歌","pinyin":"chàng gē","en":"to sing","id":"menyanyi"},
        {"char":"跳舞","pinyin":"tiào wǔ","en":"to dance","id":"menari"},
        {"char":"漫画","pinyin":"mànhuà","en":"comic book; manga","id":"komik; manga"},
        {"char":"哭","pinyin":"kū","en":"to cry","id":"menangis"}
      ],
      "radicals": [],
      "sentences": ["这是我的一家人。爸爸喜欢画画儿。","哥哥喜欢打游戏。姐姐喜欢唱歌。","妹妹喜欢跳舞。我喜欢看漫画。","弟弟喜欢做什么呢？弟弟喜欢哭！"],
      "grammar": []
    },
    "unit3": {
      "title": "橙汁是橙色的",
      "vocab": [
        {"char":"橙色","pinyin":"chéngsè","en":"orange (color)","id":"oranye"},
        {"char":"红色","pinyin":"hóngsè","en":"red","id":"merah"},
        {"char":"黄色","pinyin":"huángsè","en":"yellow","id":"kuning"},
        {"char":"蓝色","pinyin":"lánsè","en":"blue","id":"biru"},
        {"char":"绿色","pinyin":"lǜsè","en":"green","id":"hijau"}
      ],
      "radicals": [],
      "sentences": ["我要喝橙汁。","这是橙汁吗？","不是，橙汁不是红色的。","是，这是橙汁。橙汁是橙色的。"],
      "grammar": []
    },
    "unit4": {
      "title": "宠物",
      "vocab": [
        {"char":"宠物","pinyin":"chǒngwù","en":"pet","id":"hewan peliharaan"},
        {"char":"养","pinyin":"yǎng","en":"to raise; to keep (animal)","id":"memelihara"},
        {"char":"匹","pinyin":"pī","en":"(measure word for horses)","id":"(kata bantu bilangan untuk kuda)"},
        {"char":"马","pinyin":"mǎ","en":"horse","id":"kuda"},
        {"char":"爱","pinyin":"ài","en":"to like; to love","id":"menyukai; mencintai"},
        {"char":"跑","pinyin":"pǎo","en":"to run","id":"berlari"},
        {"char":"跑步","pinyin":"pǎobù","en":"to jog; to run","id":"berlari; jogging"},
        {"char":"只","pinyin":"zhī","en":"(measure word for animals)","id":"(kata bantu bilangan untuk hewan)"},
        {"char":"鸟","pinyin":"niǎo","en":"bird","id":"burung"},
        {"char":"条","pinyin":"tiáo","en":"(measure word)","id":"(kata bantu bilangan)"},
        {"char":"鱼","pinyin":"yú","en":"fish","id":"ikan"},
        {"char":"游泳","pinyin":"yóuyǒng","en":"to swim","id":"berenang"},
        {"char":"猫","pinyin":"māo","en":"cat","id":"kucing"}
      ],
      "radicals": [],
      "sentences": ["哥哥养了一匹马。哥哥爱跑步，马也爱跑步。","姐姐养了一只鸟。姐姐爱唱歌，鸟也爱唱歌。"],
      "grammar": []
    },
    "unit5": {
      "title": "新年好！",
      "vocab": [
        {"char":"新","pinyin":"xīn","en":"new","id":"baru"},
        {"char":"新年","pinyin":"xīnnián","en":"new year","id":"tahun baru"},
        {"char":"新年好","pinyin":"xīnnián hǎo","en":"happy new year!","id":"selamat tahun baru!"},
        {"char":"祝贺","pinyin":"zhùhè","en":"to wish; to congratulate","id":"mengucapkan selamat"},
        {"char":"大家","pinyin":"dàjiā","en":"everyone","id":"semua orang"},
        {"char":"为什么","pinyin":"wèi shénme","en":"why","id":"mengapa; kenapa"},
        {"char":"因为","pinyin":"yīnwèi","en":"because","id":"karena"},
        {"char":"红包","pinyin":"hóngbāo","en":"red envelope","id":"angpao"},
        {"char":"穿","pinyin":"chuān","en":"to wear","id":"memakai"},
        {"char":"衣服","pinyin":"yīfu","en":"clothes","id":"pakaian"},
        {"char":"热闹","pinyin":"rènào","en":"lively; bustling with excitement","id":"ramai; meriah"},
        {"char":"年糕","pinyin":"niángāo","en":"Chinese New Year rice cake","id":"kue tahun baru (ketan)"},
        {"char":"呀","pinyin":"ya","en":"(particle)","id":"(partikel)"}
      ],
      "radicals": [],
      "sentences": ["新年好呀，新年好呀，祝贺大家新年好！","我们唱歌，我们跳舞，祝贺大家新年好！","你们为什么喜欢新年？","因为有红包。因为穿新衣服。因为很热闹。因为有年糕。"],
      "grammar": []
    },
    "unit6": {
      "title": "这是大象吗？",
      "vocab": [
        {"char":"大象","pinyin":"dàxiàng","en":"elephant","id":"gajah"},
        {"char":"带","pinyin":"dài","en":"to bring; to take","id":"membawa"},
        {"char":"动物","pinyin":"dòngwù","en":"animal","id":"hewan"},
        {"char":"动物园","pinyin":"dòngwùyuán","en":"zoo","id":"kebun binatang"},
        {"char":"老虎","pinyin":"lǎohǔ","en":"tiger","id":"harimau"},
        {"char":"多","pinyin":"duō","en":"many; much","id":"banyak"},
        {"char":"狮子","pinyin":"shīzi","en":"lion","id":"singa"},
        {"char":"猴子","pinyin":"hóuzi","en":"monkey","id":"monyet"},
        {"char":"它","pinyin":"tā","en":"it","id":"itu"}
      ],
      "radicals": [],
      "sentences": ["这是大象吗？是，这是大象。","它有大大的个子，大大的耳朵和长长的鼻子。"],
      "grammar": []
    },
    "unit7": {
      "title": "大象会游泳",
      "vocab": [
        {"char":"熊","pinyin":"xióng","en":"bear","id":"beruang"},
        {"char":"会","pinyin":"huì","en":"can","id":"bisa"},
        {"char":"骑","pinyin":"qí","en":"to ride","id":"mengendarai"},
        {"char":"自行车","pinyin":"zìxíngchē","en":"bicycle","id":"sepeda"},
        {"char":"熊猫","pinyin":"xióngmāo","en":"panda","id":"panda"},
        {"char":"爬","pinyin":"pá","en":"to climb","id":"memanjat"},
        {"char":"树","pinyin":"shù","en":"tree","id":"pohon"},
        {"char":"鹦鹉","pinyin":"yīngwǔ","en":"cockatoo; parrot","id":"burung beo"},
        {"char":"说话","pinyin":"shuō huà","en":"to talk","id":"berbicara"},
        {"char":"菜","pinyin":"cài","en":"vegetable","id":"sayuran"},
        {"char":"做菜","pinyin":"zuò cài","en":"to cook","id":"memasak"}
      ],
      "radicals": [],
      "sentences": ["你知道吗？大象会游泳，熊会骑自行车，熊猫会爬树，鹦鹉会说话。"],
      "grammar": []
    },
    "unit8": {
      "title": "我的日记",
      "vocab": [
        {"char":"日记","pinyin":"rìjì","en":"diary","id":"buku harian"},
        {"char":"雨","pinyin":"yǔ","en":"rain","id":"hujan"},
        {"char":"伞","pinyin":"sǎn","en":"umbrella","id":"payung"},
        {"char":"雨伞","pinyin":"yǔsǎn","en":"umbrella","id":"payung"},
        {"char":"打伞","pinyin":"dǎ sǎn","en":"to use an umbrella","id":"memakai payung"},
        {"char":"天气","pinyin":"tiānqì","en":"weather","id":"cuaca"},
        {"char":"又","pinyin":"yòu","en":"again","id":"lagi"},
        {"char":"真","pinyin":"zhēn","en":"really; truly; very","id":"sungguh; benar-benar"},
        {"char":"冷","pinyin":"lěng","en":"cold","id":"dingin"}
      ],
      "radicals": [],
      "sentences": ["今天下雨，我打伞去学校。","今天不下雨，中午天气很热。我打伞回家。","今天又下雨了，我又打伞去学校。你看！有雨伞真好！","今天下大雨，天气很冷。我不去学校，我在家睡觉。"],
      "grammar": []
    },
    "unit9": {
      "title": "你怎么了？",
      "vocab": [
        {"char":"怎么","pinyin":"zěnme","en":"why; how","id":"kenapa; bagaimana"},
        {"char":"生气","pinyin":"shēng qì","en":"angry","id":"marah"},
        {"char":"告诉","pinyin":"gàosu","en":"to tell","id":"memberitahu"},
        {"char":"不见","pinyin":"bújiàn","en":"to be missing","id":"hilang"},
        {"char":"病","pinyin":"bìng","en":"sick","id":"sakit"},
        {"char":"爷爷","pinyin":"yéye","en":"grandfather","id":"kakek"},
        {"char":"奶奶","pinyin":"nǎinai","en":"grandmother","id":"nenek"},
        {"char":"来","pinyin":"lái","en":"to come","id":"datang"}
      ],
      "radicals": [],
      "sentences": ["你怎么了？我生气了！为什么？不告诉你！","你怎么了？我家的猫不见了！","你怎么了？我病了！","今天我很高兴！为什么？我爷爷和奶奶要来我家。"],
      "grammar": []
    },
    "unit10": {
      "title": "我的猫比这只猫大",
      "vocab": [
        {"char":"比","pinyin":"bǐ","en":"to compare","id":"membandingkan"},
        {"char":"比较","pinyin":"bǐjiào","en":"more","id":"lebih"},
        {"char":"香草","pinyin":"xiāngcǎo","en":"vanilla","id":"vanila"},
        {"char":"冰淇淋","pinyin":"bīngqílín","en":"ice cream","id":"es krim"},
        {"char":"尝","pinyin":"cháng","en":"to taste","id":"mencicipi"},
        {"char":"好吃","pinyin":"hǎo chī","en":"delicious","id":"enak"},
        {"char":"哪","pinyin":"nǎ","en":"which","id":"yang mana"},
        {"char":"都","pinyin":"dōu","en":"all","id":"semua"}
      ],
      "radicals": [],
      "sentences": ["这是你的猫吗？不是，我的猫比这只猫大。","这是香草冰淇淋，给你尝尝。好吃吗？好吃。","这是巧克力冰淇淋，也给你尝尝。也很好吃。","哪个比较好吃？两个都很好吃。我都爱吃。"],
      "grammar": []
    }
  },

  // ─────────────────────────────────────────────
  // MEIHUA 4
  // ─────────────────────────────────────────────
  "meihua4": {
    "unit1": {
      "title": "这件衣服太大了",
      "vocab": [
        {"char":"件","pinyin":"jiàn","en":"(measure word)","id":"(kata bantu bilangan)"},
        {"char":"太","pinyin":"tài","en":"too","id":"terlalu"},
        {"char":"合适","pinyin":"héshì","en":"suitable","id":"cocok; sesuai"},
        {"char":"想","pinyin":"xiǎng","en":"to think; to wish","id":"ingin; berpikir"},
        {"char":"买","pinyin":"mǎi","en":"to buy","id":"membeli"},
        {"char":"试","pinyin":"shì","en":"to try","id":"mencoba"},
        {"char":"裤子","pinyin":"kùzi","en":"pants","id":"celana"},
        {"char":"裙子","pinyin":"qúnzi","en":"skirt","id":"rok"},
        {"char":"怎么样","pinyin":"zěnmeyàng","en":"how","id":"bagaimana"},
        {"char":"好看","pinyin":"hǎokàn","en":"good looking","id":"bagus; cantik"},
        {"char":"漂亮","pinyin":"piàoliang","en":"pretty; beautiful","id":"cantik; indah"},
        {"char":"双","pinyin":"shuāng","en":"pair (measure word)","id":"pasang"},
        {"char":"鞋","pinyin":"xié","en":"shoe","id":"sepatu"}
      ],
      "radicals": [],
      "sentences": ["这件衣服太大了。","这件衣服太小了。","这件衣服不大也不小，很合适。","爸爸，这条裤子怎么样？很好看！妈妈的那条裙子呢？也很漂亮！"],
      "grammar": []
    },
    "unit2": {
      "title": "我能帮你",
      "vocab": [
        {"char":"忙","pinyin":"máng","en":"busy","id":"sibuk"},
        {"char":"能","pinyin":"néng","en":"can; able to","id":"bisa; mampu"},
        {"char":"教","pinyin":"jiāo","en":"to teach","id":"mengajar"},
        {"char":"课","pinyin":"kè","en":"lesson; class","id":"pelajaran"},
        {"char":"难","pinyin":"nán","en":"difficult","id":"sulit"},
        {"char":"还","pinyin":"hái","en":"still; yet","id":"masih"},
        {"char":"懂","pinyin":"dǒng","en":"to understand","id":"mengerti"},
        {"char":"现在","pinyin":"xiànzài","en":"now","id":"sekarang"},
        {"char":"喂","pinyin":"wèi","en":"hello (on phone)","id":"halo"},
        {"char":"生病","pinyin":"shēngbìng","en":"to get sick","id":"sakit"},
        {"char":"马上","pinyin":"mǎshàng","en":"immediately","id":"segera"},
        {"char":"帮助","pinyin":"bāngzhù","en":"to help","id":"membantu"},
        {"char":"别人","pinyin":"biérén","en":"other people","id":"orang lain"}
      ],
      "radicals": [{"char":"心","meaning":"heart"}],
      "sentences": ["天明：老师，您忙吗？您能教我数学吗？","老师：能啊，你哪里不懂？"],
      "grammar": ["能 vs 会：能 = physically able / permitted; 会 = have learned the skill"]
    },
    "unit3": {
      "title": "谁把桌子上的牛奶喝了？",
      "vocab": [
        {"char":"把","pinyin":"bǎ","en":"(preposition)","id":"(kata depan)"},
        {"char":"但是","pinyin":"dànshì","en":"but","id":"tetapi"},
        {"char":"足球","pinyin":"zúqiú","en":"football","id":"sepak bola"},
        {"char":"踢足球","pinyin":"tī zúqiú","en":"to play football","id":"main sepak bola"},
        {"char":"电影","pinyin":"diànyǐng","en":"film","id":"film"},
        {"char":"感冒","pinyin":"gǎnmào","en":"to catch a cold","id":"masuk angin"},
        {"char":"电视","pinyin":"diànshì","en":"television","id":"televisi"}
      ],
      "radicals": [{"char":"示","meaning":"show; demonstrate"}],
      "sentences": ["哥哥爱喝牛奶，但是哥哥不在家，他去踢足球了。","姐姐爱喝牛奶，但是姐姐也不在家，她去看电影了。","妹妹爱喝牛奶，但是妹妹感冒了，她在房间里睡觉。","爸爸在家看电视，但是爸爸不爱喝牛奶。","你说一说，是谁把桌子上的牛奶喝了？"],
      "grammar": ["把字句：Subject + 把 + Object + Verb + other elements"]
    },
    "unit4": {
      "title": "外面在刮风呢！",
      "vocab": [
        {"char":"外面","pinyin":"wàimian","en":"outside","id":"di luar"},
        {"char":"在","pinyin":"zài","en":"(action in progress)","id":"(sedang berlangsung)"},
        {"char":"风","pinyin":"fēng","en":"wind","id":"angin"},
        {"char":"刮风","pinyin":"guā fēng","en":"windy","id":"berangin"},
        {"char":"别","pinyin":"bié","en":"don't","id":"jangan"},
        {"char":"开","pinyin":"kāi","en":"open; to open","id":"membuka"},
        {"char":"不要","pinyin":"búyào","en":"don't","id":"jangan"},
        {"char":"大声","pinyin":"dàshēng","en":"loud","id":"keras"},
        {"char":"东西","pinyin":"dōngxi","en":"thing; object; something","id":"benda; sesuatu"},
        {"char":"出去","pinyin":"chūqu","en":"to go out","id":"keluar"},
        {"char":"丢","pinyin":"diū","en":"gone; lost","id":"hilang"},
        {"char":"着急","pinyin":"zháojí","en":"anxious; worried","id":"cemas; khawatir"},
        {"char":"找","pinyin":"zhǎo","en":"to look for; to search","id":"mencari"}
      ],
      "radicals": [{"char":"刂","meaning":"knife (side form)"}],
      "sentences": ["外面在刮风呢，你别开门！","小宝宝在睡觉呢，请不要大声说话。","我们在上课呢，请别在教室里吃东西。","外面在下雨呢，请不要出去。","安妮的猫丢了，她很着急。别着急，我们一起找吧。"],
      "grammar": ["在…呢 (action in progress)","不要 vs 别 (don't)"]
    },
    "unit5": {
      "title": "桌子上的蛋糕少了一块",
      "vocab": [
        {"char":"同学","pinyin":"tóngxué","en":"schoolmate","id":"teman sekelas"},
        {"char":"块","pinyin":"kuài","en":"(measure word)","id":"(kata bantu bilangan)"},
        {"char":"蛋糕","pinyin":"dàngāo","en":"cake; tart","id":"kue"},
        {"char":"放","pinyin":"fàng","en":"to put","id":"meletakkan"},
        {"char":"时候","pinyin":"shíhou","en":"time","id":"waktu"},
        {"char":"对","pinyin":"duì","en":"to; toward","id":"kepada"},
        {"char":"少","pinyin":"shǎo","en":"little; less","id":"sedikit; kurang"},
        {"char":"拿","pinyin":"ná","en":"to take","id":"mengambil"},
        {"char":"根","pinyin":"gēn","en":"(measure word)","id":"(kata bantu bilangan)"},
        {"char":"所以","pinyin":"suǒyǐ","en":"so; therefore","id":"oleh karena itu"},
        {"char":"一定","pinyin":"yídìng","en":"for sure; certainly","id":"pasti"},
        {"char":"走","pinyin":"zǒu","en":"to walk; to go","id":"berjalan; pergi"},
        {"char":"到","pinyin":"dào","en":"to reach; to arrive","id":"mencapai; tiba"}
      ],
      "radicals": [{"char":"冂","meaning":"arch; frame"}],
      "sentences": ["今天我的同学安妮来我家。妈妈买了六块蛋糕，她把蛋糕放在厨房里的桌子上。","要吃蛋糕的时候，妈妈对我说：桌子上的蛋糕少了一块。","因为妈妈的头发是棕色的，所以这不是妈妈的头发。","妹妹的头发不长也不短，她的头发也是黑色的。这一定是妹妹的头发。","是，因为我饿了，所以我把桌子上的一块蛋糕吃了。"],
      "grammar": ["因为…所以… (because…therefore…)"]
    },
    "unit6": {
      "title": "巴厘岛怎么去最好呢？",
      "vocab": [
        {"char":"巴厘岛","pinyin":"Bālí dǎo","en":"Bali island","id":"Pulau Bali"},
        {"char":"旅游","pinyin":"lǚyóu","en":"to travel; tour","id":"berwisata"},
        {"char":"最","pinyin":"zuì","en":"most","id":"paling"},
        {"char":"可以","pinyin":"kěyǐ","en":"can; may","id":"bisa; boleh"},
        {"char":"慢","pinyin":"màn","en":"slow","id":"lambat"},
        {"char":"快","pinyin":"kuài","en":"fast","id":"cepat"},
        {"char":"汽车","pinyin":"qìchē","en":"car","id":"mobil"},
        {"char":"远","pinyin":"yuǎn","en":"far","id":"jauh"},
        {"char":"累","pinyin":"lèi","en":"tired","id":"lelah"},
        {"char":"火车","pinyin":"huǒchē","en":"train","id":"kereta"},
        {"char":"开","pinyin":"kāi","en":"to drive; to go","id":"mengemudi"},
        {"char":"应该","pinyin":"yīnggāi","en":"should; ought to","id":"seharusnya"},
        {"char":"转","pinyin":"zhuǎn","en":"to change; to turn","id":"berganti"},
        {"char":"渡轮","pinyin":"dùlún","en":"ferry","id":"feri"},
        {"char":"飞机","pinyin":"fēijī","en":"aeroplane","id":"pesawat"},
        {"char":"同意","pinyin":"tóngyì","en":"agree","id":"setuju"}
      ],
      "radicals": [{"char":"广","meaning":"broad; vast"}],
      "sentences": ["我们一家人要去巴厘岛旅游。","巴厘岛怎么去最好呢？","我们可以骑自行车去！骑自行车太慢了。怎么去比较快？","我们可以坐汽车去！巴厘岛很远，坐汽车一定很累。","我们可以坐火车去！火车没有开到巴厘岛的，我们应该转渡轮。","我们可以坐飞机去！坐飞机很快。好，我们坐飞机去吧。大家都同意吗？同意！"],
      "grammar": ["可以 (may; can)"]
    },
    "unit7": {
      "title": "合唱比赛",
      "vocab": [
        {"char":"合唱","pinyin":"héchàng","en":"choir","id":"paduan suara"},
        {"char":"团","pinyin":"tuán","en":"group","id":"regu; kelompok"},
        {"char":"比赛","pinyin":"bǐsài","en":"competition","id":"kompetisi"},
        {"char":"开始","pinyin":"kāishǐ","en":"to begin","id":"mulai"},
        {"char":"第","pinyin":"dì","en":"(depicting sequence)","id":"(urutan ke-)"},
        {"char":"出场","pinyin":"chūchǎng","en":"to appear on stage","id":"tampil di panggung"},
        {"char":"年级","pinyin":"niánjí","en":"grade (in school)","id":"kelas; tingkat"},
        {"char":"参加","pinyin":"cānjiā","en":"to participate","id":"berpartisipasi"},
        {"char":"男","pinyin":"nán","en":"male","id":"laki-laki"},
        {"char":"女","pinyin":"nǚ","en":"female","id":"perempuan"},
        {"char":"上台","pinyin":"shàngtái","en":"to go on stage","id":"naik panggung"},
        {"char":"得","pinyin":"de","en":"(particle)","id":"(partikel)"},
        {"char":"希望","pinyin":"xīwàng","en":"to wish; to hope","id":"berharap"},
        {"char":"赢","pinyin":"yíng","en":"to win","id":"menang"}
      ],
      "radicals": [{"char":"彳","meaning":"step; walk"}],
      "sentences": ["天明，合唱比赛要开始了！来了！来了！","第一个出场的是我们学校的合唱团！","我们四年级的同学有几个人参加？两个男同学和两个女同学。","你看，他们上台了！他们唱得真好！我希望他们能赢。"],
      "grammar": ["要…了 (about to happen)","Verb + 得 + complement"]
    },
    "unit8": {
      "title": "过了十五分钟……",
      "vocab": [
        {"char":"借","pinyin":"jiè","en":"to borrow","id":"meminjam"},
        {"char":"电脑","pinyin":"diànnǎo","en":"computer","id":"komputer"},
        {"char":"汉语","pinyin":"hànyǔ","en":"Chinese","id":"bahasa Mandarin"},
        {"char":"过","pinyin":"guò","en":"to pass","id":"berlalu; lewat"},
        {"char":"分钟","pinyin":"fēnzhōng","en":"minute","id":"menit"},
        {"char":"完","pinyin":"wán","en":"finish; over","id":"selesai"},
        {"char":"小时","pinyin":"xiǎoshí","en":"hour","id":"jam"},
        {"char":"休息","pinyin":"xiūxi","en":"to rest","id":"beristirahat"},
        {"char":"用","pinyin":"yòng","en":"to use","id":"menggunakan"},
        {"char":"时间","pinyin":"shíjiān","en":"time","id":"waktu"},
        {"char":"每","pinyin":"měi","en":"each; every","id":"setiap"},
        {"char":"次","pinyin":"cì","en":"time/times (measure word)","id":"kali"}
      ],
      "radicals": [{"char":"钅","meaning":"gold; metal (side form)"}],
      "sentences": ["弟弟借了哥哥的电脑，弟弟说他要用电脑做汉语作业。","过了十五分钟……作业做完了吗？还没有。","过了一个小时……还没有，我在休息呢！"],
      "grammar": ["点/小时/分/分钟 (time units)","每 + measure word (every)"]
    },
    "unit9": {
      "title": "你吃过烤鸭吗？",
      "vocab": [
        {"char":"...过","pinyin":"...guò","en":"have... before","id":"pernah..."},
        {"char":"北京","pinyin":"Běijīng","en":"Beijing","id":"Beijing"},
        {"char":"烤鸭","pinyin":"kǎoyā","en":"roasted duck","id":"bebek panggang"},
        {"char":"听说","pinyin":"tīngshuō","en":"it is said that; reportedly","id":"katanya"},
        {"char":"见","pinyin":"jiàn","en":"to meet; to see","id":"bertemu; melihat"},
        {"char":"外星人","pinyin":"wàixīngrén","en":"alien","id":"alien; makhluk luar angkasa"},
        {"char":"长","pinyin":"zhǎng","en":"outward appearance; to grow","id":"tampilan; tumbuh"},
        {"char":"一样","pinyin":"yīyàng","en":"same","id":"sama"},
        {"char":"当","pinyin":"dāng","en":"when","id":"ketika"},
        {"char":"聊天儿","pinyin":"liáotiānr","en":"to chat","id":"mengobrol"},
        {"char":"突然","pinyin":"tūrán","en":"suddenly","id":"tiba-tiba"},
        {"char":"张开","pinyin":"zhāng kāi","en":"to open","id":"membuka"},
        {"char":"做梦","pinyin":"zuòmèng","en":"to dream","id":"bermimpi"}
      ],
      "radicals": [{"char":"弓","meaning":"bow (archery)"}],
      "sentences": ["你吃过北京烤鸭吗？没吃过。听说很好吃。","你看过熊猫吗？看过。你看，这是熊猫！","你见过外星人吗？我没见过。但是弟弟说他见过外星人。","外星人长得跟我们不一样。弟弟把眼睛张开，原来，他在做梦呢！"],
      "grammar": ["Verb + 过 (past experience)","跟…一样 (same as)"]
    },
    "unit10": {
      "title": "去火车站接爷爷",
      "vocab": [
        {"char":"住","pinyin":"zhù","en":"to stay; to live","id":"tinggal"},
        {"char":"火车站","pinyin":"huǒchēzhàn","en":"train station","id":"stasiun kereta"},
        {"char":"接","pinyin":"jiē","en":"to pick up","id":"menjemput"},
        {"char":"前（面）","pinyin":"qián (mian)","en":"(in) front","id":"(di) depan"},
        {"char":"周围","pinyin":"zhōuwéi","en":"surrounding; around","id":"sekitar"},
        {"char":"左（边）","pinyin":"zuǒ (bian)","en":"left (side)","id":"(sisi) kiri"},
        {"char":"果汁","pinyin":"guǒzhī","en":"fruit juice","id":"jus buah"},
        {"char":"店","pinyin":"diàn","en":"shop","id":"toko"},
        {"char":"右（边）","pinyin":"yòu (bian)","en":"right (side)","id":"(sisi) kanan"},
        {"char":"后（面）","pinyin":"hòu (mian)","en":"(at) back","id":"(di) belakang"},
        {"char":"咖啡厅","pinyin":"kāfēitīng","en":"cafe","id":"kafe"}
      ],
      "radicals": [{"char":"丷","meaning":"(component → 前 front)"}],
      "sentences": ["我爷爷住得很远。今天他要来我们家。","爸爸和我一起去火车站接爷爷。","喂，爸，您到了吗？您在哪儿？","我到了，但是我不知道我现在在哪儿。","您看看，您周围有什么商店？","我左边有一个果汁店，右边是一个蛋糕店，后面是一个咖啡厅。","我知道了。我们现在去找您。"],
      "grammar": ["Direction words: 上下左右前后里外"]
    }
  },

  // ─────────────────────────────────────────────
  // MEIHUA 5
  // ─────────────────────────────────────────────
  "meihua5": {
    "unit1": {
      "title": "友谊天长地久",
      "vocab": [
        {"char":"友谊","pinyin":"yǒuyì","en":"friendship","id":"persahabatan"},
        {"char":"天长地久","pinyin":"tiān cháng dì jiǔ","en":"eternal; lasting forever","id":"selamanya"},
        {"char":"学年","pinyin":"xuénián","en":"school year","id":"tahun ajaran"},
        {"char":"差点儿","pinyin":"chà diǎnr","en":"almost; nearly","id":"hampir"},
        {"char":"迟到","pinyin":"chídào","en":"to be late","id":"terlambat"},
        {"char":"邻居","pinyin":"línjū","en":"neighbour","id":"tetangga"},
        {"char":"虽然","pinyin":"suīrán","en":"although","id":"meskipun"},
        {"char":"同","pinyin":"tóng","en":"same; together","id":"sama"},
        {"char":"经常","pinyin":"jīngcháng","en":"often; frequently","id":"sering"},
        {"char":"玩儿","pinyin":"wánr","en":"to play","id":"bermain"},
        {"char":"上个月","pinyin":"shàng ge yuè","en":"last month","id":"bulan lalu"},
        {"char":"工作","pinyin":"gōngzuò","en":"to work; work","id":"bekerja; pekerjaan"},
        {"char":"搬","pinyin":"bān","en":"to move; to relocate","id":"pindah"},
        {"char":"难过","pinyin":"nánguò","en":"sad; upset","id":"sedih"},
        {"char":"会","pinyin":"huì","en":"will; shall","id":"akan"}
      ],
      "radicals": [],
      "sentences": [
        "新学年开始了。",
        "第一天上课我差点儿迟到了。",
        "虽然我们不同班，但是经常在一起玩儿。",
        "希望我们的友谊天长地久！"
      ],
      "grammar": ["虽然…但是… (although…but…)：虽然我们不同班，但是经常在一起玩儿。"]
    },
    "unit2": {
      "title": "她们俩完全不一样",
      "vocab": [
        {"char":"俩","pinyin":"liǎ","en":"two (people)","id":"dua (orang)"},
        {"char":"完全","pinyin":"wánquán","en":"completely","id":"sama sekali; sepenuhnya"},
        {"char":"不一样","pinyin":"bù yīyàng","en":"different","id":"tidak sama"},
        {"char":"性格","pinyin":"xìnggé","en":"personality; character","id":"sifat; karakter"},
        {"char":"活泼","pinyin":"huópō","en":"lively; outgoing","id":"ceria; aktif"},
        {"char":"安静","pinyin":"ānjìng","en":"quiet; calm","id":"tenang"},
        {"char":"认真","pinyin":"rènzhēn","en":"serious; diligent","id":"serius; rajin"},
        {"char":"粗心","pinyin":"cūxīn","en":"careless","id":"ceroboh"},
        {"char":"双胞胎","pinyin":"shuāngbāotāi","en":"twins","id":"kembar"},
        {"char":"长相","pinyin":"zhǎngxiàng","en":"appearance; looks","id":"penampilan"},
        {"char":"相同","pinyin":"xiāngtóng","en":"identical; the same","id":"sama"},
        {"char":"却","pinyin":"què","en":"yet; but","id":"namun"}
      ],
      "radicals": [],
      "sentences": ["她们俩完全不一样。","虽然长相相同，但是性格完全不一样。"],
      "grammar": ["虽然…却… (although…yet…)"]
    },
    "unit3": {
      "title": "我们的梦想",
      "vocab": [
        {"char":"梦想","pinyin":"mèngxiǎng","en":"dream; aspiration","id":"impian; cita-cita"},
        {"char":"当","pinyin":"dāng","en":"to become; to be","id":"menjadi"},
        {"char":"作家","pinyin":"zuòjiā","en":"writer; author","id":"penulis"},
        {"char":"导游","pinyin":"dǎoyóu","en":"tour guide","id":"pemandu wisata"},
        {"char":"文章","pinyin":"wénzhāng","en":"article; essay","id":"artikel"},
        {"char":"交朋友","pinyin":"jiāo péngyou","en":"to make friends","id":"berteman"},
        {"char":"一边…一边…","pinyin":"yìbiān…yìbiān…","en":"at the same time; while","id":"sambil"},
        {"char":"记者","pinyin":"jìzhě","en":"reporter; journalist","id":"wartawan"},
        {"char":"故事","pinyin":"gùshi","en":"story","id":"cerita"},
        {"char":"发生","pinyin":"fāshēng","en":"to happen; to occur","id":"terjadi"},
        {"char":"为了","pinyin":"wèile","en":"for the sake of","id":"demi"},
        {"char":"实现","pinyin":"shíxiàn","en":"to achieve; to realize","id":"mewujudkan"},
        {"char":"让","pinyin":"ràng","en":"to let; to allow","id":"membiarkan"},
        {"char":"努力","pinyin":"nǔlì","en":"to work hard; diligent","id":"berusaha keras"}
      ],
      "radicals": [],
      "sentences": [
        "天明：你的梦想是什么？",
        "刘海燕：我想当作家。",
        "刘小燕：我想当导游。",
        "天明：我想当记者。"
      ],
      "grammar": ["一边…一边… (doing two things simultaneously)：他一边唱歌，一边跳舞。"]
    },
    "unit4": {
      "title": "个人的一小步，人类的一大步",
      "vocab": [
        {"char":"个人","pinyin":"gèrén","en":"personal; individual","id":"pribadi; individu"},
        {"char":"步","pinyin":"bù","en":"step","id":"langkah"},
        {"char":"人类","pinyin":"rénlèi","en":"mankind; humanity","id":"umat manusia"},
        {"char":"飞行员","pinyin":"fēixíngyuán","en":"pilot","id":"pilot"},
        {"char":"除了","pinyin":"chúle","en":"besides; except","id":"selain"},
        {"char":"月亮","pinyin":"yuèliang","en":"moon","id":"bulan"},
        {"char":"星星","pinyin":"xīngxing","en":"star","id":"bintang"},
        {"char":"台","pinyin":"tái","en":"(measure word for machines)","id":"(kata bantu alat)"},
        {"char":"望远镜","pinyin":"wàngyuǎnjìng","en":"telescope","id":"teleskop"},
        {"char":"驾驶","pinyin":"jiàshǐ","en":"to drive; to pilot","id":"mengemudikan"},
        {"char":"更","pinyin":"gèng","en":"even more","id":"lebih"},
        {"char":"向","pinyin":"xiàng","en":"toward; to","id":"menuju"},
        {"char":"太空","pinyin":"tàikōng","en":"outer space","id":"luar angkasa"},
        {"char":"宇航员","pinyin":"yǔhángyuán","en":"astronaut","id":"astronot"},
        {"char":"其他","pinyin":"qítā","en":"other; others","id":"yang lain"},
        {"char":"登","pinyin":"dēng","en":"to ascend; to board","id":"mendaki; naik"},
        {"char":"月球","pinyin":"yuèqiú","en":"the moon","id":"bulan"},
        {"char":"有名","pinyin":"yǒumíng","en":"famous","id":"terkenal"},
        {"char":"句","pinyin":"jù","en":"sentence (measure word)","id":"kalimat"},
        {"char":"却","pinyin":"què","en":"yet; but","id":"namun"}
      ],
      "radicals": [],
      "sentences": [
        "1969年7月20日，他和其他两个宇航员登上了月球。",
        "个人的一小步，人类的一大步。"
      ],
      "grammar": ["除了…也/还… (besides…also…)：除了飞机，他也很喜欢看星星。"]
    },
    "unit5": {
      "title": "静夜思",
      "vocab": [
        {"char":"静","pinyin":"jìng","en":"quiet; still","id":"sunyi; hening"},
        {"char":"夜","pinyin":"yè","en":"night","id":"malam"},
        {"char":"思","pinyin":"sī","en":"to think; to miss","id":"memikirkan; merindukan"},
        {"char":"床","pinyin":"chuáng","en":"bed","id":"tempat tidur"},
        {"char":"前","pinyin":"qián","en":"in front; before","id":"depan; sebelum"},
        {"char":"光","pinyin":"guāng","en":"light; brightness","id":"cahaya"},
        {"char":"疑","pinyin":"yí","en":"to suspect; doubtful","id":"menduga"},
        {"char":"举","pinyin":"jǔ","en":"to raise; to lift","id":"mengangkat"},
        {"char":"望","pinyin":"wàng","en":"to gaze; to look","id":"menatap"},
        {"char":"低","pinyin":"dī","en":"to lower; low","id":"menunduk; rendah"},
        {"char":"故乡","pinyin":"gùxiāng","en":"hometown","id":"kampung halaman"}
      ],
      "radicals": [],
      "sentences": [
        "床前明月光，疑是地上霜。",
        "举头望明月，低头思故乡。"
      ],
      "grammar": []
    },
    "unit6": {
      "title": "网购",
      "vocab": [
        {"char":"网购","pinyin":"wǎng gòu","en":"online shopping","id":"belanja online"},
        {"char":"上网","pinyin":"shàng wǎng","en":"to go online","id":"online; berselancar"},
        {"char":"网上","pinyin":"wǎng shàng","en":"on the internet","id":"di internet"},
        {"char":"卖","pinyin":"mài","en":"to sell","id":"menjual"},
        {"char":"商场","pinyin":"shāngchǎng","en":"shopping centre","id":"pusat perbelanjaan"},
        {"char":"便宜","pinyin":"piányi","en":"cheap","id":"murah"},
        {"char":"前天","pinyin":"qiántiān","en":"two days ago","id":"dua hari yang lalu"},
        {"char":"网店","pinyin":"wǎng diàn","en":"online shop","id":"toko online"},
        {"char":"寄","pinyin":"jì","en":"to send","id":"mengirim"},
        {"char":"送","pinyin":"sòng","en":"to gift; to deliver","id":"menghadiahkan"},
        {"char":"礼物","pinyin":"lǐwù","en":"present; gift","id":"hadiah"},
        {"char":"哇","pinyin":"wā","en":"wow","id":"wah"},
        {"char":"手表","pinyin":"shǒubiǎo","en":"watch","id":"jam tangan"},
        {"char":"贵","pinyin":"guì","en":"expensive","id":"mahal"},
        {"char":"一点儿","pinyin":"yīdiǎnr","en":"a little; small amount","id":"sedikit"},
        {"char":"又…又…","pinyin":"yòu…yòu…","en":"not only…but also…","id":"tidak hanya…tapi juga…"}
      ],
      "radicals": [],
      "sentences": ["妈妈喜欢上网买东西。她说网上卖的东西经常比商场里卖的东西便宜。","前天妈妈又上网买东西了。今天中午，网店把东西寄到家里了。","妈妈，这是什么？这是送给你的小礼物。","哇！很漂亮的一块手表！谢谢妈妈！这块手表贵吗？","一点儿也不贵。这块手表又便宜又好看，所以我就买给你了。真好看！我很喜欢。"],
      "grammar": ["一点儿 (a little/small amount)：一点儿也不贵。","又…又… (not only…but also…)：这块手表又便宜又好看。"]
    },
    "unit7": {
      "title": "去超市",
      "vocab": [
        {"char":"周末","pinyin":"zhōumò","en":"weekend","id":"akhir pekan"},
        {"char":"超市","pinyin":"chāoshì","en":"supermarket","id":"supermarket"},
        {"char":"收银台","pinyin":"shōuyíntái","en":"cashier counter","id":"kasir"},
        {"char":"收银员","pinyin":"shōuyínyuán","en":"cashier","id":"kasir"},
        {"char":"牙膏","pinyin":"yágāo","en":"toothpaste","id":"pasta gigi"},
        {"char":"牙刷","pinyin":"yáshuā","en":"toothbrush","id":"sikat gigi"},
        {"char":"洗衣粉","pinyin":"xǐyīfěn","en":"laundry detergent","id":"deterjen"},
        {"char":"杯子","pinyin":"bēizi","en":"cup; glass","id":"cangkir; gelas"},
        {"char":"欢迎","pinyin":"huānyíng","en":"welcome","id":"selamat datang"},
        {"char":"光临","pinyin":"guānglín","en":"your presence (formal)","id":"kehadiran Anda"},
        {"char":"一共","pinyin":"yígòng","en":"in total; altogether","id":"jumlah"},
        {"char":"万","pinyin":"wàn","en":"ten thousand","id":"sepuluh ribu"},
        {"char":"千","pinyin":"qiān","en":"thousand","id":"ribu"},
        {"char":"百","pinyin":"bǎi","en":"hundred","id":"ratus"},
        {"char":"盾","pinyin":"dùn","en":"rupiah (Indonesian currency)","id":"rupiah"},
        {"char":"钱","pinyin":"qián","en":"money","id":"uang"},
        {"char":"找","pinyin":"zhǎo","en":"change (money returned)","id":"kembalian"}
      ],
      "radicals": [],
      "sentences": [
        "周末，妈妈和我一起去超市买东西。",
        "欢迎光临！一共多少钱？"
      ],
      "grammar": ["百/千/万 number system：一万七千多个岛。"]
    },
    "unit8": {
      "title": "他们怎么了？",
      "vocab": [
        {"char":"诊所","pinyin":"zhěnsuǒ","en":"clinic","id":"klinik"},
        {"char":"身体","pinyin":"shēntǐ","en":"body","id":"tubuh"},
        {"char":"舒服","pinyin":"shūfu","en":"comfortable","id":"nyaman; enak"},
        {"char":"发烧","pinyin":"fā shāo","en":"to get a fever","id":"demam"},
        {"char":"咳嗽","pinyin":"késou","en":"to cough; cough","id":"batuk"},
        {"char":"流鼻涕","pinyin":"liú bítì","en":"runny nose","id":"pilek"},
        {"char":"晕","pinyin":"yūn","en":"dizzy","id":"pusing"},
        {"char":"肚子","pinyin":"dùzi","en":"stomach; belly","id":"perut"},
        {"char":"疼","pinyin":"téng","en":"pain; ache","id":"sakit; nyeri"},
        {"char":"腹泻","pinyin":"fùxiè","en":"diarrhea","id":"diare"},
        {"char":"呕吐","pinyin":"ǒutù","en":"to vomit","id":"muntah"},
        {"char":"得","pinyin":"dé","en":"to get (a disease)","id":"terkena"},
        {"char":"肠胃炎","pinyin":"chángwèiyán","en":"gastroenteritis","id":"radang lambung"},
        {"char":"前","pinyin":"qián","en":"before; ago","id":"sebelum; yang lalu"},
        {"char":"海鲜","pinyin":"hǎixiān","en":"seafood","id":"makanan laut"},
        {"char":"痒","pinyin":"yáng","en":"itchy","id":"gatal"},
        {"char":"皮肤","pinyin":"pífū","en":"skin","id":"kulit"},
        {"char":"过敏","pinyin":"guòmǐn","en":"allergy; allergic","id":"alergi"}
      ],
      "radicals": [],
      "sentences": [
        "陈奶奶：我身体不舒服，今天早上开始发烧、咳嗽、流鼻涕和头晕。",
        "林医生：您感冒了。",
        "丽丽：我三天前吃了海鲜，身体就开始痒了。",
        "林医生：你皮肤过敏了。"
      ],
      "grammar": [
        "前 qián = before / ago：两天前 (two days ago)，吃饭前 (before eating)",
        "后 hòu = after：一年后 (a year later)，到家后 (after reaching home)"
      ]
    },
    "unit9": {
      "title": "印度尼西亚",
      "vocab": [
        {"char":"国家","pinyin":"guójiā","en":"country","id":"negara"},
        {"char":"地图","pinyin":"dìtú","en":"map","id":"peta"},
        {"char":"几","pinyin":"jǐ","en":"several; how many","id":"beberapa"},
        {"char":"岛","pinyin":"dǎo","en":"island","id":"pulau"},
        {"char":"荒岛","pinyin":"huāng dǎo","en":"uninhabited island","id":"pulau kosong"},
        {"char":"东","pinyin":"dōng","en":"east","id":"timur"},
        {"char":"西","pinyin":"xī","en":"west","id":"barat"},
        {"char":"南","pinyin":"nán","en":"south","id":"selatan"},
        {"char":"北","pinyin":"běi","en":"north","id":"utara"},
        {"char":"些","pinyin":"xiē","en":"some","id":"beberapa"},
        {"char":"另外","pinyin":"lìngwài","en":"in addition; another","id":"selain itu"},
        {"char":"中间","pinyin":"zhōngjiān","en":"middle; centre","id":"tengah"},
        {"char":"世界","pinyin":"shìjiè","en":"world","id":"dunia"}
      ],
      "radicals": [],
      "sentences": [
        "印度尼西亚是一个很大的国家。",
        "你知道印度尼西亚一共有多少个岛吗？",
        "对，有一万七千多个岛！",
        "最西边有苏门答腊岛，最东边有巴布亚岛。"
      ],
      "grammar": [
        "Compass directions: 东 east, 西 west, 南 south, 北 north",
        "Combinations: 东北 NE, 东南 SE, 西北 NW, 西南 SW",
        "Location: 在…的东边/西边/南边/北边 (to the east/west/south/north of)"
      ]
    },
    "unit10": {
      "title": "候鸟千里飞",
      "vocab": [
        {"char":"候鸟","pinyin":"hòuniǎo","en":"migratory bird","id":"burung migran"},
        {"char":"里","pinyin":"lǐ","en":"li (≈500m distance unit)","id":"li (satuan jarak)"},
        {"char":"季节","pinyin":"jìjié","en":"season","id":"musim"},
        {"char":"秋天","pinyin":"qiūtiān","en":"autumn; fall","id":"musim gugur"},
        {"char":"入","pinyin":"rù","en":"to enter","id":"masuk"},
        {"char":"冬天","pinyin":"dōngtiān","en":"winter","id":"musim dingin"},
        {"char":"越来越","pinyin":"yuè lái yuè","en":"more and more","id":"semakin"},
        {"char":"冷","pinyin":"lěng","en":"cold","id":"dingin"},
        {"char":"北方","pinyin":"běifāng","en":"the north; northern region","id":"daerah utara"},
        {"char":"公里","pinyin":"gōnglǐ","en":"kilometre","id":"kilometer"},
        {"char":"南方","pinyin":"nánfāng","en":"the south; southern region","id":"daerah selatan"},
        {"char":"国外","pinyin":"guówài","en":"abroad; overseas","id":"luar negeri"},
        {"char":"春天","pinyin":"chūntiān","en":"spring","id":"musim semi"},
        {"char":"暖和","pinyin":"nuǎnhuo","en":"warm","id":"hangat"},
        {"char":"然后","pinyin":"ránhòu","en":"then; afterwards","id":"kemudian"},
        {"char":"种","pinyin":"zhǒng","en":"kind; type","id":"jenis"}
      ],
      "radicals": [],
      "sentences": [
        "你一定知道什么是鸟，但是你听说过什么是候鸟吗？",
        "每当秋天要转入冬天，天气越来越冷的时候，有很多鸟从中国的北方向南飞。",
        "当北方的春天到了，天气越来越暖和了，这些鸟会再次飞回北方。"
      ],
      "grammar": [
        "一…就… (as soon as…then…)：我一回来就马上做作业。",
        "越来越 (more and more)：天气越来越冷。"
      ]
    }
  },

  // ─────────────────────────────────────────────
  // MEIHUA 6
  // ─────────────────────────────────────────────
  "meihua6": {
    "unit1": {
      "title": "三十年前的玩具",
      "vocab": [
        {"char":"玩具","pinyin":"wánjù","en":"toy","id":"mainan"},
        {"char":"魔方","pinyin":"mófāng","en":"Rubik's cube","id":"rubik"},
        {"char":"年代","pinyin":"niándài","en":"era; decade","id":"era; dekade"},
        {"char":"特别","pinyin":"tèbié","en":"special; especially","id":"spesial; terutama"},
        {"char":"受欢迎","pinyin":"shòu huānyíng","en":"popular; well-received","id":"populer; disukai"},
        {"char":"到处","pinyin":"dàochù","en":"everywhere","id":"di mana-mana"},
        {"char":"不但…而且…","pinyin":"búdàn…érqiě…","en":"not only…but also…","id":"bukan hanya…tapi juga…"},
        {"char":"积木","pinyin":"jīmù","en":"toy bricks; building blocks","id":"lego; balok mainan"},
        {"char":"牌子","pinyin":"páizi","en":"brand","id":"merek"},
        {"char":"公司","pinyin":"gōngsī","en":"company","id":"perusahaan"},
        {"char":"生产","pinyin":"shēngchǎn","en":"to produce; manufacture","id":"memproduksi"},
        {"char":"成人","pinyin":"chéngrén","en":"adult","id":"orang dewasa"},
        {"char":"据说","pinyin":"jùshuō","en":"it is said that","id":"konon"},
        {"char":"打猎","pinyin":"dǎliè","en":"hunting","id":"berburu"},
        {"char":"总统","pinyin":"zǒngtǒng","en":"president","id":"presiden"},
        {"char":"抓","pinyin":"zhuā","en":"to catch; to grab","id":"menangkap"},
        {"char":"绑","pinyin":"bǎng","en":"to tie","id":"mengikat"},
        {"char":"枪","pinyin":"qiāng","en":"gun","id":"senjata"},
        {"char":"射击","pinyin":"shèjī","en":"to shoot","id":"menembak"},
        {"char":"愿意","pinyin":"yuànyì","en":"willing","id":"bersedia"},
        {"char":"反而","pinyin":"fǎn'ér","en":"instead; on the contrary","id":"malah; justru"},
        {"char":"并","pinyin":"bìng","en":"and (written); not at all (before neg.)","id":"dan; sama sekali tidak"},
        {"char":"起名","pinyin":"qǐmíng","en":"to name; to give a name","id":"memberi nama"}
      ],
      "radicals": [],
      "sentences": [
        "三十年前，虽然没有手机和电脑，但是那个时候的孩子跟现在一样，都喜欢玩具。",
        "这种玩具在80年代特别受欢迎，到处都能看见很多人在玩这个玩具。",
        "到现在，不但小孩子喜欢玩，而且也有不少成人喜欢玩这个玩具。"
      ],
      "grammar": [
        "不但…而且… (not only…but also…)：到现在，不但小孩子喜欢，而且成人也喜欢。",
        "并 bìng as conjunction = and；并 before negative = not at all：我并不知道他今天生病了。"
      ]
    },
    "unit2": {
      "title": "世界上最高的地方",
      "vocab": [
        {"char":"爬山","pinyin":"pá shān","en":"mountain climbing","id":"mendaki gunung"},
        {"char":"对…来说","pinyin":"duì…lái shuō","en":"for…; according to…'s opinion","id":"bagi…; menurut…"},
        {"char":"可能","pinyin":"kěnéng","en":"maybe; possibly","id":"mungkin"},
        {"char":"山脉","pinyin":"shānmài","en":"mountain range","id":"pegunungan"},
        {"char":"需要","pinyin":"xūyào","en":"to need; needs","id":"memerlukan"},
        {"char":"峰","pinyin":"fēng","en":"peak; summit","id":"puncak"},
        {"char":"米","pinyin":"mǐ","en":"metre","id":"meter"},
        {"char":"选择","pinyin":"xuǎnzé","en":"to choose","id":"memilih"},
        {"char":"月份","pinyin":"yuèfèn","en":"month","id":"bulan"},
        {"char":"顺利","pinyin":"shùnlì","en":"smoothly; successfully","id":"lancar"},
        {"char":"的话","pinyin":"dehuà","en":"if…","id":"jika…"},
        {"char":"到达","pinyin":"dàodá","en":"to arrive; to reach","id":"tiba; mencapai"},
        {"char":"长年累月","pinyin":"cháng nián lěi yuè","en":"over many years","id":"bertahun-tahun"},
        {"char":"被","pinyin":"bèi","en":"by (passive marker)","id":"oleh (pasif)"},
        {"char":"雪","pinyin":"xuě","en":"snow","id":"salju"},
        {"char":"盖住","pinyin":"gài zhù","en":"to cover","id":"menutupi"},
        {"char":"空气","pinyin":"kōngqì","en":"air","id":"udara"},
        {"char":"稀薄","pinyin":"xībó","en":"thin (air)","id":"tipis"},
        {"char":"呼吸","pinyin":"hūxī","en":"breathing","id":"pernapasan"},
        {"char":"困难","pinyin":"kùnnan","en":"difficult; difficulty","id":"sulit"},
        {"char":"保暖","pinyin":"bǎonuǎn","en":"to keep warm","id":"menjaga kehangatan"},
        {"char":"氧气","pinyin":"yǎngqì","en":"oxygen","id":"oksigen"},
        {"char":"设备","pinyin":"shèbèi","en":"equipment","id":"peralatan"}
      ],
      "radicals": [],
      "sentences": [
        "你喜欢爬山吗？",
        "对爱好爬山的人来说，能爬到世界上最高的地方可能是他最大的梦想。",
        "世界上最高的地方是在喜马拉雅山脉的珠穆朗玛峰。",
        "珠穆朗玛峰有多高呢？它有八千八百四十八米高！"
      ],
      "grammar": [
        "对…来说 (for…; from …'s perspective)：对他来说，弹钢琴是他的最爱。",
        "…的话 (if…)：你愿意的话，我跟你一起去他家。",
        "被 bèi (passive voice, compare with 把)：蛋糕被他扔掉了。"
      ]
    },
    "unit3": {
      "title": "三人成虎",
      "vocab": [
        {"char":"成","pinyin":"chéng","en":"to become","id":"menjadi"},
        {"char":"部","pinyin":"bù","en":"part; section","id":"bagian"},
        {"char":"王","pinyin":"wáng","en":"king","id":"raja"},
        {"char":"大臣","pinyin":"dàchén","en":"minister; official","id":"menteri"},
        {"char":"出国","pinyin":"chūguó","en":"to go abroad","id":"ke luar negeri"},
        {"char":"办事","pinyin":"bàn shì","en":"to handle affairs","id":"mengurus urusan"},
        {"char":"肯定","pinyin":"kěndìng","en":"definitely; certainly","id":"pasti"},
        {"char":"面前","pinyin":"miànqián","en":"in front of","id":"di depan"},
        {"char":"坏","pinyin":"huài","en":"bad","id":"buruk; jelek"},
        {"char":"办法","pinyin":"bànfǎ","en":"way; method","id":"cara"},
        {"char":"城市","pinyin":"chéngshì","en":"city; town","id":"kota"},
        {"char":"相信","pinyin":"xiāngxìn","en":"to believe","id":"percaya"},
        {"char":"半信半疑","pinyin":"bàn xìn bàn yí","en":"doubtful; partly believe","id":"ragu-ragu"},
        {"char":"容易","pinyin":"róngyì","en":"easy","id":"mudah"},
        {"char":"轻易","pinyin":"qīngyì","en":"easily; rashly","id":"dengan mudah"},
        {"char":"安心","pinyin":"ānxīn","en":"at ease; relieved","id":"tenang; lega"},
        {"char":"先","pinyin":"xiān","en":"first; earlier","id":"dulu; lebih dahulu"},
        {"char":"查","pinyin":"chá","en":"to check; to investigate","id":"memeriksa"},
        {"char":"清楚","pinyin":"qīngchu","en":"clear; clearly","id":"jelas"},
        {"char":"成语","pinyin":"chéngyǔ","en":"idiom; chengyu","id":"idiom Tionghoa"},
        {"char":"明白","pinyin":"míngbai","en":"to understand","id":"mengerti"},
        {"char":"意思","pinyin":"yìsi","en":"meaning","id":"arti; makna"},
        {"char":"要是","pinyin":"yàoshi","en":"if","id":"jika"},
        {"char":"传播","pinyin":"chuánbō","en":"to spread; broadcast","id":"menyebarkan"},
        {"char":"信息","pinyin":"xìnxī","en":"information; news","id":"informasi; berita"},
        {"char":"即使","pinyin":"jíshǐ","en":"even if","id":"bahkan jika"},
        {"char":"假","pinyin":"jiǎ","en":"fake; false","id":"palsu"},
        {"char":"以为","pinyin":"yǐwéi","en":"to think (mistakenly)","id":"mengira"}
      ],
      "radicals": [],
      "sentences": [
        "两千多年前，中国中部有一个叫魏国的国家。",
        "魏王要他的一个大臣出国办事。",
        "如果有一个人跟您说城市里有老虎，您会相信吗？"
      ],
      "grammar": [
        "成语 (chéngyǔ) cultural note: 4-character idiomatic expressions from fables/history",
        "三人成虎: If three people say there's a tiger in town, you'll believe it — repeated rumours become 'truth'"
      ]
    },
    "unit4": {
      "title": "全美国最勇敢的女孩",
      "vocab": [
        {"char":"全","pinyin":"quán","en":"all; entire","id":"seluruh; semua"},
        {"char":"勇敢","pinyin":"yǒnggǎn","en":"brave","id":"berani"},
        {"char":"冲浪","pinyin":"chōnglàng","en":"surfing","id":"selancar"},
        {"char":"冲浪者","pinyin":"chōnglàngzhě","en":"surfer","id":"peselancar"},
        {"char":"站","pinyin":"zhàn","en":"to stand","id":"berdiri"},
        {"char":"板","pinyin":"bǎn","en":"board","id":"papan"},
        {"char":"靠","pinyin":"kào","en":"to rely on; to lean on","id":"mengandalkan"},
        {"char":"平衡","pinyin":"pínghéng","en":"to balance; balance","id":"keseimbangan"},
        {"char":"自己","pinyin":"zìjǐ","en":"oneself; alone","id":"diri sendiri"},
        {"char":"失去","pinyin":"shīqù","en":"to lose","id":"kehilangan"},
        {"char":"专业","pinyin":"zhuānyè","en":"professional","id":"profesional"},
        {"char":"运动员","pinyin":"yùndòngyuán","en":"athlete","id":"atlet"},
        {"char":"躺","pinyin":"tǎng","en":"to lie down","id":"berbaring"},
        {"char":"鲨鱼","pinyin":"shāyú","en":"shark","id":"hiu"},
        {"char":"咬","pinyin":"yǎo","en":"to bite","id":"menggigit"},
        {"char":"断","pinyin":"duàn","en":"cut off; broken","id":"terputus; patah"},
        {"char":"得救","pinyin":"dé jiù","en":"to be saved","id":"diselamatkan"},
        {"char":"永远","pinyin":"yǒngyuǎn","en":"forever; always","id":"selamanya; selalu"},
        {"char":"出院","pinyin":"chūyuàn","en":"to leave hospital","id":"keluar dari rumah sakit"},
        {"char":"久","pinyin":"jiǔ","en":"long (time)","id":"lama"},
        {"char":"地","pinyin":"de","en":"(adverbial particle)","id":"(partikel keterangan)"},
        {"char":"只","pinyin":"zhǐ","en":"only","id":"hanya"},
        {"char":"白费","pinyin":"bái fèi","en":"in vain; wasted","id":"percuma; sia-sia"},
        {"char":"冠军","pinyin":"guànjūn","en":"champion","id":"juara"},
        {"char":"杂志","pinyin":"zázhì","en":"magazine","id":"majalah"},
        {"char":"称","pinyin":"chēng","en":"to call; to name","id":"menyebut"}
      ],
      "radicals": [],
      "sentences": [
        "你们看过冲浪吗？",
        "冲浪的时候，冲浪者应该在一块小小的冲浪板上站着。",
        "如果一个冲浪者失去了他的一只手，他还能冲浪吗？"
      ],
      "grammar": [
        "地 de (adverbial particle): adj + 地 + verb：慢慢地走 (walk slowly)",
        "Compare: 的 (adj+的+noun)，得 (verb+得+adj)，地 (adj+地+verb)"
      ]
    },
    "unit5": {
      "title": "嫦娥奔月",
      "vocab": [
        {"char":"奔","pinyin":"bèn","en":"to rush toward; heading to","id":"menuju; berlari ke"},
        {"char":"以前","pinyin":"yǐqián","en":"before; in the past","id":"sebelumnya; dulu"},
        {"char":"地球","pinyin":"dìqiú","en":"the earth","id":"bumi"},
        {"char":"出现","pinyin":"chūxiàn","en":"to appear; to emerge","id":"muncul"},
        {"char":"太阳","pinyin":"tàiyáng","en":"the sun","id":"matahari"},
        {"char":"英雄","pinyin":"yīngxióng","en":"hero","id":"pahlawan"},
        {"char":"神箭","pinyin":"shén jiàn","en":"magic arrow","id":"panah ajaib"},
        {"char":"射","pinyin":"shè","en":"to shoot","id":"memanah; menembak"},
        {"char":"颗","pinyin":"kē","en":"(measure word for small round things)","id":"(kata bantu benda kecil bulat)"},
        {"char":"长生不老","pinyin":"cháng shēng bù lǎo","en":"immortality; live forever","id":"hidup abadi"},
        {"char":"药","pinyin":"yào","en":"medicine","id":"obat"},
        {"char":"变","pinyin":"biàn","en":"to change; to transform","id":"berubah; menjadi"},
        {"char":"神仙","pinyin":"shénxiān","en":"immortal; deity","id":"dewa; makhluk abadi"},
        {"char":"妻子","pinyin":"qīzi","en":"wife","id":"istri"},
        {"char":"收藏","pinyin":"shōucáng","en":"to store; to collect","id":"menyimpan"},
        {"char":"妙","pinyin":"miào","en":"wonderful; clever","id":"bagus; hebat"},
        {"char":"轻","pinyin":"qīng","en":"light (not heavy)","id":"ringan"},
        {"char":"丈夫","pinyin":"zhàngfu","en":"husband","id":"suami"},
        {"char":"离","pinyin":"lí","en":"to leave; distance from","id":"berpisah; dari"},
        {"char":"以后","pinyin":"yǐhòu","en":"after; later","id":"setelah; nanti"},
        {"char":"伤心","pinyin":"shāngxīn","en":"sad; heartbroken","id":"sedih; patah hati"},
        {"char":"圆","pinyin":"yuán","en":"round; full (moon)","id":"bulat"},
        {"char":"仰望","pinyin":"yǎngwàng","en":"to look up; to gaze up","id":"mendongak; menatap ke atas"}
      ],
      "radicals": [],
      "sentences": [
        "很久很久以前，地球上突然出现了十个太阳。",
        "有一个叫后羿的英雄，他用神箭把九个太阳射下来。",
        "后羿让嫦娥把药收藏起来。",
        "后羿每到月圆的时候，就会仰望着天上的月亮，思念着月亮上的嫦娥。"
      ],
      "grammar": [
        "以前 yǐqián (before / in the past)：我以前不喜欢吃菜。吃饭以前应该先洗手。",
        "以后 yǐhòu (after / later)：我以后想当一名画家。我吃午饭以后就要走了。"
      ]
    },
    "unit6": {
      "title": "悯农",
      "vocab": [
        {"char":"悯","pinyin":"mǐn","en":"to sympathise; to pity","id":"merasa kasihan"},
        {"char":"农","pinyin":"nóng","en":"farmer; farm","id":"petani; pertanian"},
        {"char":"锄","pinyin":"chú","en":"hoe; to hoe","id":"cangkul"},
        {"char":"禾","pinyin":"hé","en":"standing grain; rice seedlings","id":"tanaman padi"},
        {"char":"午","pinyin":"wǔ","en":"noon; midday","id":"tengah hari; siang"},
        {"char":"汗","pinyin":"hàn","en":"sweat","id":"keringat"},
        {"char":"滴","pinyin":"dī","en":"to drip; drop","id":"menetes; tetes"},
        {"char":"土","pinyin":"tǔ","en":"soil; earth","id":"tanah"},
        {"char":"盘","pinyin":"pán","en":"plate; dish","id":"piring"},
        {"char":"餐","pinyin":"cān","en":"meal; food","id":"makanan; hidangan"},
        {"char":"粒","pinyin":"lì","en":"grain (measure word)","id":"butir"},
        {"char":"皆","pinyin":"jiē","en":"all; each and every","id":"semua"},
        {"char":"辛苦","pinyin":"xīnkǔ","en":"hard work; toil","id":"kerja keras"}
      ],
      "radicals": [],
      "sentences": [
        "锄禾日当午，汗滴禾下土。",
        "谁知盘中餐，粒粒皆辛苦。"
      ],
      "grammar": [
        "悯农 is a Tang Dynasty poem by Li Shen (李绅). It expresses sympathy for farmers who work hard in the fields."
      ]
    },
    "unit7": {
      "title": "忘记",
      "vocab": [
        {"char":"据","pinyin":"jù","en":"according to","id":"menurut"},
        {"char":"大学","pinyin":"dàxué","en":"university","id":"universitas"},
        {"char":"售票员","pinyin":"shòupiàoyuán","en":"ticket seller; conductor","id":"kondektur"},
        {"char":"票","pinyin":"piào","en":"ticket","id":"tiket"},
        {"char":"忘","pinyin":"wàng","en":"to forget","id":"lupa"},
        {"char":"忘记","pinyin":"wàngjì","en":"to forget","id":"melupakan"},
        {"char":"口袋","pinyin":"kǒudài","en":"pocket","id":"saku"},
        {"char":"裤袋","pinyin":"kùdài","en":"pants pocket","id":"saku celana"},
        {"char":"着","pinyin":"zháo","en":"(result complement: accomplished)","id":"(berhasil/sudah ditemukan)"},
        {"char":"大名鼎鼎","pinyin":"dàmíng-dǐngdǐng","en":"famous; well-known","id":"terkenal; masyhur"},
        {"char":"博士","pinyin":"bóshì","en":"PhD; doctor","id":"doktor"},
        {"char":"年轻","pinyin":"niánqīng","en":"young","id":"muda"},
        {"char":"问题","pinyin":"wèntí","en":"problem; question","id":"masalah; pertanyaan"},
        {"char":"以上","pinyin":"yǐshàng","en":"above; more than","id":"di atas; lebih dari"},
        {"char":"还是","pinyin":"háishì","en":"or (in questions)","id":"atau"},
        {"char":"调查","pinyin":"diàochá","en":"to survey; investigation","id":"survei; penyelidikan"},
        {"char":"沏","pinyin":"qī","en":"to brew (tea)","id":"menyeduh"},
        {"char":"茶","pinyin":"chá","en":"tea","id":"teh"},
        {"char":"钥匙","pinyin":"yàoshi","en":"key","id":"kunci"},
        {"char":"或者","pinyin":"huòzhě","en":"or (in statements)","id":"atau"},
        {"char":"考试","pinyin":"kǎoshì","en":"examination; test","id":"ujian; tes"}
      ],
      "radicals": [],
      "sentences": [
        "据说，有一天爱因斯坦从大学坐火车回家。",
        "当售票员来查票的时候，爱因斯坦忘记把票放在哪儿了。",
        "他在衣服的口袋里找，口袋里没有；裤袋里找，裤袋里也找不着。"
      ],
      "grammar": [
        "着 zháo (result complement): verb + 着 = action achieved its purpose",
        "找着 = found it；找不着 = couldn't find it",
        "Example: 你见着他了吗？(Have you met him?)"
      ]
    },
    "unit8": {
      "title": "二十世纪的四大发明",
      "vocab": [
        {"char":"世纪","pinyin":"shìjì","en":"century","id":"abad"},
        {"char":"发明","pinyin":"fāmíng","en":"invention; to invent","id":"penemuan; menemukan"},
        {"char":"段","pinyin":"duàn","en":"(measure word); section","id":"(kata bantu waktu/jarak)"},
        {"char":"科技","pinyin":"kējì","en":"science and technology","id":"ilmu pengetahuan dan teknologi"},
        {"char":"发展","pinyin":"fāzhǎn","en":"to develop; development","id":"berkembang; perkembangan"},
        {"char":"影响","pinyin":"yǐngxiǎng","en":"influence; to influence","id":"pengaruh"},
        {"char":"兄弟","pinyin":"xiōngdì","en":"brothers","id":"kakak-adik laki-laki"},
        {"char":"成功","pinyin":"chénggōng","en":"success; to succeed","id":"sukses; berhasil"},
        {"char":"造","pinyin":"zào","en":"to make; to create","id":"membuat; menciptakan"},
        {"char":"多么","pinyin":"duōme","en":"how (exclamatory)","id":"betapa"},
        {"char":"方便","pinyin":"fāngbiàn","en":"convenient; easy","id":"mudah; nyaman"},
        {"char":"共同","pinyin":"gòngtóng","en":"common; together","id":"bersama; umum"},
        {"char":"感谢","pinyin":"gǎnxiè","en":"to thank; grateful","id":"berterima kasih"},
        {"char":"广播","pinyin":"guǎngbō","en":"to broadcast; radio","id":"menyiarkan; radio"},
        {"char":"当然","pinyin":"dāngrán","en":"of course; certainly","id":"tentu saja"},
        {"char":"一直","pinyin":"yīzhí","en":"always; continuously","id":"selalu; terus-menerus"},
        {"char":"常用","pinyin":"cháng yòng","en":"frequently used","id":"sering dipakai"},
        {"char":"台式电脑","pinyin":"táishì diànnǎo","en":"desktop computer","id":"komputer desktop"},
        {"char":"笔记本电脑","pinyin":"bǐjìběn diànnǎo","en":"laptop computer","id":"laptop"},
        {"char":"平板电脑","pinyin":"píngbǎn diànnǎo","en":"tablet computer","id":"tablet"},
        {"char":"自从","pinyin":"zìcóng","en":"since","id":"sejak"},
        {"char":"问世","pinyin":"wènshì","en":"to come out; be published","id":"diterbitkan; muncul"},
        {"char":"方式","pinyin":"fāngshì","en":"way; method","id":"cara; metode"},
        {"char":"变化","pinyin":"biànhuà","en":"change","id":"perubahan"},
        {"char":"功能","pinyin":"gōngnéng","en":"function; feature","id":"fungsi; fitur"}
      ],
      "radicals": [],
      "sentences": [
        "1901年1月1日到2000年12月31日这段时间被称为20世纪。",
        "在这一百年里，科技的发展对人类的生活有很大的影响。"
      ],
      "grammar": [
        "Verb + 得起 (can afford to): 这件衣服贵是贵了一点儿，但是我还买得起。",
        "Verb + 不起 (cannot afford to): 这件衣服太贵了，我买不起。"
      ]
    },
    "unit9": {
      "title": "三年才能修好的东西",
      "vocab": [
        {"char":"才","pinyin":"cái","en":"only then; not until (adverb of lateness)","id":"baru (menyatakan keterlambatan)"},
        {"char":"修","pinyin":"xiū","en":"to fix; to repair","id":"memperbaiki"},
        {"char":"修理","pinyin":"xiūlǐ","en":"to repair; to fix","id":"memperbaiki"},
        {"char":"维修","pinyin":"wéixiū","en":"maintenance; repair","id":"perawatan; perbaikan"},
        {"char":"一会儿","pinyin":"yíhuìr","en":"in a moment; a while","id":"sebentar"},
        {"char":"换","pinyin":"huàn","en":"to change; to replace","id":"mengganti"},
        {"char":"更换","pinyin":"gēnghuàn","en":"to replace","id":"mengganti"},
        {"char":"灯泡","pinyin":"dēngpào","en":"light bulb","id":"bola lampu"},
        {"char":"不是…而是…","pinyin":"búshì…ér shì…","en":"not…but…","id":"bukan…melainkan…"},
        {"char":"航天局","pinyin":"hángtiān jú","en":"space agency","id":"badan antariksa"},
        {"char":"发射","pinyin":"fāshè","en":"to launch","id":"meluncurkan"},
        {"char":"控制","pinyin":"kòngzhì","en":"control; to control","id":"mengendalikan"},
        {"char":"中心","pinyin":"zhōngxīn","en":"centre","id":"pusat"},
        {"char":"图像","pinyin":"túxiàng","en":"image; picture","id":"gambar"},
        {"char":"事","pinyin":"shì","en":"matter; thing; trouble","id":"urusan; masalah"},
        {"char":"镜子","pinyin":"jìngzi","en":"mirror","id":"cermin"},
        {"char":"可…了","pinyin":"kě…le","en":"very; really (emphatic)","id":"sangat; benar-benar"},
        {"char":"架","pinyin":"jià","en":"(measure word for aircraft)","id":"(kata bantu pesawat)"},
        {"char":"航天飞机","pinyin":"hángtiān fēijī","en":"space shuttle","id":"pesawat ulang-alik"}
      ],
      "radicals": [],
      "sentences": [
        "有些东西，如果它坏了，我们可以带去修理。",
        "要是坏了的东西是一台很贵的望远镜，而且这台望远镜不是在地球上，而是在太空中，我们怎么去修理呢？"
      ],
      "grammar": [
        "不是…而是… (not…but…): 这台望远镜不是在地球上，而是在太空中。",
        "可…了 (very / really — emphatic, stronger than 很): 这个问题可大了！（＝这个问题很大）"
      ]
    },
    "unit10": {
      "title": "滥竽充数",
      "vocab": [
        {"char":"国君","pinyin":"guójūn","en":"king; monarch","id":"raja; penguasa"},
        {"char":"音乐","pinyin":"yīnyuè","en":"music","id":"musik"},
        {"char":"尤其","pinyin":"yóuqí","en":"especially; particularly","id":"terutama"},
        {"char":"吹","pinyin":"chuī","en":"to blow; to play (wind instrument)","id":"meniup; memainkan"},
        {"char":"竽","pinyin":"yú","en":"yu (ancient reed instrument)","id":"yu (alat musik kuno)"},
        {"char":"合奏","pinyin":"hézòu","en":"ensemble; to play together","id":"ansambel; bermain bersama"},
        {"char":"乐师","pinyin":"yuèshī","en":"musician","id":"musisi"},
        {"char":"先生","pinyin":"xiānsheng","en":"mister; sir","id":"tuan"},
        {"char":"懒惰","pinyin":"lǎnduò","en":"lazy","id":"malas"},
        {"char":"乐队","pinyin":"yuèduì","en":"band; orchestra","id":"band; orkestra"},
        {"char":"于是","pinyin":"yúshì","en":"so; then; thereupon","id":"lalu; kemudian"},
        {"char":"感动","pinyin":"gǎndòng","en":"touched; moved (emotionally)","id":"terharu"},
        {"char":"装","pinyin":"zhuāng","en":"to pretend; to act","id":"berpura-pura"},
        {"char":"死","pinyin":"sǐ","en":"to die","id":"mati; meninggal"},
        {"char":"儿子","pinyin":"érzi","en":"son","id":"anak laki-laki"},
        {"char":"继承","pinyin":"jìchéng","en":"to inherit","id":"mewarisi"},
        {"char":"王位","pinyin":"wángwèi","en":"throne","id":"tahta"},
        {"char":"吵","pinyin":"chǎo","en":"noisy; to quarrel","id":"berisik; bertengkar"},
        {"char":"命令","pinyin":"mìnglìng","en":"to command; order","id":"memerintahkan"},
        {"char":"怕","pinyin":"pà","en":"afraid; to fear","id":"takut"},
        {"char":"逃走","pinyin":"táozǒu","en":"to escape; to run away","id":"melarikan diri"},
        {"char":"骗","pinyin":"piàn","en":"to deceive; to lie","id":"menipu"},
        {"char":"一时","pinyin":"yīshí","en":"for a short while; temporarily","id":"sementara"},
        {"char":"一世","pinyin":"yīshì","en":"a lifetime; forever","id":"seumur hidup"},
        {"char":"唯一","pinyin":"wéiyī","en":"the only one; sole","id":"satu-satunya"},
        {"char":"本领","pinyin":"běnlǐng","en":"skill; ability","id":"kemampuan; keahlian"}
      ],
      "radicals": [],
      "sentences": [
        "古时候，齐国的国君齐宣王爱好音乐，尤其喜欢听吹竽合奏。",
        "南郭先生是一个很懒惰的人，也不会吹竽，但是想要有很多钱。",
        "乐队合奏时，因为他装得很像，所以没有人知道他是不会吹竽的。",
        "骗得了一时，骗不了一世。"
      ],
      "grammar": [
        "尤其 yóuqí (especially): 齐宣王爱好音乐，尤其喜欢听吹竽合奏。",
        "于是 yúshì (so then; thereupon — formal/written): 南郭先生想要有很多钱，于是来到了齐宣王面前。"
      ]
    }
  }

};

/* ══════════════════════════════════════════════════════════════
   VOCAB_DB  MH entries  +  _meihuaMeanings
   Built from _meihuaDB at load time — available to ALL pages
   that include meihuadb.js (tug.html, builderbattle.html, etc.)
══════════════════════════════════════════════════════════════ */
(function() {
  if (typeof _meihuaDB === 'undefined') return;

  /* Create VOCAB_DB if the page hasn't defined it yet (e.g. tug.html) */
  if (typeof window.VOCAB_DB === 'undefined') window.VOCAB_DB = {};

  /* _meihuaMeanings: char → English meaning lookup */
  if (typeof window._meihuaMeanings === 'undefined') window._meihuaMeanings = {};

  var bookMap = {
    MH1:'meihua1', MH2:'meihua2', MH3:'meihua3',
    MH4:'meihua4', MH5:'meihua5', MH6:'meihua6'
  };

  Object.keys(bookMap).forEach(function(lvKey) {
    var book = _meihuaDB[bookMap[lvKey]];
    if (!book) return;
    for (var u = 1; u <= 10; u++) {
      var unit = book['unit' + u];
      var pool = [];
      if (unit && unit.vocab) {
        unit.vocab.forEach(function(entry) {
          if (entry.char && entry.pinyin) {
            pool.push([entry.char, entry.pinyin]);
            if (entry.en && !window._meihuaMeanings[entry.char]) {
              window._meihuaMeanings[entry.char] = entry.en;
            }
          }
        });
      }
      window.VOCAB_DB[lvKey + 'U' + u] = pool;
    }
  });
})();
