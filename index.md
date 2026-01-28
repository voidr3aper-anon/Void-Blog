---
layout: default
title: Void Blog - Network Analysis, Hacking & GFW Bypass
---

<!-- Full-Screen Landing Splash (First Visit Only) -->
<div id="landing-splash" class="landing-splash">
  <div class="landing-content">
    <div class="landing-logo">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M60 10L110 35V85L60 110L10 85V35L60 10Z" stroke="#ef4444" stroke-width="2" fill="none"/>
        <circle cx="60" cy="60" r="25" stroke="#ef4444" stroke-width="2" fill="none"/>
        <line x1="60" y1="35" x2="60" y2="85" stroke="#ef4444" stroke-width="2"/>
        <line x1="35" y1="60" x2="85" y2="60" stroke="#ef4444" stroke-width="2"/>
      </svg>
    </div>
    <h1 class="landing-title">VOID<span class="landing-accent">BLOG</span></h1>
    <p class="landing-tagline">Network Security • Penetration Testing • GFW Bypass</p>
    <div class="landing-loader">
      <div class="loader-bar"></div>
    </div>
  </div>
</div>

<!-- Hero Section - Kali Style with Video Background -->
<div class="hero-section-kali">
  <!-- Video Background -->
  <video class="hero-video-background" autoplay loop muted playsinline>
    <source src="/Void-Blog/animations/home-animation.mp4" type="video/mp4">
  </video>
  <!-- Video Overlay for Text Readability -->
  <div class="hero-video-overlay"></div>
  
  <div class="hero-content-kali">
    <h1 class="hero-title-kali">Network Analysis & Security Research</h1>
    <p class="hero-subtitle-kali">Professional documentation for penetration testing, network security analysis, and censorship circumvention techniques</p>
    <div class="hero-stats-kali">
      <a href="/Void-Blog/tools/" class="hero-stat-kali">
        <span class="stat-number-kali">40+</span>
        <span class="stat-label-kali">Tools</span>
      </a>
      <a href="/Void-Blog/resources/" class="hero-stat-kali">
        <span class="stat-number-kali">15+</span>
        <span class="stat-label-kali">Tutorials</span>
      </a>
      <a href="/Void-Blog/archive/" class="hero-stat-kali">
        <span class="stat-number-kali">{{ site.posts.size }}</span>
        <span class="stat-label-kali">Reports</span>
      </a>
    </div>
  </div>
  
  <!-- Scroll Indicator - Outside hero-content-kali for proper stacking -->
  <div class="scroll-indicator">
    <div class="scroll-text">Scroll Down</div>
    <div class="scroll-arrow">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</div>

<!-- Search Bar - Kali Style with integrated filters -->
<div class="search-kali">
  <div class="search-icon-kali">></div>
  <input type="text" id="search-input" placeholder="root@voidblog:~# search..." aria-label="Search documentation">
  <div id="search-results"></div>
  <!-- Search Filters integrated inside search container -->
  <div id="search-filters" class="search-filters"></div>
</div>

<!-- Content Container for better organization -->
<div class="home-content-container">
  
  <!-- Quick Links Panel -->
  <section class="quick-links-section">
    <h2 class="section-title-kali">Quick Start</h2>
    <div class="quick-links-grid">
      <a href="/Void-Blog/tools/#vpn--proxy-tools" class="quick-link-card">
        <span class="quick-link-icon">🔐</span>
        <span class="quick-link-label">VPN Tools</span>
        <span class="quick-link-desc">OpenVPN, WireGuard, V2Ray</span>
      </a>
      <a href="/Void-Blog/tools/#network-analysis" class="quick-link-card">
        <span class="quick-link-icon">📊</span>
        <span class="quick-link-label">Network Analysis</span>
        <span class="quick-link-desc">Wireshark, tcpdump, nmap</span>
      </a>
      <a href="/Void-Blog/resources/" class="quick-link-card">
        <span class="quick-link-icon">📚</span>
        <span class="quick-link-label">Tutorials</span>
        <span class="quick-link-desc">Step-by-step guides</span>
      </a>
      <a href="/Void-Blog/tools/#security-testing" class="quick-link-card">
        <span class="quick-link-icon">🛡️</span>
        <span class="quick-link-label">Security Testing</span>
        <span class="quick-link-desc">Penetration testing tools</span>
      </a>
    </div>
  </section>

  <!-- Latest Security Reports Section -->
  <section class="security-reports-section">
    <h2 class="section-title-kali">Latest Security Reports</h2>
    
    <!-- Visual Document Cards with Images -->
    <div class="doc-cards-grid">
    {% for post in site.posts limit:6 %}
      <article class="doc-card-kali">
        {% if post.image %}
        <div class="doc-card-image">
          <img src="{{ post.image | relative_url }}" alt="{{ post.title | escape }}" loading="lazy">
          <div class="doc-card-overlay"></div>
        </div>
        {% else %}
        <div class="doc-card-image doc-card-placeholder">
          <svg viewBox="0 0 200 120" class="placeholder-svg">
            <rect width="200" height="120" fill="#1f2937"/>
            <text x="50%" y="50%" text-anchor="middle" fill="#6b7280" font-size="14" font-family="monospace">
              {{ post.categories.first | default: "DOCUMENT" | upcase }}
            </text>
          </svg>
          <div class="doc-card-overlay"></div>
        </div>
        {% endif %}
        <div class="doc-card-content">
          <div class="doc-card-meta">
            <span class="doc-date-kali">{{ post.date | date: "%Y-%m-%d" }}</span>
            {% if post.categories.size > 0 %}
              <span class="doc-category-kali">{{ post.categories.first | upcase }}</span>
            {% endif %}
            {% assign words = post.content | number_of_words %}
            {% assign reading_time = words | divided_by: 200 | at_least: 1 %}
            <span class="doc-reading-time">{{ reading_time }} min read</span>
          </div>
          
          <!-- Tags Display -->
          {% if post.tags.size > 0 %}
          <div class="doc-card-tags">
            {% for tag in post.tags limit:3 %}
              <span class="doc-tag-badge">{{ tag }}</span>
            {% endfor %}
          </div>
          {% endif %}
          
          <h3 class="doc-card-title">
            <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
          </h3>
          {% if post.excerpt %}
          <p class="doc-card-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
          {% endif %}
          <div class="doc-card-footer">
            <a href="{{ post.url | relative_url }}" class="doc-read-more">Read Documentation →</a>
          </div>
        </div>
      </article>
    {% endfor %}
    </div>
    
    <div class="view-all-link">
      <a href="/Void-Blog/archive/" class="btn-view-all">View All Reports →</a>
    </div>
  </section>

  <!-- Recently Updated Section -->
  <section class="recent-updates-section-wrapper">
    <h2 class="section-title-kali">Recently Updated</h2>
    
    <div class="recent-updates-grid">
      {% assign sorted_posts = site.posts | sort: 'last_modified_at' | reverse %}
      {% for post in sorted_posts limit:4 %}
        <article class="recent-update-item">
          <div class="update-indicator">UPDATED</div>
          <div class="update-content">
            <h3 class="update-title">
              <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
            </h3>
            <div class="update-meta">
              <span class="update-date">{{ post.last_modified_at | default: post.date | date: "%Y-%m-%d %H:%M" }}</span>
              {% if post.categories.size > 0 %}
                <span class="update-category">{{ post.categories.first | upcase }}</span>
              {% endif %}
            </div>
          </div>
        </article>
      {% endfor %}
    </div>
  </section>

</div>

<!-- Footer Quick Links and Info -->
<div class="home-footer-section">
  <div class="footer-links-grid">
    <div class="footer-link-item">
      <span class="footer-link-icon">🛠️</span>
      <a href="/Void-Blog/tools/">Tools & Resources</a>
    </div>
    <div class="footer-link-item">
      <span class="footer-link-icon">📚</span>
      <a href="/Void-Blog/resources/">Tutorials</a>
    </div>
    <div class="footer-link-item">
      <span class="footer-link-icon">📦</span>
      <a href="/Void-Blog/archive/">Archive</a>
    </div>
    <div class="footer-link-item">
      <span class="footer-link-icon">ℹ️</span>
      <a href="/Void-Blog/about/">About</a>
    </div>
  </div>
  
  <div class="alert alert-info home-disclaimer">
    <strong>Disclaimer:</strong> All content is for educational purposes only. Always ensure compliance with local laws and regulations.
  </div>
</div>
