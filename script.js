(function () {
  // TODO: replace with the resort's real WhatsApp number (country code + number, no + or spaces)
  const WHATSAPP_NUMBER = "201069182045";
  const WA_CONTACT_MESSAGE = "Hello, I have a question about my stay at Bellagio Beach Resort.";

  // TODO: paste the Google Apps Script Web App URL here (see setup instructions) to log every
  // submission into a Google Sheet. Leave as-is to skip sheet logging.
  const SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxdAEHVGRxvZRE8m-S4BiKG13HAG0o6ROpr6bEubTZxpNqiSHQk0eJRIJj5JmhqM79O/exec";

  function sendToSheet(payload) {
    if (!SHEET_WEBHOOK_URL || SHEET_WEBHOOK_URL.indexOf("PASTE_YOUR") !== -1) return;
    try {
      fetch(SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {}
  }

  const translations = {
    ar: {
      dir: "rtl",
      name: "بيلاجيو بيتش ريزورت",
      sub: "Bellagio Beach Resort",
      prompt: "يسعدنا إقامتك معنا 🌊<br>رأيك يفرق معانا كتير، قيّم إقامتك في الخطوات البسيطة دي وسيبلنا انطباعك",
      chooseLabel: "اختار منصة التقييم",
      thanks: 'شكرًا لثقتك فينا <span class="heart">♥</span> — تقييمك بيساعدنا نقدملك إقامة أحلى',
      igText: "تابعنا على إنستجرام",
      rateLabel: "قيّم إقامتك معانا",
      feedbackLabel: "نأسف إذا مكانتش تجربتك زي ما كنا نتمنى، احكيلنا التفاصيل عشان نصلحها",
      feedbackPlaceholder: "اكتب ملاحظتك هنا...",
      sendWhatsapp: "إرسال الملاحظة عبر واتساب",
      shareText: "مشاركة الصفحة",
      whatsappText: "تواصل معانا واتساب",
      copyText: "نسخ الرابط",
      copiedText: "تم نسخ الرابط ✓",
      greetMorning: "صباح الخير ☀️",
      greetEvening: "مساء الخير 🌙",
      thanksLow: "شكرًا على وقتك، هنتواصل معاك في أقرب وقت 🙏",
      catReception: "الاستقبال",
      catRooms: "الغرف",
      catFood: "الأكل والمطاعم",
      catCleanliness: "النظافة",
      catStaff: "خدمة الموظفين",
      catBeach: "الشاطئ والمسبح",
      continueBtn: "متابعة",
      validationMsg: "من فضلك قيّم عنصر واحد على الأقل",
      roomRequiredMsg: "من فضلك اكتب رقم الغرفة",
      roomLabel: "رقم الغرفة *",
      roomPlaceholder: "مثال: 214",
      commentLabel: "تعليق أو فكرة لتحسين المكان (اختياري)",
      commentPlaceholder: "اكتب رأيك أو فكرتك هنا...",
      phoneLabel: "رقم الواتساب (اختياري)",
      phonePlaceholder: "مثال: 01012345678"
    },
    en: {
      dir: "ltr",
      name: "Bellagio Beach Resort",
      sub: "Beach Resort & Spa",
      prompt: "We hope you enjoyed your stay with us 🌊<br>Your feedback means a lot — rate your experience below and let us know how we did",
      chooseLabel: "Choose a review platform",
      thanks: 'Thank you for your trust <span class="heart">♥</span> — your review helps us keep improving your experience',
      igText: "Follow us on Instagram",
      rateLabel: "Rate your stay with us",
      feedbackLabel: "Sorry to hear your experience wasn't perfect — tell us more so we can fix it",
      feedbackPlaceholder: "Write your feedback here...",
      sendWhatsapp: "Send feedback via WhatsApp",
      shareText: "Share this page",
      whatsappText: "Contact us on WhatsApp",
      copyText: "Copy link",
      copiedText: "Link copied ✓",
      greetMorning: "Good morning ☀️",
      greetEvening: "Good evening 🌙",
      thanksLow: "Thank you for your time, we'll reach out to you soon 🙏",
      catReception: "Reception",
      catRooms: "Rooms",
      catFood: "Food & Dining",
      catCleanliness: "Cleanliness",
      catStaff: "Staff Service",
      catBeach: "Beach & Pool",
      continueBtn: "Continue",
      validationMsg: "Please rate at least one item",
      roomRequiredMsg: "Please enter your room number",
      roomLabel: "Room number *",
      roomPlaceholder: "e.g. 214",
      commentLabel: "Comment or idea to improve (optional)",
      commentPlaceholder: "Write your thoughts here...",
      phoneLabel: "WhatsApp number (optional)",
      phonePlaceholder: "e.g. 01012345678"
    },
    de: {
      dir: "ltr",
      name: "Bellagio Beach Resort",
      sub: "Strandresort & Spa",
      prompt: "Wir hoffen, Ihnen hat der Aufenthalt bei uns gefallen 🌊<br>Ihre Meinung ist uns wichtig — bewerten Sie unten Ihre Erfahrung und lassen Sie uns wissen, wie wir waren",
      chooseLabel: "Bewertungsplattform auswählen",
      thanks: 'Vielen Dank für Ihr Vertrauen <span class="heart">♥</span> — Ihre Bewertung hilft uns, Ihr Erlebnis stetig zu verbessern',
      igText: "Folgen Sie uns auf Instagram",
      rateLabel: "Bewerten Sie Ihren Aufenthalt",
      feedbackLabel: "Es tut uns leid, dass Ihr Aufenthalt nicht perfekt war — erzählen Sie uns mehr, damit wir es verbessern können",
      feedbackPlaceholder: "Schreiben Sie hier Ihr Feedback...",
      sendWhatsapp: "Feedback per WhatsApp senden",
      shareText: "Seite teilen",
      whatsappText: "Kontaktieren Sie uns per WhatsApp",
      copyText: "Link kopieren",
      copiedText: "Link kopiert ✓",
      greetMorning: "Guten Morgen ☀️",
      greetEvening: "Guten Abend 🌙",
      thanksLow: "Vielen Dank für Ihre Zeit, wir melden uns bald bei Ihnen 🙏",
      catReception: "Empfang",
      catRooms: "Zimmer",
      catFood: "Essen & Restaurants",
      catCleanliness: "Sauberkeit",
      catStaff: "Personal-Service",
      catBeach: "Strand & Pool",
      continueBtn: "Weiter",
      validationMsg: "Bitte bewerten Sie mindestens einen Punkt",
      roomRequiredMsg: "Bitte geben Sie Ihre Zimmernummer ein",
      roomLabel: "Zimmernummer *",
      roomPlaceholder: "z. B. 214",
      commentLabel: "Kommentar oder Verbesserungsidee (optional)",
      commentPlaceholder: "Schreiben Sie hier Ihre Gedanken...",
      phoneLabel: "WhatsApp-Nummer (optional)",
      phonePlaceholder: "z. B. 01012345678"
    },
    ru: {
      dir: "ltr",
      name: "Bellagio Beach Resort",
      sub: "Пляжный курорт и спа",
      prompt: "Надеемся, вам понравился отдых у нас 🌊<br>Ваше мнение много для нас значит — оцените свой опыт ниже и расскажите, как у нас получилось",
      chooseLabel: "Выберите платформу для отзыва",
      thanks: 'Спасибо за доверие <span class="heart">♥</span> — ваш отзыв помогает нам становиться лучше',
      igText: "Подписывайтесь на нас в Instagram",
      rateLabel: "Оцените ваше пребывание",
      feedbackLabel: "Жаль, что впечатления были не идеальными — расскажите подробнее, чтобы мы могли это исправить",
      feedbackPlaceholder: "Напишите ваш отзыв здесь...",
      sendWhatsapp: "Отправить отзыв через WhatsApp",
      shareText: "Поделиться страницей",
      whatsappText: "Связаться с нами в WhatsApp",
      copyText: "Копировать ссылку",
      copiedText: "Ссылка скопирована ✓",
      greetMorning: "Доброе утро ☀️",
      greetEvening: "Добрый вечер 🌙",
      thanksLow: "Спасибо за ваше время, мы скоро с вами свяжемся 🙏",
      catReception: "Ресепшн",
      catRooms: "Номера",
      catFood: "Питание и рестораны",
      catCleanliness: "Чистота",
      catStaff: "Обслуживание персонала",
      catBeach: "Пляж и бассейн",
      continueBtn: "Продолжить",
      validationMsg: "Пожалуйста, оцените хотя бы один пункт",
      roomRequiredMsg: "Пожалуйста, укажите номер комнаты",
      roomLabel: "Номер комнаты *",
      roomPlaceholder: "напр. 214",
      commentLabel: "Комментарий или идея для улучшения (необязательно)",
      commentPlaceholder: "Напишите здесь свои мысли...",
      phoneLabel: "Номер WhatsApp (необязательно)",
      phonePlaceholder: "напр. 01012345678"
    },
    zh: {
      dir: "ltr",
      name: "Bellagio Beach Resort",
      sub: "海滩度假村与水疗中心",
      prompt: "希望您在这里度过愉快的假期 🌊<br>您的意见对我们非常重要 — 请在下方为您的体验评分，让我们知道我们做得如何",
      chooseLabel: "选择评价平台",
      thanks: '感谢您的信任 <span class="heart">♥</span> — 您的评价帮助我们做得更好',
      igText: "在 Instagram 上关注我们",
      rateLabel: "为您的入住体验评分",
      feedbackLabel: "很抱歉您的体验不够完美 — 请告诉我们详情，以便我们改进",
      feedbackPlaceholder: "请在此写下您的反馈...",
      sendWhatsapp: "通过WhatsApp发送反馈",
      shareText: "分享此页面",
      whatsappText: "通过WhatsApp联系我们",
      copyText: "复制链接",
      copiedText: "链接已复制 ✓",
      greetMorning: "早上好 ☀️",
      greetEvening: "晚上好 🌙",
      thanksLow: "感谢您的宝贵时间，我们会尽快与您联系 🙏",
      catReception: "前台",
      catRooms: "客房",
      catFood: "餐饮",
      catCleanliness: "清洁",
      catStaff: "员工服务",
      catBeach: "海滩与泳池",
      continueBtn: "继续",
      validationMsg: "请至少评价一项",
      roomRequiredMsg: "请填写房间号",
      roomLabel: "房间号 *",
      roomPlaceholder: "例如：214",
      commentLabel: "评论或改进建议（可选）",
      commentPlaceholder: "请在此写下您的想法...",
      phoneLabel: "WhatsApp 号码（可选）",
      phonePlaceholder: "例如：01012345678"
    }
  };

  const CATEGORY_MESSAGE_LABELS = {
    reception: "Reception",
    rooms: "Rooms",
    food: "Food & Dining",
    cleanliness: "Cleanliness",
    staff: "Staff Service",
    beach: "Beach & Pool"
  };

  const supportedLangs = Object.keys(translations);
  let currentLang = "en";

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

  function applyGreeting(lang) {
    const t = translations[lang] || translations.en;
    const hour = new Date().getHours();
    const el = document.getElementById("greeting");
    if (el) el.textContent = hour < 17 ? t.greetMorning : t.greetEvening;
  }

  function applyLang(lang) {
    const t = translations[lang] || translations.en;
    currentLang = translations[lang] ? lang : "en";
    const html = document.getElementById("html-root");
    html.setAttribute("lang", currentLang);
    html.setAttribute("dir", t.dir);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      if (t[key] !== undefined) {
        el.setAttribute("placeholder", t[key]);
      }
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === currentLang);
    });

    applyGreeting(currentLang);

    try {
      localStorage.setItem("bellagio_lang", currentLang);
    } catch (e) {}
  }

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
  });

  // --- Per-category rating gate ---
  const gridWrap = document.getElementById("gridWrap");
  const feedbackWrap = document.getElementById("feedbackWrap");
  const rateSection = document.getElementById("rateSection");
  const continueBtn = document.getElementById("continueBtn");
  const rateValidation = document.getElementById("rateValidation");
  const ratingsByCategory = {};
  let averageRating = null;

  document.querySelectorAll(".rate-row").forEach((row) => {
    const cat = row.getAttribute("data-cat");
    row.querySelectorAll(".star").forEach((star) => {
      star.addEventListener("click", () => {
        const val = parseInt(star.dataset.value, 10);
        ratingsByCategory[cat] = val;
        row.querySelectorAll(".star").forEach((s) => {
          s.classList.toggle("selected", parseInt(s.dataset.value, 10) <= val);
        });
        if (rateValidation) rateValidation.classList.add("hidden");
      });
    });
  });

  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const roomEl = document.getElementById("roomNumber");
      const phoneEl = document.getElementById("phoneNumber");
      const commentEl = document.getElementById("generalComment");
      const room = roomEl ? roomEl.value.trim() : "";
      const phone = phoneEl ? phoneEl.value.trim() : "";
      const comment = commentEl ? commentEl.value.trim() : "";

      if (!room) {
        if (rateValidation) {
          rateValidation.textContent = translations[currentLang].roomRequiredMsg;
          rateValidation.classList.remove("hidden");
        }
        if (roomEl) roomEl.focus();
        return;
      }

      const values = Object.values(ratingsByCategory);
      if (values.length === 0) {
        if (rateValidation) {
          rateValidation.textContent = translations[currentLang].validationMsg;
          rateValidation.classList.remove("hidden");
        }
        return;
      }

      averageRating = values.reduce((a, b) => a + b, 0) / values.length;

      const payload = {
        room: room,
        phone: phone,
        reception: ratingsByCategory.reception || "",
        rooms: ratingsByCategory.rooms || "",
        food: ratingsByCategory.food || "",
        cleanliness: ratingsByCategory.cleanliness || "",
        staff: ratingsByCategory.staff || "",
        beach: ratingsByCategory.beach || "",
        average: averageRating.toFixed(1),
        comment: comment,
        lang: currentLang,
        timestamp: new Date().toISOString()
      };
      sendToSheet(payload);

      if (rateSection) rateSection.classList.add("hidden");

      // The review-platform grid always shows, regardless of rating.
      if (gridWrap) gridWrap.classList.remove("hidden");

      if (averageRating <= 3) {
        const breakdownLines = Object.entries(ratingsByCategory).map(
          ([cat, val]) => (CATEGORY_MESSAGE_LABELS[cat] || cat) + ": " + val + "/5"
        );
        const msg =
          "Bellagio Beach Resort - Guest Feedback\n" +
          "Room: " + (room || "-") + "\n" +
          "Guest WhatsApp: " + (phone || "-") + "\n" +
          breakdownLines.join("\n") + "\n" +
          "Average: " + averageRating.toFixed(1) + "/5\n" +
          "Comment: " + (comment || "-");
        window.open(buildWaLink(WHATSAPP_NUMBER, msg), "_blank", "noopener");

        if (feedbackWrap) feedbackWrap.classList.remove("hidden");
      } else {
        if (feedbackWrap) feedbackWrap.classList.add("hidden");
      }

      try {
        localStorage.setItem("bellagio_ratings", JSON.stringify(ratingsByCategory));
        localStorage.setItem("bellagio_avg_rating", String(averageRating));
      } catch (e) {}
    });
  }

  // --- Low-rating feedback -> WhatsApp ---
  function buildWaLink(number, message) {
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
  }

  // --- Floating WhatsApp contact button + utility-row WhatsApp button ---
  const waLink = buildWaLink(WHATSAPP_NUMBER, WA_CONTACT_MESSAGE);
  const waFab = document.getElementById("waFab");
  if (waFab) waFab.setAttribute("href", waLink);
  const waContactBtn = document.getElementById("waContactBtn");
  if (waContactBtn) waContactBtn.setAttribute("href", waLink);

  // --- Copy-link buttons on each review platform ---
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = btn.getAttribute("data-url");
      copyToClipboard(url).then(() => {
        btn.classList.add("copied");
        const original = btn.textContent;
        btn.textContent = "✓";
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.textContent = original;
        }, 1500);
      });
    });
  });

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (e) {}
      document.body.removeChild(ta);
      resolve();
    });
  }

  // --- Simple client-side click analytics (stored locally in the visitor's browser) ---
  function incrementClickCount(platform) {
    if (!platform) return;
    try {
      const raw = localStorage.getItem("bellagio_clicks");
      const data = raw ? JSON.parse(raw) : {};
      data[platform] = (data[platform] || 0) + 1;
      localStorage.setItem("bellagio_clicks", JSON.stringify(data));
    } catch (e) {}
  }

  document.querySelectorAll(".review-btn").forEach((a) => {
    a.addEventListener("click", () => {
      incrementClickCount(a.getAttribute("data-platform"));
    });
  });

  // Optional debug overlay: open the page with ?stats=1 to see local click counts
  if (window.location.search.indexOf("stats") !== -1) {
    try {
      const raw = localStorage.getItem("bellagio_clicks");
      const data = raw ? JSON.parse(raw) : {};
      const overlay = document.createElement("div");
      overlay.className = "stats-overlay";
      const lines = Object.keys(data).length
        ? Object.entries(data).map(([k, v]) => k + ": " + v).join("<br>")
        : "no clicks recorded yet";
      overlay.innerHTML = "<strong>Local click counts</strong><br>" + lines;
      document.body.appendChild(overlay);
    } catch (e) {}
  }

  // --- Share button (native share sheet, falls back to a QR code modal) ---
  const shareBtn = document.getElementById("shareBtn");
  const qrModal = document.getElementById("qrModal");
  const qrImg = document.getElementById("qrImg");
  const qrCloseBtn = document.getElementById("qrCloseBtn");
  const qrCopyBtn = document.getElementById("qrCopyBtn");

  function openQrModal(url) {
    if (qrImg) {
      qrImg.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" +
        encodeURIComponent(url);
    }
    if (qrModal) qrModal.classList.remove("hidden");
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const url = window.location.href;
      if (navigator.share) {
        try {
          await navigator.share({ title: "Bellagio Beach Resort", url });
        } catch (e) {
          // user cancelled share — no action needed
        }
      } else {
        openQrModal(url);
      }
    });
  }

  if (qrCloseBtn) {
    qrCloseBtn.addEventListener("click", () => qrModal.classList.add("hidden"));
  }
  if (qrModal) {
    qrModal.addEventListener("click", (e) => {
      if (e.target === qrModal) qrModal.classList.add("hidden");
    });
  }
  if (qrCopyBtn) {
    qrCopyBtn.addEventListener("click", () => {
      copyToClipboard(window.location.href).then(() => {
        const t = translations[currentLang];
        const original = qrCopyBtn.textContent;
        qrCopyBtn.textContent = t.copiedText;
        setTimeout(() => {
          qrCopyBtn.textContent = original;
        }, 1500);
      });
    });
  }

  applyLang(detectDefaultLang());
})();
