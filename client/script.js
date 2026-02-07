document.addEventListener('DOMContentLoaded', () => {
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all sections and cards
    document.querySelectorAll('section, .project-card, .skill-category, .contact-card, .stat').forEach(element => {
        observer.observe(element);
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.glass-nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.style.display = 'none';
            });
        });
    }

    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // ===== PARALLAX EFFECT FOR HERO =====
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        });
    }

    // ===== FLOATING CARDS ANIMATION =====
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // ===== COUNTER ANIMATION FOR STATS =====
    const stats = document.querySelectorAll('.stat h3');
    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;

        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = stat.textContent;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : stat.textContent.includes('$') ? '$' : '');
                }
            }, 16);
        });

        hasAnimated = true;
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ===== PROJECT CARD HOVER EFFECT =====
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== SKILL CATEGORY HOVER EFFECT =====
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.background = 'var(--card-bg-hover)';
        });

        category.addEventListener('mouseleave', function() {
            this.style.background = 'var(--card-bg)';
        });
    });

    // ===== TECH ITEM ANIMATION =====
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // ===== SMOOTH SCROLL TO TOP BUTTON =====
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== FORM VALIDATION (IF CONTACT FORM EXISTS) =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form validation logic here
            console.log('Form submitted');
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navLinks && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        }
    });

    // ===== PERFORMANCE OPTIMIZATION: DEBOUNCE SCROLL =====
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

    const debouncedScroll = debounce(() => {
        // Add any scroll-dependent logic here
    }, 100);

    window.addEventListener('scroll', debouncedScroll);

    console.log('Portfolio loaded successfully! 🚀');
});

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add active class to nav items
function setActiveNavItem(itemId) {
    document.querySelectorAll('.nav-links a').forEach(item => {
        item.classList.remove('active');
    });
    const activeItem = document.querySelector(`a[href="#${itemId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Get scroll percentage
function getScrollPercentage() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = window.scrollY;
    return windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
}

// Log scroll percentage for debugging
window.addEventListener('scroll', () => {
    // console.log(`Scroll: ${getScrollPercentage().toFixed(2)}%`);
});
