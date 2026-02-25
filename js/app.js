document.addEventListener("DOMContentLoaded", () => {
  let currentQuestion = 0;
  const answers = new Array(quizQuestions.length).fill(null);

  // Persist last results for comparison feature
  let lastUserVector = null;
  let lastResults = null;
  let selectedCompare = null;

  // Self-identification
  let selfIdentification = null;
  let formSubmitted = false;

  // ── Google Forms Config ──
  // To enable auto-submission, create a Google Form and fill in these values.
  // 1. Create a Google Form with fields: selfId, topMatch, similarity, D1-D7
  // 2. Get the form ID from the URL: docs.google.com/forms/d/e/{FORM_ID}/viewform
  // 3. Get entry IDs by inspecting the form's HTML (each field has entry.XXXXXXX)
  const GOOGLE_FORMS_CONFIG = {
    enabled: true,
    formId: "1FAIpQLSfUyG2LAX7R0S69w6OZhEtM0pyx3GLf71rZVP2xT3h6M93hUg",
    fields: {
      selfId: "entry.1062652344",
      topMatch: "entry.1980056985",
      topMatchSimilarity: "entry.315473439",
      D1: "entry.795942968",
      D2: "entry.1348709495",
      D3: "entry.832222779",
      D4: "entry.140711501",
      D5: "entry.1637196357",
      D6: "entry.1351844441",
      D7: "entry.1101274061",
    },
    // URL for the feedback form (separate form, opened in a new tab)
    feedbackFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc6u9X4lGWDfBi2vztopXXBu-vhART290vekKBuKfGZWgWlVQ/viewform",
  };

  const SELF_ID_OPTIONS = ["vegan", "vegetarian", "reducetarian", "omnivore", "unknown"];

  const PROFILE_COLORS = {
    vegan: "#16a34a",
    vegetarian: "#0ea5e9",
    reducetarian: "#f59e0b",
    consciousOmnivore: "#ef4444",
  };

  const screens = {
    landing: document.getElementById("landing-screen"),
    selfId: document.getElementById("selfid-screen"),
    quiz: document.getElementById("quiz-screen"),
    results: document.getElementById("results-screen"),
    references: document.getElementById("references-screen"),
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
    if (screens.selfId.classList.contains("active")) {
      renderSelfIdScreen();
    }
    if (screens.quiz.classList.contains("active")) {
      renderQuestion();
    }
  }

  // ── Self-Identification Screen ──

  function renderSelfIdScreen() {
    document.getElementById("selfid-title").textContent = t("selfId.title");
    document.getElementById("selfid-hint").textContent = t("selfId.hint");

    const container = document.getElementById("selfid-options");
    container.innerHTML = "";

    SELF_ID_OPTIONS.forEach((key) => {
      const btn = document.createElement("button");
      btn.className = "option-btn" + (selfIdentification === key ? " selected" : "");
      btn.textContent = t("selfId." + key);
      btn.addEventListener("click", () => {
        selfIdentification = key;
        renderSelfIdScreen();
        setTimeout(() => {
          currentQuestion = 0;
          showScreen("quiz");
          renderQuestion();
        }, 250);
      });
      container.appendChild(btn);
    });
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

    const hintEl = document.getElementById("question-hint");
    if (q.hint && q.hint[lang]) {
      hintEl.textContent = q.hint[lang];
      hintEl.style.display = "";
    } else {
      hintEl.textContent = "";
      hintEl.style.display = "none";
    }

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
    prevBtn.style.display = "inline-flex";
    prevBtn.textContent = t("prevQuestion");
  }

  function selectOption(index) {
    answers[currentQuestion] = index;
    renderQuestion();
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        renderQuestion();
      } else {
        showScreen("results");
        renderResults();
      }
    }, 250);
  }

  // ── Radar Chart ──

  function renderRadarChart(userVector, compareKey) {
    const compareProfile = compareKey ? PROFILES[compareKey] : null;
    const w = 460;
    const h = 400;
    const cx = 230;
    const cy = 195;
    const radius = 115;
    const numAxes = DIMENSIONS.length;

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
      const labelDist = radius + 28;
      const pos = pt(angles[i], labelDist);
      let anchor = "middle";
      if (pos.x < cx - 15) anchor = "end";
      else if (pos.x > cx + 15) anchor = "start";
      labels += `<text x="${pos.x}" y="${pos.y}"
        text-anchor="${anchor}" dominant-baseline="central"
        font-size="12" font-weight="500" fill="#6b7280"
        font-family="Inter, Noto Sans JP, sans-serif">${t("dimensions." + d)}</text>`;
    });

    // Compare profile polygon (only if compareKey is set)
    let comparePoly = "";
    if (compareProfile && compareKey) {
      const color = PROFILE_COLORS[compareKey];
      comparePoly = `<polygon points="${polyPoints(compareProfile)}"
        fill="${color}" fill-opacity="0.1"
        stroke="${color}" stroke-width="1.5"
        stroke-dasharray="6 3" />`;
    }

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

    const svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      ${gridLines}${axisLines}${comparePoly}${userPoly}${dots}${labels}
    </svg>`;

    document.getElementById("radar-chart").innerHTML = svg;

    // Legend - conditionally show comparison
    let legendHTML = `
      <span class="legend-item">
        <span class="legend-swatch" style="background:#2d6a4f"></span>
        ${t("radarYou")}
      </span>
    `;
    if (compareKey) {
      const color = PROFILE_COLORS[compareKey];
      legendHTML += `
        <span class="legend-item">
          <span class="legend-swatch legend-dashed" style="border-color:${color}"></span>
          ${t("radarMatch")}: ${t("categories." + compareKey)}
        </span>
      `;
    }
    document.getElementById("radar-legend").innerHTML = legendHTML;
  }

  // ── Dimension Insights ──

  function renderDimensionInsights(userVector) {
    const topDims = getTopDimensions(userVector, 3);
    const container = document.getElementById("dimension-insights");
    container.innerHTML = "";

    topDims.forEach(({ dim, score }) => {
      const card = document.createElement("div");
      card.className = "insight-card";
      const percentage = Math.round(score * 100);
      card.innerHTML = `
        <div class="insight-header">
          <span class="insight-dim-name">${t("dimensions." + dim)}</span>
          <span class="insight-score">${percentage}%</span>
        </div>
        <p class="insight-text">${t("dimensionInsights." + dim)}</p>
      `;
      container.appendChild(card);
    });
  }

  // ── Dietary Philosophy Cards ──

  function renderPhilosophyCards(results, userVector) {
    const container = document.getElementById("philosophy-cards");
    container.innerHTML = "";

    results.forEach(({ key, similarity, subtype }) => {
      const color = PROFILE_COLORS[key];
      const isComparing = selectedCompare === key;

      const card = document.createElement("div");
      card.className = "philosophy-card" + (isComparing ? " comparing" : "");
      card.style.borderLeftColor = color;

      let subtypeHTML = "";
      if (subtype) {
        const info = t("subtypes." + subtype.key);
        if (info && typeof info === "object") {
          subtypeHTML = `
            <div class="subtype-badge">
              <span class="subtype-name">${info.name}</span>
            </div>
            <p class="subtype-desc">${info.desc}</p>
          `;
        }
      }

      card.innerHTML = `
        <div class="philosophy-card-header">
          <div class="philosophy-card-title">
            <span class="philosophy-dot" style="background:${color}"></span>
            <span class="philosophy-name">${t("categories." + key)}</span>
          </div>
          <span class="philosophy-similarity">${similarity}%</span>
        </div>
        ${subtypeHTML}
        <button class="compare-toggle-btn ${isComparing ? "active" : ""}"
                data-profile="${key}">
          ${isComparing ? t("comparingButton") : t("compareButton")}
        </button>
      `;

      const btn = card.querySelector(".compare-toggle-btn");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (selectedCompare === key) {
          selectedCompare = null;
          renderRadarChart(lastUserVector, null);
        } else {
          selectedCompare = key;
          renderRadarChart(lastUserVector, key);
        }
        renderPhilosophyCards(lastResults, lastUserVector);
      });

      container.appendChild(card);
    });
  }

  // ── Results Rendering ──

  function renderResults(isLanguageSwitch) {
    const { userVector, results } = calculateResults(answers);
    lastUserVector = userVector;
    lastResults = results;
    if (!isLanguageSwitch) {
      selectedCompare = null;
    }

    // Radar chart (user only by default, or with comparison if preserved)
    renderRadarChart(userVector, selectedCompare);

    // Dimension Insights
    renderDimensionInsights(userVector);

    // Dietary Philosophy Cards
    renderPhilosophyCards(results, userVector);

    // Reducetarian scale
    const reductionScore = calculateReducetarianScale(userVector);
    document.getElementById("reducetarian-desc").textContent =
      t("reducetarianDesc").replace("{score}", reductionScore);

    // Env impact (use highest-similarity profile)
    const topMatch = results[0];
    const co2 = CO2_DATA[topMatch.key];
    const yearlyReduction = Math.round((3.8 - co2.daily) * 365);
    document.getElementById("env-desc").textContent =
      t("envImpactDesc").replace("{kg}", yearlyReduction);

    // Animate scale
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("scale-fill").style.width = reductionScore + "%";
        document.getElementById("scale-marker").style.left = reductionScore + "%";
      });
    });

    // Auto-submit to Google Forms (once per quiz attempt)
    if (!isLanguageSwitch) {
      submitToGoogleForms(userVector, results);
    }
  }

  // ── References Page ──

  function renderReferences() {
    const refs = t("references");

    document.getElementById("ref-page-title").textContent = refs.pageTitle;
    document.getElementById("ref-intro").textContent = refs.introText;
    document.getElementById("ref-frameworks-title").textContent = refs.frameworksTitle;
    document.getElementById("ref-sources-title").textContent = refs.sourcesTitle;
    document.getElementById("ref-method-title").textContent = refs.methodTitle;
    document.getElementById("ref-method-text").textContent = refs.methodText;
    document.getElementById("back-to-results-btn").textContent = refs.backToResults;

    // Frameworks
    const fwContainer = document.getElementById("ref-frameworks");
    fwContainer.innerHTML = "";
    refs.frameworks.forEach((fw) => {
      const card = document.createElement("div");
      card.className = "fw-card";
      card.innerHTML = `
        <div class="fw-header">
          <span class="fw-name">${fw.name}</span>
          <span class="fw-author">${fw.author}</span>
        </div>
        <p class="fw-desc">${fw.desc}</p>
      `;
      fwContainer.appendChild(card);
    });

    // Sources
    const srcList = document.getElementById("ref-sources");
    srcList.innerHTML = "";
    REFERENCE_SOURCES.forEach((src) => {
      const li = document.createElement("li");
      li.className = "ref-source-item";
      li.innerHTML = `<span class="src-id">[${src.id}]</span> ${src.text}`;
      srcList.appendChild(li);
    });
  }

  // ── Google Forms Auto-Submit ──

  function submitToGoogleForms(userVector, results) {
    if (!GOOGLE_FORMS_CONFIG.enabled || formSubmitted) return;

    const topMatch = results[0];
    const fields = GOOGLE_FORMS_CONFIG.fields;
    const params = new URLSearchParams();
    params.set(fields.selfId, selfIdentification || "none");
    params.set(fields.topMatch, topMatch.key);
    params.set(fields.topMatchSimilarity, String(topMatch.similarity));
    DIMENSIONS.forEach((d) => {
      params.set(fields[d], String(Math.round(userVector[d] * 100)));
    });

    const url = `https://docs.google.com/forms/d/e/${GOOGLE_FORMS_CONFIG.formId}/formResponse`;
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    }).catch(() => {});

    formSubmitted = true;
  }

  // ── Events ──

  document.getElementById("lang-toggle").addEventListener("click", () => {
    toggleLang();
    updateAllText();
    if (screens.selfId.classList.contains("active")) {
      renderSelfIdScreen();
    } else if (screens.results.classList.contains("active")) {
      renderResults(true);
    } else if (screens.references.classList.contains("active")) {
      renderReferences();
    }
  });

  document.getElementById("start-btn").addEventListener("click", () => {
    currentQuestion = 0;
    answers.fill(null);
    selfIdentification = null;
    formSubmitted = false;
    showScreen("selfId");
    renderSelfIdScreen();
  });

  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    } else {
      showScreen("selfId");
      renderSelfIdScreen();
    }
  });

  document.getElementById("feedback-btn").addEventListener("click", () => {
    if (GOOGLE_FORMS_CONFIG.feedbackFormUrl) {
      window.open(GOOGLE_FORMS_CONFIG.feedbackFormUrl, "_blank");
    }
  });

  document.getElementById("retry-btn").addEventListener("click", () => {
    currentQuestion = 0;
    answers.fill(null);
    selfIdentification = null;
    formSubmitted = false;
    showScreen("landing");
  });

  document.getElementById("about-btn").addEventListener("click", () => {
    renderReferences();
    showScreen("references");
  });

  document.getElementById("back-to-results-btn").addEventListener("click", () => {
    showScreen("results");
  });

  // ── Init ──
  updateAllText();
  showScreen("landing");
});
