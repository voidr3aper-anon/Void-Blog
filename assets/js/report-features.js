// Advanced Report Features for Technical Blog
(function() {
  'use strict';

  // ===== Reading Progress Indicator =====
  function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    
    // Calculate top nav bar height
    const topNav = document.querySelector('.top-nav-bar');
    const navHeight = topNav ? topNav.offsetHeight : 0;
    
    progressBar.style.cssText = `
      position: fixed;
      top: ${navHeight}px;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #2563eb, #f59e0b);
      z-index: 999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Prevent division by zero for very short content
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    });
  }

  // ===== Print Optimization =====
  function initPrintOptimization() {
    const printBtn = document.getElementById('print-report');
    if (!printBtn) return;

    printBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.print();
    });
  }

  // ===== Export to PDF (using browser print) =====
  function initPDFExport() {
    const pdfBtn = document.getElementById('export-pdf');
    if (!pdfBtn) return;

    pdfBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Add print-optimized class
      document.body.classList.add('print-mode');
      window.print();
      // Remove after print dialog closes
      setTimeout(function() {
        document.body.classList.remove('print-mode');
      }, 1000);
    });
  }

  // ===== Citation Generator =====
  function initCitationGenerator() {
    const citationBtn = document.getElementById('generate-citation');
    if (!citationBtn) return;

    citationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const title = document.querySelector('.post-title')?.textContent || document.title;
      const author = 'Void Blog';
      const dateElement = document.querySelector('.report-metadata time');
      const date = dateElement ? dateElement.getAttribute('datetime') : new Date().toISOString().split('T')[0];
      const url = window.location.href;
      const accessDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      // APA Format
      const apa = `${author}. (${date}). ${title}. Retrieved ${accessDate}, from ${url}`;
      
      // MLA Format
      const mla = `"${title}." ${author}, ${date}, ${url}. Accessed ${accessDate}.`;
      
      // Chicago Format
      const chicago = `${author}. "${title}." ${date}. ${url}.`;

      // Display citation modal
      showCitationModal(apa, mla, chicago);
    });
  }

  function showCitationModal(apa, mla, chicago) {
    const modal = document.createElement('div');
    modal.className = 'citation-modal';
    modal.innerHTML = `
      <div class="citation-content">
        <h3>📚 Cite This Report</h3>
        <div class="citation-format">
          <h4>APA Format</h4>
          <p class="citation-text">${escapeHtml(apa)}</p>
          <button class="copy-citation" data-text="${escapeHtml(apa)}">Copy</button>
        </div>
        <div class="citation-format">
          <h4>MLA Format</h4>
          <p class="citation-text">${escapeHtml(mla)}</p>
          <button class="copy-citation" data-text="${escapeHtml(mla)}">Copy</button>
        </div>
        <div class="citation-format">
          <h4>Chicago Format</h4>
          <p class="citation-text">${escapeHtml(chicago)}</p>
          <button class="copy-citation" data-text="${escapeHtml(chicago)}">Copy</button>
        </div>
        <button class="close-modal">Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Copy citation
    modal.querySelectorAll('.copy-citation').forEach(btn => {
      btn.addEventListener('click', function() {
        const text = this.getAttribute('data-text');
        navigator.clipboard.writeText(text).then(() => {
          this.textContent = '✓ Copied!';
          setTimeout(() => { this.textContent = 'Copy'; }, 2000);
        });
      });
    });

    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  // ===== Bookmarking System (localStorage) =====
  function initBookmarkSystem() {
    const bookmarkBtn = document.getElementById('bookmark-post');
    if (!bookmarkBtn) return;

    const postUrl = window.location.pathname;
    const bookmarks = JSON.parse(localStorage.getItem('void-blog-bookmarks') || '[]');
    
    // Check if already bookmarked
    if (bookmarks.includes(postUrl)) {
      bookmarkBtn.classList.add('bookmarked');
      bookmarkBtn.innerHTML = '🔖 Bookmarked';
    }

    bookmarkBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (bookmarks.includes(postUrl)) {
        // Remove bookmark
        const index = bookmarks.indexOf(postUrl);
        bookmarks.splice(index, 1);
        this.classList.remove('bookmarked');
        this.innerHTML = '📑 Bookmark';
      } else {
        // Add bookmark
        bookmarks.push(postUrl);
        this.classList.add('bookmarked');
        this.innerHTML = '🔖 Bookmarked';
      }
      
      localStorage.setItem('void-blog-bookmarks', JSON.stringify(bookmarks));
    });
  }

  // ===== Collapsible Sections =====
  function initCollapsibleSections() {
    const collapsibles = document.querySelectorAll('.collapsible-section');
    
    collapsibles.forEach(section => {
      const header = section.querySelector('.collapsible-header');
      const content = section.querySelector('.collapsible-content');
      
      if (!header || !content) return;

      header.addEventListener('click', function() {
        section.classList.toggle('collapsed');
        
        if (section.classList.contains('collapsed')) {
          content.style.maxHeight = '0';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  // ===== Report Metadata Display =====
  function initReportMetadata() {
    const metadata = document.querySelector('.report-metadata');
    if (!metadata) return;

    // Add version tracking
    const version = metadata.dataset.version || '1.0';
    const publishDate = metadata.dataset.published;
    const lastModified = metadata.dataset.modified;
    
    if (lastModified && lastModified !== publishDate) {
      const badge = document.createElement('span');
      badge.className = 'metadata-badge updated';
      badge.textContent = 'Updated';
      metadata.appendChild(badge);
    }
  }

  // ===== Footnotes System =====
  function initFootnotes() {
    const footnoteRefs = document.querySelectorAll('.footnote-ref');
    
    footnoteRefs.forEach((ref, index) => {
      ref.textContent = `[${index + 1}]`;
      ref.setAttribute('title', 'Jump to footnote');
      
      ref.addEventListener('click', function(e) {
        e.preventDefault();
        const footnoteId = this.getAttribute('href');
        const footnote = document.querySelector(footnoteId);
        if (footnote) {
          footnote.scrollIntoView({ behavior: 'smooth', block: 'center' });
          footnote.classList.add('highlight-footnote');
          setTimeout(() => footnote.classList.remove('highlight-footnote'), 2000);
        }
      });
    });
  }

  // ===== Table of Figures =====
  function initTableOfFigures() {
    const tofContainer = document.getElementById('table-of-figures');
    if (!tofContainer) return;

    const figures = document.querySelectorAll('figure, img[alt]');
    if (figures.length === 0) {
      tofContainer.style.display = 'none';
      return;
    }

    const list = document.createElement('ol');
    list.className = 'tof-list';

    figures.forEach((figure, index) => {
      const caption = figure.querySelector('figcaption')?.textContent || 
                     figure.getAttribute('alt') || 
                     `Figure ${index + 1}`;
      
      const id = `figure-${index + 1}`;
      figure.id = id;

      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = caption;
      link.addEventListener('click', function(e) {
        e.preventDefault();
        figure.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });

      listItem.appendChild(link);
      list.appendChild(listItem);
    });

    tofContainer.appendChild(list);
  }

  // ===== Syntax Highlighting Theme Switcher =====
  function initSyntaxThemeSwitcher() {
    const switcher = document.getElementById('syntax-theme-switcher');
    if (!switcher) return;

    const currentTheme = localStorage.getItem('syntax-theme') || 'dark';
    document.documentElement.setAttribute('data-syntax-theme', currentTheme);

    switcher.addEventListener('change', function() {
      const theme = this.value;
      document.documentElement.setAttribute('data-syntax-theme', theme);
      localStorage.setItem('syntax-theme', theme);
    });
  }

  // ===== Section Anchors with Copy =====
  function initSectionAnchors() {
    const headings = document.querySelectorAll('.post-content h2[id], .post-content h3[id]');
    
    headings.forEach(heading => {
      const anchor = document.createElement('a');
      anchor.className = 'section-anchor';
      anchor.href = `#${heading.id}`;
      anchor.innerHTML = '🔗';
      anchor.title = 'Copy link to section';
      
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const url = window.location.origin + window.location.pathname + this.getAttribute('href');
        navigator.clipboard.writeText(url).then(() => {
          this.innerHTML = '✓';
          setTimeout(() => { this.innerHTML = '🔗'; }, 2000);
        });
      });
      
      heading.appendChild(anchor);
    });
  }

  // ===== Report Statistics =====
  function initReportStatistics() {
    const statsContainer = document.querySelector('.report-statistics');
    if (!statsContainer) return;

    const article = document.querySelector('.post-content');
    if (!article) return;

    const text = article.innerText;
    // Reuse word count logic from reading time calculation
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const charCount = text.length;
    const paragraphs = article.querySelectorAll('p').length;
    const codeBlocks = article.querySelectorAll('pre, code').length;
    const images = article.querySelectorAll('img, figure').length;
    const links = article.querySelectorAll('a').length;

    const stats = {
      'Words': wordCount.toLocaleString(),
      'Characters': charCount.toLocaleString(),
      'Paragraphs': paragraphs,
      'Code Blocks': codeBlocks,
      'Images': images,
      'Links': links
    };

    let html = '<div class="stats-grid">';
    for (const [key, value] of Object.entries(stats)) {
      html += `
        <div class="stat-item">
          <span class="stat-value">${value}</span>
          <span class="stat-label">${key}</span>
        </div>
      `;
    }
    html += '</div>';

    statsContainer.innerHTML = html;
  }

  // ===== Keyboard Shortcuts =====
  function initKeyboardShortcuts() {
    const shortcuts = {
      '?': showShortcutsHelp,
      '/': focusSearch,
      'b': scrollToTop,
      'c': showCitation,
      'p': printPage,
      's': toggleSidebar
    };

    document.addEventListener('keydown', function(e) {
      // Ignore if typing in input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      const key = e.key.toLowerCase();
      if (shortcuts[key]) {
        e.preventDefault();
        shortcuts[key]();
      }
    });

    function showShortcutsHelp() {
      const modal = document.createElement('div');
      modal.className = 'shortcuts-modal';
      modal.innerHTML = `
        <div class="shortcuts-content">
          <h3>⌨️ Keyboard Shortcuts</h3>
          <table class="shortcuts-table">
            <tr><td><kbd>?</kbd></td><td>Show this help</td></tr>
            <tr><td><kbd>/</kbd></td><td>Focus search</td></tr>
            <tr><td><kbd>b</kbd></td><td>Back to top</td></tr>
            <tr><td><kbd>c</kbd></td><td>Generate citation</td></tr>
            <tr><td><kbd>p</kbd></td><td>Print page</td></tr>
            <tr><td><kbd>s</kbd></td><td>Toggle sidebar</td></tr>
            <tr><td><kbd>Esc</kbd></td><td>Close modals</td></tr>
          </table>
          <button class="close-modal">Close</button>
        </div>
      `;
      document.body.appendChild(modal);
      modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    }

    function focusSearch() {
      const searchInput = document.getElementById('search-input');
      if (searchInput) searchInput.focus();
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showCitation() {
      const citationBtn = document.getElementById('generate-citation');
      if (citationBtn) citationBtn.click();
    }

    function printPage() {
      window.print();
    }

    function toggleSidebar() {
      const toc = document.getElementById('table-of-contents');
      if (toc) {
        toc.style.display = toc.style.display === 'none' ? 'block' : 'none';
      }
    }

    // Close modals with Esc
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.citation-modal, .shortcuts-modal').forEach(m => m.remove());
      }
    });
  }

  // ===== Version History Tracker =====
  function initVersionHistory() {
    const versionContainer = document.querySelector('.version-history');
    if (!versionContainer) return;

    const versions = versionContainer.dataset.versions;
    if (!versions) return;

    try {
      const versionData = JSON.parse(versions);
      let html = '<div class="version-list">';
      
      versionData.forEach(version => {
        html += `
          <div class="version-item">
            <div class="version-header">
              <span class="version-number">v${version.number}</span>
              <span class="version-date">${version.date}</span>
            </div>
            <div class="version-changes">
              ${version.changes.map(change => `<li>${change}</li>`).join('')}
            </div>
          </div>
        `;
      });
      
      html += '</div>';
      versionContainer.innerHTML = html;
    } catch (e) {
      console.error('Failed to parse version history:', e);
    }
  }

  // ===== Quick Navigation Menu =====
  function initQuickNav() {
    const quickNavBtn = document.getElementById('quick-nav-btn');
    if (!quickNavBtn) return;

    const quickNav = document.createElement('div');
    quickNav.className = 'quick-nav-menu hidden';
    quickNav.innerHTML = `
      <div class="quick-nav-content">
        <h4>Quick Navigation</h4>
        <ul class="quick-nav-list">
          <li><a href="#table-of-contents">📑 Table of Contents</a></li>
          <li><a href="#report-statistics">📊 Statistics</a></li>
          <li><a href=".social-sharing">📢 Share</a></li>
          <li><a href=".related-posts">🔗 Related</a></li>
          <li><button id="scroll-to-bottom">⬇️ Scroll to Bottom</button></li>
        </ul>
      </div>
    `;
    
    document.body.appendChild(quickNav);

    quickNavBtn.addEventListener('click', () => {
      quickNav.classList.toggle('hidden');
    });

    quickNav.querySelector('#scroll-to-bottom').addEventListener('click', () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      quickNav.classList.add('hidden');
    });

    quickNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        quickNav.classList.add('hidden');
      });
    });
  }

  // ===== Last Updated Indicator =====
  function initLastUpdated() {
    const metadata = document.querySelector('.report-metadata');
    if (!metadata) return;

    const publishDate = new Date(metadata.dataset.published);
    const modifiedDate = new Date(metadata.dataset.modified);
    
    if (modifiedDate > publishDate) {
      const daysSinceUpdate = Math.floor((new Date() - modifiedDate) / (1000 * 60 * 60 * 24));
      
      if (daysSinceUpdate < 7) {
        const badge = document.createElement('span');
        badge.className = 'freshness-badge recent';
        badge.textContent = 'Recently Updated';
        badge.title = `Updated ${daysSinceUpdate} day(s) ago`;
        metadata.appendChild(badge);
      } else if (daysSinceUpdate > 365) {
        const badge = document.createElement('span');
        badge.className = 'freshness-badge old';
        badge.textContent = 'May Be Outdated';
        badge.title = `Last updated ${Math.floor(daysSinceUpdate / 365)} year(s) ago`;
        metadata.appendChild(badge);
      }
    }
  }

  // Helper function
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Initialize all features
  function init() {
    initReadingProgress();
    initPrintOptimization();
    initPDFExport();
    initCitationGenerator();
    initBookmarkSystem();
    initCollapsibleSections();
    initReportMetadata();
    initFootnotes();
    initTableOfFigures();
    initSyntaxThemeSwitcher();
    initSectionAnchors();
    initReportStatistics();
    initKeyboardShortcuts();
    initVersionHistory();
    initQuickNav();
    initLastUpdated();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
