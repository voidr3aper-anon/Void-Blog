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

  // Filter posts by language on the home page
  function filterPostsByLanguage(lang) {
    // Find all post cards and update items with language attribute
    const postCards = document.querySelectorAll('[data-post-lang]');
    
    postCards.forEach(card => {
      const postLang = card.dataset.postLang || 'en';
      
      if (postLang === lang) {
        card.style.display = ''; // Show posts matching current language
      } else {
        card.style.display = 'none'; // Hide posts not matching
      }
    });
  }

  // Apply translations to the page
  function applyTranslations(lang) {
    const t = translations[lang];
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'fa' ? 'fa-IR' : 'en-US';
    
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';
    
    // Filter posts by language on home page
    filterPostsByLanguage(lang);
    
    // Navigation links - store original text in data attribute if not present
    document.querySelectorAll('.nav-btn').forEach(btn => {
      // Skip the language toggle button
      if (btn.id === 'language-toggle') return;
      
      // Store original English text on first run
      if (!btn.dataset.originalText) {
        btn.dataset.originalText = btn.textContent.trim();
      }
      
      const originalText = btn.dataset.originalText;
      const navLinks = {
        'Home': t.nav.home,
        'About': t.nav.about,
        'Tools': t.nav.tools,
        'Resources': t.nav.resources,
        'Archive': t.nav.archive,
        'GitHub': t.nav.github
      };
      
      if (navLinks[originalText]) {
        btn.textContent = navLinks[originalText];
      }
    });
    
    // Hero section
    const heroTitle = document.querySelector('.hero-title-kali');
    if (heroTitle) heroTitle.textContent = t.hero.title;
    
    const heroSubtitle = document.querySelector('.hero-subtitle-kali');
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
    
    // Hero stats
    // Note: Uses array indices for mapping. If DOM order changes, update indices accordingly.
    const statLabels = document.querySelectorAll('.stat-label-kali');
    const labels = [t.hero.tools, t.hero.tutorials, t.hero.reports];
    statLabels.forEach((label, index) => {
      if (labels[index]) label.textContent = labels[index];
    });
    
    // Search placeholder
    const searchInput = document.querySelector('#search-input');
    if (searchInput) searchInput.placeholder = t.search.placeholder;
    
    // Section titles
    // Note: Uses array indices. Titles appear in this order: Quick Start, Latest Reports, Recently Updated
    const sectionTitles = document.querySelectorAll('.section-title-kali');
    const sectionTexts = [t.sections.quick_start, t.sections.latest_reports, t.sections.recently_updated];
    sectionTitles.forEach((title, index) => {
      if (sectionTexts[index]) title.textContent = sectionTexts[index];
    });
    
    // Quick links
    // Note: Uses array indices. Links appear in order: VPN, Network Analysis, Tutorials, Security Testing
    const quickLinkLabels = document.querySelectorAll('.quick-link-label');
    const linkLabels = [t.quick_links.vpn_tools, t.quick_links.network_analysis, t.quick_links.tutorials, t.quick_links.security_testing];
    quickLinkLabels.forEach((label, index) => {
      if (linkLabels[index]) label.textContent = linkLabels[index];
    });
    
    const quickLinkDescs = document.querySelectorAll('.quick-link-desc');
    const linkDescs = [t.quick_links.vpn_desc, t.quick_links.network_desc, t.quick_links.tutorials_desc, t.quick_links.security_desc];
    quickLinkDescs.forEach((desc, index) => {
      if (linkDescs[index]) desc.textContent = linkDescs[index];
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
    // Note: Uses array indices. Links appear in order: Tools & Resources, Tutorials, Archive, About
    const footerLinks = document.querySelectorAll('.footer-link-item a');
    const footerLinkTexts = [t.footer.tools_resources, t.footer.tutorials, t.footer.archive, t.footer.about];
    footerLinks.forEach((link, index) => {
      if (footerLinkTexts[index]) link.textContent = footerLinkTexts[index];
    });
    
    // Offline indicator
    const offlineIndicator = document.querySelector('#offline-indicator');
    if (offlineIndicator) offlineIndicator.textContent = t.offline.cached;
    
    // Scroll indicator
    const scrollText = document.querySelector('.scroll-text');
    if (scrollText) scrollText.textContent = t.buttons.scroll_down;
  }

  // Check if we're on a post page and find alternate language version
  function getAlternateLanguageUrl(currentLang, newLang) {
    const currentPath = window.location.pathname;
    
    // Split path and filter empty segments
    const pathSegments = currentPath.split('/').filter(s => s.length > 0);
    
    console.log('Checking if post page:', { 
      currentPath, 
      pathSegments, 
      segmentCount: pathSegments.length 
    });
    
    // A post URL has the pattern: /baseurl/category/post-title/
    // After filtering empty segments, we should have at least 3 parts for a post
    // (e.g., ['Void-Blog', 'network-monitoring', 'report-of-state'])
    // Regular pages have 2 or less (e.g., ['Void-Blog', 'about'])
    if (pathSegments.length < 3) {
      console.log('Not a post page - too few segments');
      return null; // Not enough segments to be a post
    }
    
    // Try to find alternate version by swapping -fa suffix
    let alternatePath;
    if (newLang === 'fa') {
      // Switching to Persian: add -fa before the trailing slash or end
      // Handle both /path/ and /path formats
      if (currentPath.endsWith('/')) {
        alternatePath = currentPath.slice(0, -1) + '-fa/';
      } else {
        alternatePath = currentPath + '-fa/';
      }
    } else {
      // Switching to English: remove -fa (and optional trailing slash)
      // More robust pattern to handle -fa at end of path
      alternatePath = currentPath.replace(/-fa\/?$/, '/');
    }
    
    console.log('Language switch:', {
      currentPath,
      pathSegments,
      currentLang,
      newLang,
      alternatePath,
      willRedirect: alternatePath !== currentPath
    });
    
    return alternatePath;
  }

  // Toggle language
  function toggleLanguage() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'fa' : 'en';
    
    // Check if we need to navigate to a different page
    const alternatePath = getAlternateLanguageUrl(currentLang, newLang);
    
    console.log('Toggle language:', {
      currentLang,
      newLang,
      currentPath: window.location.pathname,
      alternatePath,
      shouldRedirect: alternatePath && alternatePath !== window.location.pathname
    });
    
    if (alternatePath && alternatePath !== window.location.pathname) {
      // We're on a post and an alternate version exists
      // Save language preference and navigate
      setLanguage(newLang);
      console.log('Redirecting to:', alternatePath);
      window.location.href = alternatePath;
    } else {
      // Just switch UI language on current page
      console.log('Switching UI only');
      setLanguage(newLang);
      applyTranslations(newLang);
      updateLanguageButton(newLang);
    }
  }

  // Update language button text
  function updateLanguageButton(lang) {
    const btn = document.querySelector('#language-toggle');
    if (btn) {
      btn.textContent = lang === 'en' ? 'فا' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Persian' : 'Switch to English');
    }
  }

  // Detect page language from URL or meta tags
  function detectPageLanguage() {
    // Check if URL ends with -fa (Persian version)
    const currentPath = window.location.pathname;
    if (currentPath.includes('-fa/') || currentPath.endsWith('-fa')) {
      return 'fa';
    }
    
    // Check meta tags or HTML lang attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang && htmlLang.startsWith('fa')) {
      return 'fa';
    }
    
    // Default to stored preference or English
    return getCurrentLanguage();
  }

  // Initialize language switcher
  function init() {
    // Detect language from page context first
    const detectedLang = detectPageLanguage();
    
    // If detected language differs from stored, update stored preference
    const storedLang = getCurrentLanguage();
    if (detectedLang !== storedLang) {
      setLanguage(detectedLang);
    }
    
    const currentLang = detectedLang;
    
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
