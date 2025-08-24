# 🎨 Ottawa Handiman Website Style Guide

## 📋 Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Layout & Grid System](#layout--grid-system)
5. [Components](#components)
6. [Navigation](#navigation)
7. [Interactive Elements](#interactive-elements)
8. [Forms & Inputs](#forms--inputs)
9. [Animations & Transitions](#animations--transitions)
10. [Accessibility Standards](#accessibility-standards)
11. [Mobile Responsiveness](#mobile-responsiveness)
12. [SEO Requirements](#seo-requirements)

---

## 🎯 Design Philosophy

The Ottawa Handiman website follows a **trust-first, conversion-focused** design philosophy that balances:
- **Professional credibility** through clean, modern design
- **Local authenticity** with personal touches and real workshop photos
- **SEO optimization** without sacrificing user experience
- **Mobile-first approach** ensuring perfect functionality on all devices
- **Accessibility compliance** making the site usable for everyone

---

## 🎨 Color Palette

### Primary Colors
```css
--primary-color: #2C5530;      /* Forest Green - Main brand color */
--primary-dark: #1e3a21;       /* Darker green for hover states */
--primary-light: #E8F5E8;      /* Light green background tint */
```

### Secondary Colors
```css
--secondary-color: #8B4513;    /* Saddle Brown - Woodworking theme */
--accent-color: #D2691E;       /* Chocolate - Accent highlights */
```

### Neutral Colors
```css
--text-dark: #2C3E50;          /* Dark gray - Primary text */
--text-light: #7F8C8D;         /* Medium gray - Secondary text */
--white: #FFFFFF;              /* Pure white - Backgrounds */
--light-bg: #F8F9FA;           /* Off-white - Section backgrounds */
--border-color: #E9ECEF;       /* Light gray - Borders */
```

### Semantic Colors
```css
--success-color: #27AE60;      /* Green - Success states */
--error-color: #e74c3c;        /* Red - Error states */
--warning-color: #f39c12;      /* Orange - Warning states */
```

### Usage Guidelines
- **Primary green**: CTAs, headers, navigation active states
- **White**: Card backgrounds, primary backgrounds
- **Light gray (#F8F9FA)**: Alternating section backgrounds
- **Text colors**: Dark for headings, light for body text
- **Borders**: Subtle #E9ECEF for card edges

---

## 📝 Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Sizes (Responsive)
```css
/* Headings */
h1: clamp(1.8rem, 4vw, 2.5rem);    /* Hero titles */
h2: clamp(1.5rem, 3vw, 2rem);      /* Section headers */
h3: clamp(1.1rem, 2.5vw, 1.3rem);  /* Subsection headers */

/* Body Text */
body: 16px;                         /* Base font size */
.section-subtitle: 1.1rem;          /* Section descriptions */
.small-text: 0.9rem;                /* Captions, meta text */
.tiny-text: 0.85rem;                /* Badges, labels */
```

### Font Weights
- **700 (Bold)**: Main headings, CTAs
- **600 (Semibold)**: Subheadings, button text
- **500 (Medium)**: Navigation links, emphasis
- **400 (Regular)**: Body text
- **300 (Light)**: Not used (maintain readability)

### Line Heights
- **Headings**: 1.2
- **Body text**: 1.6
- **Compact elements**: 1.4

---

## 📐 Layout & Grid System

### Container Widths
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Breakpoint-specific */
@media (min-width: 1400px) { max-width: 1400px; }
@media (max-width: 480px)  { padding: 0 15px; }
```

### Grid Systems

#### Service Grid (3 columns desktop, responsive)
```css
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

#### Gallery Grid (3 columns desktop)
```css
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

#### Testimonial Grid (2x2 layout)
```css
.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}
```

### Section Spacing
```css
section {
    padding: 80px 0;  /* Desktop */
    padding: 60px 0;  /* Tablet */
    padding: 40px 0;  /* Mobile */
}
```

---

## 🧩 Components

### Cards
```css
.card {
    background: var(--white);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}
```

### Buttons

#### Primary CTA
```css
.cta-button.primary {
    background: var(--primary-color);
    color: var(--white);
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.cta-button.primary:hover {
    background: #1e3a21;
    transform: translateY(-2px);
}
```

#### Secondary CTA
```css
.cta-button.secondary {
    background: var(--white);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    padding: 12px 24px;
    border-radius: 6px;
}
```

### Trust Badges
```css
.badge {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(44, 85, 48, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.8rem;
    font-weight: 500;
}
```

### Service Icons
- Font size: 2.5rem
- Centered alignment
- Emoji-based for simplicity
- Margin-bottom: 1rem

---

## 🧭 Navigation

### Desktop Navigation
- **Fixed position** at top
- **Height**: 70px
- **Background**: White with shadow
- **Logo**: Left-aligned with tagline
- **Menu**: Right-aligned horizontal list
- **CTA**: Phone number button (green background)

### Mobile Navigation
- **Hamburger menu**: 3-line icon
- **Slide-in panel**: Full-width, top-to-bottom
- **Height**: 60px (mobile)
- **Toggle animation**: Smooth transition

### Active States
```css
.nav-menu a:hover { color: var(--primary-color); }
.nav-menu a.active { font-weight: 600; }
```

---

## ✨ Interactive Elements

### Share Button
```css
.share-button {
    position: fixed;
    top: 80px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    border-radius: 25px;
    padding: 10px 20px;
    z-index: 998;
}
```

**Share Menu Features**:
- Dropdown with 6 options (Facebook, LinkedIn, Nextdoor, Email, Copy Link, Print)
- White background with green border
- Icons + text labels
- Click outside to close

### Gallery Lightbox
- Full-screen overlay (rgba(0,0,0,0.9))
- Click to close functionality
- ESC key support
- Close button (×) in top-right

### Hover Effects
```css
/* Standard hover lift */
transform: translateY(-5px);
box-shadow: 0 5px 20px rgba(0,0,0,0.15);

/* Transition timing */
transition: all 0.3s ease;
```

---

## 📝 Forms & Inputs

### Input Styles
```css
input, textarea, select {
    padding: 12px;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s ease;
}

input:focus {
    outline: none;
    border-color: var(--primary-color);
}
```

### Validation States
- **Valid**: Green border (#27ae60)
- **Invalid**: Red border (#e74c3c)
- **Focus**: Primary color border

### Submit Button
```css
.submit-button {
    background: var(--primary-color);
    color: var(--white);
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}
```

---

## 🎬 Animations & Transitions

### Standard Transitions
```css
transition: all 0.3s ease;        /* Default */
transition: opacity 0.6s ease;    /* Fade effects */
transition: transform 0.6s ease;  /* Movement */
```

### Scroll Animations
- **Fade-in on scroll**: Start with opacity: 0, translateY(20px)
- **Intersection Observer**: Trigger at 10% visibility
- **Duration**: 0.6s ease

### Loading States
```css
.loading {
    opacity: 0.7;
    pointer-events: none;
}
```

---

## ♿ Accessibility Standards

### Required Elements
1. **Skip links**: Hidden by default, visible on focus
2. **ARIA labels**: On all interactive elements
3. **Semantic HTML**: Proper heading hierarchy
4. **Alt text**: Descriptive text for all images
5. **Focus indicators**: 2px solid outline
6. **Color contrast**: WCAG AA compliant

### Focus Styles
```css
:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}
```

### Touch Targets
- Minimum 44px × 44px for mobile
- 48px recommended for primary CTAs

---

## 📱 Mobile Responsiveness

### Breakpoints
```css
/* Mobile First Approach */
@media (max-width: 375px)  { /* Small phones */ }
@media (max-width: 480px)  { /* Mobile portrait */ }
@media (max-width: 768px)  { /* Mobile landscape / tablet portrait */ }
@media (max-width: 1024px) { /* Tablet landscape */ }
@media (min-width: 1025px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large desktop */ }
@media (min-width: 1400px) { /* Extra large */ }
```

### Mobile-Specific Adjustments
- **Navigation**: Hamburger menu
- **Typography**: Smaller font sizes with clamp()
- **Grid layouts**: Single column on mobile
- **Touch optimization**: Larger tap targets
- **Share button**: Icon-only on mobile

---

## 🔍 SEO Requirements

### Every Page Must Include:

#### Meta Tags
```html
<title>[Page Title] | Ottawa Handiman Woodworking</title>
<meta name="description" content="[160 character description with keywords]">
<meta name="keywords" content="Ottawa handiman, woodworking, [page-specific keywords]">
<link rel="canonical" href="https://ottawahandiman.ca/[page-url]">
```

#### Open Graph Tags
```html
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Description]">
<meta property="og:image" content="https://ottawahandiman.ca/assets/images/[image].jpg">
<meta property="og:url" content="https://ottawahandiman.ca/[page-url]">
```

#### Schema Markup
- LocalBusiness schema on every page
- Page-specific schemas (FAQ, Service, etc.)

#### Content Requirements
- H1 tag with primary keywords
- Natural keyword density (2-3%)
- Internal linking with keyword-rich anchor text
- Alt text on all images with keywords

---

## 📦 Component Usage Examples

### Creating a New Section
```html
<section class="[section-name]-section">
    <div class="container">
        <h2>[Section Title]</h2>
        <p class="section-subtitle">[Description]</p>
        
        <div class="[grid-type]-grid">
            <!-- Content cards -->
        </div>
    </div>
</section>
```

### Adding a Service Card
```html
<div class="service-card">
    <div class="service-icon">🔨</div>
    <h3>[Service Name]</h3>
    <p>[Service description with keywords]</p>
</div>
```

### Creating a CTA Button
```html
<a href="tel:3439870900" class="cta-button primary">
    343.987.0900
</a>
```

---

## 🚀 Implementation Checklist

When creating a new page, ensure:

- [ ] Navigation bar is included and functional
- [ ] Share button is present (top-right)
- [ ] Footer with consistent contact info
- [ ] Google Analytics tracking code
- [ ] Mobile responsive design
- [ ] SEO meta tags and schema
- [ ] Accessibility features (skip links, ARIA)
- [ ] Consistent color scheme
- [ ] Proper typography hierarchy
- [ ] Form validation if applicable
- [ ] Loading states for interactions
- [ ] Hover effects on interactive elements
- [ ] Print styles defined

---

## 📝 Notes for Developers

1. **Always test on real devices**, not just browser DevTools
2. **Maintain 60fps animations** - use transform and opacity only
3. **Optimize images** - WebP with JPEG fallback
4. **Lazy load images** below the fold
5. **Minimize JavaScript** - use CSS where possible
6. **Cache static assets** with appropriate headers
7. **Test with screen readers** for accessibility
8. **Validate HTML** and fix any errors
9. **Check color contrast** ratios (minimum 4.5:1)
10. **Keep page load under 3 seconds** on 3G

---

## 🔄 Version History

- **v1.0** (January 2025): Initial style guide creation
- Component-based architecture established
- Multi-page support framework added
- Comprehensive documentation completed

---

**Remember**: This style guide is the single source of truth for all design decisions. When in doubt, refer to this document. If something isn't covered here, it should be added before implementation.