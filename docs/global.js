// --- global.js ---

document.addEventListener("DOMContentLoaded", () => {

  // --- THEME STEUERUNG (Dark/Light Mode) ---
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  const root = document.documentElement;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
      applyTheme(currentTheme);
    });
  }
  applyTheme(currentTheme);

  // --- SPRACH STEUERUNG (i18n) ---
  const langBtn = document.getElementById('lang-btn');
  let currentLang = localStorage.getItem('lang');

  if (!currentLang) {
    const browserLang = navigator.language || navigator.userLanguage;
    currentLang = browserLang.startsWith('de') ? 'de' : 'en';
  }

  function applyLanguage(lang) {
    document.getElementById('html-tag').lang = lang;
    if (langBtn) {
      langBtn.textContent = lang === 'de' ? '🇬🇧 EN' : '🇩🇪 DE';
    }

    // Prüfen, ob die Seite ein eigenes i18n Wörterbuch definiert hat
    if (typeof i18n !== 'undefined' && i18n[lang]) {

      // 1. Meta-Titel anpassen
      const pageTitle = document.getElementById('page-title');
      if (pageTitle && i18n[lang].pageTitle) {
        pageTitle.textContent = i18n[lang].pageTitle;
      }

      // 2. Spezielle Bilder anpassen (wenn vorhanden)
      const heroImg = document.getElementById('hero-image');
      if (heroImg && i18n[lang].heroImgSrc) {
        heroImg.src = i18n[lang].heroImgSrc;
        heroImg.alt = i18n[lang].heroImgAlt;
      }

      const app1Img = document.getElementById('app1-img');
      if (app1Img && i18n[lang].app1ImgSrc) {
        app1Img.src = i18n[lang].app1ImgSrc;
      }

      // 3. Den Legal-Content für Impressum/Datenschutz füllen (falls existent)
      const legalContent = document.getElementById('legal-content');
      if (legalContent && i18n[lang].legalContent) {
        legalContent.innerHTML = i18n[lang].legalContent;
      }

      // 4. Alle Standard-Texte durchlaufen
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) {
          el.innerHTML = i18n[lang][key];
        }
      });
    }
  }

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'de' ? 'en' : 'de';
      localStorage.setItem('lang', currentLang);
      applyLanguage(currentLang);
    });
  }
  applyLanguage(currentLang);
});
