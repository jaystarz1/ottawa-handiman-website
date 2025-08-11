#!/bin/bash

# Fix Git Push Script for Ottawa Handiman Website
echo "🔧 Fixing Git repository..."
echo ""

# Add all files
echo "📁 Adding all files to Git..."
git add .

# Check status
echo ""
echo "📊 Current status:"
git status --short

# Commit
echo ""
echo "💾 Creating commit..."
git commit -m "Initial commit: Ottawa Handiman SEO-optimized website

- Complete single-page landing site
- Full SEO optimization for Ottawa woodworking searches  
- Mobile responsive design with tap-to-call
- 10 real project photos from Handiman Web folder
- Contact form and authentic testimonials
- The Wood Source partnership prominently featured
- All Ottawa neighborhoods targeted
- Schema markup for local SEO
- Ready for GitHub Pages deployment"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ SUCCESS! Your website is now on GitHub!"
echo ""
echo "🌐 NEXT STEPS:"
echo "1. Go to: https://github.com/jaystarz1/ottawa-handiman-website/settings/pages"
echo "2. Under 'Source', select 'Deploy from a branch'"
echo "3. Choose 'main' branch and '/ (root)' folder"
echo "4. Click 'Save'"
echo ""
echo "Your site will be live at: https://jaystarz1.github.io/ottawa-handiman-website/"
echo "Custom domain (ottawahandiman.ca) can be configured in the same settings page."
