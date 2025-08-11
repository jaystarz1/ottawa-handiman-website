#!/bin/bash

# Quick Git initialization script
# Run this first if git is not initialized

cd /Users/jaytarzwell/ottawa-handiman-website

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Ottawa Handiman SEO-optimized website"

# Set main branch
git branch -M main

echo "✅ Git initialized successfully!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub named 'ottawa-handiman-website'"
echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/ottawa-handiman-website.git"
echo "3. Run: git push -u origin main"
