// Onboarding Form JavaScript
document.addEventListener('DOMContentLoaded', function () {
  console.log('Onboarding form loaded successfully!');

  // Initialize all form functionality
  initializeForm();
  initializeDogForms();
  initializeConditionalFields();
  initializeModal();
  initializeFormValidation();
  initializePhoneFormatting();
  initializeSliders();
});

// Initialize main form functionality
function initializeForm() {
  const form = document.getElementById('onboardingForm');
  if (!form) return;

  // Form submission handler
  form.addEventListener('submit', function (e) {
    if (validateForm()) {
      // Set submission timestamp
      const submissionTime = new Date().toISOString();
      const timestampField = document.getElementById('submission-time');
      if (timestampField) {
        timestampField.value = submissionTime;
      }

      showLoadingState();
      // Let Netlify handle the form submission
      // The form will submit normally to Netlify
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  });
}

// Initialize dynamic dog forms based on number of dogs selected
function initializeDogForms() {
  const numberOfDogsSlider = document.getElementById('numberOfDogs');
  const dogInfoSection = document.getElementById('dogInfoSection');
  const dogFormsContainer = document.getElementById('dogFormsContainer');

  console.log('Initializing dog forms...', {
    numberOfDogsSlider: !!numberOfDogsSlider,
    dogInfoSection: !!dogInfoSection,
    dogFormsContainer: !!dogFormsContainer,
  });

  if (!numberOfDogsSlider || !dogInfoSection || !dogFormsContainer) {
    console.error('Missing required elements for dog forms');
    return;
  }

  // Ensure dog info section is visible by default
  dogInfoSection.style.display = 'block';
  console.log('Dog info section made visible');

  // Function to update dog forms based on slider value
  function updateDogForms() {
    const numberOfDogs = parseInt(numberOfDogsSlider.value) || 1;

    // Clear existing dog forms
    dogFormsContainer.innerHTML = '';

    // Always show dog info section
    dogInfoSection.style.display = 'block';

    // Create forms for each dog
    for (let i = 1; i <= numberOfDogs; i++) {
      createDogForm(i, dogFormsContainer);
    }
  }

  // Listen for slider changes
  numberOfDogsSlider.addEventListener('input', updateDogForms);
  numberOfDogsSlider.addEventListener('change', updateDogForms);

  // Initialize with default 1 dog form
  updateDogForms();
}

// Create individual dog form
function createDogForm(dogNumber, container) {
  const dogForm = document.createElement('div');
  dogForm.className = 'dog-form';
  dogForm.innerHTML = `
    <h3>Dog #${dogNumber}</h3>
    <div class="form-row">
      <div class="form-group">
        <label for="dogName${dogNumber}">Dog's name</label>
        <input type="text" id="dogName${dogNumber}" name="dogName${dogNumber}" placeholder="Dog's name" />
      </div>
      <div class="form-group">
        <label for="dogBreed${dogNumber}">Dog's breed</label>
        <input type="text" id="dogBreed${dogNumber}" name="dogBreed${dogNumber}" placeholder="Dog's breed" />
      </div>
    </div>
    <div class="form-group">
      <label>Is it safe for us to be in the yard with your dog? *</label>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" name="dogSafe${dogNumber}" value="yes" required />
          <span class="radio-mark"></span>
          Yes
        </label>
        <label class="radio-label">
          <input type="radio" name="dogSafe${dogNumber}" value="no" required />
          <span class="radio-mark"></span>
          No
        </label>
      </div>
    </div>
    <div class="form-group">
      <label for="dogComments${dogNumber}">Additional comment for dog</label>
      <textarea id="dogComments${dogNumber}" name="dogComments${dogNumber}" placeholder="Any additional information about this dog..."></textarea>
    </div>
  `;

  container.appendChild(dogForm);
}

// Initialize conditional field visibility
function initializeConditionalFields() {
  // No conditional fields currently needed
  // This function is kept for future use if needed
}

// Initialize modal functionality
function initializeModal() {
  const termsLinks = document.querySelectorAll('.terms-link');
  const termsModal = document.getElementById('termsModal');
  const closeTerms = document.getElementById('closeTerms');

  // Open modal when terms links are clicked
  termsLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (termsModal) {
        termsModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    });
  });

  // Close modal
  if (closeTerms) {
    closeTerms.addEventListener('click', function () {
      closeModal();
    });
  }

  // Close modal when clicking outside
  if (termsModal) {
    termsModal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'Escape' &&
      termsModal &&
      termsModal.style.display === 'block'
    ) {
      closeModal();
    }
  });

  function closeModal() {
    if (termsModal) {
      termsModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  }
}

// Initialize form validation
function initializeFormValidation() {
  const form = document.getElementById('onboardingForm');
  if (!form) return;

  // Real-time validation for required fields
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach((field) => {
    field.addEventListener('blur', function () {
      validateField(this);
    });

    field.addEventListener('input', function () {
      // Clear error state on input
      clearFieldError(this);
    });
  });

  // Email validation
  const emailField = document.getElementById('email');
  if (emailField) {
    emailField.addEventListener('blur', function () {
      validateEmail(this);
    });
  }

  // Phone validation
  const phoneFields = document.querySelectorAll('input[type="tel"]');
  phoneFields.forEach((field) => {
    field.addEventListener('blur', function () {
      validatePhone(this);
    });
  });
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim();
  const isRequired = field.hasAttribute('required');

  if (isRequired && !value) {
    showFieldError(field, 'This field is required');
    return false;
  }

  clearFieldError(field);
  return true;
}

// Validate email field
function validateEmail(field) {
  const email = field.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    showFieldError(field, 'Please enter a valid email address');
    return false;
  }

  clearFieldError(field);
  return true;
}

// Validate phone field
function validatePhone(field) {
  const phone = field.value.replace(/\D/g, '');
  const phoneRegex = /^[0-9]{10}$/;

  if (field.value && !phoneRegex.test(phone)) {
    showFieldError(field, 'Please enter a valid 10-digit phone number');
    return false;
  }

  clearFieldError(field);
  return true;
}

// Show field error
function showFieldError(field, message) {
  clearFieldError(field);

  field.style.borderColor = '#dc3545';

  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  `;

  field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
  field.style.borderColor = '';

  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

// Validate entire form
function validateForm() {
  const form = document.getElementById('onboardingForm');
  if (!form) return false;

  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  // Clear all existing errors
  const existingErrors = form.querySelectorAll('.field-error');
  existingErrors.forEach((error) => error.remove());

  // Validate each required field
  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  // Validate email
  const emailField = document.getElementById('email');
  if (emailField && !validateEmail(emailField)) {
    isValid = false;
  }

  // Validate phone numbers
  const phoneFields = document.querySelectorAll('input[type="tel"]');
  phoneFields.forEach((field) => {
    if (field.value && !validatePhone(field)) {
      isValid = false;
    }
  });

  // Validate at least one cleanup area is selected
  const cleanupAreas = form.querySelectorAll(
    'input[name="cleanupAreas"]:checked'
  );
  if (cleanupAreas.length === 0) {
    showNotification('Please select at least one area to clean.', 'error');
    isValid = false;
  }

  // Validate at least one notification type is selected
  const notificationTypes = form.querySelectorAll(
    'input[name="notificationType"]:checked'
  );
  if (notificationTypes.length === 0) {
    showNotification('Please select at least one notification type.', 'error');
    isValid = false;
  }

  if (!isValid) {
    showNotification('Please fix the errors above before submitting.', 'error');
    // Scroll to first error
    const firstError = form.querySelector('.field-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return isValid;
}

// Initialize phone number formatting
function initializePhoneFormatting() {
  const phoneFields = document.querySelectorAll('input[type="tel"]');

  phoneFields.forEach((field) => {
    field.addEventListener('input', function (e) {
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
  });
}

// Show loading state
function showLoadingState() {
  const submitButton = document.querySelector('.submit-button');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  }
}

// Hide loading state
function hideLoadingState() {
  const submitButton = document.querySelector('.submit-button');
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Get Free Quote';
  }
}

// Notification system (reuse from main script.js)
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
      type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#4B9CD3'
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

// Auto-save form data to localStorage
function initializeAutoSave() {
  const form = document.getElementById('onboardingForm');
  if (!form) return;

  const formData = JSON.parse(
    localStorage.getItem('onboardingFormData') || '{}'
  );

  // Restore form data
  Object.keys(formData).forEach((key) => {
    const field = form.querySelector(`[name="${key}"]`);
    if (field) {
      if (field.type === 'checkbox' || field.type === 'radio') {
        field.checked = formData[key];
      } else {
        field.value = formData[key];
      }
    }
  });

  // Save form data on input
  form.addEventListener('input', function (e) {
    const field = e.target;
    if (field.name) {
      const currentData = JSON.parse(
        localStorage.getItem('onboardingFormData') || '{}'
      );

      if (field.type === 'checkbox' || field.type === 'radio') {
        currentData[field.name] = field.checked;
      } else {
        currentData[field.name] = field.value;
      }

      localStorage.setItem('onboardingFormData', JSON.stringify(currentData));
    }
  });

  // Clear saved data on successful submission
  form.addEventListener('submit', function () {
    localStorage.removeItem('onboardingFormData');
  });
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', function () {
  initializeAutoSave();
});

// Smooth scrolling for form sections
function initializeSmoothScrolling() {
  const formSections = document.querySelectorAll('.form-section');

  // Add section navigation
  const sectionNav = document.createElement('div');
  sectionNav.className = 'section-navigation';
  sectionNav.style.cssText = `
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--white);
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 1000;
    display: none;
  `;

  formSections.forEach((section, index) => {
    const title = section.querySelector('.form-section-title');
    if (title) {
      const navItem = document.createElement('a');
      navItem.href = `#section-${index}`;
      navItem.textContent = title.textContent;
      navItem.style.cssText = `
        display: block;
        padding: 8px 12px;
        color: var(--text-dark);
        text-decoration: none;
        font-size: 0.9rem;
        border-radius: 4px;
        margin-bottom: 4px;
        transition: background-color 0.2s ease;
      `;

      navItem.addEventListener('click', function (e) {
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      sectionNav.appendChild(navItem);
    }
  });

  document.body.appendChild(sectionNav);

  // Show/hide navigation based on scroll
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      sectionNav.style.display = 'block';
    } else {
      sectionNav.style.display = 'none';
    }
  });
}

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', function () {
  initializeSmoothScrolling();
});

// Initialize custom sliders
function initializeSliders() {
  // Number of dogs slider
  const numberOfDogsSlider = document.getElementById('numberOfDogs');
  const numberOfDogsValue = document.getElementById('numberOfDogsValue');

  if (numberOfDogsSlider && numberOfDogsValue) {
    const dogLabels = ['1 Dog', '2 Dogs', '3 Dogs', '4 Dogs', '5 Dogs'];

    numberOfDogsSlider.addEventListener('input', function () {
      const value = parseInt(this.value);
      numberOfDogsValue.textContent = dogLabels[value - 1];
      updateSliderBackground(this);
      updateActiveLabel(this, this.parentNode.querySelector('.slider-labels'));
    });

    // Initialize on load
    numberOfDogsValue.textContent = dogLabels[numberOfDogsSlider.value - 1];
    updateSliderBackground(numberOfDogsSlider);
    updateActiveLabel(
      numberOfDogsSlider,
      numberOfDogsSlider.parentNode.querySelector('.slider-labels')
    );
  }

  // Cleanup frequency slider
  const cleanupFrequencySlider = document.getElementById('cleanupFrequency');
  const cleanupFrequencyValue = document.getElementById(
    'cleanupFrequencyValue'
  );

  if (cleanupFrequencySlider && cleanupFrequencyValue) {
    const frequencyLabels = [
      'Two Times A Week',
      'Once A Week',
      'Bi Weekly',
      'Twice Per Month',
      'Once A Month',
      'One Time',
    ];

    cleanupFrequencySlider.addEventListener('input', function () {
      const value = parseInt(this.value);
      cleanupFrequencyValue.textContent = frequencyLabels[value];
      updateSliderBackground(this);
      updateActiveLabel(this, this.parentNode.querySelector('.slider-labels'));
    });

    // Initialize on load
    cleanupFrequencyValue.textContent =
      frequencyLabels[cleanupFrequencySlider.value];
    updateSliderBackground(cleanupFrequencySlider);
    updateActiveLabel(
      cleanupFrequencySlider,
      cleanupFrequencySlider.parentNode.querySelector('.slider-labels')
    );
  }
}

// Update slider background based on value
function updateSliderBackground(slider) {
  const value = parseInt(slider.value);
  const max = parseInt(slider.max);
  const percentage = (value / max) * 100;

  slider.style.background = `linear-gradient(to right, #2c3e50 0%, #2c3e50 ${percentage}%, #e9ecef ${percentage}%, #e9ecef 100%)`;
}

// Update active label styling
function updateActiveLabel(slider, labelsContainer) {
  if (!labelsContainer) return;

  const labels = labelsContainer.querySelectorAll('span');
  const value = parseInt(slider.value);

  labels.forEach((label, index) => {
    label.classList.remove('active');
    if (index === value) {
      label.classList.add('active');
    }
  });
}
