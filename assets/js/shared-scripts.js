// Ottawa Handiman - Shared JavaScript for All Pages
// This file contains navigation, share button, and common functionality
// Must be included on every page along with page-specific scripts

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVIGATION FUNCTIONALITY
    // ============================================
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
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
    
    // Set active navigation item based on current page
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Check if this is the current page
            if (currentPath === '/' && (href === '/' || href === '/index.html')) {
                link.classList.add('active');
            } else if (currentPath !== '/' && href && href.startsWith(currentPath)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavItem();
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for same-page anchors
            if (targetId !== '#' && targetId !== '#!') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // SHARE BUTTON FUNCTIONALITY
    // ============================================
    
    const shareButton = document.getElementById('share');
    const shareMenu = document.getElementById('share-menu-inline');
    
    if (shareButton && shareMenu) {
        shareButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Toggle menu
            if (shareMenu.style.display === 'none' || !shareMenu.style.display) {
                shareMenu.style.display = 'block';
                // Track share button click
                if (typeof trackEvent === 'function') {
                    trackEvent('share_button_clicked', 'engagement', 'Share Button');
                }
            } else {
                shareMenu.style.display = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#share') && !e.target.closest('#share-menu-inline')) {
                shareMenu.style.display = 'none';
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
    }
    
    // Share functions (global for onclick handlers)
    window.shareToFacebook = function() {
        const url = window.location.href;
        const title = document.title || "Ottawa Handiman - Professional Woodworking Services";
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
        const title = document.title || "Ottawa Handiman - Professional Woodworking Services in Barrhaven";
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
        const subject = document.title || "Ottawa Handiman - Professional Woodworking Services";
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
    
    // ============================================
    // GOOGLE ANALYTICS TRACKING
    // ============================================
    
    // Enhanced utility function to track custom events
    window.trackEvent = function(action, category = 'engagement', label = '', value = null) {
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
    };
    
    // Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'contact',
                    'event_label': 'phone_call',
                    'value': 1
                });
            }
        });
    });
    
    // Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'contact',
                    'event_label': 'email',
                    'value': 1
                });
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
    
    // ============================================
    // COMMON UTILITIES
    // ============================================
    
    // Update current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Add animation on scroll (simple fade-in effect)
    if ('IntersectionObserver' in window) {
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
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Mobile detection and optimization
    function isMobile() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }
    
    function isTablet() {
        return /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent) || 
               (window.innerWidth >= 768 && window.innerWidth <= 1024);
    }
    
    // Apply mobile/tablet specific optimizations
    if (isMobile() || isTablet()) {
        // Enhanced touch feedback
        const interactiveElements = document.querySelectorAll('.cta-button, .card');
        
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
    }
    
    // Orientation change handling
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layout after orientation change
            window.scrollTo(0, window.scrollY + 1);
            window.scrollTo(0, window.scrollY - 1);
        }, 500);
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
                if (typeof gtag !== 'undefined' && loadTime > 0) {
                    gtag('event', 'timing_complete', {
                        'event_category': 'performance',
                        'name': 'page_load',
                        'value': loadTime,
                        'event_label': loadTime < 3000 ? 'fast' : loadTime < 5000 ? 'average' : 'slow'
                    });
                }
            }, 0);
        });
    }
    
    // Service Worker registration (if available)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
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
    
    console.log('Ottawa Handiman shared scripts loaded successfully!');
});