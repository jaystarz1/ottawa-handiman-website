// Ottawa Handiman - Unusual Projects Page JavaScript
// Interactive features for the Don't Be Afraid to Ask page

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + (element.dataset.suffix || '');
            }
        }, 16);
    }
    
    // Animate fact numbers when they come into view
    const factNumbers = document.querySelectorAll('.fact-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const element = entry.target;
                element.classList.add('animated');
                
                // Parse the number from the element
                const text = element.textContent;
                let target = 0;
                let suffix = '';
                
                if (text.includes('+')) {
                    target = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                    suffix = '+';
                } else {
                    target = parseInt(text) || 0;
                }
                
                element.dataset.suffix = suffix;
                animateCounter(element, target);
            }
        });
    }, observerOptions);
    
    factNumbers.forEach(num => {
        numberObserver.observe(num);
    });
    
    // ============================================
    // IMAGE LIGHTBOX
    // ============================================
    const caseImage = document.querySelector('.case-image img');
    if (caseImage) {
        caseImage.style.cursor = 'pointer';
        caseImage.addEventListener('click', function() {
            createLightbox(this);
        });
    }
    
    function createLightbox(img) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
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
            box-shadow: 0 10px 50px rgba(0,0,0,0.5);
        `;
        
        // Create caption
        const caption = document.createElement('div');
        caption.textContent = img.alt;
        caption.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            background: rgba(0,0,0,0.7);
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 14px;
            max-width: 80%;
            text-align: center;
        `;
        
        // Create close button
        const closeButton = document.createElement('div');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 50px;
            font-weight: 300;
            cursor: pointer;
            z-index: 10000;
            transition: transform 0.3s ease;
        `;
        
        closeButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        closeButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Append elements
        overlay.appendChild(lightboxImg);
        overlay.appendChild(caption);
        overlay.appendChild(closeButton);
        document.body.appendChild(overlay);
        
        // Close lightbox
        function closeLightbox() {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }
        
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay || e.target === closeButton) {
                closeLightbox();
            }
        });
        
        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.body.contains(overlay)) {
                closeLightbox();
            }
        });
    }
    
    // ============================================
    // SMOOTH REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.case-block, .philosophy-item, .project-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
    
    // ============================================
    // HOVER EFFECTS FOR PROJECT CARDS
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroSection = document.querySelector('.unusual-hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (scrolled < 800) {
                heroSection.style.transform = `translateY(${parallax}px)`;
            }
        });
    }
    
    // ============================================
    // TRACK ENGAGEMENT
    // ============================================
    
    // Track how far users scroll
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track milestones
            if (maxScroll >= 50 && maxScroll < 55) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', {
                        'event_category': 'engagement',
                        'event_label': 'unusual_projects_50',
                        'value': 50
                    });
                }
            } else if (maxScroll >= 90 && maxScroll < 95) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', {
                        'event_category': 'engagement',
                        'event_label': 'unusual_projects_complete',
                        'value': 90
                    });
                }
            }
        }
    });
    
    // Track CTA clicks specific to this page
    const unusualCTAs = document.querySelectorAll('.unusual-cta .cta-button');
    unusualCTAs.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (typeof gtag !== 'undefined') {
                gtag('event', 'unusual_project_cta', {
                    'event_category': 'engagement',
                    'event_label': buttonText,
                    'event_value': 1
                });
            }
        });
    });
    
    // Track bullroarer image views
    if (caseImage) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.tracked) {
                    entry.target.dataset.tracked = 'true';
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'view_item', {
                            'event_category': 'engagement',
                            'event_label': 'bullroarer_image',
                            'value': 1
                        });
                    }
                }
            });
        }, { threshold: 0.5 });
        
        imageObserver.observe(caseImage);
    }
    
    // ============================================
    // CSS ANIMATIONS
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Unusual Projects page loaded - Don\'t Be Afraid to Ask!');
});