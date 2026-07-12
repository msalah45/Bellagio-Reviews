(function () {
  const translations = {
    ar: {
      dir: "rtl",
      name: "بيلاجيو بيتش ريزورت",
      sub: "Bellagio Beach Resort",
      prompt: "يسعدنا إقامتك معنا 🌊<br>رأيك يفرق معانا كتير، اختار المنصة اللي تريحك وسيبلنا تقييمك",
      chooseLabel: "اختار منصة التقييم",
      thanks: 'شكرًا لثقتك فينا <span class="heart">♥</span> — تقييمك بيساعدنا نقدملك إقامة أحلى',
      igText: "تابعنا على إنستجرام"
    },
    en: {
      dir: "ltr",
      name: "Bellagio Beach Resort",
      sub: "Beach Resort & Spa",
      prompt: "We hope you enjoyed your stay with us 🌊<br>Your feedback means a lot — choose the platform that suits you and leave us a review",
      chooseLabel: "Choose a review platform",
      thanks: 'Thank you for your trust <span class="heart">♥</span> — your review helps us keep improving your experience',
      igText: "Follow us on Instagram"
    },
    de: {
      dir: "ltr",
      name: "Bellagio Beach Resort",
      sub: "Strandresort & Spa",
      prompt: "Wir hoffen, Ihnen hat der Aufenthalt bei uns gefallen 🌊<br>Ihre Meinung ist uns wichtig — wählen Sie die Plattform, die Ihnen am besten passt, und hinterlassen Sie uns eine Bewertung",
      chooseLabel: "Bewertungsplattform auswählen",
      thanks: 'Vielen Dank für Ihr Vertrauen <span class="heart">♥</span> — Ihre Bewertung hilft uns, Ihr Erlebnis stetig zu verbessern',
      igText: "Folgen Sie uns auf Instagram"
    },
    ru: {
      dir: "ltr",
      name: "Bellagio Beach Resort",
      sub: "Пляжный курорт и спа",
      prompt: "Надеемся, вам понравился отдых у нас 🌊<br>Ваше мнение много для нас значит — выберите платформу и оставьте отзыв",
      chooseLabel: "Выберите платформу для отзыва",
      thanks: 'Спасибо за доверие <span class="heart">♥</span> — ваш отзыв помогает нам становиться лучше',
      igText: "Подписывайтесь на нас в Instagram"
    },
    zh: {
      dir: "ltr",
      name: "Bellagio Beach Resort",
      sub: "海滩度假村与水疗中心",
      prompt: "希望您在这里度过愉快的假期 🌊<br>您的意见对我们非常重要 — 请选择您喜欢的平台，给我们留下评价",
      chooseLabel: "选择评价平台",
      thanks: '感谢您的信任 <span class="heart">♥</span> — 您的评价帮助我们做得更好',
      igText: "在 Instagram 上关注我们"
    }
  };

  const supportedLangs = Object.keys(translations);

  function detectDefaultLang() {
    try {
      const saved = localStorage.getItem("bellagio_lang");
      if (saved && supportedLangs.includes(saved)) return saved;
    } catch (e) {}

    const browserLangs = navigator.languages || [navigator.language || "en"];
    for (const bl of browserLangs) {
      const short = bl.toLowerCase().slice(0, 2);
      if (supportedLangs.includes(short)) return short;
    }
    return "en";
  }

  function applyLang(lang) {
    const t = translations[lang] || translations.en;
    const html = document.getElementById("html-root");
    html.setAttribute("lang", lang);
    html.setAttribute("dir", t.dir);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    try {
      localStorage.setItem("bellagio_lang", lang);
    } catch (e) {}
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
  });

  applyLang(detectDefaultLang());
})();
