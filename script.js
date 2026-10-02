/**
 * NEXUS AI - LANDING PAGE INTERACTIVE JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavbarScroll();
    initMobileMenu();
    initHeroCardTilt();
    initFeatureSpotlight();
    initFeatureFilters();
    initStatsCounters();
    initDemoModal();
    initContactForm();
    initNewsletterForm();
    initBackToTop();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElem = document.documentElement;
    const currentTheme = localStorage.getItem('nexus_theme') || 'dark';

    htmlElem.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const activeTheme = htmlElem.getAttribute('data-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            htmlElem.setAttribute('data-theme', newTheme);
            localStorage.setItem('nexus_theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        const icon = themeBtn.querySelector('i');
        if (icon) {
            if (theme === 'light') {
                icon.className = 'fa-solid fa-sun';
                icon.style.color = '#f59e0b';
            } else {
                icon.className = 'fa-solid fa-moon';
                icon.style.color = '';
            }
        }
    }
}

/* ==========================================================================
   2. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('main-nav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link detection based on scroll position
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   3. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta a');

    if (!mobileBtn || !mobileDrawer) return;

    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
            mobileDrawer.classList.remove('open');
        }
    });
}

/* ==========================================================================
   4. 3D TILT EFFECT ON HERO SHOWCASE CARD
   ========================================================================== */
function initHeroCardTilt() {
    const card = document.getElementById('hero-card-3d');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

/* ==========================================================================
   5. INTERACTIVE SPOTLIGHT ON FEATURE CARDS
   ========================================================================== */
function initFeatureSpotlight() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================================================
   6. FEATURE CATEGORY FILTERS
   ========================================================================== */
function initFeatureFilters() {
    const filterButtons = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.feature-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* ==========================================================================
   7. ANIMATED NUMBER COUNTERS
   ========================================================================== */
function initStatsCounters() {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));

    function animateCounter(counter) {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 1800; // milliseconds
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        const increment = target / totalFrames;
        let current = 0;

        const isDecimal = target % 1 !== 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = isDecimal ? target.toFixed(1) : Math.round(target);
                clearInterval(timer);
            } else {
                counter.innerText = isDecimal ? current.toFixed(1) : Math.round(current);
            }
        }, frameRate);
    }
}

/* ==========================================================================
   8. INTERACTIVE DEMO MODAL
   ========================================================================== */
function initDemoModal() {
    const openBtn = document.getElementById('open-demo-modal');
    const modal = document.getElementById('demo-modal');
    const closeBtn = document.getElementById('close-demo-modal');
    const proceedBtn = document.getElementById('modal-proceed-btn');

    if (!modal) return;

    function openModal() {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
            closeModal();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   9. CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    if (!form || !submitBtn) return;

    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const messageInput = document.getElementById('user-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        nameError.innerText = '';
        emailError.innerText = '';
        messageError.innerText = '';

        // Validate Name
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            nameError.innerText = 'გთხოვთ შეიყვანოთ სწორი სახელი (მინიმუმ 2 სიმბოლო)';
            isValid = false;
        }

        // Validate Email
        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
            emailError.innerText = 'გთხოვთ შეიყვანოთ სწორი ელ-ფოსტის მისამართი';
            isValid = false;
        }

        // Validate Message
        if (!messageInput.value.trim() || messageInput.value.trim().length < 6) {
            messageError.innerText = 'გთხოვთ დაწეროთ შეტყობინება (მინიმუმ 6 სიმბოლო)';
            isValid = false;
        }

        if (!isValid) return;

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate Async Server Call
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            form.reset();

            showToast('შეტყობინება გაიგზავნა!', 'მადლობა, ჩვენი გუნდი მალე დაგიკავშირდებათ.');
        }, 1200);
    });
}

/* ==========================================================================
   10. NEWSLETTER FORM
   ========================================================================== */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input && input.value.trim()) {
            input.value = '';
            showToast('გამოწერა წარმატებულია!', 'თქვენ წარმატებით დარეგისტრირდით სიახლეებზე.');
        }
    });
}

/* ==========================================================================
   11. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(title, desc) {
    const toast = document.getElementById('toast-notification');
    const toastTitle = document.getElementById('toast-title');
    const toastDesc = document.getElementById('toast-desc');
    const toastClose = document.getElementById('toast-close');

    if (!toast) return;

    if (toastTitle) toastTitle.innerText = title;
    if (toastDesc) toastDesc.innerText = desc;

    toast.classList.add('active');

    const autoClose = setTimeout(() => {
        toast.classList.remove('active');
    }, 4500);

    if (toastClose) {
        toastClose.onclick = () => {
            clearTimeout(autoClose);
            toast.classList.remove('active');
        };
    }
}

/* ==========================================================================
   12. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('show');
        } else {
            backBtn.classList.remove('show');
        }
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
