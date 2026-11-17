/**
 * script.js — Heer Mehul Mehta Editorial Portfolio JavaScript Engine
 * 
 * Features:
 * 1. Theme Manager: Light Mode (Default: White) & Dark Mode (Dark Blue) with Slidable Dot Toggle
 * 2. Rotating Specializations: 2-second continuous rotation under tagline (Academics & Extracurriculars)
 * 3. Refined Cursor Spotlight: Darker / tinted aura smoothly tracking the cursor
 * 4. Micro-Interactions: Subtle magnetic tilt & shift on hover
 * 5. Cuberto-style Testimonials Cluster: Expands to 3-column row on hover / click
 * 6. Sticky Nav Active Indicator on Scroll
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. THEME MANAGER (Light / Dark Mode with Slidable Toggle)
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('heer_portfolio_theme') || 'light';

  // Apply initial theme
  applyTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('heer_portfolio_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // =========================================================================
  // 2. ROTATING SPECIALIZATIONS (2-Second Continuous Rotation)
  // =========================================================================
  const specializations = [
    "Corporate Finance & Valuation",
    "Tax Analysis & Statutory Audit",
    "Venture Planning & Unit Economics",
    "National-Level Volleyball & Athletics",
    "Student Governance & Campus Logistics",
    "Public Oratory & Varsity Debating",
    "Inclusive Social Scribing & Sign Language"
  ];

  const rotatingEl = document.getElementById('specializingRotating');
  if (rotatingEl) {
    let currentIndex = 0;
    
    setInterval(() => {
      // Fade out and subtle slide
      rotatingEl.style.opacity = '0';
      rotatingEl.style.transform = 'translateY(6px)';

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % specializations.length;
        rotatingEl.textContent = specializations[currentIndex];
        // Fade in
        rotatingEl.style.opacity = '1';
        rotatingEl.style.transform = 'translateY(0)';
      }, 300);

    }, 2000); // Exactly 2 seconds per specialization
  }

  // =========================================================================
  // 3. CURSOR SPOTLIGHT TRACKING (Darker Tinted Aura)
  // =========================================================================
  const spotlight = document.getElementById('cursorSpotlight') || document.querySelector('.cursor-spotlight');
  if (spotlight) {
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      spotlight.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });

    function animateSpotlight() {
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;
      spotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();
  }

  // =========================================================================
  // 4. MICRO-INTERACTIONS (Aryan Joshi Style Subtle Magnetic Shifts)
  // =========================================================================
  const interactiveElements = document.querySelectorAll('.hero-profile-frame, .btn-pill, .skill-bubble, .card-actions a, .detail-stacked-card, .btn-action-primary, .btn-action-secondary');
  
  interactiveElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveX = (x / rect.width) * 5;
      const moveY = (y / rect.height) * 5;
      el.style.transform = `translate(${moveX}px, ${moveY - 3}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // =========================================================================
  // 5. TESTIMONIALS CLUSTER (Dynamic Expansion on Hover / Click)
  // =========================================================================
  const testimonialsCluster = document.querySelector('.testimonials-cluster');
  if (testimonialsCluster) {
    testimonialsCluster.addEventListener('click', () => {
      testimonialsCluster.classList.toggle('cluster-expanded');
    });
  }

  // =========================================================================
  // 6. STICKY NAV ACTIVE HIGHLIGHTING ON SCROLL
  // =========================================================================
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

});
