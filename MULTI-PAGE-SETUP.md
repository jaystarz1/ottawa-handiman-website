# 🏗️ Multi-Page Architecture Setup Guide

## ✅ Setup Complete!

The Ottawa Handiman website now has a complete multi-page architecture with reusable components and a comprehensive style guide.

## 📁 New Files Created

### Documentation
- **STYLE-GUIDE.md** - Comprehensive design system documentation
- **CLAUDE.md** (updated) - References style guide for all future development

### Components (Reusable HTML)
- **components/nav-component.html** - Shared navigation bar with share button
- **components/footer-component.html** - Shared footer

### Shared Assets
- **assets/css/shared-styles.css** - Navigation, footer, and common component styles
- **assets/js/shared-scripts.js** - Navigation functionality, share button, analytics

### Templates & Tools
- **templates/page-template.html** - Boilerplate for new pages
- **build.js** - Component injection script

## 🚀 How to Create a New Page

### Method 1: Using the Build Script (Recommended)
```bash
# Create a new page from template
node build.js --new services

# This creates services.html with proper structure
# Edit the file to add your content
# Then inject navigation and footer:
node build.js services.html
```

### Method 2: Manual Creation
1. Copy `templates/page-template.html` to your new file (e.g., `about-us.html`)
2. Update all placeholders:
   - Page title and meta tags
   - Schema markup
   - Content sections
3. Create page-specific CSS if needed: `assets/css/about-us.css`
4. Create page-specific JS if needed: `assets/js/about-us.js`
5. Run `node build.js about-us.html` to inject navigation and footer

## 📝 Page Creation Checklist

When creating a new page, ensure you:

- [ ] Update page title: `<title>[Page Name] | Ottawa Handiman Woodworking</title>`
- [ ] Update meta description with relevant keywords
- [ ] Update Open Graph tags for social sharing
- [ ] Update canonical URL
- [ ] Add page-specific Schema markup if needed
- [ ] Include `shared-styles.css` for consistent styling
- [ ] Include `shared-scripts.js` for navigation and common functionality
- [ ] Follow the STYLE-GUIDE.md for all design decisions
- [ ] Test mobile responsiveness
- [ ] Verify all navigation links work
- [ ] Test the share button functionality

## 🎨 Using the Style Guide

The **STYLE-GUIDE.md** file contains:
- Color palette with hex codes
- Typography specifications
- Component library (cards, buttons, forms, badges)
- Grid system guidelines
- Interactive element patterns
- Accessibility standards
- Mobile responsive breakpoints
- SEO requirements

**Always refer to STYLE-GUIDE.md when:**
- Adding new sections
- Creating components
- Choosing colors
- Setting up layouts
- Adding interactive elements

## 🔧 Build Script Usage

The `build.js` script automates component injection:

```bash
# Build all HTML files (inject/update navigation and footer)
node build.js

# Build a specific file
node build.js contact.html

# Create a new page from template
node build.js --new gallery

# Get help
node build.js --help
```

## 📦 Example: Creating a "Services" Page

1. **Create the page from template:**
```bash
node build.js --new services
```

2. **Edit services.html:**
- Update the title: "Our Services | Ottawa Handiman Woodworking"
- Add meta description: "Professional woodworking services in Ottawa..."
- Create service sections following the style guide

3. **Create services.css (optional):**
```css
/* Page-specific styles for services page */
.services-hero {
    background: linear-gradient(135deg, #F8F9FA 0%, #E8F5E8 100%);
}
```

4. **Build the page:**
```bash
node build.js services.html
```

5. **Add to navigation:**
Edit `components/nav-component.html` to add:
```html
<li><a href="/services.html" data-nav="services">Services</a></li>
```

6. **Rebuild all pages to update navigation:**
```bash
node build.js
```

## 🔄 Updating Shared Components

When you need to update navigation or footer across all pages:

1. Edit the component file:
   - `components/nav-component.html` for navigation
   - `components/footer-component.html` for footer

2. Run the build script to update all pages:
```bash
node build.js
```

## 📊 Current Architecture Benefits

✅ **Consistency** - All pages use the same navigation and footer
✅ **Maintainability** - Update once, apply everywhere
✅ **Scalability** - Easy to add new pages
✅ **SEO-Ready** - Template includes all necessary meta tags
✅ **Performance** - Shared assets are cached across pages
✅ **Style Guide** - Comprehensive documentation ensures consistency

## 🎯 Next Steps

1. **Test the existing index.html** - It still works as before
2. **Create your first new page** using the template
3. **Run the build script** to inject components
4. **Test navigation** between pages
5. **Verify mobile responsiveness**
6. **Check SEO meta tags**

## 💡 Tips

- Always run `node build.js` after updating shared components
- Keep page-specific styles in separate CSS files
- Follow the STYLE-GUIDE.md religiously for consistency
- Test on mobile devices, not just browser DevTools
- Use the share button on every page for social media integration
- Maintain SEO best practices on every new page

## 🆘 Troubleshooting

**Navigation not showing?**
- Run `node build.js [filename]` to inject components
- Check that shared-styles.css is linked

**Styles look different?**
- Ensure shared-styles.css is loaded before page-specific styles
- Check STYLE-GUIDE.md for correct component usage

**JavaScript not working?**
- Verify shared-scripts.js is included
- Check browser console for errors

**Build script errors?**
- Ensure Node.js is installed
- Check that component files exist in components/ directory

---

## 🎉 Success!

Your website now has a professional multi-page architecture that:
- Maintains consistent design across all pages
- Makes it easy to add new pages
- Follows SEO best practices
- Provides excellent mobile experience
- Includes social sharing functionality
- Has comprehensive documentation

Start creating new pages and growing your website!