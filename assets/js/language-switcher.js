// Language Switcher
// Manages language switching between English and Persian (Farsi)

(function() {
  'use strict';

  // Translation data
  const translations = {
    en: {
      nav: {
        home: "Home",
        about: "About",
        tools: "Tools",
        resources: "Resources",
        archive: "Archive",
        github: "GitHub"
      },
      hero: {
        title: "Network Analysis & Security Research",
        subtitle: "Professional documentation for penetration testing, network security analysis, and censorship circumvention techniques",
        tools: "Tools",
        tutorials: "Tutorials",
        reports: "Reports"
      },
      search: {
        placeholder: "root@voidblog:~# search..."
      },
      sections: {
        quick_start: "Quick Start",
        latest_reports: "Latest Security Reports",
        recently_updated: "Recently Updated"
      },
      quick_links: {
        vpn_tools: "VPN Tools",
        vpn_desc: "OpenVPN, WireGuard, V2Ray",
        network_analysis: "Network Analysis",
        network_desc: "Wireshark, tcpdump, nmap",
        tutorials: "Tutorials",
        tutorials_desc: "Step-by-step guides",
        security_testing: "Security Testing",
        security_desc: "Penetration testing tools"
      },
      doc_card: {
        min_read: "min read",
        read_more: "Read Documentation →",
        view_all: "View All Reports →",
        updated: "UPDATED"
      },
      footer: {
        disclaimer: "Disclaimer:",
        disclaimer_text: "All content is for educational purposes only. Always ensure compliance with local laws and regulations.",
        tools_resources: "Tools & Resources",
        tutorials: "Tutorials",
        archive: "Archive",
        about: "About"
      },
      offline: {
        cached: "Cached for offline use"
      },
      buttons: {
        scroll_down: "Scroll Down"
      }
    },
    fa: {
      nav: {
        home: "خانه",
        about: "درباره",
        tools: "ابزارها",
        resources: "منابع",
        archive: "آرشیو",
        github: "گیت‌هاب"
      },
      hero: {
        title: "تحلیل شبکه و تحقیقات امنیتی",
        subtitle: "مستندات حرفه‌ای برای تست نفوذ، تحلیل امنیت شبکه و تکنیک‌های دور زدن سانسور",
        tools: "ابزارها",
        tutorials: "آموزش‌ها",
        reports: "گزارش‌ها"
      },
      search: {
        placeholder: "root@voidblog:~# جستجو..."
      },
      sections: {
        quick_start: "شروع سریع",
        latest_reports: "آخرین گزارش‌های امنیتی",
        recently_updated: "به‌روزرسانی اخیر"
      },
      quick_links: {
        vpn_tools: "ابزارهای VPN",
        vpn_desc: "OpenVPN, WireGuard, V2Ray",
        network_analysis: "تحلیل شبکه",
        network_desc: "Wireshark, tcpdump, nmap",
        tutorials: "آموزش‌ها",
        tutorials_desc: "راهنماهای گام به گام",
        security_testing: "تست امنیتی",
        security_desc: "ابزارهای تست نفوذ"
      },
      doc_card: {
        min_read: "دقیقه مطالعه",
        read_more: "خواندن مستندات ←",
        view_all: "مشاهده همه گزارش‌ها ←",
        updated: "به‌روز شده"
      },
      footer: {
        disclaimer: "سلب مسئولیت:",
        disclaimer_text: "تمام محتوا صرفاً برای اهداف آموزشی است. همیشه از رعایت قوانین و مقررات محلی اطمینان حاصل کنید.",
        tools_resources: "ابزارها و منابع",
        tutorials: "آموزش‌ها",
        archive: "آرشیو",
        about: "درباره"
      },
      offline: {
        cached: "ذخیره شده برای استفاده آفلاین"
      },
      buttons: {
        scroll_down: "پایین بروید"
      }
    }
  };

  // Get current language from localStorage or default to English
  function getCurrentLanguage() {
    return localStorage.getItem('preferred-language') || 'en';
  }

  // Set language preference
  function setLanguage(lang) {
    localStorage.setItem('preferred-language', lang);
  }

  // Apply translations to the page
  function applyTranslations(lang) {
    const t = translations[lang];
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'fa' ? 'fa-IR' : 'en-US';
    
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
    
    // Navigation links
    const navLinks = {
      'Home': t.nav.home,
      'About': t.nav.about,
      'Tools': t.nav.tools,
      'Resources': t.nav.resources,
      'Archive': t.nav.archive,
      'GitHub': t.nav.github
    };
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
      const originalText = btn.textContent.trim();
      if (navLinks[originalText]) {
        btn.textContent = navLinks[originalText];
      }
      // Try reverse lookup if switching from Persian to English
      Object.keys(navLinks).forEach(key => {
        if (navLinks[key] === originalText) {
          btn.textContent = lang === 'en' ? key : navLinks[key];
        }
      });
    });
    
    // Hero section
    const heroTitle = document.querySelector('.hero-title-kali');
    if (heroTitle) heroTitle.textContent = t.hero.title;
    
    const heroSubtitle = document.querySelector('.hero-subtitle-kali');
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
    
    // Hero stats
    document.querySelectorAll('.stat-label-kali').forEach((label, index) => {
      const labels = [t.hero.tools, t.hero.tutorials, t.hero.reports];
      if (labels[index]) label.textContent = labels[index];
    });
    
    // Search placeholder
    const searchInput = document.querySelector('#search-input');
    if (searchInput) searchInput.placeholder = t.search.placeholder;
    
    // Section titles
    const sectionTitles = document.querySelectorAll('.section-title-kali');
    sectionTitles.forEach((title, index) => {
      const sectionTexts = [t.sections.quick_start, t.sections.latest_reports, t.sections.recently_updated];
      if (sectionTexts[index]) title.textContent = sectionTexts[index];
    });
    
    // Quick links
    const quickLinkLabels = document.querySelectorAll('.quick-link-label');
    quickLinkLabels.forEach((label, index) => {
      const labels = [t.quick_links.vpn_tools, t.quick_links.network_analysis, t.quick_links.tutorials, t.quick_links.security_testing];
      if (labels[index]) label.textContent = labels[index];
    });
    
    const quickLinkDescs = document.querySelectorAll('.quick-link-desc');
    quickLinkDescs.forEach((desc, index) => {
      const descs = [t.quick_links.vpn_desc, t.quick_links.network_desc, t.quick_links.tutorials_desc, t.quick_links.security_desc];
      if (descs[index]) desc.textContent = descs[index];
    });
    
    // Document cards - reading time
    document.querySelectorAll('.doc-reading-time').forEach(elem => {
      const text = elem.textContent;
      const match = text.match(/(\d+)/);
      if (match) {
        elem.textContent = `${match[1]} ${t.doc_card.min_read}`;
      }
    });
    
    // Update indicator
    document.querySelectorAll('.update-indicator').forEach(elem => {
      elem.textContent = t.doc_card.updated;
    });
    
    // Read more links
    document.querySelectorAll('.doc-read-more').forEach(elem => {
      elem.textContent = t.doc_card.read_more;
    });
    
    // View all button
    const viewAllBtn = document.querySelector('.btn-view-all');
    if (viewAllBtn) viewAllBtn.textContent = t.doc_card.view_all;
    
    // Footer disclaimer
    const disclaimerStrong = document.querySelector('.home-disclaimer strong');
    if (disclaimerStrong) disclaimerStrong.textContent = t.footer.disclaimer;
    
    const disclaimerText = document.querySelector('.home-disclaimer');
    if (disclaimerText && disclaimerText.childNodes.length > 1) {
      disclaimerText.childNodes[1].textContent = ' ' + t.footer.disclaimer_text;
    }
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer-link-item a');
    footerLinks.forEach((link, index) => {
      const links = [t.footer.tools_resources, t.footer.tutorials, t.footer.archive, t.footer.about];
      if (links[index]) link.textContent = links[index];
    });
    
    // Offline indicator
    const offlineIndicator = document.querySelector('#offline-indicator');
    if (offlineIndicator) offlineIndicator.textContent = t.offline.cached;
    
    // Scroll indicator
    const scrollText = document.querySelector('.scroll-text');
    if (scrollText) scrollText.textContent = t.buttons.scroll_down;
  }

  // Toggle language
  function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'fa' : 'en';
    setLanguage(newLang);
    applyTranslations(newLang);
    updateLanguageButton(newLang);
  }

  // Update language button text
  function updateLanguageButton(lang) {
    const btn = document.querySelector('#language-toggle');
    if (btn) {
      btn.textContent = lang === 'en' ? 'فا' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Persian' : 'Switch to English');
    }
  }

  // Initialize language switcher
  function init() {
    const currentLang = getCurrentLanguage();
    
    // Apply translations on page load
    applyTranslations(currentLang);
    
    // Update button state
    updateLanguageButton(currentLang);
    
    // Add event listener to language toggle button
    const languageBtn = document.querySelector('#language-toggle');
    if (languageBtn) {
      languageBtn.addEventListener('click', toggleLanguage);
    }
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
