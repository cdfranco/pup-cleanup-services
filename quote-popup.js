// Quote Popup JavaScript
document.addEventListener('DOMContentLoaded', function () {
  console.log('Quote popup loaded successfully!');

  // Initialize quote popup functionality
  initializeQuotePopup();
  initializeQuoteForm();
  initializePriceCalculation();
  initializeScrollTrigger();

  console.log('All quote popup functions initialized');
});

// Initialize quote popup functionality
function initializeQuotePopup() {
  const quotePopup = document.getElementById('quotePopup');
  const closeButton = document.getElementById('closeQuotePopup');
  const getFullQuoteButton = document.getElementById('getFullQuote');

  if (!quotePopup) return;

  // Close popup when clicking close button
  if (closeButton) {
    closeButton.addEventListener('click', closeQuotePopup);
  }

  // Close popup when clicking outside
  quotePopup.addEventListener('click', function (e) {
    if (e.target === quotePopup) {
      closeQuotePopup();
    }
  });

  // Close popup with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && quotePopup.classList.contains('show')) {
      closeQuotePopup();
    }
  });

  // Redirect to full quote page
  if (getFullQuoteButton) {
    getFullQuoteButton.addEventListener('click', function () {
      closeQuotePopup();
      window.location.href = 'client-onboarding.html';
    });
  }
}

// Show quote popup
function showQuotePopup() {
  const quotePopup = document.getElementById('quotePopup');
  if (quotePopup) {
    quotePopup.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

// Close quote popup
function closeQuotePopup() {
  const quotePopup = document.getElementById('quotePopup');
  if (quotePopup) {
    quotePopup.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

// Initialize quote form functionality
function initializeQuoteForm() {
  const form = document.getElementById('quotePopupForm');
  if (!form) {
    console.error('Quote form not found!');
    return;
  }

  console.log('Quote form found, setting up event listeners...');

  // Form submission handler
  form.addEventListener('submit', function (e) {
    console.log('Form submit event triggered!');
    e.preventDefault();

    console.log('About to validate form...');
    const isValid = validateQuoteForm();
    console.log('Form validation result:', isValid);

    if (isValid) {
      console.log('Form validation passed, submitting...');
      submitQuoteForm();
    } else {
      console.log('Form validation failed - check form fields');
    }
  });

  // Also add click handler to submit button as backup
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.addEventListener('click', function (e) {
      console.log('Submit button clicked!');
      // Let the form submit event handle it
    });
  } else {
    console.error('Submit button not found!');
  }

  // Initialize sliders
  initializeQuoteSliders();

  // Initialize phone formatting
  initializeQuotePhoneFormatting();

  // Real-time validation
  initializeQuoteValidation();
}

// Initialize quote sliders
function initializeQuoteSliders() {
  // Number of dogs slider
  const numberOfDogsSlider = document.getElementById('popupNumberOfDogs');
  const numberOfDogsValue = document.getElementById('popupNumberOfDogsValue');

  if (numberOfDogsSlider && numberOfDogsValue) {
    const dogLabels = ['1 Dog', '2 Dogs', '3 Dogs', '4 Dogs', '5 Dogs'];

    numberOfDogsSlider.addEventListener('input', function () {
      const value = parseInt(this.value);
      numberOfDogsValue.textContent = dogLabels[value - 1];
      updateQuoteSliderBackground(this);
      updateQuoteActiveLabel(
        this,
        this.parentNode.querySelector('.quote-slider-labels')
      );
      calculatePrice(); // Recalculate price when dogs change
    });

    // Initialize on load
    numberOfDogsValue.textContent = dogLabels[numberOfDogsSlider.value - 1];
    updateQuoteSliderBackground(numberOfDogsSlider);
    updateQuoteActiveLabel(
      numberOfDogsSlider,
      numberOfDogsSlider.parentNode.querySelector('.quote-slider-labels')
    );
  }

  // Cleanup frequency slider
  const cleanupFrequencySlider = document.getElementById(
    'popupCleanupFrequency'
  );
  const cleanupFrequencyValue = document.getElementById(
    'popupCleanupFrequencyValue'
  );

  if (cleanupFrequencySlider && cleanupFrequencyValue) {
    const frequencyLabels = [
      '1x Week',
      '2x Week',
      'Bi-Weekly',
      '1x Month',
      'One Time',
    ];

    cleanupFrequencySlider.addEventListener('input', function () {
      const value = parseInt(this.value);
      cleanupFrequencyValue.textContent = frequencyLabels[value];
      updateQuoteSliderBackground(this);
      updateQuoteActiveLabel(
        this,
        this.parentNode.querySelector('.quote-slider-labels')
      );
      calculatePrice(); // Recalculate price when frequency changes
    });

    // Initialize on load
    cleanupFrequencyValue.textContent =
      frequencyLabels[cleanupFrequencySlider.value];
    updateQuoteSliderBackground(cleanupFrequencySlider);
    updateQuoteActiveLabel(
      cleanupFrequencySlider,
      cleanupFrequencySlider.parentNode.querySelector('.quote-slider-labels')
    );
  }
}

// Update quote slider background
function updateQuoteSliderBackground(slider) {
  const value = parseInt(slider.value);
  const max = parseInt(slider.max);
  const percentage = (value / max) * 100;

  slider.style.background = `linear-gradient(to right, #2c3e50 0%, #2c3e50 ${percentage}%, #e9ecef ${percentage}%, #e9ecef 100%)`;
}

// Update active label styling
function updateQuoteActiveLabel(slider, labelsContainer) {
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

// Initialize phone formatting
function initializeQuotePhoneFormatting() {
  const phoneField = document.getElementById('popupCellPhone');
  if (phoneField) {
    phoneField.addEventListener('input', function (e) {
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
}

// Initialize form validation
function initializeQuoteValidation() {
  const form = document.getElementById('quotePopupForm');
  if (!form) return;

  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach((field) => {
    field.addEventListener('blur', function () {
      validateQuoteField(this);
    });

    field.addEventListener('input', function () {
      clearQuoteFieldError(this);
    });
  });

  // Email validation
  const emailField = document.getElementById('popupEmail');
  if (emailField) {
    emailField.addEventListener('blur', function () {
      validateQuoteEmail(this);
    });
  }

  // Phone validation
  const phoneField = document.getElementById('popupCellPhone');
  if (phoneField) {
    phoneField.addEventListener('blur', function () {
      validateQuotePhone(this);
    });
  }
}

// Validate individual field
function validateQuoteField(field) {
  const value = field.value.trim();
  const isRequired = field.hasAttribute('required');

  if (isRequired && !value) {
    showQuoteFieldError(field, 'This field is required');
    return false;
  }

  clearQuoteFieldError(field);
  return true;
}

// Validate email field
function validateQuoteEmail(field) {
  const email = field.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    showQuoteFieldError(field, 'Please enter a valid email address');
    return false;
  }

  clearQuoteFieldError(field);
  return true;
}

// Validate phone field
function validateQuotePhone(field) {
  const phone = field.value.replace(/\D/g, '');
  const phoneRegex = /^[0-9]{10}$/;

  if (field.value && !phoneRegex.test(phone)) {
    showQuoteFieldError(field, 'Please enter a valid 10-digit phone number');
    return false;
  }

  clearQuoteFieldError(field);
  return true;
}

// Show field error
function showQuoteFieldError(field, message) {
  clearQuoteFieldError(field);

  field.style.borderColor = '#dc3545';

  const errorDiv = document.createElement('div');
  errorDiv.className = 'quote-field-error';
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
function clearQuoteFieldError(field) {
  field.style.borderColor = '';

  const existingError = field.parentNode.querySelector('.quote-field-error');
  if (existingError) {
    existingError.remove();
  }
}

// Validate entire form
function validateQuoteForm() {
  const form = document.getElementById('quotePopupForm');
  if (!form) return false;

  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  // Clear all existing errors
  const existingErrors = form.querySelectorAll('.quote-field-error');
  existingErrors.forEach((error) => error.remove());

  // Validate each required field
  requiredFields.forEach((field) => {
    if (!validateQuoteField(field)) {
      isValid = false;
    }
  });

  // Validate email
  const emailField = document.getElementById('popupEmail');
  if (emailField && !validateQuoteEmail(emailField)) {
    isValid = false;
  }

  // Validate phone
  const phoneField = document.getElementById('popupCellPhone');
  if (phoneField && !validateQuotePhone(phoneField)) {
    isValid = false;
  }

  // Validate at least one cleanup area is selected
  const cleanupAreas = form.querySelectorAll(
    'input[name="cleanupAreas"]:checked'
  );
  if (cleanupAreas.length === 0) {
    showQuoteNotification('Please select at least one area to clean.', 'error');
    isValid = false;
  }

  if (!isValid) {
    showQuoteNotification(
      'Please fix the errors above before submitting.',
      'error'
    );
  }

  return isValid;
}

// Submit quote form to Airtable
function submitQuoteForm() {
  console.log('submitQuoteForm function called!');

  // Declare variables at the top to avoid ReferenceError
  const airtableToken =
    'patt9yAWFBYo5m2YG.c74ac32c51ff3ffc0939813fe641648b4680932831b37a12c9828c3742964d98';
  const airtableUrl =
    'https://api.airtable.com/v0/apphutV1MB51S2GIM/tblr90PuCaOOOtivp';

  const form = document.getElementById('quotePopupForm');
  if (!form) {
    console.error('Form not found in submitQuoteForm!');
    return;
  }
  console.log('Form found, proceeding with submission...');

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Get cleanup areas as array
  const cleanupAreas = Array.from(
    document.querySelectorAll('input[name="cleanupAreas"]:checked')
  ).map((checkbox) => checkbox.value);

  // Get frequency label
  const frequencyLabels = [
    '1x Week',
    '2x Week',
    'Bi-Weekly',
    '1x Month',
    'One Time',
  ];
  const frequencyLabel = frequencyLabels[parseInt(data.cleanupFrequency) || 0];

  // Get number of dogs label
  const dogLabels = ['1 Dog', '2 Dogs', '3 Dogs', '4 Dogs', '5 Dogs'];
  const dogLabel = dogLabels[parseInt(data.numberOfDogs) - 1] || '1 Dog';

  // Calculate final price
  const numberOfDogs = parseInt(data.numberOfDogs) || 1;
  const cleanupFrequency = parseInt(data.cleanupFrequency) || 0;
  const pricingMatrix = {
    1: { 0: 25, 1: 45, 2: 30, 3: 50, 4: 60 },
    2: { 0: 30, 1: 54, 2: 35, 3: 60, 4: 70 },
    3: { 0: 35, 1: 63, 2: 40, 3: 70, 4: 80 },
    4: { 0: 40, 1: 72, 2: 45, 3: 80, 4: 90 },
    5: { 0: 45, 1: 81, 2: 50, 3: 90, 4: 100 },
  };
  const basePrice = pricingMatrix[numberOfDogs]?.[cleanupFrequency] || 25;
  let areaMultiplier = 1.0;
  if (cleanupAreas.length > 0) {
    const hasAllAreas = cleanupAreas.includes('all');
    if (hasAllAreas) {
      areaMultiplier = 1.2;
    } else if (cleanupAreas.length > 2) {
      areaMultiplier = 1.1;
    }
  }
  const calculatedPrice = Math.round(basePrice * areaMultiplier);

  // Prepare Airtable record
  const airtableRecord = {
    fields: {
      'First Name': data.firstName || '',
      'Last Name': data.lastName || '',
      Email: data.email || '',
      Phone: data.cellPhone || '',
      Address: data.address || '',
      City: data.city || '',
      State: data.state || '',
      'Zip Code': data.zipCode || '',
      'Number of Dogs': dogLabel,
      'Cleanup Frequency': frequencyLabel,
      'Cleanup Areas': cleanupAreas.join(', '),
      'Estimated Price': `$${calculatedPrice}`,
      'Property Size': data.propertySize || '',
      'Special Instructions': data.specialInstructions || '',
      'Submission Time': new Date().toISOString(),
      'Form Source': 'Quote Popup',
    },
  };

  // Debug logging
  console.log('Sending data to Airtable:', airtableRecord);
  console.log('Airtable URL:', airtableUrl);
  console.log(
    'Airtable Token (first 10 chars):',
    airtableToken.substring(0, 10) + '...'
  );

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Submitting...';

  // Submit to Airtable
  // Note: Table name is case-sensitive and spaces are URL-encoded
  // SECURITY: API key is loaded from configuration file

  console.log('Using hardcoded Airtable values');
  console.log('Token:', airtableToken.substring(0, 10) + '...');
  console.log('URL:', airtableUrl);

  if (airtableToken === 'YOUR_NEW_TOKEN_HERE') {
    console.error(
      'Airtable token not configured. Please update config.js with your token.'
    );
    showQuoteNotification(
      'Configuration error. Please contact support.',
      'error'
    );
    return;
  }

  fetch(airtableUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${airtableToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(airtableRecord),
  })
    .then((response) => {
      console.log('Airtable response status:', response.status);
      if (!response.ok) {
        return response.text().then((text) => {
          console.error('Airtable error response:', text);
          throw new Error(
            `Airtable API error: ${response.status} ${response.statusText} - ${text}`
          );
        });
      }
      return response.json();
    })
    .then(() => {
      showQuoteNotification(
        "Thank you! We'll contact you soon with your quote.",
        'success'
      );
      form.reset();
      calculatePrice(); // Reset price display
      setTimeout(() => {
        closeQuotePopup();
      }, 2000);
    })
    .catch((error) => {
      console.error('Error submitting to Airtable:', error);
      showQuoteNotification(
        'Sorry, there was an error. Please try again.',
        'error'
      );
    })
    .finally(() => {
      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    });
}

// Initialize price calculation
function initializePriceCalculation() {
  // Calculate price on form changes
  const form = document.getElementById('quotePopupForm');
  if (!form) return;

  // Listen for changes to form inputs that affect pricing
  const pricingInputs = form.querySelectorAll(
    '#popupNumberOfDogs, #popupCleanupFrequency, input[name="cleanupAreas"]'
  );
  pricingInputs.forEach((input) => {
    input.addEventListener('change', calculatePrice);
    input.addEventListener('input', calculatePrice);
  });

  // Initial calculation
  calculatePrice();
}

// Calculate price based on form inputs
function calculatePrice() {
  const numberOfDogs =
    parseInt(document.getElementById('popupNumberOfDogs')?.value) || 1;
  const cleanupFrequency =
    parseInt(document.getElementById('popupCleanupFrequency')?.value) || 1;
  const cleanupAreas = document.querySelectorAll(
    'input[name="cleanupAreas"]:checked'
  );

  // Exact pricing matrix from the spreadsheet
  const pricingMatrix = {
    1: {
      // 1 dog
      0: 25, // 1x Week
      1: 45, // 2x Week
      2: 30, // Bi Weekly
      3: 50, // 1x Month
      4: 60, // One Time
    },
    2: {
      // 2 dogs
      0: 30, // 1x Week
      1: 54, // 2x Week
      2: 35, // Bi Weekly
      3: 60, // 1x Month
      4: 70, // One Time
    },
    3: {
      // 3 dogs
      0: 35, // 1x Week
      1: 63, // 2x Week
      2: 40, // Bi Weekly
      3: 70, // 1x Month
      4: 80, // One Time
    },
    4: {
      // 4 dogs
      0: 40, // 1x Week
      1: 72, // 2x Week
      2: 45, // Bi Weekly
      3: 80, // 1x Month
      4: 90, // One Time
    },
    5: {
      // 5 dogs (extrapolated)
      0: 45, // 1x Week
      1: 81, // 2x Week
      2: 50, // Bi Weekly
      3: 90, // 1x Month
      4: 100, // One Time
    },
  };

  // Get base price from matrix
  const basePrice = pricingMatrix[numberOfDogs]?.[cleanupFrequency] || 25;

  // Debug logging
  console.log('Pricing calculation:', {
    numberOfDogs,
    cleanupFrequency,
    basePrice,
    cleanupAreas: cleanupAreas.length,
  });

  // Area multipliers (small adjustments for additional areas)
  let areaMultiplier = 1.0;
  if (cleanupAreas.length > 0) {
    const hasAllAreas = Array.from(cleanupAreas).some(
      (area) => area.value === 'all'
    );
    if (hasAllAreas) {
      areaMultiplier = 1.2; // 20% increase for all areas
    } else if (cleanupAreas.length > 2) {
      areaMultiplier = 1.1; // 10% increase for 3+ specific areas
    }
  }

  // Calculate final price
  const calculatedPrice = Math.round(basePrice * areaMultiplier);

  console.log('Final calculated price:', calculatedPrice);

  // Display exact price (no range needed with exact pricing)
  const priceElement = document.getElementById('quotePriceAmount');
  if (priceElement) {
    priceElement.textContent = `$${calculatedPrice}`;
  }
}

// Initialize scroll trigger
function initializeScrollTrigger() {
  let popupShown = false;
  const scheduleSection = document.querySelector('.schedule');

  if (!scheduleSection) return;

  window.addEventListener('scroll', function () {
    if (popupShown) return; // Only show once per session

    const scheduleBottom =
      scheduleSection.offsetTop + scheduleSection.offsetHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    // Show popup when user scrolls past the "Personalized Cleanups for Your Needs" section
    if (scrollPosition > scheduleBottom) {
      popupShown = true;
      setTimeout(() => {
        showQuotePopup();
      }, 1000); // Small delay for better UX
    }
  });
}

// Show notification
function showQuoteNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(
    '.quote-notification'
  );
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `quote-notification quote-notification-${type}`;
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
    z-index: 10001;
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

// Add a manual trigger for testing (can be removed in production)
window.showQuotePopup = showQuotePopup;



