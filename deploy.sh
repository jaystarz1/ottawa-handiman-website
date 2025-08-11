#!/bin/bash

# Ottawa Handiman Website Deployment Script
# Run this script to deploy your website to GitHub Pages

echo "🚀 Ottawa Handiman Website Deployment"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the ottawa-handiman-website directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
read -p "Enter commit message (or press Enter for default): " commit_message
if [ -z "$commit_message" ]; then
    commit_message="Update Ottawa Handiman website"
fi
git commit -m "$commit_message"

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Setting up GitHub remote..."
    read -p "Enter your GitHub username: " github_username
    git remote add origin "https://github.com/$github_username/ottawa-handiman-website.git"
    echo "✅ Remote added"
fi

# Push to GitHub
echo "🚀 Deploying to GitHub Pages..."
git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your website will be live at:"
echo "🌐 https://<your-username>.github.io/ottawa-handiman-website"
echo ""
echo "To set up custom domain (ottawahandiman.ca):"
echo "1. Go to your GitHub repository settings"
echo "2. Scroll to 'Pages' section"  
echo "3. Add custom domain: ottawahandiman.ca"
echo "4. Configure DNS with your domain provider"
echo ""
echo "📊 Next steps:"
echo "- Set up Google Analytics"
echo "- Create Google My Business listing"
echo "- Submit to Google Search Console"
echo "- Add your project photos to assets/images/"
echo ""
echo "🎯 Ready to dominate Ottawa woodworking searches!"
