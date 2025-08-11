# Ottawa Handiman Website - Project Building Guide

## 🚀 QUICK START DEPLOYMENT

### Step 1: Prepare Your Images
1. Navigate to your Desktop folder "Handiman Web"
2. Select 6-8 best project photos showing:
   - Workshop/tools in action
   - Finished custom cuts
   - Before/after repairs
   - Craftsman at work
3. Optimize images:
   - Resize to max 1200px width
   - Compress to under 500KB each
   - Save as JPG or WebP format
4. Copy to `/Users/jaytarzwell/ottawa-handiman-website/assets/images/`
5. Rename following this pattern:
   - `workshop-hero.jpg` (main workshop photo)
   - `craftsman-at-work.jpg` (owner working)
   - `project-1.jpg` through `project-6.jpg`
   - `wood-source-partnership.jpg` (if available)

### Step 2: GitHub Repository Setup
```bash
# Navigate to project directory
cd /Users/jaytarzwell/ottawa-handiman-website

# Initialize Git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial Ottawa Handiman website - SEO optimized"

# Create GitHub repository (go to github.com)
# Repository name: ottawa-handiman-website
# Public repository
# Don't initialize with README (we have one)

# Add remote origin (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/ottawa-handiman-website.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to repository Settings on GitHub
2. Scroll to "Pages" section
3. Source: Deploy from branch
4. Branch: main
5. Folder: / (root)
6. Save
7. Site will be live at: `https://USERNAME.github.io/ottawa-handiman-website`

### Step 4: Custom Domain Setup
1. Purchase domain: ottawahandiman.ca
2. In your domain registrar (GoDaddy, Namecheap, etc.):
   - Add CNAME record: `www` → `USERNAME.github.io`
   - Add A records for apex domain:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
3. In GitHub repository settings:
   - Custom domain: `ottawahandiman.ca`
   - Enforce HTTPS: ✓

## 🛠️ LOCAL DEVELOPMENT WORKFLOW

### Testing Changes Locally
```bash
# Navigate to project
cd /Users/jaytarzwell/ottawa-handiman-website

# Open in browser for testing
open index.html

# Or start simple local server (if Python installed)
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### Making Updates
1. Edit files in your preferred editor (VS Code, Sublime, etc.)
2. Test changes locally first
3. Commit and push to GitHub:
```bash
git add .
git commit -m "Update: describe your changes"
git push origin main
```
4. Changes automatically deploy to live site

## 🎯 SEO OPTIMIZATION CHECKLIST

### Immediate Actions After Deployment
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools  
- [ ] Create Google My Business listing
- [ ] Set up Google Analytics
- [ ] Test mobile responsiveness
- [ ] Run PageSpeed Insights test
- [ ] Verify all links work
- [ ] Check contact form functionality

### Google My Business Setup
1. Go to business.google.com
2. Create business listing:
   - Name: Ottawa Handiman
   - Category: Handyman, Woodworking Service
   - Address: Barrhaven, Ottawa (can hide exact address)
   - Phone: 343.987.0900
   - Website: ottawahandiman.ca
   - Hours: Monday-Saturday 9AM-5PM
3. Add photos from your project gallery
4. Encourage customers to leave reviews

### Google Analytics Setup
1. Go to analytics.google.com
2. Create property for ottawahandiman.ca
3. Add tracking code to `index.html` in `<head>` section:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📱 PERFORMANCE OPTIMIZATION

### Image Optimization Tools
- **Online**: TinyPNG.com, Squoosh.app
- **Mac**: ImageOptim (free app)
- **Command line**: `imageoptim *.jpg` (if ImageOptim CLI installed)

### Speed Testing Tools
- Google PageSpeed Insights
- GTmetrix.com
- WebPageTest.org
- Target: Load time under 3 seconds

### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms  
- **CLS** (Cumulative Layout Shift): < 0.1

## 📊 TRACKING SUCCESS

### Key Metrics to Monitor
1. **Search Rankings**:
   - "Ottawa handyman woodworking"
   - "wood cutting Ottawa"
   - "small job shop Ottawa"
   - "custom woodworking Ottawa"

2. **Website Analytics**:
   - Organic search traffic
   - Phone click-through rate
   - Contact form submissions
   - Average session duration

3. **Business Metrics**:
   - Phone calls received
   - Email inquiries
   - Project bookings
   - Customer referrals

### Monthly SEO Report
Create monthly spreadsheet tracking:
- Keyword rankings (use tools like SEMrush free trial)
- Website traffic (Google Analytics)
- Phone calls received
- Projects completed
- Revenue generated

## 🔧 TROUBLESHOOTING COMMON ISSUES

### Site Not Loading
1. Check CNAME file contains only: `ottawahandiman.ca`
2. Verify GitHub Pages is enabled in repository settings
3. Domain DNS may take 24-48 hours to propagate
4. Check GitHub Pages build status in repository Actions

### Images Not Displaying
1. Ensure image file names match exactly in HTML
2. Check image file extensions (.jpg vs .jpeg)
3. Verify images are in correct `/assets/images/` folder
4. Test image paths are case-sensitive

### Contact Form Not Working
1. Current setup opens email client (intended behavior)
2. For server-side form processing, consider:
   - Netlify Forms (requires moving to Netlify)
   - Formspree.io integration
   - EmailJS service

### Mobile Display Issues
1. Test on actual devices, not just browser resize
2. Use Chrome DevTools mobile simulation
3. Check viewport meta tag is present
4. Verify touch targets are large enough (44px minimum)

## 🚀 FUTURE ENHANCEMENTS

### Phase 2 Features (after initial launch)
1. **Customer Testimonials**:
   - Add testimonials section to HTML
   - Include customer photos (with permission)
   - Link to Google My Business reviews

2. **Enhanced Gallery**:
   - Before/after project comparisons
   - Video demonstrations
   - 360° workshop tour

3. **Blog Section**:
   - DIY tips and tutorials
   - Wood selection guides
   - Project showcases
   - SEO content marketing

4. **Advanced Features**:
   - Online project quote calculator
   - Appointment booking system
   - Customer project gallery
   - Newsletter signup

### SEO Content Expansion
Create additional pages for:
- Specific services (fence repair, custom shelving, etc.)
- Location-specific pages (Kanata handyman, Nepean woodworking)
- Problem-solution content (broken furniture, custom cuts)
- Seasonal content (winter projects, spring repairs)

## 📞 LAUNCH CHECKLIST

### Pre-Launch (Complete these before going live)
- [ ] All images uploaded and optimized
- [ ] Contact information verified (phone, email)
- [ ] Business hours confirmed
- [ ] Service area boundaries defined
- [ ] Pricing strategy finalized ($100 minimum)
- [ ] The Wood Source partnership confirmed

### Launch Day
- [ ] Deploy to GitHub Pages
- [ ] Test all functionality on mobile and desktop
- [ ] Submit to Google Search Console
- [ ] Create Google My Business listing
- [ ] Share website with The Wood Source
- [ ] Post on local Facebook groups (if appropriate)
- [ ] Email existing customers with new website

### Post-Launch (First 30 days)
- [ ] Monitor Google Analytics daily
- [ ] Track keyword rankings weekly
- [ ] Collect customer feedback
- [ ] Document any needed improvements
- [ ] Plan content updates and additions

## ⚡ EMERGENCY CONTACTS & SUPPORT

### Technical Issues
- GitHub Support: support.github.com
- Domain Issues: Contact your domain registrar
- Email Issues: Contact email provider

### SEO Questions
- Google Search Console Help
- Local SEO Facebook groups
- Ottawa business networking groups

### Website Updates
- Keep this guide handy for reference
- Document all changes in git commits
- Test changes locally before deploying
- Monitor site performance after updates

---

## 🎯 SUCCESS MANTRA
**"When Ottawa needs wood cut, they find us first."**

This website is designed to be your primary lead generation tool. Treat it as a digital storefront that works 24/7 to bring you qualified customers who need exactly what you offer.

The combination of technical SEO, local optimization, and genuine value will make this site a powerful business asset that grows your handyman service sustainably.