// Simple client-side search functionality with filters
(function() {
  'use strict';

  let posts = [];
  let searchInput, searchResults, searchContainer;
  let selectedCategory = 'all';
  let selectedTag = 'all';
  let dateFilter = 'all';

  function initSearch() {
    searchInput = document.getElementById('search-input');
    searchResults = document.getElementById('search-results');
    searchContainer = document.getElementById('search-container');

    if (!searchInput) return;

    // Fetch posts data - construct relative URL based on current path
    const baseUrl = window.location.pathname.includes('/Void-Blog/') ? '/Void-Blog' : '';
    fetch(baseUrl + '/search.json')
      .then(response => response.json())
      .then(data => {
        posts = data;
        initSearchFilters();
      })
      .catch(err => console.error('Search initialization failed:', err));

    // Add event listeners
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('focus', function() {
      if (searchResults.innerHTML !== '') {
        searchResults.style.display = 'block';
      }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchContainer.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  function initSearchFilters() {
    // Get unique categories and tags
    const categories = ['all', ...new Set(posts.flatMap(p => (p.categories || '').split(', ').filter(c => c)))];
    const tags = ['all', ...new Set(posts.flatMap(p => (p.tags || '').split(', ').filter(t => t)))];
    
    // Create filter UI if container exists
    const filterContainer = document.getElementById('search-filters');
    if (!filterContainer) return;
    
    filterContainer.innerHTML = `
      <div class="search-filter-group">
        <label>Category:</label>
        <select id="category-filter" class="search-filter-select">
          ${categories.map(c => `<option value="${c}">${c === 'all' ? 'All Categories' : c}</option>`).join('')}
        </select>
      </div>
      <div class="search-filter-group">
        <label>Tag:</label>
        <select id="tag-filter" class="search-filter-select">
          ${tags.map(t => `<option value="${t}">${t === 'all' ? 'All Tags' : t}</option>`).join('')}
        </select>
      </div>
      <div class="search-filter-group">
        <label>Date:</label>
        <select id="date-filter" class="search-filter-select">
          <option value="all">All Time</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="year">Past Year</option>
        </select>
      </div>
    `;
    
    // Add filter event listeners
    document.getElementById('category-filter').addEventListener('change', function(e) {
      selectedCategory = e.target.value;
      performSearch();
    });
    
    document.getElementById('tag-filter').addEventListener('change', function(e) {
      selectedTag = e.target.value;
      performSearch();
    });
    
    document.getElementById('date-filter').addEventListener('change', function(e) {
      dateFilter = e.target.value;
      performSearch();
    });
  }

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2 && selectedCategory === 'all' && selectedTag === 'all' && dateFilter === 'all') {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
      return;
    }

    let results = posts.filter(post => {
      // Text search
      const matchesQuery = query.length < 2 || 
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.categories.toLowerCase().includes(query);
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
        post.categories.includes(selectedCategory);
      
      // Tag filter
      const matchesTag = selectedTag === 'all' || 
        (post.tags && post.tags.includes(selectedTag));
      
      // Date filter
      let matchesDate = true;
      if (dateFilter !== 'all') {
        try {
          const postDate = new Date(post.date);
          if (!isNaN(postDate.getTime())) {
            const now = new Date();
            const daysDiff = (now - postDate) / (1000 * 60 * 60 * 24);
            
            switch(dateFilter) {
              case 'week':
                matchesDate = daysDiff <= 7;
                break;
              case 'month':
                matchesDate = daysDiff <= 30;
                break;
              case 'year':
                matchesDate = daysDiff <= 365;
                break;
            }
          } else {
            matchesDate = true; // If date parsing fails, include the post
          }
        } catch (e) {
          matchesDate = true; // If date parsing fails, include the post
        }
      }
      
      return matchesQuery && matchesCategory && matchesTag && matchesDate;
    });

    displayResults(results, query);
  }

  function displayResults(results, query) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No results found for "' + escapeHtml(query) + '"</div>';
      searchResults.style.display = 'block';
      return;
    }

    searchResults.innerHTML = '<div class="search-results-count">' + results.length + ' result' + (results.length > 1 ? 's' : '') + ' found</div>';
    
    results.slice(0, 10).forEach(post => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      
      const title = document.createElement('a');
      title.href = post.url;
      title.className = 'search-result-title';
      title.textContent = post.title;
      
      const excerpt = document.createElement('p');
      excerpt.className = 'search-result-excerpt';
      excerpt.textContent = truncate(post.content, 150);
      
      const meta = document.createElement('span');
      meta.className = 'search-result-meta';
      meta.textContent = post.date + ' • ' + post.categories;
      
      item.appendChild(title);
      item.appendChild(excerpt);
      item.appendChild(meta);
      searchResults.appendChild(item);
    });
    
    searchResults.style.display = 'block';
  }

  function truncate(str, length) {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  }

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

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
