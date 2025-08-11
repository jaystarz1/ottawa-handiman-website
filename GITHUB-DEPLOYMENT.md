# 🚀 COMPLETE GITHUB DEPLOYMENT GUIDE

## ✅ LAYOUT FIXES COMPLETED
- Testimonials now in perfect 2x2 grid
- Email address overflow fixed in contact cards
- Mobile responsive design maintained

## 📋 STEP 1: INITIALIZE GIT LOCALLY

Run these commands in Terminal:

```bash
cd /Users/jaytarzwell/ottawa-handiman-website
git init
git add .
git commit -m "Initial Ottawa Handiman website - SEO optimized with real photos and testimonials"
```

## 📋 STEP 2: CREATE GITHUB REPOSITORY

1. Go to **github.com** and sign in
2. Click **"New repository"** or the **"+"** button
3. Repository settings:
   - **Repository name**: `ottawa-handiman-website`
   - **Description**: `Professional woodworking services in Ottawa - SEO optimized website`
   - **Visibility**: Public ✅
   - **DO NOT** initialize with README (we have files already)

## 📋 STEP 3: CONNECT AND PUSH TO GITHUB

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:

```bash
cd /Users/jaytarzwell/ottawa-handiman-website
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ottawa-handiman-website.git
git branch -M main
git push -u origin main
```

## 📋 STEP 4: ENABLE GITHUB PAGES

1. In your GitHub repository, go to **Settings**
2. Scroll down to **"Pages"** section
3. Under **"Source"**, select:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**

## 🌐 STEP 5: DNS CONFIGURATION FOR OTTAWAHANDIMAN.CA

### A) GitHub Pages IP Addresses
Point your domain's **A records** to these GitHub IPs:
```
185.199.108.153
185.199.109.153  
185.199.110.153
185.199.111.153
```

### B) CNAME Record
Add a **CNAME record**:
- **Name**: `www`
- **Value**: `YOUR_GITHUB_USERNAME.github.io`

### C) Domain Setup in GitHub
1. In repository Settings → Pages
2. Under **"Custom domain"**, enter: `ottawahandiman.ca`
3. Check **"Enforce HTTPS"** ✅

## ⚙️ DNS PROVIDER INSTRUCTIONS

### If using GoDaddy:
1. Go to DNS Management
2. Delete existing A records
3. Add the 4 GitHub A records above
4. Add CNAME: www → YOUR_GITHUB_USERNAME.github.io

### If using Cloudflare:
1. DNS → Manage DNS
2. Delete existing A records  
3. Add the 4 GitHub A records (set to "DNS only")
4. Add CNAME: www → YOUR_GITHUB_USERNAME.github.io

### If using Namecheap:
1. Advanced DNS
2. Add A Record: @ → each GitHub IP
3. Add CNAME: www → YOUR_GITHUB_USERNAME.github.io

## 🎯 VERIFICATION

After DNS propagation (24-48 hours):
- **ottawahandiman.ca** → Your website
- **www.ottawahandiman.ca** → Your website  
- **YOUR_GITHUB_USERNAME.github.io/ottawa-handiman-website** → Your website

## ⚡ QUICK DEPLOYMENT COMMANDS

Copy and paste these (replace YOUR_GITHUB_USERNAME):

```bash
# Navigate to project
cd /Users/jaytarzwell/ottawa-handiman-website

# Initialize git
git init

# Add all files  
git add .

# Commit
git commit -m "Initial Ottawa Handiman website - SEO optimized"

# Connect to GitHub (REPLACE YOUR_GITHUB_USERNAME!)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ottawa-handiman-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 📞 IMMEDIATE NEXT STEPS

1. **Run the git commands above**
2. **Create GitHub repository**  
3. **Enable GitHub Pages**
4. **Configure DNS** (can take 24-48 hours)
5. **Test the live site**
6. **Submit to Google Search Console**

Your Ottawa Handiman website will be LIVE and ready to dominate Ottawa woodworking searches! 🏆