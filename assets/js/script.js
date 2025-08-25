// Ottawa Handiman Website JavaScript
// Optimized for performance and user experience

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile navigation toggle with iOS fix
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        let isProcessing = false;
        
        // Handle both touch and click events properly
        const toggleMenu = function(e) {
            // Prevent double-firing
            if (isProcessing) return;
            isProcessing = true;
            
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            // Toggle classes
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            } else {
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
            }
            
            // Reset flag after animation
            setTimeout(() => {
                isProcessing = false;
            }, 50);
        };
        
        // Add both touch and click handlers for iOS compatibility
        navToggle.addEventListener('touchstart', toggleMenu, { passive: false });
        navToggle.addEventListener('click', function(e) {
            // Only fire click if touch didn't already handle it
            if (!isProcessing) {
                toggleMenu(e);
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Sticky navigation on scroll
    const navigation = document.querySelector('.navigation');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navigation.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navigation.classList.contains('scroll-down')) {
            // Scrolling down
            navigation.classList.remove('scroll-up');
            navigation.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navigation.classList.contains('scroll-down')) {
            // Scrolling up
            navigation.classList.remove('scroll-down');
            navigation.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                service: formData.get('service'),
                project: formData.get('project')
            };
            
            // Show loading state
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Track form submission with Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'engagement',
                    'event_label': 'contact_form',
                    'service_type': data.service,
                    'value': 1
                });
            }
            
            // Create email content
            const emailBody = `
New Project Inquiry from Ottawa Handiman Website:

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Service Type: ${data.service}

Project Description:
${data.project}

---
Sent from ottawahandiman.ca contact form
            `.trim();
            
            // Create mailto link
            const mailtoLink = `mailto:ottawahandiman3@gmail.com?subject=New Project Inquiry from ${data.name}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            setTimeout(() => {
                alert('Thank you for your inquiry! Your email client should have opened with your message ready to send. If not, please call us directly at 343.987.0900.');
                
                // Reset form
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    }

    // Phone number formatting for Canadian numbers
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 10) {
                value = value.slice(0, 10);
                e.target.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
            }
        });
    });

    // Lazy loading for images (if IntersectionObserver is supported)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add click tracking for phone numbers (for analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone clicks with Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'contact',
                    'event_label': 'phone_call',
                    'value': 1
                });
                console.log('Phone click tracked');
            }
        });
    });

    // Add click tracking for email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track email clicks with Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'contact',
                    'event_label': 'email',
                    'value': 1
                });
                console.log('Email click tracked');
            }
        });
    });

    // Gallery modal functionality (simple lightbox)
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            createLightbox(this);
        });
        
        // Add cursor pointer style
        img.style.cursor = 'pointer';
    });

    function createLightbox(img) {
        // Create lightbox overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
        `;
        
        // Create image
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
        `;
        
        // Create close button
        const closeButton = document.createElement('div');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
        `;
        
        overlay.appendChild(lightboxImg);
        overlay.appendChild(closeButton);
        document.body.appendChild(overlay);
        
        // Close lightbox on click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay || e.target === closeButton) {
                document.body.removeChild(overlay);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        });
    }

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add animation on scroll (simple fade-in effect)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .value-item, .step, .faq-item, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add current year to footer if needed
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                // Log load time (for debugging)
                console.log(`Page load time: ${loadTime}ms`);
                
                // Track with Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        'event_category': 'performance',
                        'name': 'page_load',
                        'value': loadTime,
                        'event_label': loadTime < 3000 ? 'fast' : loadTime < 5000 ? 'average' : 'slow'
                    });
                    
                    // Track Core Web Vitals
                    if (perfData.domContentLoadedEventEnd) {
                        const dcl = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                        gtag('event', 'timing_complete', {
                            'event_category': 'performance',
                            'name': 'dom_content_loaded',
                            'value': dcl
                        });
                    }
                }
            }, 0);
        });
    }

    // Add click-to-call functionality for mobile
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        const phoneNumbers = document.querySelectorAll('.phone-number, .contact-link[href^="tel:"]');
        phoneNumbers.forEach(phone => {
            phone.style.textDecoration = 'underline';
            phone.style.color = '#2C5530';
        });
    }

    // iPad and tablet specific optimizations
    function isTablet() {
        return /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent) || 
               (window.innerWidth >= 768 && window.innerWidth <= 1024);
    }

    if (isTablet()) {
        // Optimize touch interactions for tablets
        const interactiveElements = document.querySelectorAll('.cta-button, .service-card, .gallery-item, .testimonial-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Enhanced gallery for tablet viewing
        const galleryImages = document.querySelectorAll('.gallery-item img');
        galleryImages.forEach(img => {
            img.addEventListener('touchstart', function(e) {
                e.preventDefault();
                createLightbox(this);
            });
        });
    }

    // Orientation change handling for mobile and tablet
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layout after orientation change
            window.scrollTo(0, window.scrollY + 1);
            window.scrollTo(0, window.scrollY - 1);
        }, 500);
    });

    // Enhanced form validation for mobile/tablet
    const mobileInputs = document.querySelectorAll('input, textarea, select');
    mobileInputs.forEach(input => {
        // Prevent zoom on input focus for iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
        }
        
        // Enhanced touch feedback
        input.addEventListener('touchstart', function() {
            this.style.borderColor = '#2C5530';
        });
    });

    // Simple form validation
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#27ae60';
            }
        });
    });

    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#e74c3c';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = '#27ae60';
                this.setCustomValidity('');
            }
        });
    });

    // Add loading states for external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 2000);
        });
    });

    // Track scroll depth for analytics
    let scrollDepths = [25, 50, 75, 90];
    let scrolledDepths = [];
    
    window.addEventListener('scroll', function() {
        let scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
        
        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !scrolledDepths.includes(depth)) {
                scrolledDepths.push(depth);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', {
                        'event_category': 'engagement',
                        'event_label': `${depth}%`,
                        'value': depth
                    });
                    console.log(`Scroll depth ${depth}% tracked`);
                }
            }
        });
    });
    
    // Track outbound links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="ottawahandiman.ca"])');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const url = this.href;
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'outbound',
                    'event_label': url,
                    'transport_type': 'beacon'
                });
            }
        });
    });
    
    // Track navigation menu clicks
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.getAttribute('href').replace('#', '');
            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigation', {
                    'event_category': 'engagement',
                    'event_label': section
                });
            }
        });
    });
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            const isPrimary = this.classList.contains('primary');
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': buttonText,
                    'button_type': isPrimary ? 'primary' : 'secondary'
                });
            }
        });
    });
    
    console.log('Ottawa Handiman website loaded successfully with Google Analytics!');
});

// Enhanced utility function to track custom events with Google Analytics
function trackEvent(action, category = 'engagement', label = '', value = null) {
    if (typeof gtag !== 'undefined') {
        const eventParams = {
            'event_category': category,
            'event_label': label
        };
        
        if (value !== null) {
            eventParams.value = value;
        }
        
        gtag('event', action, eventParams);
        console.log(`GA Event: ${action} - ${category} - ${label}${value ? ' - ' + value : ''}`);
    }
}

// Share button functionality
document.getElementById('share').addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = document.getElementById('share-menu-inline');

    // Toggle menu
    if (menu.style.display === 'none' || !menu.style.display) {
        menu.style.display = 'block';
        // Track share button click
        if (typeof trackEvent === 'function') {
            trackEvent('share_button_clicked', 'engagement', 'Share Button');
        }
    } else {
        menu.style.display = 'none';
    }
});

// Share functions
window.shareToFacebook = function() {
    const url = window.location.href;
    const title = "Ottawa Handiman - Professional Woodworking Services";
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`, '_blank');
    document.getElementById('share-menu-inline').style.display = 'none';
    if (typeof trackEvent === 'function') {
        trackEvent('share_facebook', 'engagement', 'Share to Facebook');
    }
};

window.shareToLinkedIn = function() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    document.getElementById('share-menu-inline').style.display = 'none';
    if (typeof trackEvent === 'function') {
        trackEvent('share_linkedin', 'engagement', 'Share to LinkedIn');
    }
};

window.shareToNextdoor = function() {
    const url = window.location.href;
    const title = "Ottawa Handiman - Professional Woodworking Services in Barrhaven";
    const text = "Check out Ottawa Handiman for custom wood cutting and small carpentry projects. Trusted by The Wood Source!";
    // Nextdoor doesn't have a direct share URL, so we'll use their general sharing approach
    window.open(`https://nextdoor.com/`, '_blank');
    // Copy the link to clipboard for easy pasting
    navigator.clipboard.writeText(`${title} - ${text} ${url}`).then(() => {
        alert('Link and description copied! Please paste in your Nextdoor post.');
    });
    document.getElementById('share-menu-inline').style.display = 'none';
    if (typeof trackEvent === 'function') {
        trackEvent('share_nextdoor', 'engagement', 'Share to Nextdoor');
    }
};

window.shareToEmail = function() {
    const subject = "Ottawa Handiman - Professional Woodworking Services";
    const url = window.location.href;
    const body = `I found this great woodworking service in Ottawa that handles small jobs and custom wood cutting. They're trusted by The Wood Source and have over 30 years of experience.\n\nCheck them out: ${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.getElementById('share-menu-inline').style.display = 'none';
    if (typeof trackEvent === 'function') {
        trackEvent('share_email', 'engagement', 'Share via Email');
    }
};

window.shareCopyLink = function() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        // Change button text temporarily to show success
        const copyOption = event.target.closest('.share-option');
        const originalHTML = copyOption.innerHTML;
        copyOption.innerHTML = '<span style="font-size: 18px;">✅</span> Copied!';
        copyOption.style.background = '#e8f5e9';
        
        setTimeout(() => {
            copyOption.innerHTML = originalHTML;
            copyOption.style.background = '';
        }, 2000);
    }).catch(() => {
        alert('Link copied: ' + url);
    });
    document.getElementById('share-menu-inline').style.display = 'none';
    if (typeof trackEvent === 'function') {
        trackEvent('copy_link', 'engagement', 'Copy Link');
    }
};

window.sharePrint = function() {
    window.print();
    document.getElementById('share-menu-inline').style.display = 'none';
    if (typeof trackEvent === 'function') {
        trackEvent('print_page', 'engagement', 'Print Page');
    }
};

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('#share') && !e.target.closest('#share-menu-inline')) {
        document.getElementById('share-menu-inline').style.display = 'none';
    }
});

// Add hover effect to share options
document.querySelectorAll('.share-option').forEach(option => {
    option.addEventListener('mouseenter', function() {
        this.style.background = '#f5f5f5';
    });
    option.addEventListener('mouseleave', function() {
        this.style.background = '';
    });
});

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}