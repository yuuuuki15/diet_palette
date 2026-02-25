document.addEventListener("DOMContentLoaded", () => {
  let currentQuestion = 0;
  const answers = new Array(quizQuestions.length).fill(null);

  const screens = {
    landing: document.getElementById("landing-screen"),
    quiz: document.getElementById("quiz-screen"),
    results: document.getElementById("results-screen"),
  };

  const PROFILE_COLORS = {
    vegan: "#16a34a",
    vegetarian: "#22c55e",
    pescatarian: "#0ea5e9",
    reducetarianHigh: "#8b5cf6",
    reducetarianMid: "#f59e0b",
    reducetarianLow: "#f97316",
    consciousOmnivore: "#ef4444",
  };

  // ── Screen Management ──

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
    window.scrollTo(0, 0);
  }

  function updateAllText() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.getElementById("lang-toggle").textContent = t("langToggle");
    if (screens.quiz.classList.contains("active")) {
      renderQuestion();
    }
  }

  // ── Quiz Rendering ──

  function renderQuestion() {
    const q = quizQuestions[currentQuestion];
    const lang = getLang();

    document.getElementById("question-counter").textContent =
      `${t("questionOf")} ${currentQuestion + 1} / ${quizQuestions.length}`;

    document.getElementById("progress-fill").style.width =
      `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

    document.getElementById("question-text").textContent = q.question[lang];

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.className = "option-btn" + (answers[currentQuestion] === index ? " selected" : "");
      btn.textContent = option.text[lang];
      btn.addEventListener("click", () => selectOption(index));
      optionsContainer.appendChild(btn);
    });

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    prevBtn.style.display = currentQuestion === 0 ? "none" : "inline-flex";
    prevBtn.textContent = t("prevQuestion");

    if (currentQuestion === quizQuestions.length - 1) {
      nextBtn.textContent = t("seeResults");
    } else {
      nextBtn.textContent = t("nextQuestion");
    }
    nextBtn.disabled = answers[currentQuestion] === null;
  }

  function selectOption(index) {
    answers[currentQuestion] = index;
    renderQuestion();
  }

  // ── Radar Chart ──

  function renderRadarChart(userVector, matchKey) {
    const matchProfile = PROFILES[matchKey];
    const size = 300;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 110;
    const numAxes = DIMENSIONS.length;
    const lang = getLang();

    const angles = DIMENSIONS.map(
      (_, i) => -Math.PI / 2 + (2 * Math.PI * i) / numAxes
    );

    const pt = (angle, dist) => ({
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
    });

    const polyPoints = (values) =>
      DIMENSIONS.map((d, i) => {
        const p = pt(angles[i], radius * (values[d] || 0));
        return `${p.x},${p.y}`;
      }).join(" ");

    // Grid
    let gridLines = "";
    [0.25, 0.5, 0.75, 1.0].forEach((level) => {
      const points = angles.map((a) => pt(a, radius * level));
      gridLines += `<polygon points="${points.map((p) => `${p.x},${p.y}`).join(" ")}"
        fill="none" stroke="#d1d5db" stroke-width="${level === 1 ? 1 : 0.5}" />`;
    });

    // Axis lines
    let axisLines = "";
    angles.forEach((a) => {
      const end = pt(a, radius);
      axisLines += `<line x1="${cx}" y1="${cy}" x2="${end.x}" y2="${end.y}"
        stroke="#d1d5db" stroke-width="0.5" />`;
    });

    // Axis labels
    let labels = "";
    DIMENSIONS.forEach((d, i) => {
      const labelDist = radius + 22;
      const pos = pt(angles[i], labelDist);
      let anchor = "middle";
      if (pos.x < cx - 10) anchor = "end";
      else if (pos.x > cx + 10) anchor = "start";
      labels += `<text x="${pos.x}" y="${pos.y}"
        text-anchor="${anchor}" dominant-baseline="central"
        font-size="11" font-weight="500" fill="#6b7280"
        font-family="Inter, Noto Sans JP, sans-serif">${t("dimensions." + d)}</text>`;
    });

    // Match profile polygon
    const matchPoly = `<polygon points="${polyPoints(matchProfile)}"
      fill="${PROFILE_COLORS[matchKey]}" fill-opacity="0.1"
      stroke="${PROFILE_COLORS[matchKey]}" stroke-width="1.5"
      stroke-dasharray="6 3" />`;

    // User polygon
    const userPoly = `<polygon points="${polyPoints(userVector)}"
      fill="#2d6a4f" fill-opacity="0.2"
      stroke="#2d6a4f" stroke-width="2" />`;

    // User dots
    let dots = "";
    DIMENSIONS.forEach((d, i) => {
      const p = pt(angles[i], radius * (userVector[d] || 0));
      dots += `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#2d6a4f" />`;
    });

    const svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      ${gridLines}${axisLines}${matchPoly}${userPoly}${dots}${labels}
    </svg>`;

    document.getElementById("radar-chart").innerHTML = svg;

    // Legend
    const legend = document.getElementById("radar-legend");
    legend.innerHTML = `
      <span class="legend-item">
        <span class="legend-swatch" style="background:#2d6a4f"></span>
        ${t("radarYou")}
      </span>
      <span class="legend-item">
        <span class="legend-swatch legend-dashed" style="border-color:${PROFILE_COLORS[matchKey]}"></span>
        ${t("radarMatch")}: ${t("categories." + matchKey)}
      </span>
    `;
  }

  // ── Results Rendering ──

  function renderResults() {
    const { userVector, results } = calculateResults(answers);
    const topMatch = results[0];

    // Radar chart
    renderRadarChart(userVector, topMatch.key);

    // Top match card
    document.getElementById("top-result-label").textContent = t("topResultLabel");
    document.getElementById("top-result-name").textContent = t("categories." + topMatch.key);
    document.getElementById("top-result-percent").textContent = `${topMatch.similarity}%`;
    document.getElementById("top-result-desc").textContent =
      t("categoryDescriptions." + topMatch.key);

    // All matches bars
    const barsContainer = document.getElementById("result-bars");
    barsContainer.innerHTML = "";

    results.forEach(({ key, similarity }) => {
      const color = PROFILE_COLORS[key];
      const barRow = document.createElement("div");
      barRow.className = "bar-row";
      barRow.innerHTML = `
        <div class="bar-label">
          <span class="bar-category">${t("categories." + key)}</span>
          <span class="bar-percent">${similarity}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" data-width="${similarity}" style="background-color: ${color}"></div>
        </div>
      `;
      barsContainer.appendChild(barRow);
    });

    // Reducetarian scale
    const reductionScore = calculateReducetarianScale(userVector);
    document.getElementById("reducetarian-desc").textContent =
      t("reducetarianDesc").replace("{score}", reductionScore);

    // Env impact
    const co2 = CO2_DATA[topMatch.key];
    const yearlyReduction = Math.round((3.8 - co2.daily) * 365);
    document.getElementById("env-desc").textContent =
      t("envImpactDesc").replace("{kg}", yearlyReduction);

    // Suggestion
    document.getElementById("suggestion-text").textContent =
      t("suggestions." + topMatch.key);

    // Animate bars and scale after render
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll(".bar-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width + "%";
        });
        document.getElementById("scale-fill").style.width = reductionScore + "%";
        document.getElementById("scale-marker").style.left = reductionScore + "%";
      });
    });
  }

  // ── Events ──

  document.getElementById("lang-toggle").addEventListener("click", () => {
    toggleLang();
    updateAllText();
    if (screens.results.classList.contains("active")) {
      renderResults();
    }
  });

  document.getElementById("start-btn").addEventListener("click", () => {
    currentQuestion = 0;
    answers.fill(null);
    showScreen("quiz");
    renderQuestion();
  });

  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    if (answers[currentQuestion] === null) return;
    if (currentQuestion < quizQuestions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showScreen("results");
      renderResults();
    }
  });

  document.getElementById("retry-btn").addEventListener("click", () => {
    currentQuestion = 0;
    answers.fill(null);
    showScreen("landing");
  });

  document.getElementById("share-btn").addEventListener("click", () => {
    const { userVector, results } = calculateResults(answers);
    const reductionScore = calculateReducetarianScale(userVector);
    const top3 = results.slice(0, 3);
    const lines = top3.map(
      ({ key, similarity }) => `${t("categories." + key)}: ${similarity}%`
    );
    const text =
      `\ud83e\udd57 Diet Pallette - ${t("resultTitle")}\n\n` +
      `${lines.join("\n")}\n\n` +
      `${t("reducetarianTitle")}: ${reductionScore}%`;

    navigator.clipboard.writeText(text).then(() => {
      const toast = document.getElementById("toast");
      toast.textContent = t("copiedToast");
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2000);
    });
  });

  // ── Init ──
  updateAllText();
  showScreen("landing");
});
