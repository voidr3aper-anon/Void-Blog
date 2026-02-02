// Enhanced blog features
(function() {
  'use strict';

  // Back to top button
  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Copy code button for code blocks
  function initCopyCode() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(function(codeBlock) {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      codeBlock.parentNode.insertBefore(wrapper, codeBlock);
      wrapper.appendChild(codeBlock);

      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-btn';
      copyButton.innerHTML = 'Copy';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      
      wrapper.appendChild(copyButton);

      copyButton.addEventListener('click', function() {
        const code = codeBlock.querySelector('code');
        const text = code ? code.innerText : codeBlock.innerText;
        
        navigator.clipboard.writeText(text).then(function() {
          copyButton.innerHTML = 'Copied';
          copyButton.classList.add('copied');
          
          setTimeout(function() {
            copyButton.innerHTML = 'Copy';
            copyButton.classList.remove('copied');
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy:', err);
          copyButton.innerHTML = 'Failed';
          setTimeout(function() {
            copyButton.innerHTML = 'Copy';
          }, 2000);
        });
      });
    });
  }

  // Reading time calculation
  function calculateReadingTime() {
    const article = document.querySelector('.post-content');
    if (!article) return;

    const text = article.innerText;
    const wordCount = text.split(/\s+/).length;
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    const readingTimeElement = document.querySelector('.reading-time');
    if (readingTimeElement) {
      readingTimeElement.textContent = readingTime + ' min read';
    }
  }

  // Table of contents generator
  function generateTOC() {
    const tocContainer = document.getElementById('table-of-contents');
    if (!tocContainer) return;

    const article = document.querySelector('.post-content');
    if (!article) return;

    const headings = article.querySelectorAll('h2, h3');
    if (headings.length === 0) {
      tocContainer.style.display = 'none';
      return;
    }

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach(function(heading, index) {
      const id = 'heading-' + index;
      heading.id = id;

      const listItem = document.createElement('li');
      listItem.className = 'toc-item toc-' + heading.tagName.toLowerCase();
      listItem.dataset.target = id;

      const link = document.createElement('a');
      link.href = '#' + id;
      link.textContent = heading.textContent;
      link.addEventListener('click', function(e) {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, null, '#' + id);
        
        // Close mobile TOC after clicking
        if (window.innerWidth <= 768) {
          const sidebar = document.querySelector('.sidebar-toc');
          const overlay = document.querySelector('.toc-overlay');
          if (sidebar) sidebar.classList.remove('active');
          if (overlay) overlay.classList.remove('active');
        }
      });

      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);
    
    // Initialize scroll spy for TOC
    initTOCScrollSpy();
    
    // Initialize mobile TOC toggle
    initMobileTOC();
  }

  // Highlight current section in TOC based on scroll position
  function initTOCScrollSpy() {
    const tocItems = document.querySelectorAll('.toc-item');
    if (tocItems.length === 0) return;

    const tocWrapper = document.querySelector('.toc-wrapper');
    const sidebar = document.querySelector('.sidebar-toc');
    if (!tocWrapper) return;

    // Constants for better maintainability
    const SCROLL_THROTTLE_DELAY = 16; // ~60fps for ultra-responsive tracking (16.67ms = 60fps exactly)
    const EASING_FACTOR = 0.08; // Ultra-smooth movement (lower = smoother, less jumpy)
    const BOTTOM_THRESHOLD = 100; // Pixels from bottom to activate bottom detection
    
    let currentTOCScroll = tocWrapper.scrollTop;
    let targetTOCScroll = currentTOCScroll;
    let animationFrameId = null;

    function updateActiveTOC() {
      const scrollPos = window.scrollY + 100;
      const headings = document.querySelectorAll('.post-content h2, .post-content h3');
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      let currentHeading = null;
      
      // Find current heading based on scroll position
      headings.forEach(function(heading) {
        if (heading.offsetTop <= scrollPos) {
          currentHeading = heading;
        }
      });
      
      // Special handling for bottom of page
      // When near bottom, ensure we stay on the last heading for proper TOC tracking
      const nearBottom = (window.scrollY + windowHeight) >= (documentHeight - BOTTOM_THRESHOLD);
      if (nearBottom && headings.length > 0) {
        currentHeading = headings[headings.length - 1];
      }

      tocItems.forEach(function(item) {
        item.classList.remove('active');
      });

      if (currentHeading) {
        const activeItem = document.querySelector(`.toc-item[data-target="${currentHeading.id}"]`);
        if (activeItem) {
          activeItem.classList.add('active');
          
          const isMobile = window.innerWidth <= 768;
          const isSidebarOpen = sidebar && sidebar.classList.contains('active');
          
          // Auto-scroll on PC or when sidebar is open on mobile
          if (!isMobile || isSidebarOpen) {
            updateTOCScrollTarget(activeItem);
          }
        }
      }
    }

    function updateTOCScrollTarget(activeItem) {
      if (!activeItem) return;
      
      // Get the position of the active item relative to the wrapper
      const itemOffsetInWrapper = activeItem.offsetTop;
      const wrapperHeight = tocWrapper.clientHeight;
      const itemHeight = activeItem.clientHeight;
      
      // Calculate target scroll position to center the item
      let newTargetScrollTop = itemOffsetInWrapper - (wrapperHeight / 2) + (itemHeight / 2);
      
      // Ensure we don't scroll beyond the boundaries with proper calculation
      const maxScroll = Math.max(0, tocWrapper.scrollHeight - wrapperHeight);
      targetTOCScroll = Math.max(0, Math.min(newTargetScrollTop, maxScroll));
      
      // Start smooth animation if not already running
      if (!animationFrameId) {
        smoothScrollTOC();
      }
    }

    function smoothScrollTOC() {
      const isMobile = window.innerWidth <= 768;
      const isSidebarOpen = sidebar && sidebar.classList.contains('active');
      
      // Only animate if TOC is visible
      if (isMobile && !isSidebarOpen) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        return;
      }
      
      // Calculate the difference between current and target
      const diff = targetTOCScroll - currentTOCScroll;
      
      // If difference is very small, snap to target (reduced threshold for smoother feel)
      if (Math.abs(diff) < 0.1) {
        currentTOCScroll = targetTOCScroll;
        tocWrapper.scrollTop = currentTOCScroll;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = null;
        return;
      }
      
      // Ease towards target - ultra-smooth, gradual movement
      currentTOCScroll += diff * EASING_FACTOR;
      tocWrapper.scrollTop = currentTOCScroll;
      
      // Continue animation
      animationFrameId = requestAnimationFrame(smoothScrollTOC);
    }

    // Throttle scroll events for better performance
    let throttleTimeout;
    function throttledUpdate() {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(function() {
          updateActiveTOC();
          throttleTimeout = null;
        }, SCROLL_THROTTLE_DELAY);
      }
    }

    window.addEventListener('scroll', throttledUpdate);
    updateActiveTOC(); // Initial check
  }

  // Mobile TOC toggle functionality
  function initMobileTOC() {
    // Create mobile toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toc-mobile-toggle';
    toggleBtn.innerHTML = '📑';
    toggleBtn.title = 'Table of Contents';
    document.body.appendChild(toggleBtn);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'toc-overlay';
    document.body.appendChild(overlay);

    const sidebar = document.querySelector('.sidebar-toc');
    if (!sidebar) return; // Guard clause if sidebar doesn't exist
    
    const tocWrapper = sidebar.querySelector('.toc-wrapper');
    
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      
      // Scroll TOC to active item when opening
      if (sidebar.classList.contains('active') && tocWrapper) {
        const activeItem = tocWrapper.querySelector('.toc-item.active');
        if (activeItem) {
          // Center the active item in the TOC view (consistent with desktop implementation)
          const itemOffsetInWrapper = activeItem.offsetTop;
          const wrapperHeight = tocWrapper.clientHeight;
          const itemHeight = activeItem.clientHeight;
          const scrollPosition = itemOffsetInWrapper - (wrapperHeight / 2) + (itemHeight / 2);
          tocWrapper.scrollTop = Math.max(0, scrollPosition);
        }
      }
    });

    overlay.addEventListener('click', function() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Animate elements on scroll
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.post-item, .category-card');
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // Social sharing
  function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.dataset.platform;
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        let shareUrl = '';
        switch(platform) {
          case 'twitter':
            shareUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
            break;
          case 'telegram':
            shareUrl = 'https://t.me/share/url?url=' + url + '&text=' + title;
            break;
          case 'linkedin':
            shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
            break;
          case 'reddit':
            shareUrl = 'https://reddit.com/submit?url=' + url + '&title=' + title;
            break;
        }
        
        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
      });
    });
  }

  // Enhanced copy section links - add copy button to each heading
  function initCopySectionLinks() {
    const article = document.querySelector('.post-content');
    if (!article) return;
    
    const headings = article.querySelectorAll('h2, h3, h4');
    
    headings.forEach(function(heading) {
      if (!heading.id) return; // Skip headings without IDs
      
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-section-link';
      copyBtn.innerHTML = '#';
      copyBtn.title = 'Copy link to this section';
      copyBtn.setAttribute('aria-label', 'Copy link to section');
      
      copyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const url = window.location.origin + window.location.pathname + '#' + heading.id;
        
        navigator.clipboard.writeText(url).then(function() {
          copyBtn.innerHTML = '✓';
          copyBtn.classList.add('copied');
          
          setTimeout(function() {
            copyBtn.innerHTML = '#';
            copyBtn.classList.remove('copied');
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy link:', err);
          copyBtn.innerHTML = '✗';
          setTimeout(function() {
            copyBtn.innerHTML = '#';
          }, 2000);
        });
      });
      
      heading.appendChild(copyBtn);
    });
  }

  // Phase 2 Feature: Last Position Memory - Remember scroll position
  function initScrollPositionMemory() {
    const pageKey = 'scroll_pos_' + window.location.pathname;
    
    // Restore scroll position on page load
    const savedPosition = sessionStorage.getItem(pageKey);
    if (savedPosition) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(function() {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }, 100);
    }
    
    // Save scroll position before leaving page
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        sessionStorage.setItem(pageKey, window.pageYOffset);
      }, 150);
    });
    
    // Also save on page unload
    window.addEventListener('beforeunload', function() {
      sessionStorage.setItem(pageKey, window.pageYOffset);
    });
  }

  // Phase 3 Feature: Command Palette (Ctrl+K Quick Navigation)
  function initCommandPalette() {
    // Create command palette HTML
    const paletteHTML = `
      <div id="command-palette" class="command-palette">
        <div class="command-palette-content">
          <div class="command-palette-header">
            <input type="text" id="command-input" class="command-input" placeholder="Type to search pages and commands..." autofocus>
            <span class="command-shortcut">ESC to close</span>
          </div>
          <div id="command-results" class="command-results"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', paletteHTML);
    
    const palette = document.getElementById('command-palette');
    const commandInput = document.getElementById('command-input');
    const commandResults = document.getElementById('command-results');
    
    // Fetch posts data for navigation
    const baseUrl = window.location.pathname.includes('/Void-Blog/') ? '/Void-Blog' : '';
    let allPages = [];
    fetch(baseUrl + '/search.json')
      .then(response => response.json())
      .then(data => {
        allPages = data;
      })
      .catch(err => console.error('Command palette initialization failed:', err));
    
    // Keyboard shortcut to open (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', function(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
      }
      
      // Close on ESC
      if (e.key === 'Escape' && palette.classList.contains('active')) {
        closeCommandPalette();
      }
    });
    
    function openCommandPalette() {
      palette.classList.add('active');
      commandInput.value = '';
      commandInput.focus();
      updateCommandResults('');
    }
    
    function closeCommandPalette() {
      palette.classList.remove('active');
    }
    
    // Click outside to close
    palette.addEventListener('click', function(e) {
      if (e.target === palette) {
        closeCommandPalette();
      }
    });
    
    // Search as you type
    commandInput.addEventListener('input', function() {
      updateCommandResults(commandInput.value.toLowerCase());
    });
    
    // Navigate with arrow keys and enter
    let selectedIndex = -1;
    commandInput.addEventListener('keydown', function(e) {
      const items = commandResults.querySelectorAll('.command-item');
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateSelection(items);
      } else if (e.key === 'Enter' && selectedIndex >= 0 && items[selectedIndex]) {
        e.preventDefault();
        items[selectedIndex].click();
      }
    });
    
    function updateSelection(items) {
      items.forEach(function(item, index) {
        if (index === selectedIndex) {
          item.classList.add('selected');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('selected');
        }
      });
    }
    
    function updateCommandResults(query) {
      selectedIndex = -1;
      commandResults.innerHTML = '';
      
      // Static commands
      const commands = [
        { title: 'Home', url: baseUrl + '/', icon: '🏠', type: 'page' },
        { title: 'Tools', url: baseUrl + '/tools/', icon: '🛠️', type: 'page' },
        { title: 'Resources', url: baseUrl + '/resources/', icon: '📚', type: 'page' },
        { title: 'Archive', url: baseUrl + '/archive/', icon: '📁', type: 'page' },
        { title: 'Security', url: baseUrl + '/security/', icon: '🔐', type: 'page' },
        { title: 'About', url: baseUrl + '/about/', icon: 'ℹ️', type: 'page' }
      ];
      
      // Filter and show results
      let results = [...commands];
      
      // Add posts
      if (allPages.length > 0) {
        allPages.forEach(function(post) {
          results.push({
            title: post.title,
            url: post.url,
            icon: '📄',
            type: 'post',
            category: post.categories
          });
        });
      }
      
      // Filter by query
      if (query) {
        results = results.filter(function(item) {
          return item.title.toLowerCase().includes(query) ||
                 (item.category && item.category.toLowerCase().includes(query));
        });
      }
      
      // Limit to 10 results
      results = results.slice(0, 10);
      
      if (results.length === 0) {
        commandResults.innerHTML = '<div class="command-no-results">No results found</div>';
        return;
      }
      
      // Display results
      results.forEach(function(item) {
        const div = document.createElement('div');
        div.className = 'command-item';
        div.innerHTML = `
          <span class="command-icon">${item.icon}</span>
          <span class="command-title">${item.title}</span>
          ${item.category ? `<span class="command-category">${item.category}</span>` : ''}
        `;
        div.addEventListener('click', function() {
          window.location.href = item.url;
        });
        commandResults.appendChild(div);
      });
    }
  }

  // Phase 3 Feature: Related Documents
  function initRelatedDocuments() {
    const relatedContainer = document.getElementById('related-documents');
    if (!relatedContainer) return;
    
    const currentUrl = window.location.pathname;
    const currentCategories = Array.from(document.querySelectorAll('.category-tag')).map(function(tag) {
      return tag.textContent.trim();
    });
    
    if (currentCategories.length === 0) return;
    
    // Detect current page language from URL or HTML attributes
    const currentLang = document.documentElement.lang.includes('fa') ? 'fa' : 'en';
    
    // Fetch posts data
    const baseUrl = window.location.pathname.includes('/Void-Blog/') ? '/Void-Blog' : '';
    fetch(baseUrl + '/search.json')
      .then(response => response.json())
      .then(posts => {
        // Find related posts based on shared categories AND same language
        const related = posts
          .filter(function(post) {
            const postLang = post.lang || 'en';
            return post.url !== currentUrl && 
                   postLang === currentLang &&
                   currentCategories.some(function(cat) {
                     return post.categories.includes(cat);
                   });
          })
          .slice(0, 3); // Show top 3
        
        if (related.length === 0) {
          relatedContainer.style.display = 'none';
          return;
        }
        
        // Display related documents
        let html = '<h3>Related Documents</h3><div class="related-docs-grid">';
        related.forEach(function(post) {
          const excerpt = post.content.substring(0, 100).trim();
          const category = post.categories ? post.categories.split(',')[0].trim() : 'General';
          html += `
            <div class="related-doc-card">
              <a href="${post.url}" class="related-doc-link">
                <h4>${post.title}</h4>
                <p class="related-doc-excerpt">${excerpt}...</p>
                <span class="related-doc-category">${category}</span>
              </a>
            </div>
          `;
        });
        html += '</div>';
        relatedContainer.innerHTML = html;
      })
      .catch(err => console.error('Related documents failed:', err));
  }

  // Phase 4: PDF Export
  function initPDFExport() {
    const exportBtn = document.getElementById('export-pdf');
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', function() {
      // Use browser's native print to PDF
      const originalTitle = document.title;
      document.title = document.querySelector('.post-title') ? 
        document.querySelector('.post-title').textContent : originalTitle;
      
      window.print();
      
      setTimeout(function() {
        document.title = originalTitle;
      }, 100);
    });
  }

  // Phase 4: View Counter
  function initViewCounter() {
    if (!document.querySelector('.post')) return;
    
    // Configuration
    const VIEW_COUNT_COOLDOWN = 60 * 60 * 1000; // 1 hour in milliseconds
    
    const pageUrl = window.location.pathname;
    const viewCountKey = 'viewCount_' + pageUrl.replace(/\//g, '_');
    const lastViewKey = 'lastView_' + pageUrl.replace(/\//g, '_');
    
    // Get current view count
    let viewCount = parseInt(localStorage.getItem(viewCountKey) || '0');
    const lastView = localStorage.getItem(lastViewKey);
    const now = new Date().getTime();
    
    // Only increment if more than cooldown period since last view
    if (!lastView || (now - parseInt(lastView)) > VIEW_COUNT_COOLDOWN) {
      viewCount++;
      localStorage.setItem(viewCountKey, viewCount);
      localStorage.setItem(lastViewKey, now);
    }
    
    // Display view count in statistics
    const statsDiv = document.querySelector('.report-statistics');
    if (statsDiv && viewCount > 0) {
      const viewsDiv = document.createElement('div');
      viewsDiv.className = 'stat-item';
      viewsDiv.innerHTML = '<span class="stat-label">Views:</span> <span class="stat-value">' + viewCount + '</span>';
      statsDiv.appendChild(viewsDiv);
    }
  }

  // Phase 4: Service Worker Registration & Offline Detection
  function initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        // Detect base URL dynamically from current location
        const baseUrl = document.querySelector('base') ? 
          document.querySelector('base').href.replace(window.location.origin, '') : 
          (window.location.pathname.includes('/Void-Blog/') ? '/Void-Blog' : '');
        
        navigator.serviceWorker.register(baseUrl + '/sw.js')
          .then(function(registration) {
            console.log('ServiceWorker registered:', registration.scope);
          })
          .catch(function(err) {
            console.log('ServiceWorker registration failed:', err);
          });
      });
      
      // Detect offline/online status
      const offlineIndicator = document.getElementById('offline-indicator');
      if (offlineIndicator) {
        function updateOnlineStatus() {
          if (!navigator.onLine) {
            offlineIndicator.classList.add('show');
          } else {
            offlineIndicator.classList.remove('show');
          }
        }
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
      }
    }
  }

  // Hide "Back to Home" link for Persian language pages
  function hideBackToHomeForPersian() {
    const postFooter = document.querySelector('.post-footer');
    if (postFooter) {
      // Try to get language from multiple sources with clear precedence
      let lang = postFooter.getAttribute('data-lang');
      if (!lang) {
        lang = document.documentElement.lang;
      }
      if (!lang && document.documentElement.getAttribute('dir') === 'rtl') {
        lang = 'fa';
      }
      if (!lang) {
        lang = 'en';
      }
      
      const backToHomeLink = postFooter.querySelector('.back-to-home-link');
      if (backToHomeLink && lang === 'fa') {
        backToHomeLink.style.display = 'none';
      }
    }
  }

  // Initialize all features
  function init() {
    initBackToTop();
    initCopyCode();
    calculateReadingTime();
    generateTOC();
    initScrollAnimations();
    initSocialSharing();
    initCopySectionLinks();
    initScrollPositionMemory();
    initCommandPalette();
    initRelatedDocuments();
    initPDFExport();
    initViewCounter();
    initServiceWorker();
    hideBackToHomeForPersian();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
