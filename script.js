const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const mobileMenu = document.querySelector('.mobile-menu');
const backdrop = document.querySelector('.menu-backdrop');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const bookingForm = document.getElementById('booking-form');
const feedback = document.getElementById('form-feedback');
const filters = document.querySelectorAll('.filter');
const galleryItems = document.querySelectorAll('.gallery-item');

const focusableSelectors = 'a[href], button:not([disabled]), select, input, textarea';

function openMenu() {
  mobileMenu.hidden = false;
  backdrop.hidden = false;
  document.body.classList.add('menu-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close menu');
  const firstLink = mobileMenu.querySelector('a');
  if (firstLink) firstLink.focus();
}

function closeMenu() {
  mobileMenu.hidden = true;
  backdrop.hidden = true;
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  menuToggle.focus();
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) closeMenu();
  else openMenu();
});

menuClose?.addEventListener('click', closeMenu);
backdrop?.addEventListener('click', closeMenu);
mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  }

  if (event.key === 'Tab' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    const focusable = mobileMenu.querySelectorAll(focusableSelectors);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    galleryItems.forEach((galleryItem) => {
      const categories = galleryItem.dataset.category || '';
      const matches = selected === 'all' || categories.includes(selected);
      galleryItem.hidden = !matches;
    });
  });
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const requiredFields = ['service', 'vehicle', 'date', 'time', 'name', 'phone', 'email'];

  const missing = requiredFields.filter((field) => !String(formData.get(field) || '').trim());
  if (missing.length) {
    feedback.textContent = 'Please complete all required fields before submitting your request.';
    feedback.style.color = '#ff9da7';
    return;
  }

  feedback.textContent = 'Booking request captured. This is a request only and will need confirmation once backend booking is connected.';
  feedback.style.color = '#9be7b3';
  bookingForm.reset();
});

const directionsButton = document.getElementById('directions-btn');
directionsButton?.addEventListener('click', () => {
  window.alert('Directions integration placeholder: connect this button to your preferred map service.');
});

document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
