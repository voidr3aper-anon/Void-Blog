/**
 * Touch Gestures and Mobile Enhancements
 * Provides touch-friendly interactions and gesture support
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTouchEnhancements);
  } else {
    initTouchEnhancements();
  }

  function initTouchEnhancements() {
    // Add touch feedback to interactive elements
    addTouchFeedback();
    
    // Add pull-to-refresh indicator (visual only, actual refresh handled by browser)
    setupPullToRefresh();
    
    // Add double-tap to scroll to top on posts
    setupDoubleTapScrollTop();
    
    // Optimize image loading for mobile
    optimizeImagesForMobile();
    
    // Add swipe gestures for navigation
    setupSwipeNavigation();
  }

  /**
   * Add visual feedback on touch for better UX
   */
  function addTouchFeedback() {
    const interactiveElements = document.querySelectorAll(
      'button, .nav-btn, .share-btn, .report-action-btn, a.category-tag, .related-post-card'
    );

    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      }, { passive: true });

      element.addEventListener('touchend', function() {
        this.style.transform = '';
      }, { passive: true });

      element.addEventListener('touchcancel', function() {
        this.style.transform = '';
      }, { passive: true });
    });
  }

  /**
   * Visual indicator for pull-to-refresh
   */
  function setupPullToRefresh() {
    let startY = 0;
    let isPulling = false;

    document.addEventListener('touchstart', function(e) {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
      }
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      if (window.scrollY === 0) {
        const currentY = e.touches[0].clientY;
        const pullDistance = currentY - startY;

        if (pullDistance > 0) {
          isPulling = true;
        }
      }
    }, { passive: true });

    document.addEventListener('touchend', function() {
      if (isPulling) {
        isPulling = false;
        startY = 0;
      }
    }, { passive: true });
  }

  /**
   * Double-tap to scroll to top
   */
  function setupDoubleTapScrollTop() {
    let lastTap = 0;
    const header = document.querySelector('.top-nav-bar');

    if (!header) return;

    header.addEventListener('touchend', function(e) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;

      if (tapLength < 500 && tapLength > 0) {
        // Double tap detected
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      lastTap = currentTime;
    });
  }

  /**
   * Optimize images for mobile by lazy loading
   */
  function optimizeImagesForMobile() {
    // Use native lazy loading for browsers that support it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });

    // For images with data-src (progressive loading), use IntersectionObserver
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              observer.unobserve(img);
            }
          });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
      }
    }
  }

  /**
   * Swipe navigation for posts (previous/next)
   */
  function setupSwipeNavigation() {
    // Only enable on post pages
    if (!document.querySelector('.post-content')) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const minSwipeDistance = 50;

    document.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Check if horizontal swipe is dominant
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        // Swipe right - could go to previous post
        if (deltaX > 0) {
          // Look for "previous" or "older" post link
          const prevLink = document.querySelector('a[rel="prev"]') || 
                          document.querySelector('.post-nav-prev a') ||
                          document.querySelector('a[href*="older"]');
          if (prevLink) {
            showSwipeHint('← Previous');
          }
        }
        // Swipe left - could go to next post
        else {
          // Look for "next" or "newer" post link
          const nextLink = document.querySelector('a[rel="next"]') ||
                          document.querySelector('.post-nav-next a') ||
                          document.querySelector('a[href*="newer"]');
          if (nextLink) {
            showSwipeHint('Next →');
          }
        }
      }
    }

    // Add fade out animation style once
    if (!document.getElementById('swipe-hint-style')) {
      const style = document.createElement('style');
      style.id = 'swipe-hint-style';
      style.textContent = `
        @keyframes swipeHintFadeOut {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    function showSwipeHint(text) {
      const hint = document.createElement('div');
      hint.className = 'swipe-hint';
      hint.textContent = text;
      hint.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(59, 130, 246, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-size: 1.2rem;
        z-index: 10000;
        pointer-events: none;
        animation: swipeHintFadeOut 1s ease forwards;
      `;

      document.body.appendChild(hint);
      setTimeout(() => hint.remove(), 1000);
    }
  }

  // Add viewport height fix for iOS Safari
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);

  // Note: Double-tap zoom prevention is now handled via CSS touch-action: manipulation
  // in the stylesheet, which is the recommended approach

  // Add haptic feedback on supported devices
  function addHapticFeedback(element) {
    if ('vibrate' in navigator) {
      element.addEventListener('touchstart', function() {
        navigator.vibrate(10); // Short vibration
      }, { passive: true });
    }
  }

  // Add haptic feedback to buttons
  const hapticsElements = document.querySelectorAll('button, .nav-btn');
  hapticsElements.forEach(addHapticFeedback);

  // Detect if running as PWA
  function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
  }

  if (isPWA()) {
    document.body.classList.add('pwa-mode');
  }

  // Add install prompt for PWA
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button if not already installed
    const installButton = document.createElement('button');
    installButton.textContent = '📱 Install App';
    installButton.className = 'pwa-install-btn';
    installButton.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: #3b82f6;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      transition: all 0.3s ease;
    `;

    installButton.addEventListener('click', async function() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        installButton.remove();
      }
    });

    // Only show if not dismissed before
    if (!localStorage.getItem('pwa-install-dismissed')) {
      // Add wrapper for positioning the close button
      const installWrapper = document.createElement('div');
      installWrapper.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 1000;
      `;
      
      // Update install button to be relative within wrapper
      installButton.style.cssText = `
        position: relative;
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        transition: all 0.3s ease;
      `;

      // Add close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '×';
      closeBtn.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        background: #1f2937;
        color: white;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        line-height: 1;
      `;
      closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        installWrapper.remove();
        localStorage.setItem('pwa-install-dismissed', 'true');
      });
      
      installButton.appendChild(closeBtn);
      installWrapper.appendChild(installButton);
      document.body.appendChild(installWrapper);
    }
  });

})();
