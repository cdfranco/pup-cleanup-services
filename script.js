// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
});

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Only prevent default if validation fails

      // Get form data
      const formData = new FormData(this);
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const phone = formData.get('phone');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      // Basic validation
      if (!firstName || !lastName || !phone || !email || !subject || !message) {
        e.preventDefault();
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      // Phone validation (more flexible)
      const phoneRegex =
        /^[\+]?[1]?[\s\-\.]?[\(]?[0-9]{3}[\)]?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/;
      if (!phoneRegex.test(phone)) {
        e.preventDefault();
        showNotification('Please enter a valid phone number', 'error');
        return;
      }

      // Let Netlify handle the form submission natively
      // Remove preventDefault to allow normal form submission
      // e.preventDefault(); // Commented out to allow native submission
    });
  }
});

// Phone Number Formatting
document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.getElementById('phone');

  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '');

      if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
          6,
          10
        )}`;
      } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      }

      e.target.value = value;
    });
  }
});

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${
          type === 'success'
            ? '#28a745'
            : type === 'error'
            ? '#dc3545'
            : '#4B9CD3'
        };
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function () {
  // Create scroll to top button
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = `
    <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.23 426.13">
      <defs>
        <style>.cls-1{fill:#99badd;}</style>
      </defs>
      <g id="Layer_1-2">
        <g id="_0GAHe4.tif">
          <path class="cls-1" d="M134.46,260.67c47.65-93.66,155.66-97.72,204.8-2.02.75,1.45,1.88,2.72,3.24,3.62,116.36,77.29,41.68,200.5-81.03,147.81-.93-.4-1.96-.68-2.97-.77-45.44-4.24-67.57,14.76-102.97,16.79-.5.03-1.02.03-1.52,0-102.46-5.86-100.71-118.61-23.48-161.37,1.68-.93,3.06-2.35,3.93-4.06Z"/>
          <path class="cls-1" d="M329.27.89c80.1,37.14,36.29,197.46-55.54,166.65-2.16-.72-4.03-2.22-5.2-4.17C234.92,107.54,246.96,8.53,324.09.06c1.75-.19,3.58.09,5.18.84Z"/>
          <path class="cls-1" d="M171.87,6.9c95.79,41.83,34.5,243.18-53.99,131.56C81.86,94.73,105.74-24.17,171.87,6.9Z"/>
          <path class="cls-1" d="M415.35,121.09c166.39,17.19-55.18,272.31-57.65,74.97-.01-.91.09-1.85.31-2.73,4.42-17.72,11.34-33.85,17.52-49.51,1.38-3.5,4.63-5.81,8.38-6.17,10.04-.97,18.05-12.75,27.47-16.19,1.25-.46,2.64-.52,3.96-.38Z"/>
          <path class="cls-1" d="M42.47,122.29c126.19,9.11,67.91,243.33-30.88,105.54-.34-.48-.66-.99-.93-1.51-17.51-34.37-17.16-97.87,29.49-103.97.75-.1,1.55-.12,2.31-.06Z"/>
        </g>
      </g>
    </svg>
    <i class="fas fa-chevron-up arrow-icon"></i>
  `;
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide button based on scroll position
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});

// Intersection Observer for Animations
document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    '.service-card, .feature, .benefit-category, .schedule-option'
  );
  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Navbar Background on Scroll
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = '#ffffff';
      navbar.style.backdropFilter = 'none';
    }
  });
});

// CTA Button Click Tracking
document.addEventListener('DOMContentLoaded', function () {
  const ctaButtons = document.querySelectorAll('.cta-button');

  ctaButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);

      // Track which CTA was clicked (for analytics)
      const buttonText = this.textContent.trim();
      console.log(`CTA clicked: ${buttonText}`);

      // You can add analytics tracking here
      // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
    });
  });
});

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', function () {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Loading Animation for Form Submission
function showLoadingState(button) {
  const originalText = button.textContent;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  return function hideLoadingState() {
    button.disabled = false;
    button.textContent = originalText;
  };
}

// Error Handling for Form Submission
function handleFormError(error) {
  console.error('Form submission error:', error);
  showNotification(
    'Sorry, there was an error sending your message. Please try again.',
    'error'
  );
}

// Utility function to format phone number
function formatPhoneNumber(phoneNumberString) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

// Paw Trail Scroll Animation
document.addEventListener('DOMContentLoaded', function () {
  const pawPrints = document.querySelectorAll('.paw-print');

  if (pawPrints.length > 0) {
    window.addEventListener('scroll', function () {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.min(
        scrollY / (documentHeight - windowHeight),
        1
      );

      // Calculate fade out at top (disappear in first 200px)
      const fadeOutProgress = Math.min(scrollY / 200, 1);

      pawPrints.forEach((paw, index) => {
        // Each paw has a different base size multiplier
        const baseMultiplier = 1.2 + index * 0.15; // 1.2, 1.35, 1.5, 1.65, 1.8, 1.95

        // Calculate size based on scroll progress
        const sizeMultiplier = baseMultiplier + scrollProgress * 1.8; // Grow up to 3.75x original size

        // Calculate opacity (fade out at top, full opacity otherwise)
        const opacity = 1 - fadeOutProgress;

        // Apply transformations
        paw.style.transform = `scale(${sizeMultiplier})`;
        paw.style.opacity = Math.max(opacity, 0.1); // Minimum opacity of 0.1
      });
    });
  }
});

// Logo click to home functionality
document.addEventListener('DOMContentLoaded', function () {
  const logoLink = document.querySelector('.logo-link');

  if (logoLink) {
    logoLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
});

// HOCl button scroll functionality
document.addEventListener('DOMContentLoaded', function () {
  const hoclButton = document.querySelector('.hocl-button');

  if (hoclButton) {
    hoclButton.addEventListener('click', function (e) {
      e.preventDefault();
      const hoclSection = document.querySelector('.hocl-section');
      if (hoclSection) {
        const offsetTop = hoclSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  }
});

// HOCl Dropdown Functionality
document.addEventListener('DOMContentLoaded', function () {
  const hoclDropdowns = document.querySelectorAll('.hocl-dropdown');
  console.log('HOCl dropdowns found:', hoclDropdowns.length);

  hoclDropdowns.forEach((dropdown, index) => {
    const button = dropdown.querySelector('.hocl-dropdown-btn');

    if (button) {
      // Add visual indicator that this is clickable
      button.style.cursor = 'pointer';

      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Dropdown clicked:', index + 1);

        const isActive = dropdown.classList.contains('active');

        // Close all other dropdowns
        hoclDropdowns.forEach((otherDropdown, otherIndex) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
            console.log('Closed dropdown:', otherIndex + 1);
          }
        });

        // Toggle current dropdown
        if (isActive) {
          dropdown.classList.remove('active');
          console.log('Closed dropdown:', index + 1);
        } else {
          dropdown.classList.add('active');
          console.log('Opened dropdown:', index + 1);
        }
      });
    } else {
      console.log('No button found for dropdown:', index + 1);
    }
  });
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('PUP Cleanup Services website loaded successfully!');

  // Add any additional initialization code here
  // For example, analytics initialization, third-party integrations, etc.
});
