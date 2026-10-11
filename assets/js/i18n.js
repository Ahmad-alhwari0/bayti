/* =========================================================
   i18n — نظام اللغتين
   - <span data-i18n="hero.title"></span>            → بيحط النص
   - <input data-i18n-placeholder="search.hint">       → بيحط الـ placeholder
   - <button data-i18n-aria="nav.menu">                → بيحط aria-label
   - بالـ JS: I18n.t('hero.title')
   - لما اللغة تتغير بيطلع event اسمه 'langchange'، والصفحات الي بترسم
     محتوى بالـ JS بتسمعله وبتعيد الرسم.
   لازم ينحط بالـ <head> بعد رابط Bootstrap وبعد ar.js و en.js
   ========================================================= */
(function () {
  const DICTS = { ar: window.I18N_AR, en: window.I18N_EN };
  const STORAGE_KEY = "bayti-lang";
  const BOOTSTRAP = {
    rtl: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css",
    ltr: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  };

  function readLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "ar";
    } catch (e) {
      return "ar";
    }
  }
  function saveLang(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* private mode */
    }
  }

  let lang = readLang();
  if (!DICTS[lang]) lang = "ar";

  function t(key) {
    const value = key
      .split(".")
      .reduce((obj, part) => (obj ? obj[part] : undefined), DICTS[lang]);
    if (value === undefined) {
      console.warn("[i18n] missing key:", key);
      return key;
    }
    return value;
  }

  function applyDirection() {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    const link = document.getElementById("bootstrap-css");
    const href = lang === "ar" ? BOOTSTRAP.rtl : BOOTSTRAP.ltr;
    if (link && link.getAttribute("href") !== href)
      link.setAttribute("href", href);
  }

  function translate(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    root.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });
  }

  function setLang(next) {
    if (!DICTS[next] || next === lang) return;
    lang = next;
    saveLang(lang);
    applyDirection();
    translate();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  // بنضبط الاتجاه فورا (قبل ما الصفحة ترسم) عشان ما يصير وميض
  applyDirection();
  document.addEventListener("DOMContentLoaded", () => translate());

  window.I18n = {
    t,
    translate,
    setLang,
    toggle: () => setLang(lang === "ar" ? "en" : "ar"),
    get lang() {
      return lang;
    },
  };
})();
