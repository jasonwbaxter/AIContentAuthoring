/**
 * Navigation & Mega Menu Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeMegaMenu();
  initializeMobileMenu();
  initializeKeyboardNavigation();
});

/**
 * Initialize Mega Menu Interactions
 */
function initializeMegaMenu() {
  const navItems = document.querySelectorAll('.mega-menu-trigger');
  
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const menu = item.querySelector('.mega-menu');
    
    if (!link || !menu) return;
    
    // Open menu on hover (desktop)
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        openMegaMenu(item, link, menu);
      }
    });
    
    // Handle click for mobile/touch
    link.addEventListener('click', (e) => {
      if (menu) {
        e.preventDefault();
        toggleMegaMenu(item, link, menu);
      }
    });
  });
}

/**
 * Open mega menu with proper ARIA attributes
 */
function openMegaMenu(item, link, menu) {
  link.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
}

/**
 * Toggle mega menu (mobile)
 */
function toggleMegaMenu(item, link, menu) {
  const isExpanded = link.getAttribute('aria-expanded') === 'true';
  
  if (isExpanded) {
    link.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  } else {
    link.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  }
}

/**
 * Initialize Mobile Menu Hamburger Toggle
 */
function initializeMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const header = document.querySelector('.header-main');
  
  if (!mobileToggle || !header) return;
  
  mobileToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('mobile-menu-active');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('mobile-menu-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Keyboard Navigation Support
 */
function initializeKeyboardNavigation() {
  const navItems = document.querySelectorAll('.mega-menu-trigger');
  
  navItems.forEach((item, index) => {
    const link = item.querySelector('.nav-link');
    
    if (!link) return;
    
    // Tab key navigation
    link.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextItem = navItems[index + 1];
        if (nextItem) {
          nextItem.querySelector('.nav-link').focus();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevItem = navItems[index - 1];
        if (prevItem) {
          prevItem.querySelector('.nav-link').focus();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const menu = item.querySelector('.mega-menu');
        if (menu) {
          const firstMenuItem = menu.querySelector('.mega-menu-item');
          if (firstMenuItem) {
            firstMenuItem.focus();
          }
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const menu = item.querySelector('.mega-menu');
        if (menu) {
          toggleMegaMenu(item, link, menu);
        }
      }
    });
  });
  
  // Mega menu item navigation
  const megaMenuItems = document.querySelectorAll('.mega-menu-item');
  megaMenuItems.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        const trigger = item.closest('.mega-menu-trigger').querySelector('.nav-link');
        trigger.focus();
      }
    });
  });
}

/**
 * Handle window resize for responsive behavior
 */
window.addEventListener('resize', () => {
  const header = document.querySelector('.header-main');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  
  if (window.innerWidth > 768) {
    // Desktop: reset mobile menu
    header.classList.remove('mobile-menu-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
  }
});

/**
 * Close menus when clicking outside
 */
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header-main')) {
    const navItems = document.querySelectorAll('.mega-menu-trigger');
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      link.setAttribute('aria-expanded', 'false');
    });
  }
});

/**
 * Search functionality placeholder
 */
const searchForm = document.querySelector('.search-form');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.querySelector('.search-input').value;
    if (query) {
      // TODO: Implement search functionality
      console.log('Search for:', query);
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });
}
