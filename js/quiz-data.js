const quizQuestions = [
  {
    id: 1,
    question: {
      ja: "肉（牛・豚・鶏など）をどのくらいの頻度で食べますか？",
      en: "How often do you eat meat (beef, pork, chicken, etc.)?",
    },
    options: [
      {
        text: { ja: "ほぼ毎日", en: "Almost every day" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 1, flexitarian: 1, omnivore: 5 },
      },
      {
        text: { ja: "週に数回", en: "Several times a week" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 1, flexitarian: 3, omnivore: 3 },
      },
      {
        text: { ja: "月に数回程度", en: "A few times a month" },
        scores: { vegan: 1, vegetarian: 2, pescatarian: 2, flexitarian: 5, omnivore: 1 },
      },
      {
        text: { ja: "全く食べない", en: "Never" },
        scores: { vegan: 5, vegetarian: 5, pescatarian: 3, flexitarian: 0, omnivore: 0 },
      },
    ],
  },
  {
    id: 2,
    question: {
      ja: "乳製品（牛乳・チーズ・ヨーグルトなど）を摂りますか？",
      en: "Do you consume dairy products (milk, cheese, yogurt, etc.)?",
    },
    options: [
      {
        text: { ja: "はい、日常的に摂ります", en: "Yes, regularly" },
        scores: { vegan: 0, vegetarian: 3, pescatarian: 3, flexitarian: 2, omnivore: 4 },
      },
      {
        text: { ja: "時々摂ります", en: "Sometimes" },
        scores: { vegan: 1, vegetarian: 2, pescatarian: 2, flexitarian: 4, omnivore: 2 },
      },
      {
        text: { ja: "ほとんど摂らない", en: "Rarely" },
        scores: { vegan: 4, vegetarian: 1, pescatarian: 1, flexitarian: 2, omnivore: 0 },
      },
      {
        text: { ja: "全く摂らない", en: "Never" },
        scores: { vegan: 5, vegetarian: 0, pescatarian: 0, flexitarian: 0, omnivore: 0 },
      },
    ],
  },
  {
    id: 3,
    question: {
      ja: "魚介類についてはどうですか？",
      en: "What about fish and seafood?",
    },
    options: [
      {
        text: { ja: "よく食べる", en: "I eat it regularly" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 5, flexitarian: 2, omnivore: 4 },
      },
      {
        text: { ja: "時々食べる", en: "Sometimes" },
        scores: { vegan: 0, vegetarian: 1, pescatarian: 3, flexitarian: 4, omnivore: 2 },
      },
      {
        text: { ja: "ほとんど食べない", en: "Rarely" },
        scores: { vegan: 3, vegetarian: 3, pescatarian: 1, flexitarian: 2, omnivore: 1 },
      },
      {
        text: { ja: "全く食べない", en: "Never" },
        scores: { vegan: 5, vegetarian: 4, pescatarian: 0, flexitarian: 0, omnivore: 0 },
      },
    ],
  },
  {
    id: 4,
    question: {
      ja: "食事の選択における主な動機は何ですか？",
      en: "What is your primary motivation for your dietary choices?",
    },
    options: [
      {
        text: { ja: "特に意識していない・味の好み", en: "No particular reason / taste preference" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 1, flexitarian: 1, omnivore: 5 },
      },
      {
        text: { ja: "健康のため", en: "For health reasons" },
        scores: { vegan: 1, vegetarian: 2, pescatarian: 3, flexitarian: 4, omnivore: 1 },
      },
      {
        text: { ja: "環境への配慮", en: "Environmental concerns" },
        scores: { vegan: 3, vegetarian: 3, pescatarian: 2, flexitarian: 3, omnivore: 0 },
      },
      {
        text: { ja: "動物の権利・福祉のため", en: "For animal rights / welfare" },
        scores: { vegan: 5, vegetarian: 4, pescatarian: 1, flexitarian: 1, omnivore: 0 },
      },
    ],
  },
  {
    id: 5,
    question: {
      ja: "畜産業についてどう感じますか？",
      en: "How do you feel about animal farming?",
    },
    options: [
      {
        text: { ja: "必要なもので問題ない", en: "It's necessary and I have no issues with it" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 1, flexitarian: 1, omnivore: 5 },
      },
      {
        text: { ja: "問題はあるが仕方ない", en: "There are issues, but it's unavoidable" },
        scores: { vegan: 0, vegetarian: 1, pescatarian: 2, flexitarian: 4, omnivore: 2 },
      },
      {
        text: { ja: "なるべく依存を減らしたい", en: "I want to reduce reliance on it" },
        scores: { vegan: 2, vegetarian: 4, pescatarian: 2, flexitarian: 3, omnivore: 0 },
      },
      {
        text: { ja: "根本的に反対している", en: "I fundamentally oppose it" },
        scores: { vegan: 5, vegetarian: 3, pescatarian: 0, flexitarian: 0, omnivore: 0 },
      },
    ],
  },
  {
    id: 6,
    question: {
      ja: "外食時、どのようなメニューを選びますか？",
      en: "When eating out, what do you typically choose?",
    },
    options: [
      {
        text: { ja: "好きなものを自由に選ぶ", en: "Whatever I feel like" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 1, flexitarian: 1, omnivore: 5 },
      },
      {
        text: { ja: "なるべく植物性メニューを選ぶ", en: "I try to choose plant-based options" },
        scores: { vegan: 2, vegetarian: 2, pescatarian: 1, flexitarian: 5, omnivore: 0 },
      },
      {
        text: { ja: "魚介中心のメニューを選ぶ", en: "I mainly choose fish/seafood dishes" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 5, flexitarian: 2, omnivore: 1 },
      },
      {
        text: { ja: "必ずベジタリアン・ビーガンメニューを選ぶ", en: "Always vegetarian/vegan options" },
        scores: { vegan: 5, vegetarian: 4, pescatarian: 0, flexitarian: 0, omnivore: 0 },
      },
    ],
  },
  {
    id: 7,
    question: {
      ja: "食品の原材料表示で動物由来の成分を確認しますか？",
      en: "Do you check food labels for animal-derived ingredients?",
    },
    options: [
      {
        text: { ja: "全くしない", en: "Never" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 0, flexitarian: 1, omnivore: 5 },
      },
      {
        text: { ja: "アレルギーなど必要な時だけ", en: "Only when necessary (allergies, etc.)" },
        scores: { vegan: 0, vegetarian: 1, pescatarian: 1, flexitarian: 3, omnivore: 3 },
      },
      {
        text: { ja: "よく確認する", en: "I often check" },
        scores: { vegan: 3, vegetarian: 4, pescatarian: 2, flexitarian: 2, omnivore: 0 },
      },
      {
        text: { ja: "常に全ての製品で確認する", en: "Always, for every product" },
        scores: { vegan: 5, vegetarian: 3, pescatarian: 1, flexitarian: 0, omnivore: 0 },
      },
    ],
  },
  {
    id: 8,
    question: {
      ja: "革・ウール・シルクなど動物由来の素材についてどう思いますか？",
      en: "How do you feel about animal-derived materials (leather, wool, silk)?",
    },
    options: [
      {
        text: { ja: "問題ないと思う", en: "I have no issues with them" },
        scores: { vegan: 0, vegetarian: 1, pescatarian: 2, flexitarian: 2, omnivore: 5 },
      },
      {
        text: { ja: "代替品があればそちらを選ぶ", en: "I prefer alternatives when available" },
        scores: { vegan: 2, vegetarian: 2, pescatarian: 2, flexitarian: 4, omnivore: 1 },
      },
      {
        text: { ja: "積極的に避けている", en: "I actively avoid them" },
        scores: { vegan: 4, vegetarian: 2, pescatarian: 1, flexitarian: 1, omnivore: 0 },
      },
      {
        text: { ja: "一切使用しない", en: "I never use them" },
        scores: { vegan: 5, vegetarian: 1, pescatarian: 0, flexitarian: 0, omnivore: 0 },
      },
    ],
  },
  {
    id: 9,
    question: {
      ja: "他の人に食事の変更を勧めることはありますか？",
      en: "Do you encourage others to change their diet?",
    },
    options: [
      {
        text: { ja: "いいえ、個人の自由だと思う", en: "No, it's a personal choice" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 1, flexitarian: 2, omnivore: 4 },
      },
      {
        text: { ja: "聞かれたら情報を共有する", en: "I share information if asked" },
        scores: { vegan: 1, vegetarian: 2, pescatarian: 2, flexitarian: 4, omnivore: 1 },
      },
      {
        text: { ja: "やんわりと提案することがある", en: "I gently suggest it sometimes" },
        scores: { vegan: 3, vegetarian: 3, pescatarian: 2, flexitarian: 2, omnivore: 0 },
      },
      {
        text: { ja: "積極的に提唱している", en: "I actively advocate for it" },
        scores: { vegan: 5, vegetarian: 3, pescatarian: 1, flexitarian: 0, omnivore: 0 },
      },
    ],
  },
  {
    id: 10,
    question: {
      ja: "あなたが理想とする食のシステムはどれですか？",
      en: "What is your ideal future food system?",
    },
    options: [
      {
        text: { ja: "現状のままで良い", en: "The current system is fine" },
        scores: { vegan: 0, vegetarian: 0, pescatarian: 1, flexitarian: 0, omnivore: 5 },
      },
      {
        text: { ja: "より持続可能な選択肢が増えると良い", en: "More sustainable options would be nice" },
        scores: { vegan: 1, vegetarian: 1, pescatarian: 2, flexitarian: 5, omnivore: 1 },
      },
      {
        text: {
          ja: "植物性中心で、少量の動物性食品を許容",
          en: "Mostly plant-based with minimal animal products",
        },
        scores: { vegan: 2, vegetarian: 4, pescatarian: 2, flexitarian: 3, omnivore: 0 },
      },
      {
        text: { ja: "完全に動物性食品を使わない社会", en: "A completely animal-free society" },
        scores: { vegan: 5, vegetarian: 2, pescatarian: 0, flexitarian: 0, omnivore: 0 },
      },
    ],
  },
];

function calculateResults(answers) {
  const totals = { vegan: 0, vegetarian: 0, pescatarian: 0, flexitarian: 0, omnivore: 0 };

  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null || answerIndex === undefined) return;
    const scores = quizQuestions[questionIndex].options[answerIndex].scores;
    for (const key in scores) {
      totals[key] += scores[key];
    }
  });

  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  if (sum === 0) {
    return { vegan: 20, vegetarian: 20, pescatarian: 20, flexitarian: 20, omnivore: 20 };
  }

  const percentages = {};
  for (const key in totals) {
    percentages[key] = Math.round((totals[key] / sum) * 100);
  }

  // Adjust rounding to ensure sum equals 100
  const percentSum = Object.values(percentages).reduce((a, b) => a + b, 0);
  if (percentSum !== 100) {
    const maxKey = Object.keys(percentages).reduce((a, b) =>
      percentages[a] > percentages[b] ? a : b
    );
    percentages[maxKey] += 100 - percentSum;
  }

  return percentages;
}
