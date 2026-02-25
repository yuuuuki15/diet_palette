const DIMENSIONS = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];

// Max possible positive score for each dimension (used for normalization)
const MAX_POSSIBLE = {
  D1: 8,  // Q1(+3) + Q6(+2) + Q7(+2) + Q8(+1)
  D2: 11, // Q1(+2) + Q2(+3) + Q7(+2) + Q8(+3) + Q11(+1)
  D3: 9,  // Q1(+1) + Q3(+3) + Q6(+1) + Q7(+1) + Q12(+3)
  D4: 7,  // Q2(+1) + Q6(+2) + Q8(+1) + Q11(+3)
  D5: 8,  // Q4(+3) + Q5(+2) + Q9(+2) + Q10(+1)
  D6: 4,  // Q5(+2) + Q10(+2)
  D7: 5,  // Q3(+1) + Q9(+3) + Q12(+1)
};

// 4 dietary profiles in 7D ethical space
// Vegetarian merges former vegetarian + pescatarian profiles
// Reducetarian is a single representative level
const PROFILES = {
  vegan:             { D1: 0.90, D2: 0.95, D3: 0.70, D4: 0.85, D5: 0.85, D6: 0.80, D7: 0.90 },
  vegetarian:        { D1: 0.68, D2: 0.55, D3: 0.60, D4: 0.68, D5: 0.73, D6: 0.60, D7: 0.70 },
  reducetarian:      { D1: 0.55, D2: 0.35, D3: 0.65, D4: 0.55, D5: 0.65, D6: 0.45, D7: 0.50 },
  consciousOmnivore: { D1: 0.25, D2: 0.10, D3: 0.40, D4: 0.30, D5: 0.30, D6: 0.20, D7: 0.25 },
};

// Subtypes within each dietary category based on ethical motivation
const SUBTYPES = {
  vegan: [
    { key: "rights",      triggers: ["D2", "D4"] },
    { key: "utilitarian",  triggers: ["D1", "D6"] },
    { key: "ecological",   triggers: ["D5", "D7"] },
  ],
  vegetarian: [
    { key: "compassion",   triggers: ["D4", "D2"] },
    { key: "environmental", triggers: ["D5", "D1"] },
  ],
  reducetarian: [
    { key: "strategic",    triggers: ["D1", "D6"] },
    { key: "virtue",       triggers: ["D3", "D7"] },
    { key: "starter",      triggers: [] },
  ],
  consciousOmnivore: [
    { key: "reflective",   triggers: ["D3", "D5"] },
    { key: "autonomy",     triggers: [] },
  ],
};

// CO2 data per profile (kg CO2/day, baseline omnivore = 3.8 kg/day)
const CO2_DATA = {
  vegan:             { daily: 2.1, reductionPercent: 45 },
  vegetarian:        { daily: 2.9, reductionPercent: 24 },
  reducetarian:      { daily: 3.3, reductionPercent: 13 },
  consciousOmnivore: { daily: 3.7, reductionPercent: 3 },
};

// 12 Questions — unchanged from design document
const quizQuestions = [
  // Q1: Utilitarian Orientation [S1, S7]
  {
    id: 1,
    question: {
      ja: "あなたの行動の結果、100人の人々が少しずつ幸せになるのと、1人の人が大きな苦痛を受けるのとでは、どちらがより重要ですか？",
      en: "If your actions result in 100 people becoming slightly happier while one person suffers greatly, which matters more?",
    },
    options: [
      {
        text: { ja: "100人の幸福を優先する", en: "Prioritize the happiness of 100 people" },
        scores: { D1: 3 },
      },
      {
        text: { ja: "1人の苦痛回避を優先する", en: "Prioritize preventing the suffering of 1 person" },
        scores: { D2: 2 },
      },
      {
        text: { ja: "状況によると思う", en: "It depends on the situation" },
        scores: { D1: 1, D3: 1 },
      },
    ],
  },
  // Q2: Rights-Based Orientation [S2, S14]
  {
    id: 2,
    question: {
      ja: "意識や感覚を持つ存在には、その知能のレベルに関係なく、侵害されてはならない固有の権利があると思いますか？",
      en: "Do you believe that any being with consciousness and the capacity to feel has inherent rights that should not be violated, regardless of intelligence?",
    },
    options: [
      { text: { ja: "強く同意する", en: "Strongly agree" }, scores: { D2: 3, D4: 1 } },
      { text: { ja: "同意する", en: "Agree" }, scores: { D2: 2 } },
      { text: { ja: "どちらとも言えない", en: "Neither agree nor disagree" }, scores: {} },
      { text: { ja: "同意しない", en: "Disagree" }, scores: { D2: -2 } },
    ],
  },
  // Q3: Virtue Ethics Orientation [S6, S11, S13]
  {
    id: 3,
    question: {
      ja: "「あなたが日常的に行う小さな行動が、あなたの人格や品性を形作る」という考えにどの程度同意しますか？",
      en: "To what extent do you agree that your small, everyday actions shape your character and moral quality?",
    },
    options: [
      { text: { ja: "強く同意する", en: "Strongly agree" }, scores: { D3: 3, D7: 1 } },
      { text: { ja: "同意する", en: "Agree" }, scores: { D3: 2 } },
      { text: { ja: "どちらとも言えない", en: "Neither agree nor disagree" }, scores: {} },
      { text: { ja: "同意しない", en: "Disagree" }, scores: { D3: -2 } },
    ],
  },
  // Q4: Ecocentric Orientation [S4, S5]
  {
    id: 4,
    question: {
      ja: "自然環境や生態系は、人間の利益とは独立して、それ自体に価値があると思いますか？",
      en: "Do you believe that the natural environment and ecosystems have inherent value independent of human benefit?",
    },
    options: [
      { text: { ja: "強く同意する", en: "Strongly agree" }, scores: { D5: 3 } },
      { text: { ja: "同意する", en: "Agree" }, scores: { D5: 2 } },
      { text: { ja: "どちらとも言えない", en: "Neither agree nor disagree" }, scores: {} },
      { text: { ja: "同意しない", en: "Disagree" }, scores: { D5: -2 } },
    ],
  },
  // Q5: Intergenerational Justice [S4, S5, S10]
  {
    id: 5,
    question: {
      ja: "「限りある資源の中で、将来世代のために今の世代が犠牲を払うべきだ」という考えにどの程度同意しますか？",
      en: "To what extent do you agree that the current generation should make sacrifices for the sake of future generations, given limited resources?",
    },
    options: [
      { text: { ja: "強く同意する", en: "Strongly agree" }, scores: { D5: 2, D6: 2 } },
      { text: { ja: "同意する", en: "Agree" }, scores: { D5: 1, D6: 1 } },
      { text: { ja: "どちらとも言えない", en: "Neither agree nor disagree" }, scores: {} },
      { text: { ja: "同意しない", en: "Disagree" }, scores: { D5: -1, D6: -1 } },
    ],
  },
  // Q6: Care Ethics vs Universalism [S3, S12, S15]
  {
    id: 6,
    question: {
      ja: "あなたは「自分と関係のある存在」と「遠くの見知らぬ存在」の苦痛を、同じように重要だと感じますか？",
      en: "Do you feel that the suffering of those close to you and the suffering of distant strangers are equally important?",
    },
    options: [
      { text: { ja: "同じくらい重要だと感じる", en: "I feel they are equally important" }, scores: { D1: 2, D4: 1 } },
      { text: { ja: "関係が近い存在の方が重要", en: "Those closer to me matter more" }, scores: { D4: 2 } },
      { text: { ja: "状況によると思う", en: "It depends on the situation" }, scores: { D4: 1, D3: 1 } },
    ],
  },
  // Q7: Consequentialism vs Deontology [S1, S2, S6, S7]
  {
    id: 7,
    question: {
      ja: "「ある行動が結果的に良い結果をもたらすなら、その行動自体の正しさは問わなくてよい」と思いますか？",
      en: "Do you believe that if an action produces good results, then the rightness of the action itself need not be questioned?",
    },
    options: [
      { text: { ja: "同意する（結果が大切）", en: "Agree (results matter most)" }, scores: { D1: 2 } },
      { text: { ja: "同意しない（行動自体の正しさが大切）", en: "Disagree (the action itself must be right)" }, scores: { D2: 2, D3: 1 } },
      { text: { ja: "どちらとも言えない", en: "Neither agree nor disagree" }, scores: { D1: 1, D2: 1 } },
    ],
  },
  // Q8: Anthropocentrism Scale [S1, S2, S4, S6]
  {
    id: 8,
    question: {
      ja: "人間の健康上の利益と動物の福祉が矛盾する場合、どちらを優先しますか？",
      en: "When human health benefits conflict with animal welfare, which do you prioritize?",
    },
    options: [
      { text: { ja: "常に人間を優先する", en: "Always prioritize humans" }, scores: { D2: -2 } },
      { text: { ja: "通常は人間を優先する", en: "Usually prioritize humans" }, scores: { D2: -1 } },
      { text: { ja: "状況に応じて判断する", en: "Judge on a case-by-case basis" }, scores: { D2: 1, D1: 1 } },
      { text: { ja: "動物の福祉も同等に考慮する", en: "Consider animal welfare equally" }, scores: { D2: 3, D4: 1 } },
    ],
  },
  // Q9: Environmental Action Readiness [S5, S9, S10, S16]
  {
    id: 9,
    question: {
      ja: "食料生産が気候変動の主要因の一つだと知った場合、それはあなたの食事を変える十分な理由になりますか？",
      en: "If you learned that food production is a major driver of climate change, would that be sufficient reason to change your diet?",
    },
    options: [
      { text: { ja: "すぐに食事を変える", en: "I would change my diet immediately" }, scores: { D5: 2, D7: 3 } },
      { text: { ja: "少しずつ減らしていく", en: "I would gradually reduce" }, scores: { D5: 1, D7: 2 } },
      { text: { ja: "考えるが、すぐには変えない", en: "I would consider it, but not change right away" }, scores: { D5: 1, D7: 1 } },
      { text: { ja: "食事は変えないと思う", en: "I don't think I would change my diet" }, scores: { D7: -2 } },
    ],
  },
  // Q10: Autonomy vs Social Responsibility [S5, S11, S13]
  {
    id: 10,
    question: {
      ja: "「食べることは個人の自由であり、他者が口出しすべきことではない」という考えにどの程度同意しますか？",
      en: "To what extent do you agree that eating is a personal freedom and others should not interfere?",
    },
    options: [
      { text: { ja: "強く同意する", en: "Strongly agree" }, scores: { D6: -2 } },
      { text: { ja: "同意する", en: "Agree" }, scores: { D6: -1 } },
      { text: { ja: "どちらとも言えない", en: "Neither agree nor disagree" }, scores: {} },
      { text: { ja: "同意しない（食は公共の問題でもある）", en: "Disagree (food is also a public issue)" }, scores: { D6: 2, D5: 1 } },
    ],
  },
  // Q11: Empathic Sensitivity [S3, S12, S15]
  {
    id: 11,
    question: {
      ja: "動物が苦しんでいる場面を見たとき、あなたはどの程度強い感情的反応を感じますか？",
      en: "How strong is your emotional response when you see animals suffering?",
    },
    options: [
      { text: { ja: "非常に強い感情を感じる", en: "Very strong emotional response" }, scores: { D4: 3, D2: 1 } },
      { text: { ja: "強い感情を感じる", en: "Strong emotional response" }, scores: { D4: 2 } },
      { text: { ja: "ある程度感じる", en: "Somewhat" }, scores: {} },
      { text: { ja: "あまり感じない", en: "Not much" }, scores: { D4: -2 } },
    ],
  },
  // Q12: Moral Motivation Strength [S2, S6, S13, S16]
  {
    id: 12,
    question: {
      ja: "「たとえ一人の行動が全体の状況を大きく変えなくても、正しいと思うことはすべきだ」という考えに同意しますか？",
      en: "Do you agree that you should do what you believe is right, even if one person's actions won't significantly change the overall situation?",
    },
    options: [
      { text: { ja: "強く同意する", en: "Strongly agree" }, scores: { D3: 3, D7: 1 } },
      { text: { ja: "同意する", en: "Agree" }, scores: { D3: 2, D7: 1 } },
      { text: { ja: "どちらとも言えない", en: "Neither agree nor disagree" }, scores: {} },
      { text: { ja: "同意しない", en: "Disagree" }, scores: { D3: -1, D7: -2 } },
    ],
  },
];

/**
 * Calculate normalized 7-dimension user vector from answers.
 */
function calculateUserVector(answers) {
  const raw = { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0, D6: 0, D7: 0 };

  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null || answerIndex === undefined) return;
    const scores = quizQuestions[questionIndex].options[answerIndex].scores;
    for (const dim in scores) {
      raw[dim] += scores[dim];
    }
  });

  const normalized = {};
  for (const dim of DIMENSIONS) {
    normalized[dim] = Math.min(1, Math.max(0, raw[dim]) / MAX_POSSIBLE[dim]);
  }
  return normalized;
}

/**
 * Gaussian similarity based on Euclidean distance.
 * sim = exp(-K * ||A - B||^2)
 * K=1.5 gives good spread across diverse user profiles.
 */
function gaussianSimilarity(vecA, vecB) {
  const K = 1.5;
  let distSq = 0;
  for (const dim of DIMENSIONS) {
    const diff = (vecA[dim] || 0) - (vecB[dim] || 0);
    distSq += diff * diff;
  }
  return Math.exp(-K * distSq);
}

/**
 * Calculate similarity percentages against all profiles.
 */
function calculateResults(answers) {
  const userVector = calculateUserVector(answers);

  const results = Object.entries(PROFILES).map(([key, profile]) => ({
    key,
    similarity: Math.round(gaussianSimilarity(userVector, profile) * 100),
    subtype: determineSubtype(key, userVector),
  }));

  results.sort((a, b) => b.similarity - a.similarity);
  return { userVector, results };
}

/**
 * Determine the best-matching subtype for a dietary category.
 */
function determineSubtype(categoryKey, userVector) {
  const subtypes = SUBTYPES[categoryKey];
  if (!subtypes || subtypes.length === 0) return null;

  // For reducetarian: fallback to "starter" if average dimension score is very low
  if (categoryKey === "reducetarian") {
    const avg = DIMENSIONS.reduce((sum, d) => sum + (userVector[d] || 0), 0) / DIMENSIONS.length;
    if (avg < 0.3) return subtypes.find(s => s.key === "starter");
  }

  // For consciousOmnivore: fallback to "autonomy" if D6 is very low
  if (categoryKey === "consciousOmnivore") {
    if ((userVector.D6 || 0) < 0.2) return subtypes.find(s => s.key === "autonomy");
  }

  // Standard: pick subtype with highest sum of trigger dimension scores
  let best = null;
  let bestScore = -Infinity;
  for (const sub of subtypes) {
    if (sub.triggers.length === 0) continue;
    const score = sub.triggers.reduce((sum, d) => sum + (userVector[d] || 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = sub;
    }
  }
  return best;
}

/**
 * Return the user's top N dimensions sorted by score descending.
 */
function getTopDimensions(userVector, n) {
  n = n || 3;
  return DIMENSIONS
    .map(dim => ({ dim, score: userVector[dim] || 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

/**
 * Reducetarian Scale score (0-100).
 */
function calculateReducetarianScale(userVector) {
  let sum = 0;
  for (const dim of DIMENSIONS) {
    sum += userVector[dim];
  }
  return Math.round((sum / DIMENSIONS.length) * 100);
}
