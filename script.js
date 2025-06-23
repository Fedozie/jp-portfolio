// Smooth Scrolling for Navigation Items (click anywhere in navbar-item)
document.querySelectorAll('.navbar-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Find the link within this navbar item
    const link = this.querySelector('a');
    if (!link) return;
    
    // Remove active class from all navbar items first
    document.querySelectorAll('.navbar-item').forEach(navItem => {
      navItem.classList.remove('active');
    });
    
    // Add active class to clicked item immediately
    this.classList.add('active');
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Highlight active navbar item based on scroll position
const sections = document.querySelectorAll('section[id], main[id]');
const navbarItems = document.querySelectorAll('.navbar-item');

// Debounce function to improve performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Track if user just clicked to prevent scroll handler from overriding
let userJustClicked = false;

const handleScroll = debounce(() => {
  // Don't update active state if user just clicked
  if (userJustClicked) {
    userJustClicked = false;
    return;
  }

  let current = '';
  const scrollPos = window.scrollY + 100;

  // Find the current section currently in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
      current = section.getAttribute('id');
    }
  });

  // If no section is found, check if we're at the top
  if (!current && window.scrollY < 100) {
    current = 'home';
  }

  // Update active class on navbar items
  if (current) {
    let activeItemFound = false;
    
    navbarItems.forEach(item => {
      const link = item.querySelector('a');
      const href = link?.getAttribute('href');
      
      if (href === `#${current}`) {
        if (!item.classList.contains('active')) {
          // Remove active from all items first
          navbarItems.forEach(navItem => navItem.classList.remove('active'));
          // Add active to current item
          item.classList.add('active');
        }
        activeItemFound = true;
      }
    });
  }
}, 50);

// Add click tracking to prevent scroll handler interference
document.querySelectorAll('.navbar-item').forEach(item => {
  item.addEventListener('click', () => {
    userJustClicked = true;
    // Reset the flag after smooth scrolling completes
    setTimeout(() => {
      userJustClicked = false;
    }, 1000);
  });
});

window.addEventListener('scroll', handleScroll);

// Ensure the home section is active on page load
document.addEventListener('DOMContentLoaded', () => {
  // Remove active class from all items first
  navbarItems.forEach(item => item.classList.remove('active'));
  
  // Set home as active initially
  const homeNavItem = document.querySelector('.navbar-item a[href="#home"]');
  if (homeNavItem) {
    homeNavItem.parentElement.classList.add('active');
  }
  
  // Run initial scroll handler after a short delay
  setTimeout(() => {
    handleScroll();
  }, 200);
});