/* ═══════════════════════════════════════════════════════
   DERMASKIN — main.js v2
   ═══════════════════════════════════════════════════════ */

// ─── Nav: sombra al hacer scroll ────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ─── Nav: menú móvil ────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', e => {
  if (navLinks.classList.contains('open') && !e.target.closest('#nav')) {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ─── Nav: enlace activo según sección visible ────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ─── Reveal on scroll ────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));

// ─── Formulario de contacto ──────────────────────────────
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showFieldError(input, msg) {
  let err = input.parentElement.querySelector('.form__error');
  if (!err) {
    err = document.createElement('span');
    err.className = 'form__error';
    err.id = input.id + '-error';
    err.setAttribute('role', 'alert');
    input.insertAdjacentElement('afterend', err);
  }
  err.textContent = msg;
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', err.id);
  input.classList.add('input--error');
}

function clearFieldError(input) {
  const err = input.parentElement.querySelector('.form__error');
  if (err) err.textContent = '';
  input.removeAttribute('aria-invalid');
  input.removeAttribute('aria-describedby');
  input.classList.remove('input--error');
}

const nombreInput   = form.querySelector('#nombre');
const telefonoInput = form.querySelector('#telefono');
const emailInput    = form.querySelector('#email');

[nombreInput, telefonoInput, emailInput].forEach(el => {
  el.addEventListener('input', () => clearFieldError(el));
});

function validateForm() {
  let valid = true;
  clearFieldError(nombreInput);
  clearFieldError(telefonoInput);
  clearFieldError(emailInput);

  if (!nombreInput.value.trim()) {
    showFieldError(nombreInput, 'Por favor ingresa tu nombre completo.');
    valid = false;
  }
  if (!telefonoInput.value.trim()) {
    showFieldError(telefonoInput, 'Por favor ingresa tu número de teléfono.');
    valid = false;
  }
  if (emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    showFieldError(emailInput, 'Ingresa un correo electrónico válido.');
    valid = false;
  }
  return valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!validateForm()) {
    const firstError = form.querySelector('.input--error');
    if (firstError) firstError.focus();
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = original;
    btn.disabled = false;
    formSuccess.classList.add('visible');
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => formSuccess.classList.remove('visible'), 6000);
  }, 1200);
});
