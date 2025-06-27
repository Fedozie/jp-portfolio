// Code block for smooth scrolling behaviour for navigation items
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

// Code block to highlight active navbar item based on scroll position
const sections = document.querySelectorAll('section[id], main[id]');
const navbarItems = document.querySelectorAll('.navbar-item');

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

//Code block to observe sections and trigger animations only when they get there
document.addEventListener("DOMContentLoaded", () => {
  // Select sections to observe
  const sections = document.querySelectorAll("#home, #about, .about-expertise, #portfolio, #other, #contact");

  // Create IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add 'visible' class to trigger animations
          entry.target.classList.add("visible");
        } else {
          // Optional: Remove 'visible' class to replay animations when scrolling back
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.2 } // Trigger when 10% of section is visible
  );

  // Observe each section
  sections.forEach((section) => observer.observe(section));
});


// Code block to handle modal upon clicking the project
const projectData = {
  'retro-camera': {
    image: './assets/about-us-hero-img.webp',
    type: 'Website',
    title: 'Retro Camera',
    description: 'A beautifully designed e-commerce website for vintage cameras, built with modern web technologies to provide a seamless user experience.',
    technologies: ['HTML', 'CSS', 'JavaScript']
  },
  'church-site': {
    image: './assets/about.jpeg',
    type: 'Website',
    title: 'Light City Church',
    description: 'A beautifully designed website for my local website.',
    technologies: ['Next', 'Tailwind CSS', 'API Integration']
  },
  'rangers-club': {
    image: './assets/rangers.jpg',
    type: 'Branding',
    title: 'Rangers F.C.',
    description: 'A total branding makeover for Rangers Footbal Club.',
    technologies: ['Design Thinking', 'Photoshop', 'Figma']
  },
  'mavin-records': {
    image: './assets/mavin-records.jpg',
    type: 'Digital Marketing',
    title: 'Mavin Records',
    description: 'A digital marketing job for a local stores to increase reach.',
    technologies: ['Google Analytics', 'Twitter', 'Facebook Marketplace']
  }
}

const projectsContainer = document.querySelector('.projects-container');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('#modalImage');
const modalType = document.querySelector('#modalType');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const modalTech = document.querySelector('#modalTech');
const closeModal = document.querySelector('.close');

const renderProjectCards = () => {
  projectsContainer.innerHTML = ''; // Clear existing cards

  Object.keys(projectData).forEach(projectId => {
    const project = projectData[projectId];

    // Create project card element
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projectCard.dataset.project = projectId; // Set data-project attribute

    // Create card HTML structure
    projectCard.innerHTML = `
      <div class="project-image-container">
        <img src="${project.image}" alt="${project.title}" class="project-image" />
        <div class="image-overlay">
          <div class="plus-icon"></div>
        </div>
      </div>
      <div class="project-content">
        <div class="project-type">${project.type}</div>
        <div class="project-title">${project.title}</div>
        <div class="external-icon">
          <i class="fa-solid fa-arrow-right-long fa-rotate-by"></i>
        </div>
      </div>
    `;

    // Append card to container
    projectsContainer.appendChild(projectCard);

    // Add click event listener to open modal
    projectCard.addEventListener('click', () => {
      // Populate modal content
      modalImage.src = project.image;
      modalImage.alt = project.title;
      modalType.textContent = project.type;
      modalTitle.textContent = project.title;
      modalDescription.textContent = project.description;

      // Clear and populate technology tags
      modalTech.innerHTML = '';
      project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.classList.add('tech-tag');
        tag.textContent = tech;
        modalTech.appendChild(tag);
      });

      // Show the modal
      modal.style.display = 'block';
    });
  });
}

// Close modal when clicking the close button
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Close modal with Escape key for accessibility sake
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
  }
});

// Initialize project cards upoon page load
document.addEventListener('DOMContentLoaded', () => {
  renderProjectCards();
});