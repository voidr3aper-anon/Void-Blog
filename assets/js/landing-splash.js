/**
 * Landing Splash Screen - First Visit Animation
 * Kali Linux Inspired
 */

(function() {
  'use strict';
  
  // Check if user has seen the splash before
  const hasSeenSplash = sessionStorage.getItem('voidblog_splash_seen');
  
  if (hasSeenSplash) {
    // Hide splash immediately if already seen this session
    const splash = document.getElementById('landing-splash');
    if (splash) {
      splash.style.display = 'none';
    }
    return;
  }
  
  // Show splash animation
  function initSplash() {
    const splash = document.getElementById('landing-splash');
    if (!splash) return;
    
    // Ensure splash is visible
    splash.style.display = 'flex';
    
    // Animate loader
    const loaderBar = splash.querySelector('.loader-bar');
    if (loaderBar) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        loaderBar.style.width = progress + '%';
        
        if (progress >= 100) {
          clearInterval(interval);
          // Wait a moment then fade out
          setTimeout(() => {
            splash.classList.add('splash-fade-out');
            setTimeout(() => {
              splash.style.display = 'none';
              sessionStorage.setItem('voidblog_splash_seen', 'true');
            }, 500);
          }, 300);
        }
      }, 15);
    }
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplash);
  } else {
    initSplash();
  }
})();
