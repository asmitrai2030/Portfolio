// Typing effect for subtitle
document.addEventListener('DOMContentLoaded', () => {
  const subtitleElement = document.querySelector('.subtitle');
  const phrases = [
    'Full-Stack Web Developer',
    'Front-End Wizard',
    'JavaScript Enthusiast'
  ];
  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = '';
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenPhrases = 2000;

  function type() {
    if (phraseIndex >= phrases.length) phraseIndex = 0;
    currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      subtitleElement.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      if (letterIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenPhrases);
      } else {
        setTimeout(type, typingSpeed);
      }
    } else {
      subtitleElement.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      if (letterIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(type, deletingSpeed);
      }
    }
  }
  type();

  // Smooth scroll for "View My Work" button
  const viewWorkBtn = document.querySelector('.view-work-btn');
  viewWorkBtn.addEventListener('click', () => {
    document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
  });

  // GSAP scroll-triggered animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Hero photo subtle parallax
    gsap.to('.hero-photo', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Modal functionality for project cards
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  const modals = document.querySelectorAll('.project-modal');
  const closeButtons = document.querySelectorAll('.close-modal');

  readMoreButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      modals[i].showModal();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('dialog').close();
    });
  });

  // Close modal on outside click
  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.close();
      }
    });
  });

  // Highlight active nav link on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section'));

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + window.innerHeight / 3;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollPos >= sections[i].offsetTop) {
        navLinks.forEach(link => link.classList.remove('active'));
        const id = sections[i].id;
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
        break;
      }
    }
  });

  // Contact form submission (basic example)
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
});
