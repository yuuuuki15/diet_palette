const translations = {
  ja: {
    appTitle: "Diet Pallette",
    appSubtitle: "あなたの食の哲学を可視化する",
    disclaimer:
      "本アプリでは、動物愛護の精神に基づく「生き方」であるビーガニズムから、" +
      "環境や健康に配慮した「食習慣」まで、多様なグラデーションを可視化します。" +
      "厳密には「思想」と「習慣」は異なるものですが、あなたの現在の立ち位置を" +
      "直感的に理解するための指標として、あえて統合的なスコアで表現しています。",
    startQuiz: "診断をはじめる",
    nextQuestion: "次へ",
    prevQuestion: "戻る",
    seeResults: "結果を見る",
    resultTitle: "あなたの食の哲学",
    retryQuiz: "もう一度やり直す",
    questionOf: "問",
    langToggle: "EN",
    categories: {
      vegan: "ビーガン",
      vegetarian: "ベジタリアン",
      pescatarian: "ペスカタリアン",
      flexitarian: "フレキシタリアン",
      omnivore: "オムニボア",
    },
    categoryDescriptions: {
      vegan:
        "動物由来の食品・製品を一切使用しない生き方。動物の権利を重視する思想に基づく。",
      vegetarian:
        "肉や魚は食べないが、乳製品や卵は摂取する食事スタイル。",
      pescatarian:
        "肉は食べないが、魚介類・乳製品・卵は摂取する食事スタイル。",
      flexitarian:
        "基本は植物性中心だが、状況に応じて柔軟に動物性食品も摂る食事スタイル。",
      omnivore:
        "特に制限なく、植物性・動物性の両方をバランスよく摂取する食事スタイル。",
    },
    topResultLabel: "あなたに最も近い食の哲学",
    shareText: "結果をシェア",
    copiedToast: "クリップボードにコピーしました！",
  },
  en: {
    appTitle: "Diet Pallette",
    appSubtitle: "Visualize Your Dietary Philosophy",
    disclaimer:
      "This app visualizes a diverse gradient from veganism—a way of living " +
      "rooted in animal welfare—to dietary habits that consider the environment " +
      "and health. While 'philosophy' and 'habits' are strictly different concepts, " +
      "we intentionally present an integrated score as an intuitive indicator to " +
      "help you understand where you currently stand.",
    startQuiz: "Start Quiz",
    nextQuestion: "Next",
    prevQuestion: "Back",
    seeResults: "See Results",
    resultTitle: "Your Dietary Philosophy",
    retryQuiz: "Try Again",
    questionOf: "Q",
    langToggle: "日本語",
    categories: {
      vegan: "Vegan",
      vegetarian: "Vegetarian",
      pescatarian: "Pescatarian",
      flexitarian: "Flexitarian",
      omnivore: "Omnivore",
    },
    categoryDescriptions: {
      vegan:
        "A lifestyle that avoids all animal-derived foods and products, based on the philosophy of animal rights.",
      vegetarian:
        "A diet that excludes meat and fish but includes dairy and eggs.",
      pescatarian:
        "A diet that excludes meat but includes fish, seafood, dairy, and eggs.",
      flexitarian:
        "A primarily plant-based diet with occasional flexibility to include animal products.",
      omnivore:
        "A balanced diet that includes both plant-based and animal-based foods without restrictions.",
    },
    topResultLabel: "Your closest dietary philosophy",
    shareText: "Share Results",
    copiedToast: "Copied to clipboard!",
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
