const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileBackdrop = document.querySelector('.mobile-backdrop');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const bookingForm = document.querySelector('.booking-form');
const formNote = document.querySelector('.form-note');
const yearNode = document.querySelector('#year');

const openMenu = () => {
  mobileMenu.hidden = false;
  mobileBackdrop.hidden = false;
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  mobileMenu.hidden = true;
  mobileBackdrop.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};

if (menuToggle && menuClose && mobileMenu && mobileBackdrop) {
  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  mobileBackdrop.addEventListener('click', closeMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));
}

if (bookingForm && formNote) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = bookingForm.querySelectorAll('input[required], select[required]');
    let hasError = false;

    fields.forEach((field) => {
      const isValid = field.value.trim() !== '' && field.checkValidity();
      field.classList.toggle('invalid', !isValid);
      if (!isValid) {
        hasError = true;
      }
    });

    if (hasError) {
      formNote.textContent = 'Please complete all required fields before submitting your request.';
      return;
    }

    formNote.textContent =
      'Booking request captured. Connect this form to your backend booking service to finalize appointments.';
    bookingForm.reset();
  });
}

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
