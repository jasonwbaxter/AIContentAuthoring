// Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize menu behavior
  initializeMenus();
  
  // Smooth scroll for anchor links
  initializeSmoothScroll();
  
  // Initialize syntax highlighting if available
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }
});

/**
 * Initialize menu interactions
 */
function initializeMenus() {
  const menuItems = document.querySelectorAll('.submenu-toggle');
  
  menuItems.forEach(item => {
    // Restore state from localStorage
    const key = `menu-${item.textContent.trim()}`;
    const isOpen = localStorage.getItem(key) === 'true';
    
    if (isOpen) {
      item.setAttribute('open', 'open');
    }
    
    // Save state on toggle
    item.addEventListener('toggle', () => {
      localStorage.setItem(key, item.hasAttribute('open'));
    });
  });
}

/**
 * Enable smooth scrolling for anchor links
 */
function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        
        // Update URL without page reload
        window.history.pushState(null, '', link.getAttribute('href'));
      }
    });
  });
}

/**
 * Utility: Copy text to clipboard
 */
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard');
    });
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

/**
 * Utility: Add copy buttons to code blocks
 */
function addCopyButtonsToCodeBlocks() {
  const preBlocks = document.querySelectorAll('pre');
  
  preBlocks.forEach(pre => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = 'Copy';
    button.addEventListener('click', () => {
      const code = pre.querySelector('code').textContent;
      copyToClipboard(code);
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    });
    
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
}

/**
 * Initialize AI feature loaders
 */
function initializeAIFeatures() {
  // Add loading and error states to AI buttons
  const aiButtons = document.querySelectorAll('.ai-button');
  
  aiButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      if (!button.classList.contains('loading') && !button.classList.contains('disabled')) {
        button.style.opacity = '0.9';
      }
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.opacity = '1';
    });
  });
}

/**
 * Utility: Show loading state on button
 */
function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.classList.add('loading');
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Processing...';
  } else {
    button.classList.remove('loading');
    button.disabled = false;
    button.innerHTML = button.id === 'summarizeBtn' ? '✨ Summarize with AI' : '🎵 Audio Recap';
  }
}

// Call after page load
document.addEventListener('DOMContentLoaded', function() {
  addCopyButtonsToCodeBlocks();
  initializeAIFeatures();
});
