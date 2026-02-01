---
layout: page
title: Archive
permalink: /archive/
---

# Post Archive

Browse all blog posts by date, category, and topic.

## Search Posts

<div id="search-container">
  <input type="text" id="search-input" placeholder="Search for posts, topics, or keywords..." aria-label="Search posts">
  <div id="search-results"></div>
</div>

## Categories

<div class="category-filter">
  <button class="filter-btn active" data-category="all">All Posts</button>
  {% assign english_posts = site.posts | where_exp: "post", "post.lang != 'fa'" %}
  {% assign categories = english_posts | map: 'categories' | join: ',' | split: ',' | uniq | sort %}
  {% for category in categories %}
    {% if category != "" %}
      <button class="filter-btn" data-category="{{ category }}">{{ category }}</button>
    {% endif %}
  {% endfor %}
</div>

## Posts by Date

{% assign posts_by_year = english_posts | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year_group in posts_by_year %}
<div class="year-section">
  <h2>{{ year_group.name }}</h2>
  
  {% assign posts_by_month = year_group.items | group_by_exp: "post", "post.date | date: '%B'" %}
  
  {% for month_group in posts_by_month %}
  <div class="month-section">
    <h3>{{ month_group.name }}</h3>
    
    <div class="archive-posts">
      {% for post in month_group.items %}
      <div class="archive-post-item" data-categories="{{ post.categories | join: ' ' }}">
        <div class="archive-post-date">{{ post.date | date: "%d" }}</div>
        <div class="archive-post-content">
          <h4>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h4>
          {% if post.categories.size > 0 %}
            <div class="category-tags">
              {% for category in post.categories %}
                <span class="category-tag">{{ category }}</span>
              {% endfor %}
            </div>
          {% endif %}
          {% if post.excerpt %}
            <p>{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
  {% endfor %}
</div>
{% endfor %}

## Statistics

<div class="tool-grid">
  <div class="tool-card">
    <h3>{{ english_posts | size }}</h3>
    <p class="tool-description">Total Posts</p>
  </div>
  
  <div class="tool-card">
    <h3>{{ categories | size }}</h3>
    <p class="tool-description">Categories</p>
  </div>
  
  <div class="tool-card">
    <h3>{{ posts_by_year | size }}</h3>
    <p class="tool-description">Years Active</p>
  </div>
</div>

<script>
// Category filtering
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const posts = document.querySelectorAll('.archive-post-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.category;
      
      // Filter posts
      posts.forEach(post => {
        if (category === 'all') {
          post.style.display = 'flex';
        } else {
          const postCategories = post.dataset.categories.toLowerCase();
          if (postCategories.includes(category.toLowerCase())) {
            post.style.display = 'flex';
          } else {
            post.style.display = 'none';
          }
        }
      });
    });
  });

  // Check URL parameters for category filter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const matchingBtn = Array.from(filterBtns).find(btn => 
      btn.dataset.category.toLowerCase() === categoryParam.toLowerCase()
    );
    if (matchingBtn) {
      matchingBtn.click();
    }
  }
});
</script>

<style>
.year-section {
  margin: 3rem 0;
}

.year-section h2 {
  font-size: 2rem;
  color: #00e676;
  border-bottom: 3px solid #00e676;
  padding-bottom: 0.5rem;
  margin-bottom: 2rem;
}

.month-section {
  margin: 2rem 0;
}

.month-section h3 {
  font-size: 1.5rem;
  color: #00bfa5;
  margin-bottom: 1rem;
}

.archive-posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.archive-post-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(15, 52, 96, 0.6) 0%, rgba(22, 33, 62, 0.6) 100%);
  border-radius: 8px;
  border-left: 4px solid #00e676;
  transition: all 0.3s ease;
}

.archive-post-item:hover {
  transform: translateX(10px);
  box-shadow: 0 8px 24px rgba(0, 230, 118, 0.2);
  border-left-color: #00ff88;
}

.archive-post-date {
  font-size: 2rem;
  font-weight: 700;
  color: #00e676;
  min-width: 60px;
  text-align: center;
  padding: 0.5rem;
  background: rgba(0, 230, 118, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 230, 118, 0.3);
}

.archive-post-content {
  flex: 1;
}

.archive-post-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.archive-post-content h4 a {
  color: #00e676;
  text-decoration: none;
}

.archive-post-content h4 a:hover {
  color: #00ff88;
}

.archive-post-content p {
  margin: 0.5rem 0 0 0;
  color: #c0c0c0;
}

@media screen and (max-width: 768px) {
  .archive-post-item {
    flex-direction: column;
    gap: 1rem;
  }
  
  .archive-post-date {
    min-width: auto;
  }
}
</style>

---

*All posts organized chronologically for easy browsing*
