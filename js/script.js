// Main JavaScript File - Consolidated

document.addEventListener('DOMContentLoaded', function() {
  // --- Portfolio Functionality ---
  (function() {
  // Portfolio data
  const portfolioData = [
    {
      id: 1,
      title: 'Wedding Day Memories',
      category: 'wedding',
      image: 'images/portfolio/wedding.png'
    },
    {
      id: 2,
      title: 'Portrait Session',
      category: 'portrait',
      image: 'images/portfolio/portrait.jpg'
    },
    {
      id: 3,
      title: 'Fashion Editorial',
      category: 'fashion',
      image: 'images/portfolio/fashion.jpg'
    },
    {
      id: 4,
      title: 'Corporate Event',
      category: 'corporate',
      image: 'images/portfolio/corporate.jpg'
    },
    {
      id: 5,
      title: 'Special Event',
      category: 'event',
      image: 'images/portfolio/event.jpg'
    },
    {
      id: 6,
      title: 'Scenic Landscape',
      category: 'landscape',
      image: 'images/portfolio/landscape.jpg'
    }
  ];

  // DOM Elements
  const portfolioGrid = document.querySelector('.portfolio-grid .row');
  const loadMoreBtn = document.getElementById('loadMore');
  const lightbox = document.getElementById('portfolioLightbox');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxCategory = lightbox.querySelector('.lightbox-category');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.prev');
  const nextBtn = lightbox.querySelector('.next');
  const categoryBtns = document.querySelectorAll('.btn-category');

  // State
  let currentItems = 6;
  let filteredItems = [...portfolioData];
  let currentIndex = 0;

  // Initialize portfolio
  function initPortfolio() {
    renderPortfolio(portfolioData.slice(0, currentItems));
    setupEventListeners();
  }

  // Render portfolio items
  function renderPortfolio(items) {
    if (!portfolioGrid) return;
    
    portfolioGrid.innerHTML = items.map(item => `
      <div class="col-lg-4 col-md-6 portfolio-item" data-category="${item.category}">
        <div class="portfolio-card" data-id="${item.id}">
          <div class="portfolio-img">
            <img src="${item.image}" alt="${item.title}" class="img-fluid">
            <div class="portfolio-overlay">
              <div class="portfolio-info">
                <h4>${item.title}</h4>
                <p>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Filter portfolio by category
  function filterPortfolio(category) {
    if (category === 'all') {
      filteredItems = [...portfolioData];
    } else {
      filteredItems = portfolioData.filter(item => item.category === category);
    }
    currentItems = 6;
    renderPortfolio(filteredItems.slice(0, currentItems));
    updateLoadMoreButton();
  }

  // Load more items
  function loadMore() {
    currentItems += 3;
    renderPortfolio(filteredItems.slice(0, currentItems));
    updateLoadMoreButton();
  }

  // Update load more button visibility
  function updateLoadMoreButton() {
    if (loadMoreBtn) {
      loadMoreBtn.style.display = currentItems >= filteredItems.length ? 'none' : 'inline-block';
    }
  }

  // Open lightbox
  function openLightbox(index) {
    const item = filteredItems[index];
    lightboxImg.src = item.image;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    currentIndex = index;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Navigate lightbox
  function navigate(direction) {
    if (direction === 'prev') {
      currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    } else {
      currentIndex = (currentIndex + 1) % filteredItems.length;
    }
    openLightbox(currentIndex);
  }

  // Setup event listeners
  function setupEventListeners() {
    // Category filter
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterPortfolio(category);
      });
    });

    // Load more
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', loadMore);
    }

    // Lightbox
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.portfolio-card');
      if (card) {
        const id = parseInt(card.dataset.id);
        const index = filteredItems.findIndex(item => item.id === id);
        if (index !== -1) openLightbox(index);
      }
    });

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Navigation
    prevBtn.addEventListener('click', () => navigate('prev'));
    nextBtn.addEventListener('click', () => navigate('next'));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigate('prev');
          break;
        case 'ArrowRight':
          navigate('next');
          break;
      }
    });
  }

    // Initialize
  initPortfolio();
  })(); // End Portfolio Functionality

  // --- Services Functionality ---
  (function() {
    // Cache DOM elements
    const tabButtons = document.querySelectorAll('.services-nav [data-bs-toggle="pill"]');
    const allServices = document.querySelectorAll('#all-services-container > [data-category]');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Initialize the first tab content
    initializeTabContent();
    
    // Handle tab changes
    tabButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-bs-target').substring(1);
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        if (targetId === 'all') {
          // Show all services tab
          showTab('all');
        } else {
          filterServices(targetId);
        }
      });
    });
    
    // Show a specific tab
    function showTab(tabId) {
      tabPanes.forEach(pane => {
        if (pane.id === tabId) {
          pane.classList.add('show', 'active');
        } else {
          pane.classList.remove('show', 'active');
        }
      });
    }
    
    // Initialize tab content with filtered services
    function initializeTabContent() {
      // All services are already in the DOM, just need to initialize the first view
      const firstTab = document.querySelector('#all');
      if (firstTab) {
        firstTab.classList.add('show', 'active');
      }
      
      // Initialize the first tab button as active
      if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
      }
    }
    
    // Filter services by category
    function filterServices(category) {
      const targetTab = document.querySelector(`#${category}`);
      if (!targetTab) return;
      
      // Show the target tab
      showTab(category);
      
      const container = targetTab.querySelector('.row');
      if (!container) return;
      
      // Only load if empty
      if (!container.hasChildNodes()) {
        // Show loading state
        container.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        
        // Simulate loading delay for better UX
        setTimeout(() => {
          const filteredServices = Array.from(allServices)
            .filter(service => service.getAttribute('data-category') === category)
            .map(service => service.outerHTML)
            .join('');
          
          container.innerHTML = filteredServices || '<div class="col-12 text-center py-5"><p>No services found in this category.</p></div>';
          
          // Reinitialize AOS for new elements
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        }, 300);
      }
    }
    
    // Handle service card hover effects using event delegation
    document.addEventListener('mouseover', function(e) {
      const card = e.target.closest('.service-modern-card');
      if (card) {
        card.classList.add('hover');
      }
    });
    
    document.addEventListener('mouseout', function(e) {
      const card = e.target.closest('.service-modern-card');
      if (card) {
        card.classList.remove('hover');
      }
    });
  })(); // End Services Functionality

  // --- AOS Animation ---
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // --- About Image Parallax Tilt ---
  (function() {
    const aboutWrapper = document.querySelector('.about-image-wrapper');
    const frame = aboutWrapper ? aboutWrapper.querySelector('.about-img-frame') : null;
    const badge = aboutWrapper ? aboutWrapper.querySelector('.experience-badge') : null;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!aboutWrapper || !frame || prefersReduced || isTouch) return;

    let rafId = null;
    let current = { rx: 0, ry: 0, sx: 0, sy: 0 };
    let target = { rx: 0, ry: 0, sx: 0, sy: 0 };

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    const onMove = (e) => {
      const rect = aboutWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      const maxTilt = 8; // degrees
      target.ry = clamp((x - 0.5) * 2 * maxTilt, -maxTilt, maxTilt); // rotateY
      target.rx = clamp(-(y - 0.5) * 2 * maxTilt, -maxTilt, maxTilt); // rotateX
      const maxOffset = 22; // px
      target.sx = clamp((x - 0.5) * 2 * maxOffset, -maxOffset, maxOffset);
      target.sy = clamp((y - 0.5) * 2 * maxOffset, -maxOffset, maxOffset);
      requestTick();
    };

    const onLeave = () => {
      target.rx = 0; target.ry = 0; target.sx = 0; target.sy = 0;
      requestTick();
    };

    const update = () => {
      const lerp = 0.12;
      current.rx += (target.rx - current.rx) * lerp;
      current.ry += (target.ry - current.ry) * lerp;
      current.sx += (target.sx - current.sx) * lerp;
      current.sy += (target.sy - current.sy) * lerp;
      frame.style.transform = `rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg)`;
      const blur = 40;
      const spread = -6;
      const alpha = 0.28;
      const shadowX = (-current.sx).toFixed(1);
      const shadowY = (-current.sy + 18).toFixed(1);
      frame.style.boxShadow = `${shadowX}px ${shadowY}px ${blur}px ${spread}px rgba(0,0,0,${alpha})`;

      // Subtle counter parallax for badge (moves opposite to tilt)
      if (badge) {
        const badgeFactor = 0.15; // smaller than image frame
        const tx = (current.sx * badgeFactor).toFixed(1);
        const ty = (current.sy * badgeFactor).toFixed(1);
        badge.style.setProperty('--tx', `${tx}px`);
        badge.style.setProperty('--ty', `${ty}px`);
      }
      if (
        Math.abs(current.rx - target.rx) > 0.01 ||
        Math.abs(current.ry - target.ry) > 0.01 ||
        Math.abs(current.sx - target.sx) > 0.1 ||
        Math.abs(current.sy - target.sy) > 0.1
      ) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = null;
      }
    };

    function requestTick() {
      if (rafId == null) rafId = requestAnimationFrame(update);
    }

    aboutWrapper.addEventListener('pointermove', onMove);
    aboutWrapper.addEventListener('pointerleave', onLeave);

    // Cleanup on page hide
    window.addEventListener('pagehide', () => {
      aboutWrapper.removeEventListener('pointermove', onMove);
      aboutWrapper.removeEventListener('pointerleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    });
  })();

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    // Show/hide button on scroll
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    // Smooth scroll to top
    const scrollToTop = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    backToTopBtn.addEventListener('click', scrollToTop);
    handleScroll(); // Initial check
  }

  // --- Navbar Scroll Effect ---
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("mainNav");
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  // --- About CTA Ripple ---
  (function() {
    const ctaButtons = document.querySelectorAll('.about-cta .btn');
    if (!ctaButtons.length) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ctaButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        if (prefersReduced) return;
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.style.setProperty('--ripple-x', `${x}px`);
        this.style.setProperty('--ripple-y', `${y}px`);
        this.classList.remove('ripple-animate');
        // Force reflow to restart animation
        void this.offsetWidth;
        this.classList.add('ripple-animate');
        // Cleanup class after animation ends
        setTimeout(() => this.classList.remove('ripple-animate'), 650);
      });
    });
  })();
});

// --- Contact Form Validation ---
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  }
});
