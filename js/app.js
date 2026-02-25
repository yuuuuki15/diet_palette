document.addEventListener("DOMContentLoaded", () => {
  let currentQuestion = 0;
  const answers = new Array(quizQuestions.length).fill(null);

  const screens = {
    landing: document.getElementById("landing-screen"),
    quiz: document.getElementById("quiz-screen"),
    results: document.getElementById("results-screen"),
  };

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  function updateAllText() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.getElementById("lang-toggle").textContent = t("langToggle");
    renderQuestion();
  }

  function renderQuestion() {
    if (!screens.quiz.classList.contains("active")) return;

    const q = quizQuestions[currentQuestion];
    const lang = getLang();

    document.getElementById("question-counter").textContent =
      `${t("questionOf")} ${currentQuestion + 1} / ${quizQuestions.length}`;

    const progressFill = document.getElementById("progress-fill");
    progressFill.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

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
      nextBtn.disabled = answers[currentQuestion] === null;
    } else {
      nextBtn.textContent = t("nextQuestion");
      nextBtn.disabled = answers[currentQuestion] === null;
    }
  }

  function selectOption(index) {
    answers[currentQuestion] = index;
    renderQuestion();
  }

  function renderResults() {
    const percentages = calculateResults(answers);
    const lang = getLang();

    // Sort by percentage descending
    const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);

    const topCategory = sorted[0][0];

    document.getElementById("top-result-label").textContent = t("topResultLabel");
    document.getElementById("top-result-name").textContent = t(`categories.${topCategory}`);
    document.getElementById("top-result-percent").textContent = `${sorted[0][1]}%`;
    document.getElementById("top-result-desc").textContent = t(
      `categoryDescriptions.${topCategory}`
    );

    const barsContainer = document.getElementById("result-bars");
    barsContainer.innerHTML = "";

    const categoryColors = {
      vegan: "#2ecc71",
      vegetarian: "#27ae60",
      pescatarian: "#3498db",
      flexitarian: "#f39c12",
      omnivore: "#e74c3c",
    };

    sorted.forEach(([key, value], i) => {
      const barRow = document.createElement("div");
      barRow.className = "bar-row";

      barRow.innerHTML = `
        <div class="bar-label">
          <span class="bar-category">${t(`categories.${key}`)}</span>
          <span class="bar-percent">${value}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" data-width="${value}" style="background-color: ${categoryColors[key]}"></div>
        </div>
      `;

      barsContainer.appendChild(barRow);
    });

    // Animate bars after a short delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll(".bar-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width + "%";
        });
      });
    });
  }

  // Event: Language toggle
  document.getElementById("lang-toggle").addEventListener("click", () => {
    toggleLang();
    updateAllText();
    if (screens.results.classList.contains("active")) {
      renderResults();
    }
  });

  // Event: Start quiz
  document.getElementById("start-btn").addEventListener("click", () => {
    currentQuestion = 0;
    answers.fill(null);
    showScreen("quiz");
    renderQuestion();
  });

  // Event: Previous question
  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  });

  // Event: Next question / See results
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

  // Event: Retry
  document.getElementById("retry-btn").addEventListener("click", () => {
    currentQuestion = 0;
    answers.fill(null);
    showScreen("landing");
  });

  // Event: Share
  document.getElementById("share-btn").addEventListener("click", () => {
    const percentages = calculateResults(answers);
    const sorted = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
    const lines = sorted.map(
      ([key, value]) => `${t(`categories.${key}`)}: ${value}%`
    );
    const text = `🥗 Diet Pallette - ${t("resultTitle")}\n\n${lines.join("\n")}`;

    navigator.clipboard.writeText(text).then(() => {
      const toast = document.getElementById("toast");
      toast.textContent = t("copiedToast");
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2000);
    });
  });

  // Initialize
  updateAllText();
  showScreen("landing");
});
