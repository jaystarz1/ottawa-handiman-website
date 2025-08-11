#!/bin/bash

# Ottawa Handiman Website - GitHub Deployment Script
# This script will push your website to GitHub

echo "🚀 Ottawa Handiman Website - GitHub Deployment"
echo "=============================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Configure git (if needed)
echo ""
echo "⚙️ Configuring Git..."
git config --global user.email "ottawahandiman3@gmail.com"
git config --global user.name "Ottawa Handiman"

# Add all files
echo ""
echo "📁 Adding all files to Git..."
git add .
echo "✅ Files added"

# Create commit
echo ""
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Ottawa Handiman SEO-optimized website

- Complete single-page landing site
- Full SEO optimization for Ottawa woodworking searches
- Mobile responsive design
- 10 real project photos
- Contact form and testimonials
- The Wood Source partnership featured
- Ready for GitHub Pages deployment"

echo "✅ Commit created"

# Set main branch
echo ""
echo "🌿 Setting main branch..."
git branch -M main
echo "✅ Branch set to main"

# Add GitHub remote
echo ""
echo "🔗 Adding GitHub remote..."
echo "Please create a new repository on GitHub first:"
echo "1. Go to https://github.com/new"
echo "2. Name it: ottawa-handiman-website"
echo "3. Make it PUBLIC (for GitHub Pages)"
echo "4. Don't initialize with README"
echo ""
read -p "Have you created the GitHub repository? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Enter your GitHub username:"
    read github_username
    
    # Add remote
    git remote add origin "https://github.com/${github_username}/ottawa-handiman-website.git"
    echo "✅ Remote added"
    
    # Push to GitHub
    echo ""
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    
    echo ""
    echo "✅ SUCCESS! Website pushed to GitHub!"
    echo ""
    echo "📋 NEXT STEPS TO GO LIVE:"
    echo "1. Go to: https://github.com/${github_username}/ottawa-handiman-website/settings/pages"
    echo "2. Under 'Source', select 'Deploy from a branch'"
    echo "3. Choose 'main' branch and '/ (root)' folder"
    echo "4. Click 'Save'"
    echo "5. Wait 2-3 minutes for deployment"
    echo "6. Your site will be live at: https://${github_username}.github.io/ottawa-handiman-website/"
    echo ""
    echo "🌐 CUSTOM DOMAIN SETUP:"
    echo "After GitHub Pages is active, in the same settings:"
    echo "1. Enter 'ottawahandiman.ca' in Custom domain field"
    echo "2. Check 'Enforce HTTPS'"
    echo "3. DNS will propagate in 24-48 hours"
    echo ""
    echo "🎉 Your SEO weapon is deployed and ready to dominate Ottawa searches!"
else
    echo "Please create the GitHub repository first, then run this script again."
fi
