#!/usr/bin/env node

/**
 * Ottawa Handiman Website Build Script
 * 
 * This script injects navigation and footer components into HTML pages.
 * 
 * Usage:
 * - node build.js                    # Build all HTML files
 * - node build.js index.html         # Build specific file
 * - node build.js --watch           # Watch for changes (future feature)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    componentsDir: './components',
    navComponent: 'nav-component.html',
    footerComponent: 'footer-component.html',
    navPlaceholder: '<!-- NAVIGATION_PLACEHOLDER -->',
    footerPlaceholder: '<!-- FOOTER_PLACEHOLDER -->',
    navMarkerStart: '<!-- NAVIGATION_START -->',
    navMarkerEnd: '<!-- NAVIGATION_END -->',
    footerMarkerStart: '<!-- FOOTER_START -->',
    footerMarkerEnd: '<!-- FOOTER_END -->',
    excludeFiles: ['page-template.html', 'nav-component.html', 'footer-component.html'],
    excludeDirs: ['components', 'templates', 'node_modules', '.git', 'assets']
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m'
};

/**
 * Log with color
 */
function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

/**
 * Read component file
 */
function readComponent(componentName) {
    const componentPath = path.join(CONFIG.componentsDir, componentName);
    try {
        const content = fs.readFileSync(componentPath, 'utf8');
        // Extract content between markers
        if (componentName === CONFIG.navComponent) {
            const match = content.match(/<!-- NAVIGATION_START -->([\s\S]*?)<!-- NAVIGATION_END -->/);
            return match ? match[1].trim() : content;
        } else if (componentName === CONFIG.footerComponent) {
            const match = content.match(/<!-- FOOTER_START -->([\s\S]*?)<!-- FOOTER_END -->/);
            return match ? match[1].trim() : content;
        }
        return content;
    } catch (error) {
        log(`Error reading component ${componentName}: ${error.message}`, colors.red);
        return null;
    }
}

/**
 * Process a single HTML file
 */
function processHTMLFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Read components
        const navContent = readComponent(CONFIG.navComponent);
        const footerContent = readComponent(CONFIG.footerComponent);
        
        if (!navContent || !footerContent) {
            log(`Skipping ${filePath} - components not found`, colors.yellow);
            return false;
        }
        
        // Check if file already has injected components (look for markers)
        const hasInjectedNav = content.includes(CONFIG.navMarkerStart);
        const hasInjectedFooter = content.includes(CONFIG.footerMarkerStart);
        
        // Inject or replace navigation
        if (CONFIG.navPlaceholder && content.includes(CONFIG.navPlaceholder)) {
            // First time injection using placeholder
            content = content.replace(CONFIG.navPlaceholder, navContent);
            modified = true;
            log(`  ✓ Injected navigation`, colors.green);
        } else if (hasInjectedNav) {
            // Replace existing navigation
            const navRegex = new RegExp(`${CONFIG.navMarkerStart}[\\s\\S]*?${CONFIG.navMarkerEnd}`, 'g');
            const newNav = `${CONFIG.navMarkerStart}\n${navContent}\n${CONFIG.navMarkerEnd}`;
            content = content.replace(navRegex, newNav);
            modified = true;
            log(`  ✓ Updated navigation`, colors.green);
        } else {
            // Try to inject after opening body tag if no placeholder
            const bodyMatch = content.match(/<body[^>]*>/);
            if (bodyMatch) {
                const bodyTag = bodyMatch[0];
                const skipLinkMatch = content.match(/<a[^>]*class="skip-link"[^>]*>[\s\S]*?<\/a>/);
                if (skipLinkMatch) {
                    // Insert after skip link
                    const skipLink = skipLinkMatch[0];
                    content = content.replace(skipLink, `${skipLink}\n\n${CONFIG.navMarkerStart}\n${navContent}\n${CONFIG.navMarkerEnd}`);
                } else {
                    // Insert after body tag
                    content = content.replace(bodyTag, `${bodyTag}\n\n${CONFIG.navMarkerStart}\n${navContent}\n${CONFIG.navMarkerEnd}`);
                }
                modified = true;
                log(`  ✓ Injected navigation after body tag`, colors.green);
            }
        }
        
        // Inject or replace footer
        if (CONFIG.footerPlaceholder && content.includes(CONFIG.footerPlaceholder)) {
            // First time injection using placeholder
            content = content.replace(CONFIG.footerPlaceholder, footerContent);
            modified = true;
            log(`  ✓ Injected footer`, colors.green);
        } else if (hasInjectedFooter) {
            // Replace existing footer
            const footerRegex = new RegExp(`${CONFIG.footerMarkerStart}[\\s\\S]*?${CONFIG.footerMarkerEnd}`, 'g');
            const newFooter = `${CONFIG.footerMarkerStart}\n${footerContent}\n${CONFIG.footerMarkerEnd}`;
            content = content.replace(footerRegex, newFooter);
            modified = true;
            log(`  ✓ Updated footer`, colors.green);
        } else {
            // Try to inject before closing body tag if no placeholder
            const closeBodyMatch = content.match(/<\/body>/);
            if (closeBodyMatch) {
                content = content.replace('</body>', `\n${CONFIG.footerMarkerStart}\n${footerContent}\n${CONFIG.footerMarkerEnd}\n\n</body>`);
                modified = true;
                log(`  ✓ Injected footer before closing body tag`, colors.green);
            }
        }
        
        // Write back to file if modified
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            return true;
        } else {
            log(`  No changes needed`, colors.blue);
            return false;
        }
        
    } catch (error) {
        log(`Error processing ${filePath}: ${error.message}`, colors.red);
        return false;
    }
}

/**
 * Find all HTML files in directory
 */
function findHTMLFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip excluded directories
            if (!CONFIG.excludeDirs.includes(file)) {
                findHTMLFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            // Skip excluded files
            if (!CONFIG.excludeFiles.includes(file)) {
                fileList.push(filePath);
            }
        }
    });
    
    return fileList;
}

/**
 * Main build function
 */
function build(targetFile = null) {
    log('\n🔨 Ottawa Handiman Website Builder\n', colors.bright + colors.blue);
    
    // Check if components exist
    if (!fs.existsSync(CONFIG.componentsDir)) {
        log(`Components directory not found: ${CONFIG.componentsDir}`, colors.red);
        process.exit(1);
    }
    
    const navPath = path.join(CONFIG.componentsDir, CONFIG.navComponent);
    const footerPath = path.join(CONFIG.componentsDir, CONFIG.footerComponent);
    
    if (!fs.existsSync(navPath)) {
        log(`Navigation component not found: ${navPath}`, colors.red);
        process.exit(1);
    }
    
    if (!fs.existsSync(footerPath)) {
        log(`Footer component not found: ${footerPath}`, colors.red);
        process.exit(1);
    }
    
    log('Components found ✓\n', colors.green);
    
    // Determine which files to process
    let filesToProcess = [];
    
    if (targetFile) {
        // Process specific file
        if (fs.existsSync(targetFile) && targetFile.endsWith('.html')) {
            filesToProcess = [targetFile];
        } else {
            log(`File not found or not an HTML file: ${targetFile}`, colors.red);
            process.exit(1);
        }
    } else {
        // Process all HTML files
        filesToProcess = findHTMLFiles('.');
    }
    
    if (filesToProcess.length === 0) {
        log('No HTML files found to process', colors.yellow);
        return;
    }
    
    log(`Processing ${filesToProcess.length} HTML file(s)...\n`, colors.blue);
    
    let successCount = 0;
    
    filesToProcess.forEach(file => {
        const relativePath = path.relative('.', file);
        log(`Processing: ${relativePath}`, colors.yellow);
        
        if (processHTMLFile(file)) {
            successCount++;
        }
        
        console.log(''); // Empty line for readability
    });
    
    // Summary
    log(`✅ Build complete! ${successCount}/${filesToProcess.length} files updated.`, colors.bright + colors.green);
    
    // Instructions for next steps
    if (successCount > 0) {
        log('\nNext steps:', colors.blue);
        log('1. Review the updated HTML files', colors.reset);
        log('2. Test navigation and footer on all pages', colors.reset);
        log('3. Ensure all links work correctly', colors.reset);
        log('4. Test mobile responsiveness', colors.reset);
    }
}

/**
 * Create a new page from template
 */
function createPage(pageName) {
    const templatePath = './templates/page-template.html';
    
    if (!fs.existsSync(templatePath)) {
        log(`Template not found: ${templatePath}`, colors.red);
        process.exit(1);
    }
    
    const outputPath = `./${pageName}.html`;
    
    if (fs.existsSync(outputPath)) {
        log(`Page already exists: ${outputPath}`, colors.red);
        process.exit(1);
    }
    
    // Copy template
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders with page name
    let content = template.replace(/\[page-name\]/g, pageName);
    content = content.replace(/\[Page Title\]/g, pageName.charAt(0).toUpperCase() + pageName.slice(1));
    content = content.replace(/\[page-url\]/g, pageName);
    
    fs.writeFileSync(outputPath, content, 'utf8');
    
    log(`✅ Created new page: ${outputPath}`, colors.green);
    log('\nNext steps:', colors.blue);
    log(`1. Edit ${outputPath} to add your content`, colors.reset);
    log(`2. Update meta tags and Schema markup`, colors.reset);
    log(`3. Create ${pageName}.css in assets/css/ if needed`, colors.reset);
    log(`4. Run 'node build.js' to inject navigation and footer`, colors.reset);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length > 0) {
    if (args[0] === '--help' || args[0] === '-h') {
        log('Ottawa Handiman Website Builder\n', colors.bright);
        log('Usage:', colors.blue);
        log('  node build.js                 # Build all HTML files');
        log('  node build.js index.html      # Build specific file');
        log('  node build.js --new pagename  # Create new page from template');
        log('  node build.js --help          # Show this help message');
    } else if (args[0] === '--new' && args[1]) {
        createPage(args[1]);
    } else {
        build(args[0]);
    }
} else {
    build();
}

module.exports = { build, processHTMLFile, findHTMLFiles };