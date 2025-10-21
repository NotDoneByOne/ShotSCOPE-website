// Main JavaScript for ShotSCOPE Website

class ShotScopeWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupNavigation();
        this.setupAnimations();
        this.setupCounters();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.setupCarousel();
        //this.setupSplashInteractions();
    }

    // Add this method to the ShotScopeWebsite class
    setupSplashInteractions() {
        const splashMockup = document.querySelector('.splash-mockup');
        const loadingProgress = document.querySelector('.loading-progress');

        if (splashMockup && loadingProgress) {
            // Restart loading animation on click
            splashMockup.addEventListener('click', () => {
                loadingProgress.style.animation = 'none';
                setTimeout(() => {
                    loadingProgress.style.animation = 'loading 2s ease-in-out infinite';
                }, 10);
            });

            // Simulate loading states
            let loadState = 0;
            const simulateLoad = () => {
                if (loadState < 3) {
                    loadState++;
                    setTimeout(simulateLoad, 1500);
                }
            };

            // Start simulation after initial load
            setTimeout(simulateLoad, 3000);
        }
    }

    // Preloader
    setupPreloader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const preloader = document.querySelector('.preloader');
                if (preloader) {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }
            }, 1000);
        });
    }

    // Navigation
    setupNavigation() {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelectorAll('.nav-link');

        // Burger menu toggle
        if (burger) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');
                document.body.classList.toggle('no-scroll');
            });
        }

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                document.body.classList.remove('no-scroll');
            });
        });

        // Header scroll effect
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Hide header on scroll down
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = window.scrollY;
        });
    }

    // Animations
    setupAnimations() {
        // Add animation classes on load
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.hero-title, .hero-description, .hero-actions');
            animatedElements.forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
                el.classList.add('animate-slide-in-up');
            });
        });

        // Floating elements interaction
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.animationPlayState = 'paused';
            });
            el.addEventListener('mouseleave', () => {
                el.style.animationPlayState = 'running';
            });
        });
    }

    // Counter animations
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('%', '').replace('+', '');
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(counter), 1);
            } else {
                let finalValue = target;
                if (counter.getAttribute('data-target') === '99.8') {
                    finalValue = target + '%';
                } else if (counter.getAttribute('data-target') === '500' || counter.getAttribute('data-target') === '15') {
                    finalValue = target + '+';
                }
                counter.innerText = finalValue;
            }
        };

        // Start counters when they come into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Carousel
    setupCarousel() {
        const track = document.querySelector('.carousel-track');
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');

        if (!track || !slides.length) return;

        let currentIndex = 0;
        const slideCount = slides.length;

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        };

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        // Auto-advance
        setInterval(nextSlide, 5000);
    }

    // Scroll effects
    setupScrollEffects() {
        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');

            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Smooth scrolling for anchor links
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
    }

    // Update the setupIntersectionObserver function to include changelog animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');

                    // Add staggered animation for grids
                    if (entry.target.classList.contains('features-grid') ||
                        entry.target.classList.contains('experts-grid') ||
                        entry.target.classList.contains('changes-grid')) {
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            child.style.animationDelay = `${index * 0.1}s`;
                            child.classList.add('animate-slide-in-up');
                        });
                    }

                    // Special animation for timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        const changeTypes = entry.target.querySelectorAll('.change-type');
                        changeTypes.forEach((type, index) => {
                            type.style.animationDelay = `${index * 0.2}s`;
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        const sections = document.querySelectorAll('section');
        const cards = document.querySelectorAll('.feature-card, .expert-card, .developer-card, .version-card, .timeline-item');

        sections.forEach(section => observer.observe(section));
        cards.forEach(card => observer.observe(card));
    }

    // Utility functions
    debounce(func, wait) {
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

    // Error handling
    handleError(error) {
        console.error('ShotSCOPE Website Error:', error);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new ShotScopeWebsite();
    } catch (error) {
        console.error('Failed to initialize ShotSCOPE website:', error);
    }
});

// Add CSS for navigation active state
const style = document.createElement('style');
style.textContent = `
    .nav-active {
        transform: translateX(0) !important;
    }
    
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .toggle .line2 {
        opacity: 0;
    }
    
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .header-scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        backdrop-filter: blur(20px) !important;
    }
    
    .no-scroll {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: var(--background);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 999;
        }
        
        .nav ul {
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
        }
        
        .nav-link {
            font-size: 1.1rem;
            padding: 1rem 0;
        }
    }
`;
document.head.appendChild(style);