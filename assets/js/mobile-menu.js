/**
 * Mobile Navigation Menu Handler
 * Provides hamburger menu functionality for mobile devices
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }

  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');
    const body = document.body;

    if (!menuToggle || !navButtons) return;

    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.top-nav-bar') && navButtons.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu when clicking on a nav link
    const navLinks = navButtons.querySelectorAll('.nav-btn');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navButtons.classList.contains('active')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 768 && navButtons.classList.contains('active')) {
          closeMenu();
        }
      }, 250);
    });

    function toggleMenu() {
      const isOpen = navButtons.classList.toggle('active');
      menuToggle.classList.toggle('active');
      body.classList.toggle('mobile-menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    }

    function closeMenu() {
      navButtons.classList.remove('active');
      menuToggle.classList.remove('active');
      body.classList.remove('mobile-menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    // Add touch gesture support for swipe to close menu
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
      const navButtons = document.querySelector('.nav-buttons');
      if (!navButtons || !navButtons.classList.contains('active')) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Swipe left to close (must be significant horizontal swipe)
      if (deltaX < -50 && Math.abs(deltaY) < 50) {
        closeMenu();
      }
    }, { passive: true });
  }

})();
