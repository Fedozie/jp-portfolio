// Reference to the body for scroll control
const body = document.body; // Moved to the top for clarity

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

// Code block to observe sections and trigger animations only when they get there
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
  'well-trust': {
    image: './assets/welltrust.jpeg',
    type: 'Website',
    title: 'WellTrust Health Staff',
    description: 'A beautifully designed website for a hospital based in the United Kingdom.',
    link: "https://welltrusthealthstaff.co.uk/",
    technologies: ['ASP net Core C#', 'HTML', 'CSS', 'Javascript']
  },
  'ginilog': {
    image: './assets/ginilog.jpg',
    type: 'Website',
    title: 'Ginilog',
    description: 'A beautifully designed website for my local business which handles logistics.',
    link: 'https://ginilog.com/',
    technologies: ['ASP.Net Core', 'HTML', 'CSS', 'Javascript']
  },
  'bring-my-gas': {
    image: './assets/bring-my-gas.jpeg',
    type: 'Website',
    title: 'Bring my Gas',
    description: 'A business for an SME which helps you secure your gas from the comfort of your mobile phone.',
    link: 'https://bringmygas.com/',
    technologies: ['ASP.Net Core', 'HTML', 'CSS', 'Javascript']
  },
  'abincii': {
    image: './assets/abincii.jpeg',
    type: 'Android App',
    title: 'Abincii Manager App',
    description: 'An all-in-one mobile app designed for restaurant owners and managers to provide them with tools to track inventory, oversee staff, monitor sales, and streamline operations—all from one intuitive dashboard.',
    link: 'https://play.google.com/store/apps/details?id=com.abincii.abincii_manager_app',
    technologies: ['Flutter', 'Dart']
  },
  'ganat-clinic': {
    image: './assets/ganat-e-clinic.webp',
    type: ['Android App', 'IOS App'],
    title: 'Ganat E-Clinic',
    description: 'This is a solution that makes communication between medical practitioners and users easy.',
    link: ['https://play.google.com/store/apps/details?id=com.app.e_clinic_app', 'https://apps.apple.com/app/ganat-e-clinic-app/id6450014140'],
    technologies: ['Flutter', 'Dart']
  },
  'bring-my-gas-app': {
    image: './assets/bring-my-gas.jpeg',
    type: ['Android App', 'IOS App'],
    title: 'Bring My Gas App',
    description: 'A business for an SME which helps you secure your gas from the comfort of your mobile phone.',
    link: ['https://play.google.com/store/apps/details?id=com.bmg.bmg_customer', 'https://apps.apple.com/ng/app/bring-my-gas-app/id6740024841'],
    technologies: ['Flutter', 'Dart']
  },
  'ganat-healthcare': {
    image: './assets/e-healthcare.jpeg',
    type: ['Android App', 'IOS App'],
    title: 'Ganat Healthcare',
    description: 'This is a solution that makes communication between medical practitioners and users easy.',
    link: ['https://play.google.com/store/apps/details?id=com.applicatin.doc_e_clinic_app', 'https://apps.apple.com/app/ganat-e-clinic-health-workers/id6450670640'],
    technologies: ['Flutter', 'Dart']
  }
};

const projectsContainer = document.querySelector('.projects-container');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('#modalImage');
const modalType = document.querySelector('#modalType');
const modalTitle = document.querySelector('#modalTitle');
const modalDescription = document.querySelector('#modalDescription');
const modalLinkContainer = document.querySelector('.modal-link-container');
const modalTech = document.querySelector('#modalTech');
const closeModal = document.querySelector('.close');
let scrollPosition = 0;

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
        <div class="project-type">${Array.isArray(project.type) ? project.type.join(', ') : project.type}</div>
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
      modalType.textContent = Array.isArray(project.type) ? project.type.join(', ') : project.type;
      modalTitle.textContent = project.title;
      modalDescription.textContent = project.description;
      modalLinkContainer.innerHTML = '';

      if (Array.isArray(project.link)) {
        const links = project.link.map((link, index) => {
          const platform = project.type[index] || `Link ${index + 1}`;
          return `<a href="${link}" class="modal-link" target="_blank">${platform.replace("App", "")}</a>`;
        });
        modalLinkContainer.innerHTML = `See it on ${links.join(' and ')}`;
      } else {
        modalLinkContainer.innerHTML = `See it <a href="${project.link}" class="modal-link" target="_blank">here</a>`;
      }

      // Clear and populate technology tags
      modalTech.innerHTML = '';
      project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.classList.add('tech-tag');
        tag.textContent = tech;
        modalTech.appendChild(tag);
      });

      // Show the modal and lock scroll
      scrollPosition = window.scrollY || window.pageYOffset;
      body.classList.add('no-scroll');
      body.style.top = `-${scrollPosition}px`;
      modal.style.display = 'block';
    });
  });
};

// Close modal when clicking the close button
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  body.classList.remove('no-scroll');
  body.style.top = ''; // Clear the top style to restore normal positioning

  window.scrollTo({
    top: scrollPosition,
    left: 0,
    behavior: 'instant'
  });
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    body.classList.remove('no-scroll');
    body.style.top = ''; // Clear the top style to restore normal positioning

    window.scrollTo({
      top: scrollPosition,
      left: 0,
      behavior: 'instant'
    });
  }
});

// Close modal with Escape key for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
    body.classList.remove('no-scroll');
    body.style.top = ''; // Clear the top style to restore normal positioning

    window.scrollTo({
      top: scrollPosition,
      left: 0,
      behavior: 'instant'
    });
  }
});

// Prevent touch scrolling on background when modal is open
document.addEventListener('touchmove', (e) => {
  if (modal.style.display === 'block') {
    // Allow scrolling within the modal content
    if (e.target.closest('.modal-content')) {
      return;
    }
    // Prevent scrolling on the background
    e.preventDefault();
  }
}, { passive: false });

// Initialize project cards upon page load
document.addEventListener('DOMContentLoaded', () => {
  renderProjectCards();
});

// Code block to handle testimonial section
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.portfolio-main .slider');
  const dotsContainer = document.querySelector('.portfolio-main .dots');
  let currentSlide = 0;
  const slideInterval = 7000;

  // Testimonial data array
  const testimonials = [
    { image: './assets/ceo_image.jpg', name: 'Tim Cook', role: 'CEO, Apple', text: 'Molestiae incidunt consequuntur quis ipsa autem nam sit enim magni. Voluptas tempore rem. Explicabo quaerat sint autem dolore ducimus ut consequatur.' },
    { image: './assets/ceo_image.jpg', name: 'Sundar Pichai', role: 'CEO, Google', text: 'Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci.' },
    { image: './assets/ceo_image.jpg', name: 'Satya Nadella', role: 'CEO, Microsoft', text: 'Nisi eaque consequatur. Voluptatem dignissimos ut ducimus accusantium perspiciatis. Quasi voluptas eius distinctio.' },
    { image: './assets/ceo_image.jpg', name: 'Elon Musk', role: 'CEO, Tesla', text: 'Atque eos maxime. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.' },
    { image: './assets/ceo_image.jpg', name: 'Jeff Bezos', role: 'Founder, Amazon', text: 'Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { image: './assets/ceo_image.jpg', name: 'Mark Zuckerberg', role: 'CEO, Meta', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' }
  ];

  // Create slides with 2 testimonials each
  function createSlides() {
    if (!slider) {
      console.error('Slider element not found');
      return;
    }
    for (let i = 0; i < testimonials.length; i += 2) {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      if (i === 0) slide.classList.add('active');

      const testimonial1 = document.createElement('div');
      testimonial1.classList.add('testimonial');
      testimonial1.innerHTML = `
        <div class="testimonial-heading"> 
          <div class="testimonial-avatar">
            <img src="${testimonials[i].image}" alt="${testimonials[i].name}">
          </div>
          <div>
            <p class="testimonial-name">${testimonials[i].name}</p>
            <p class="testimonial-role">${testimonials[i].role}</p>
          </div>
        </div>
        <p class="testimonial-text">${testimonials[i].text}</p>
      `;
      slide.appendChild(testimonial1);

      if (testimonials[i + 1]) {
        const testimonial2 = document.createElement('div');
        testimonial2.classList.add('testimonial');
        testimonial2.innerHTML = `
          <div class="testimonial-heading"> 
            <div class="testimonial-avatar">
              <img src="${testimonials[i + 1].image}" alt="${testimonials[i + 1].name}">
            </div>
            <div>
              <p class="testimonial-name">${testimonials[i + 1].name}</p>
              <p class="testimonial-role">${testimonials[i + 1].role}</p>
            </div>
          </div>
          <p class="testimonial-text">${testimonials[i + 1].text}</p>
        `;
        slide.appendChild(testimonial2);
      }
      slider.appendChild(slide);
    }
  }

  // Create dots buttons
  function createDots() {
    if (!dotsContainer) {
      console.error('Dots container not found');
      return;
    }
    const totalSlides = Math.ceil(testimonials.length / 2);
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.addEventListener('click', () => goToSlide(i));
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    }
  }

  function showSlide(index) {
    const slides = slider.querySelectorAll('.slide');
    const dots = dotsContainer.querySelectorAll('.dot');
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextSlide() {
    const totalSlides = Math.ceil(testimonials.length / 2);
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function goToSlide(index) {
    const totalSlides = Math.ceil(testimonials.length / 2);
    currentSlide = index % totalSlides;
    showSlide(currentSlide);
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideInterval);
  }

  if (slider && dotsContainer) {
    createSlides();
    createDots();
    let slideTimer = setInterval(nextSlide, slideInterval);
  } else {
    console.error('Required elements (.slider or .dots) not found in .portfolio-main');
  }
});

// Code block for Slideshow
const images = document.querySelectorAll('.slideshow-img');
let currentImageIndex = 0;
const fadeInterval = 3000; // Time in milliseconds (3 seconds)

function changeImage() {
  // Remove active class from current image
  images[currentImageIndex].classList.remove('active');

  // Move to next image (loop back to 0 if at the end)
  currentImageIndex = (currentImageIndex + 1) % images.length;

  // Add active class to new image
  images[currentImageIndex].classList.add('active');
}

// Start the slideshow
setInterval(changeImage, fadeInterval);

// Code block for the SemiCircles animation
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll('.semi-circle');
  let current = 0;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleSemiCircleScroll);
        }
      });
    },
    { threshold: 0.3 }
  );

  const section = document.querySelector('#semi-circles-section');
  if (section) {
    observer.observe(section);
  }

  function handleSemiCircleScroll() {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;
    const scrollProgress = Math.min(1, (window.innerHeight - sectionTop) / sectionHeight);

    const target = Math.floor(scrollProgress * circles.length);

    while (current < target && current < circles.length) {
      circles[current].classList.add('show');
      current++;
    }

    if (current >= circles.length) {
      window.removeEventListener('scroll', handleSemiCircleScroll);
    }
  }
});

// Code Block for Mobile Navigation
const hamburgerOpen = document.querySelector('.hamburger-open');
const hamburgerClose = document.querySelector('.hamburger-close');
const navList = document.querySelector('.mobile-nav-list-container');
const navItems = document.querySelectorAll('.mobile-nav-item a'); // Select all nav item links

hamburgerOpen.addEventListener('click', () => {
  navList.classList.add('reveal');
  navList.classList.remove('hide');
  body.style.overflow = 'hidden';
});

hamburgerClose.addEventListener('click', () => {
  navList.classList.remove('reveal');
  navList.classList.add('hide');
  body.style.overflow = '';
  setTimeout(() => {
    if (!navList.classList.contains('reveal')) {
      navList.classList.remove('hide');
    }
  }, 300);
});

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    navList.classList.remove('reveal');
    body.style.overflow = '';
    const targetId = item.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      if (!navList.classList.contains('reveal')) {
        navList.classList.remove('hide');
      }
    }, 300);
  });
});