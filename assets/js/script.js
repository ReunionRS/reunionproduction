// Tailwind config
if (window.tailwind) {
    tailwind.config = {
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 1s ease-out',
                'fade-in-up': 'fadeInUp 1s ease-out 0.5s both',
                'scale-in': 'scaleIn 1s ease-out 1s both',
                'gradient-shift': 'gradientShift 3s ease infinite',
                'spin-slow': 'spinSlow 20s linear infinite',
                'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
                'scroll-right': 'scrollRight 30s linear infinite',
                'glow': 'glow 2s ease-in-out infinite'
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeInUp: {
                    'from': { opacity: '0', transform: 'translateY(30px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' }
                },
                scaleIn: {
                    'from': { opacity: '0', transform: 'scale(0.9)' },
                    'to': { opacity: '1', transform: 'scale(1)' }
                },
                gradientShift: {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' }
                },
                scrollRight: {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' }
                },
                spinSlow: {
                    'from': { transform: 'rotate(0deg)' },
                    'to': { transform: 'rotate(360deg)' }
                },
                pulseSlow: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' }
                },
                glow: {
                    '0%, 100%': { 'box-shadow': '0 0 5px rgba(59, 130, 246, 0.3)' },
                    '50%': { 'box-shadow': '0 0 20px rgba(59, 130, 246, 0.6)' }
                }
            },
            backgroundSize: {
                '300%': '300% 300%'
            }
        }
    }
    };
}

// Initialize Lucide icons
if (window.lucide) {
    lucide.createIcons();
}

// Global variables
let isScrolled = false;
let isMobileMenuOpen = false;

// Header scroll effect
function handleScroll() {
    const header = document.getElementById('header');
    const currentScrolled = window.scrollY > 50;
    
    if (currentScrolled !== isScrolled) {
        isScrolled = currentScrolled;
        if (isScrolled) {
            header.classList.add('bg-black', 'bg-opacity-90', 'backdrop-blur-sm');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-black', 'bg-opacity-90', 'backdrop-blur-sm');
            header.classList.add('bg-transparent');
        }
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const spans = menuBtn.querySelectorAll('span');
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileMenu.style.maxHeight = '256px';
        mobileMenu.style.opacity = '1';
        spans[0].style.transform = 'rotate(45deg) translateY(6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
    } else {
        mobileMenu.style.maxHeight = '0';
        mobileMenu.style.opacity = '0';
        spans[0].style.transform = 'rotate(0) translateY(-2px)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translateY(2px)';
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
}

// Handle video hover effects for projects only
function setupProjectHovers() {
    const projectCards = document.querySelectorAll('#projects-container .group');
    
    projectCards.forEach(card => {
        const video = card.querySelector('video');
        
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(e => {
                    console.log('Video play failed:', e);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
}

// Case filter functionality
function setupCaseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseItems = document.querySelectorAll('.case-item');
    const emptyState = document.getElementById('cases-empty');
    
    if (!filterButtons.length || !caseItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-800', 'text-gray-300');
            });
            button.classList.add('bg-blue-600', 'text-white');
            button.classList.remove('bg-gray-800', 'text-gray-300');
            
            const filter = button.dataset.filter;
            
            // Filter cases
            let visibleCount = 0;
            caseItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show empty state if no items
            if (visibleCount === 0) {
                emptyState?.classList.remove('hidden');
            } else {
                emptyState?.classList.add('hidden');
            }
        });
    });
}

// Animate counters
function animateCounters() {
    const counters = [
        { element: document.getElementById('projects-count'), target: 150 },
        { element: document.getElementById('clients-count'), target: 45 },
        { element: document.getElementById('hours-count'), target: 2500 },
        { element: document.getElementById('years-count'), target: 7 }
    ];
    
    counters.forEach(counter => {
        if (!counter.element) return;
        
        let current = 0;
        const increment = counter.target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
                current = counter.target;
                clearInterval(timer);
            }
            counter.element.textContent = Math.floor(current);
        }, 30);
    });
}

// Handle contact form submission
function setupCaseGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.case-gallery-item');
    const lightbox = document.getElementById('case-gallery-lightbox');
    const lightboxImage = document.getElementById('case-gallery-lightbox-image');
    const closeButton = document.getElementById('case-gallery-lightbox-close');

    if (!galleryItems.length || !lightbox || !lightboxImage || !closeButton) {
        return;
    }

    const closeLightbox = () => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
        lightboxImage.src = '';
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.dataset.src;
            if (!src) {
                return;
            }
            lightboxImage.src = src;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

function setupServiceAccordion() {
    const items = document.querySelectorAll('.service-item');
    if (!items.length) {
        return;
    }

    items.forEach(item => {
        const summary = item.querySelector('summary');
        if (!summary) {
            return;
        }

        summary.addEventListener('click', (event) => {
            event.preventDefault();
            const wasOpen = item.hasAttribute('open');
            items.forEach(other => {
                if (other !== item) {
                    other.removeAttribute('open');
                }
            });

            if (!wasOpen) {
                item.setAttribute('open', '');
            }
        });
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const originalButtonHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Отправка...</span>';
        
        try {
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в течение 24 часов.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.', 'error');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalButtonHtml;
            if (window.lucide) {
                lucide.createIcons();
            }
        }
    });
}

function setupCaseCardsModal() {
    const caseItems = document.querySelectorAll('.case-item');
    const modal = document.getElementById('case-modal');
    const closeButton = document.getElementById('close-modal');
    const modalContent = document.getElementById('modal-content');

    if (!caseItems.length || !modal || !closeButton || !modalContent) {
        return;
    }

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
        modalContent.innerHTML = '';
    };

    caseItems.forEach(item => {
        item.addEventListener('click', () => {
            const image = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent?.trim() || 'Проект Reunion Production';
            const description = item.querySelector('p')?.textContent?.trim() || '';
            const category = item.dataset.category?.toUpperCase() || 'VFX';

            modalContent.innerHTML = `
                <div class="space-y-6">
                    ${image ? `<img src="${image.src}" alt="${image.alt}" class="w-full aspect-video object-cover rounded-lg border border-white border-opacity-10">` : ''}
                    <div>
                        <div class="text-sm text-blue-400 uppercase tracking-wide mb-3">${category}</div>
                        <h2 class="text-3xl md:text-4xl font-medium text-white mb-4">${title}</h2>
                        ${description ? `<p class="text-gray-300 text-lg leading-relaxed">${description}</p>` : ''}
                    </div>
                    <a href="contact.html" class="inline-flex items-center justify-center px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        Обсудить похожий проект
                    </a>
                </div>
            `;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

function setupLoadMoreButton() {
    const button = document.getElementById('load-more-btn');
    const container = document.getElementById('load-more-container');
    const hiddenItems = document.querySelectorAll('.case-item.hidden');

    if (!button || !container) {
        return;
    }

    if (!hiddenItems.length) {
        container.classList.add('hidden');
        return;
    }

    button.addEventListener('click', () => {
        [...document.querySelectorAll('.case-item.hidden')].slice(0, 3).forEach(item => {
            item.classList.remove('hidden');
        });

        if (!document.querySelector('.case-item.hidden')) {
            container.classList.add('hidden');
        }
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notifications = document.getElementById('notifications') || document.body;
    const notification = document.createElement('div');
    
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full opacity-0 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;
    
    notifications.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
        notification.classList.add('translate-x-0', 'opacity-100');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('translate-x-0', 'opacity-100');
        notification.classList.add('translate-x-full', 'opacity-0');
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Debounce function for performance
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(handleScroll, 10);

// Initialize app
function init() {
    // Event listeners
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Setup project hover effects (only for projects with video)
    setupProjectHovers();
    
    // Setup case filters
    setupCaseFilters();

    // Setup case cards modal and load more control
    setupCaseCardsModal();
    setupLoadMoreButton();

    // Setup case gallery lightbox
    setupCaseGalleryLightbox();

    // Setup service accordion on index page
    setupServiceAccordion();
    
    // Setup contact form
    setupContactForm();
    
    // Animate counters if on cases page
    if (document.getElementById('projects-count')) {
        setTimeout(animateCounters, 1000);
    }
    
    // Initialize scroll position
    handleScroll();
    
    if (window.lucide) {
        lucide.createIcons();
    }

    console.log('Reunion Production initialized successfully!');
}

// Start app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
