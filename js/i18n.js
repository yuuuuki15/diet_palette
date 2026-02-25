// Academic references (language-independent citations)
const REFERENCE_SOURCES = [
  { id: "S1",  text: "Singer, P. (2002). Animal Liberation. HarperCollins." },
  { id: "S2",  text: "Regan, T. (2004). The Case for Animal Rights. UC Press." },
  { id: "S3",  text: "Curtin, D. (1991). Toward an Ecological Ethic of Care. Hypatia, 6(1), 60\u201374." },
  { id: "S4",  text: "Leopold, A. (1949). A Sand County Almanac. Oxford University Press." },
  { id: "S5",  text: "Willett, W. et al. (2019). Food in the Anthropocene: the EAT\u2013Lancet Commission. The Lancet, 393, 447\u2013492." },
  { id: "S6",  text: "Kant, I. (1997). Lectures on Ethics. Cambridge University Press." },
  { id: "S7",  text: "Francione, G.L. (1997). Animal Rights Theory and Utilitarianism. Between the Species, III." },
  { id: "S8",  text: "Mepham, B. (1996). Food Ethics. Routledge." },
  { id: "S9",  text: "Scarborough, P. et al. (2023). Vegans, vegetarians, fish-eaters and meat-eaters in the UK. Nature Food." },
  { id: "S10", text: "Alcal\u00e1-Santiago, A. et al. (2025). Nutrient adequacy and environmental footprint. Frontiers in Nutrition." },
  { id: "S11", text: "Kaplan, D. (Ed.) (2012). The Philosophy of Food. UC Press." },
  { id: "S12", text: "Adams, C.J. (1991). Ecofeminism and the Eating of Animals. Hypatia, 6(1), 125\u2013145." },
  { id: "S13", text: "Nordgren, A. (2020). What Shall We Eat? J Agric Environ Ethics." },
  { id: "S14", text: "Sebo, J. (2014). A Direct Kantian Duty to Animals. Southern J. Phil., 52(3), 338\u2013358." },
  { id: "S15", text: "Gaard, G. (2017). Critical ecofeminism. In: Critical Ecofeminism." },
  { id: "S16", text: "Kateman, B. (Ed.) (2017). The Reducetarian Solution. TarcherPerigee / Penguin." },
];

const translations = {
  ja: {
    appTitle: "Diet Pallette",
    appSubtitle: "\u3042\u306a\u305f\u306e\u98df\u306e\u54f2\u5b66\u3092\u53ef\u8996\u5316\u3059\u308b",
    disclaimer:
      "\u672c\u30a2\u30d7\u30ea\u3067\u306f\u3001\u52d5\u7269\u611b\u8b77\u306e\u7cbe\u795e\u306b\u57fa\u3065\u304f\u300c\u751f\u304d\u65b9\u300d\u3067\u3042\u308b\u30d3\u30fc\u30ac\u30cb\u30ba\u30e0\u304b\u3089\u3001" +
      "\u74b0\u5883\u3084\u5065\u5eb7\u306b\u914d\u616e\u3057\u305f\u300c\u98df\u7fd2\u6163\u300d\u307e\u3067\u3001\u591a\u69d8\u306a\u30b0\u30e9\u30c7\u30fc\u30b7\u30e7\u30f3\u3092\u53ef\u8996\u5316\u3057\u307e\u3059\u3002" +
      "\u53b3\u5bc6\u306b\u306f\u300c\u601d\u60f3\u300d\u3068\u300c\u7fd2\u6163\u300d\u306f\u7570\u306a\u308b\u3082\u306e\u3067\u3059\u304c\u3001\u3042\u306a\u305f\u306e\u73fe\u5728\u306e\u7acb\u3061\u4f4d\u7f6e\u3092" +
      "\u76f4\u611f\u7684\u306b\u7406\u89e3\u3059\u308b\u305f\u3081\u306e\u6307\u6a19\u3068\u3057\u3066\u3001\u3042\u3048\u3066\u7d71\u5408\u7684\u306a\u30b9\u30b3\u30a2\u3067\u8868\u73fe\u3057\u3066\u3044\u307e\u3059\u3002",
    startQuiz: "\u8a3a\u65ad\u3092\u306f\u3058\u3081\u308b",
    nextQuestion: "\u6b21\u3078",
    prevQuestion: "\u623b\u308b",
    seeResults: "\u7d50\u679c\u3092\u898b\u308b",
    retryQuiz: "\u3082\u3046\u4e00\u5ea6\u3084\u308a\u76f4\u3059",
    questionOf: "\u554f",
    langToggle: "EN",
    resultTitle: "\u3042\u306a\u305f\u306e\u502b\u7406\u7684\u30d7\u30ed\u30d5\u30a1\u30a4\u30eb",
    radarYou: "\u3042\u306a\u305f",
    radarMatch: "\u6bd4\u8f03\u5bfe\u8c61",
    topResultLabel: "\u3042\u306a\u305f\u306b\u6700\u3082\u8fd1\u3044\u98df\u306e\u54f2\u5b66",
    allMatchesLabel: "\u5168\u30d7\u30ed\u30d5\u30a1\u30a4\u30eb\u3068\u306e\u985e\u4f3c\u5ea6",
    compareLabel: "\u30ec\u30fc\u30c0\u30fc\u30c1\u30e3\u30fc\u30c8\u306e\u6bd4\u8f03\u5bfe\u8c61\u3092\u5207\u308a\u66ff\u3048",
    reducetarianTitle: "\u30ea\u30c7\u30e5\u30fc\u30b9\u30bf\u30ea\u30a2\u30f3\u30fb\u30b9\u30b1\u30fc\u30eb",
    reducetarianDesc: "\u3042\u306a\u305f\u306e\u502b\u7406\u7684\u4fa1\u5024\u89b3\u306f\u3001\u52d5\u7269\u6027\u98df\u54c1\u306e\u7d04{score}%\u524a\u6e1b\u3092\u793a\u5506\u3057\u3066\u3044\u307e\u3059",
    envImpactTitle: "\u74b0\u5883\u30a4\u30f3\u30d1\u30af\u30c8\uff08\u63a8\u5b9a\uff09",
    envImpactDesc: "\u3053\u306e\u98df\u751f\u6d3b\u3092\u5b9f\u8df5\u3059\u308b\u3068\u3001\u96d1\u98df\u3068\u6bd4\u8f03\u3057\u3066CO\u2082\u6392\u51fa\u91cf\u3092\u5e74\u9593\u7d04{kg}kg\u524a\u6e1b\u3067\u304d\u307e\u3059",
    suggestionTitle: "\u306f\u3058\u3081\u306e\u4e00\u6b69",
    shareText: "\u7d50\u679c\u3092\u30b7\u30a7\u30a2",
    aboutQuiz: "\u3053\u306e\u8a3a\u65ad\u306b\u3064\u3044\u3066",
    copiedToast: "\u30af\u30ea\u30c3\u30d7\u30dc\u30fc\u30c9\u306b\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f\uff01",
    dimensions: {
      D1: "\u529f\u5229\u4e3b\u7fa9",
      D2: "\u6a29\u5229\u8ad6",
      D3: "\u5fb3\u502b\u7406\u5b66",
      D4: "\u30b1\u30a2\u502b\u7406",
      D5: "\u74b0\u5883\u502b\u7406",
      D6: "\u793e\u4f1a\u7684\u8cac\u4efb",
      D7: "\u884c\u52d5\u5909\u5bb9",
    },
    dimensionInsights: {
      D1: "あなたは行動の結果がもたらす幸福と苦痛の総量を重視しています。より多くの存在の利益を考慮した判断を自然に行う傾向があります。",
      D2: "あなたは存在の固有の権利を大切にしています。知能や種に関わらず、すべての意識ある存在の権利を尊重する価値観を持っています。",
      D3: "あなたは日々の行動が人格を形成するという考えを重視しています。食の選択も含め、品性ある生き方を意識する傾向があります。",
      D4: "あなたは他の存在への共感と関係性を大切にしています。苦しみに対する感受性が高く、ケアの倫理に基づいた判断をする傾向があります。",
      D5: "あなたは生態系や環境の固有の価値を認めています。人間だけでなく地球全体の健全性を考慮した選択を重視しています。",
      D6: "あなたは食の選択を公共的な問題として捉えています。個人の行動が社会全体に及ぼす影響を意識する傾向があります。",
      D7: "あなたは倫理的な考えを実際の行動に移す意欲が高い傾向があります。情報に基づいて食生活を見直す柔軟性を持っています。",
    },
    subtypes: {
      rights: { name: "権利擁護型", desc: "動物の固有の権利を重視し、すべての意識ある存在の尊厳を守ることを食の選択の核としています。" },
      utilitarian: { name: "功利的提唱型", desc: "苦痛の総量を最小化するという観点からヴィーガニズムを選択。社会的影響力も意識しています。" },
      ecological: { name: "環境倫理型", desc: "生態系と地球環境への配慮が主な動機。環境負荷の最小化を重視した食の選択です。" },
      compassion: { name: "共感型", desc: "動物への深い共感と感情的つながりに基づいて、直接的な殺傷を避ける食の選択をしています。" },
      environmental: { name: "環境・健康型", desc: "環境への影響と合理的判断に基づいた実践的なアプローチ。健康と環境のバランスを重視しています。" },
      strategic: { name: "戦略型", desc: "社会全体のインパクトを最大化するために、多くの人が実践可能なアプローチを選択。段階的な変化の力を信じています。" },
      virtue: { name: "徳実践型", desc: "「完璧でなくても、より良い選択を積み重ねる」という姿勢。日々の実践が品性を形作ると考えています。" },
      starter: { name: "入門型", desc: "食の倫理について考え始めたばかりの段階。これからの探求と成長の可能性に満ちています。" },
      reflective: { name: "内省型", desc: "倫理的な問いに対する意識はありつつも、現在のライフスタイルを維持することを選択。自己認識が高い傾向があります。" },
      autonomy: { name: "自律重視型", desc: "食の選択は個人の自由であるという価値観を大切にしています。外部からの制約よりも自分自身の判断を重視します。" },
    },
    dimensionInsightsTitle: "あなたの価値観の特徴",
    dietaryPhilosophiesTitle: "あなたのプロファイルに近い食の哲学",
    compareButton: "比較する",
    comparingButton: "比較中",
    profileSuggestions: {
      highAction: "あなたの行動変容意欲の高さを活かして、まずは週に1〜2日、植物性中心の食事を試してみましょう。",
      highRights: "あなたの権利意識に基づいて、動物福祉に配慮した製品を選ぶところから始めてみましょう。",
      highEco: "あなたの環境意識を活かして、環境負荷の低い食材を意識的に選んでみましょう。",
      highCare: "あなたの共感力を大切にしながら、身近なところから食の選択を見直してみましょう。",
      general: "あなたの倫理的プロファイルに基づいて、無理のない範囲で食の選択を見直してみましょう。",
    },
    categories: {
      vegan: "\u30d3\u30fc\u30ac\u30f3",
      vegetarian: "\u30d9\u30b8\u30bf\u30ea\u30a2\u30f3",
      reducetarian: "\u30ea\u30c7\u30e5\u30fc\u30b9\u30bf\u30ea\u30a2\u30f3",
      consciousOmnivore: "\u610f\u8b58\u7684\u30aa\u30e0\u30cb\u30dc\u30a2",
    },
    categoryDescriptions: {
      vegan:
        "\u52d5\u7269\u7531\u6765\u306e\u98df\u54c1\u30fb\u88fd\u54c1\u3092\u4e00\u5207\u4f7f\u7528\u3057\u306a\u3044\u751f\u304d\u65b9\u3002\u52d5\u7269\u306e\u6a29\u5229\u3092\u91cd\u8996\u3059\u308b\u601d\u60f3\u306b\u57fa\u3065\u304f\u3002",
      vegetarian:
        "\u8089\u3084\u9b5a\u3092\u907f\u3051\u3001\u690d\u7269\u6027\u98df\u54c1\u3092\u4e2d\u5fc3\u3068\u3057\u305f\u98df\u4e8b\u30b9\u30bf\u30a4\u30eb\u3002\u4e73\u88fd\u54c1\u3084\u5375\u3001\u9b5a\u4ecb\u985e\u306e\u6442\u53d6\u306f\u500b\u4eba\u306e\u5224\u65ad\u306b\u59d4\u306d\u3089\u308c\u308b\u3002",
      reducetarian:
        "\u610f\u8b58\u7684\u306b\u52d5\u7269\u6027\u98df\u54c1\u3092\u6e1b\u3089\u3057\u3001\u690d\u7269\u6027\u306e\u98df\u4e8b\u3092\u7a4d\u6975\u7684\u306b\u53d6\u308a\u5165\u308c\u308b\u30b9\u30bf\u30a4\u30eb\u3002\u300c\u5b8c\u74a7\u3067\u306a\u304f\u3066\u3082\u3001\u3088\u308a\u826f\u3044\u9078\u629e\u3092\u7a4d\u307f\u91cd\u306d\u308b\u300d\u3068\u3044\u3046\u54f2\u5b66\u3002",
      consciousOmnivore:
        "\u7279\u5b9a\u306e\u5236\u9650\u306f\u306a\u3044\u304c\u3001\u98df\u306e\u9078\u629e\u306b\u610f\u8b58\u3092\u5411\u3051\u3066\u3044\u308b\u30b9\u30bf\u30a4\u30eb\u3002",
    },
    suggestions: {
      vegan:
        "\u3042\u306a\u305f\u306e\u502b\u7406\u7684\u4fa1\u5024\u89b3\u306f\u9ad8\u3044\u4e00\u8cab\u6027\u3092\u793a\u3057\u3066\u3044\u307e\u3059\u3002\u690d\u7269\u6027\u306e\u98df\u4e8b\u3092\u57fa\u672c\u3068\u3057\u3001\u52d5\u7269\u7531\u6765\u306e\u88fd\u54c1\u5168\u822c\u3092\u898b\u76f4\u3057\u3066\u307f\u307e\u3057\u3087\u3046\u3002",
      vegetarian:
        "\u8089\u3084\u9b5a\u3092\u907f\u3051\u3001\u690d\u7269\u6027\u98df\u54c1\u3092\u4e2d\u5fc3\u3068\u3057\u305f\u98df\u4e8b\u3092\u8a66\u3057\u3066\u307f\u307e\u3057\u3087\u3046\u3002",
      reducetarian:
        "\u9031\u306b3\u301c4\u65e5\u3001\u8089\u3092\u4f7f\u308f\u306a\u3044\u98df\u4e8b\u3092\u53d6\u308a\u5165\u308c\u3066\u307f\u307e\u3057\u3087\u3046\u3002",
      consciousOmnivore:
        "\u98df\u6750\u306e\u7523\u5730\u3084\u751f\u7523\u65b9\u6cd5\u306b\u610f\u8b58\u3092\u5411\u3051\u3001\u5c11\u3057\u305a\u3064\u690d\u7269\u6027\u98df\u54c1\u3092\u5897\u3084\u3057\u3066\u307f\u307e\u3057\u3087\u3046\u3002",
    },
    references: {
      pageTitle: "\u3053\u306e\u8a3a\u65ad\u306b\u3064\u3044\u3066",
      introText:
        "\u672c\u30a2\u30d7\u30ea\u306f\u30016\u3064\u306e\u502b\u7406\u7684\u4f1d\u7d71\u3068\u5b9f\u8a3c\u7814\u7a76\u3001\u305d\u3057\u3066\u30ea\u30c7\u30e5\u30fc\u30b9\u30bf\u30ea\u30a2\u30f3\u54f2\u5b66\u3092\u57fa\u76e4\u3068\u3057\u305f16\u4ef6\u306e\u5b66\u8853\u7684\u30fb\u79d1\u5b66\u7684\u6587\u732e\u306b\u57fa\u3065\u3044\u3066\u8a2d\u8a08\u3055\u308c\u3066\u3044\u307e\u3059\u3002",
      frameworksTitle: "7\u3064\u306e\u502b\u7406\u7684\u67a0\u7d44\u307f",
      frameworks: [
        { name: "\u529f\u5229\u4e3b\u7fa9", author: "Peter Singer",
          desc: "\u884c\u52d5\u306e\u6b63\u3057\u3055\u3092\u7d50\u679c\u304c\u3082\u305f\u3089\u3059\u5e78\u798f\u3068\u82e6\u75db\u306e\u7dcf\u91cf\u3067\u5224\u65ad\u3002\u52d5\u7269\u306e\u82e6\u75db\u3082\u5e73\u7b49\u306b\u8003\u616e\u3059\u3079\u304d\u3068\u4e3b\u5f35\u3002" },
        { name: "\u7fa9\u52d9\u8ad6\uff0f\u6a29\u5229\u8ad6", author: "Tom Regan, Immanuel Kant",
          desc: "\u52d5\u7269\u304c\u300c\u751f\u306e\u4e3b\u4f53\u300d\u3068\u3057\u3066\u56fa\u6709\u306e\u4fa1\u5024\u3092\u6301\u3064\u3068\u4e3b\u5f35\u3002\u52d5\u7269\u306f\u4eba\u9593\u306e\u76ee\u7684\u306e\u305f\u3081\u306e\u624b\u6bb5\u3068\u3057\u3066\u6271\u308f\u308c\u3066\u306f\u306a\u3089\u306a\u3044\u3002" },
        { name: "\u5fb3\u502b\u7406\u5b66", author: "Aristotle",
          desc: "\u300c\u3069\u306e\u3088\u3046\u306a\u4eba\u9593\u306b\u306a\u308b\u3079\u304d\u304b\u300d\u3092\u554f\u3046\u3002\u65e5\u3005\u306e\u98df\u306e\u9078\u629e\u304c\u54c1\u6027\u3092\u5f62\u6210\u3059\u308b\u3002" },
        { name: "\u30b1\u30a2\u502b\u7406\uff0f\u30a8\u30b3\u30d5\u30a7\u30df\u30cb\u30ba\u30e0", author: "Deane Curtin, Carol J. Adams, Greta Gaard",
          desc: "\u95a2\u4fc2\u6027\u3068\u5171\u611f\u3092\u91cd\u8996\u3002\u6587\u5316\u7684\u6587\u8108\u3092\u8003\u616e\u3057\u305f\u9053\u5fb3\u7684\u83dc\u98df\u4e3b\u7fa9\u3092\u63d0\u5531\u3002" },
        { name: "\u74b0\u5883\u502b\u7406\uff0f\u571f\u5730\u502b\u7406", author: "Aldo Leopold",
          desc: "\u751f\u614b\u7cfb\u5168\u4f53\u306e\u5b8c\u5168\u6027\u30fb\u5b89\u5b9a\u6027\u30fb\u7f8e\u306e\u4fdd\u5168\u3092\u91cd\u8996\u3002\u4eba\u9593\u3092\u751f\u614b\u7cfb\u306e\u300c\u5e73\u51e1\u306a\u4e00\u54e1\u300d\u3068\u4f4d\u7f6e\u3065\u3051\u308b\u3002" },
        { name: "\u60d1\u661f\u5065\u5eb7\u30a2\u30d7\u30ed\u30fc\u30c1", author: "EAT\u2013Lancet Commission",
          desc: "37\u540d\u306e\u79d1\u5b66\u8005\u306b\u3088\u308b\u5b66\u969b\u7684\u59d4\u54e1\u4f1a\u3002\u4eba\u9593\u306e\u5065\u5eb7\u3068\u60d1\u661f\u306e\u5065\u5eb7\u306e\u4e21\u7acb\u3092\u76ee\u6307\u3059\u3002" },
        { name: "\u30ea\u30c7\u30e5\u30fc\u30b9\u30bf\u30ea\u30a2\u30cb\u30ba\u30e0", author: "Brian Kateman",
          desc: "\u300call-or-nothing\u300d\u3092\u5426\u5b9a\u3002\u5404\u500b\u4eba\u304c\u73fe\u72b6\u304b\u3089\u3069\u308c\u3060\u3051\u52d5\u7269\u6027\u98df\u54c1\u3092\u524a\u6e1b\u3067\u304d\u308b\u304b\u306b\u6ce8\u76ee\u3059\u308b\u3002" },
      ],
      sourcesTitle: "\u53c2\u8003\u6587\u732e\u4e00\u89a7",
      methodTitle: "\u6e2c\u5b9a\u65b9\u6cd5",
      methodText:
        "12\u306e\u8cea\u554f\u304c7\u3064\u306e\u502b\u7406\u7684\u6b21\u5143\uff08\u529f\u5229\u4e3b\u7fa9\u3001\u6a29\u5229\u8ad6\u3001\u5fb3\u502b\u7406\u5b66\u3001\u30b1\u30a2\u502b\u7406\u3001\u74b0\u5883\u502b\u7406\u3001\u793e\u4f1a\u7684\u8cac\u4efb\u3001\u884c\u52d5\u5909\u5bb9\uff09\u3092\u6e2c\u5b9a\u3057\u307e\u3059\u3002" +
        "\u3042\u306a\u305f\u306e\u56de\u7b54\u306f7\u6b21\u5143\u7a7a\u9593\u4e0a\u306e\u30d9\u30af\u30c8\u30eb\u3068\u3057\u3066\u7b97\u51fa\u3055\u308c\u3001\u5404\u98df\u751f\u6d3b\u30d7\u30ed\u30d5\u30a1\u30a4\u30eb\u3068\u306e\u30e6\u30fc\u30af\u30ea\u30c3\u30c9\u8ddd\u96e2\u306b\u57fa\u3065\u304f\u30ac\u30a6\u30b9\u985e\u4f3c\u5ea6\u3092\u8a08\u7b97\u3057\u307e\u3059\u3002" +
        "\u5358\u4e00\u30b9\u30b3\u30a2\u3067\u306f\u306a\u304f\u591a\u6b21\u5143\u7684\u306b\u8a55\u4fa1\u3059\u308b\u3053\u3068\u3067\u3001\u77db\u76fe\u3059\u308b\u4fa1\u5024\u89b3\u3082\u6b63\u78ba\u306b\u8868\u73fe\u3067\u304d\u307e\u3059\u3002",
      backToResults: "\u7d50\u679c\u306b\u623b\u308b",
    },
  },
  en: {
    appTitle: "Diet Pallette",
    appSubtitle: "Visualize Your Dietary Philosophy",
    disclaimer:
      "This app visualizes a diverse gradient from veganism\u2014a way of living " +
      "rooted in animal welfare\u2014to dietary habits that consider the environment " +
      "and health. While 'philosophy' and 'habits' are strictly different concepts, " +
      "we intentionally present an integrated score as an intuitive indicator to " +
      "help you understand where you currently stand.",
    startQuiz: "Start Quiz",
    nextQuestion: "Next",
    prevQuestion: "Back",
    seeResults: "See Results",
    retryQuiz: "Try Again",
    questionOf: "Q",
    langToggle: "\u65e5\u672c\u8a9e",
    resultTitle: "Your Ethical Profile",
    radarYou: "You",
    radarMatch: "Compared",
    topResultLabel: "Your closest dietary philosophy",
    allMatchesLabel: "Similarity with all profiles",
    compareLabel: "Switch radar chart comparison",
    reducetarianTitle: "Reducetarian Scale",
    reducetarianDesc: "Your ethical values suggest reducing approximately {score}% of animal products",
    envImpactTitle: "Environmental Impact (Est.)",
    envImpactDesc: "Practicing this diet could reduce CO\u2082 emissions by approx. {kg}kg/year vs. omnivore baseline",
    suggestionTitle: "Your First Step",
    shareText: "Share Results",
    aboutQuiz: "About This Quiz",
    copiedToast: "Copied to clipboard!",
    dimensions: {
      D1: "Utilitarian",
      D2: "Rights",
      D3: "Virtue",
      D4: "Care",
      D5: "Ecological",
      D6: "Social",
      D7: "Action",
    },
    dimensionInsights: {
      D1: "You value the total balance of happiness and suffering that actions produce. You naturally tend to consider the interests of the many in your decisions.",
      D2: "You value the inherent rights of sentient beings. Regardless of intelligence or species, you respect the dignity of all conscious beings.",
      D3: "You believe that everyday actions shape character. You tend to be mindful of living with integrity, including through food choices.",
      D4: "You value empathy and relationships with other beings. You have high sensitivity to suffering and tend to make care-based ethical judgments.",
      D5: "You recognize the intrinsic value of ecosystems and the environment. You prioritize choices that consider the health of the entire planet.",
      D6: "You see food choices as a public issue. You tend to be aware of how individual actions affect society as a whole.",
      D7: "You have a strong willingness to translate ethical thinking into action. You possess the flexibility to reconsider your diet based on new information.",
    },
    subtypes: {
      rights: { name: "Rights Advocate", desc: "You prioritize the inherent rights of animals, centering your food choices on protecting the dignity of all sentient beings." },
      utilitarian: { name: "Utilitarian Advocate", desc: "You choose veganism from a perspective of minimizing total suffering, while also being conscious of social influence." },
      ecological: { name: "Eco-Vegan", desc: "Your primary motivation is concern for ecosystems and the planet. You prioritize minimizing environmental impact through food choices." },
      compassion: { name: "Compassion Type", desc: "Your food choices are driven by deep empathy and emotional connection with animals, avoiding direct harm." },
      environmental: { name: "Eco-Health Type", desc: "A practical approach based on environmental impact and rational judgment, balancing health and ecological concerns." },
      strategic: { name: "Strategic Type", desc: "You choose an accessible approach to maximize collective social impact. You believe in the power of gradual, widespread change." },
      virtue: { name: "Virtue Practitioner", desc: "Your approach is 'better choices, even if not perfect.' You believe daily practice shapes character over time." },
      starter: { name: "Starter Type", desc: "You are just beginning to explore the ethics of food. Full of potential for discovery and growth ahead." },
      reflective: { name: "Reflective Type", desc: "You are ethically aware but currently choosing to maintain your lifestyle. You tend toward high self-awareness." },
      autonomy: { name: "Autonomy Type", desc: "You value food choice as personal freedom. You prioritize your own judgment over external expectations." },
    },
    dimensionInsightsTitle: "Your Value Characteristics",
    dietaryPhilosophiesTitle: "Dietary Philosophies Related to Your Profile",
    compareButton: "Compare",
    comparingButton: "Comparing",
    profileSuggestions: {
      highAction: "Leverage your high willingness to act — try plant-centered meals 1-2 days per week to start.",
      highRights: "Based on your strong rights awareness, start by choosing products that consider animal welfare.",
      highEco: "Use your environmental consciousness to make mindful choices about lower-impact ingredients.",
      highCare: "Honor your empathy by reconsidering food choices in your immediate daily life.",
      general: "Based on your ethical profile, explore food choices that feel right at your own pace.",
    },
    categories: {
      vegan: "Vegan",
      vegetarian: "Vegetarian",
      reducetarian: "Reducetarian",
      consciousOmnivore: "Conscious Omnivore",
    },
    categoryDescriptions: {
      vegan:
        "A lifestyle that avoids all animal-derived foods and products, based on the philosophy of animal rights.",
      vegetarian:
        "A diet centered on plant-based foods, avoiding meat. Dairy, eggs, and fish consumption is left to individual judgment.",
      reducetarian:
        "A style that consciously reduces animal products and actively incorporates plant-based meals. The philosophy of \u201cmaking better choices, even if not perfect.\u201d",
      consciousOmnivore:
        "No specific restrictions, but mindful attention to food choices and their impact.",
    },
    suggestions: {
      vegan:
        "Your ethical values show high consistency. Consider a fully plant-based diet and review animal-derived products across all areas of life.",
      vegetarian:
        "Try a diet centered on plant-based foods, reducing meat and fish consumption.",
      reducetarian:
        "Try going meat-free 3\u20134 days per week.",
      consciousOmnivore:
        "Pay attention to where your food comes from and gradually increase plant-based options.",
    },
    references: {
      pageTitle: "About This Quiz",
      introText:
        "This app is designed based on 16 academic and scientific publications spanning 6 ethical traditions, empirical research, and Reducetarian philosophy.",
      frameworksTitle: "7 Ethical Frameworks",
      frameworks: [
        { name: "Utilitarianism", author: "Peter Singer",
          desc: "Judges the rightness of actions by the total happiness and suffering they produce. Argues that animal suffering should be given equal consideration." },
        { name: "Deontology / Rights Theory", author: "Tom Regan, Immanuel Kant",
          desc: "Claims animals have inherent value as \u201csubjects-of-a-life.\u201d Animals must not be treated merely as means to human ends." },
        { name: "Virtue Ethics", author: "Aristotle",
          desc: "Asks \u201cwhat kind of person should one be?\u201d Daily food choices shape one\u2019s character and moral quality." },
        { name: "Care Ethics / Ecofeminism", author: "Deane Curtin, Carol J. Adams, Greta Gaard",
          desc: "Emphasizes relationships and empathy. Advocates contextual moral vegetarianism that considers cultural context." },
        { name: "Environmental Ethics / Land Ethic", author: "Aldo Leopold",
          desc: "Values the integrity, stability, and beauty of the entire ecosystem. Positions humans as \u201cplain members\u201d of the biotic community." },
        { name: "Planetary Health Approach", author: "EAT\u2013Lancet Commission",
          desc: "An interdisciplinary committee of 37 scientists. Aims to achieve both human health and planetary health simultaneously." },
        { name: "Reducetarianism", author: "Brian Kateman",
          desc: "Rejects \u201call-or-nothing\u201d thinking. Focuses on how much each individual can reduce animal product consumption from their current level." },
      ],
      sourcesTitle: "References",
      methodTitle: "Methodology",
      methodText:
        "12 questions measure 7 ethical dimensions (Utilitarianism, Rights, Virtue Ethics, Care Ethics, Environmental Ethics, Social Responsibility, Behavioral Change). " +
        "Your answers are computed as a vector in 7-dimensional space, and Gaussian similarity based on Euclidean distance is calculated against each dietary profile. " +
        "By evaluating multi-dimensionally rather than with a single score, even contradictory values can be accurately represented.",
      backToResults: "Back to Results",
    },
  },
};

let currentLang = "ja";

function t(key) {
  const keys = key.split(".");
  let value = translations[currentLang];
  for (const k of keys) {
    if (value === undefined) return key;
    value = value[k];
  }
  return value || key;
}

function setLang(lang) {
  currentLang = lang;
}

function getLang() {
  return currentLang;
}

function toggleLang() {
  currentLang = currentLang === "ja" ? "en" : "ja";
  return currentLang;
}
