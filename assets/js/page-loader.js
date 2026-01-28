/**
 * Page Transition Loader
 * Shows loading animation when navigating between pages
 * Kali Linux Inspired
 */

(function() {
  'use strict';
  
  // Create loader HTML
  function createLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'page-loader';
    loader.innerHTML = `
      <div class="page-loader-content">
        <div class="page-loader-logo">
          <div class="page-loader-brackets">[</div>
          <div class="page-loader-text">LOADING</div>
          <div class="page-loader-brackets">]</div>
        </div>
        <div class="page-loader-bar-container">
          <div class="page-loader-bar"></div>
        </div>
        <div class="page-loader-status">Loading page...</div>
      </div>
    `;
    document.body.appendChild(loader);
    return loader;
  }
  
  // Show loader
  function showLoader() {
    let loader = document.getElementById('page-loader');
    if (!loader) {
      loader = createLoader();
    }
    
    loader.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate loader bar
    const loaderBar = loader.querySelector('.page-loader-bar');
    if (loaderBar) {
      loaderBar.style.width = '0%';
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        if (progress <= 90) {
          loaderBar.style.width = progress + '%';
        } else {
          clearInterval(interval);
        }
      }, 50);
      
      // Store interval ID to clear it later
      loader.dataset.intervalId = interval;
    }
  }
  
  // Hide loader
  function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    
    // Clear any running intervals
    if (loader.dataset.intervalId) {
      clearInterval(parseInt(loader.dataset.intervalId));
    }
    
    // Complete the loading bar
    const loaderBar = loader.querySelector('.page-loader-bar');
    if (loaderBar) {
      loaderBar.style.width = '100%';
    }
    
    // Wait a moment then fade out
    setTimeout(() => {
      loader.classList.remove('active');
      document.body.style.overflow = '';
    }, 300);
  }
  
  // Intercept all internal link clicks
  function initPageLoader() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      
      // Check if it's an internal link
      if (link && 
          link.href && 
          link.href.indexOf(window.location.origin) === 0 &&
          !link.href.includes('#') &&
          !link.target &&
          !link.getAttribute('download') &&
          !link.classList.contains('no-loader')) {
        
        // Show loader before navigation
        showLoader();
      }
    });
    
    // Hide loader when page loads
    window.addEventListener('load', hideLoader);
    
    // Also hide on beforeunload as fallback
    window.addEventListener('beforeunload', function() {
      showLoader();
    });
    
    // Hide loader when coming back via browser history
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        hideLoader();
      }
    });
  }
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageLoader);
  } else {
    initPageLoader();
  }
})();
