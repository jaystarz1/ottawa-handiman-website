#!/usr/bin/env node
/**
 * Homepage gallery builder — Ottawa Handiman
 *
 * Harvests featured project photos from projects.html and regenerates the
 * homepage gallery, so projects.html stays the single source of truth.
 *
 * How it works:
 *  - In projects.html, each case-study <section> has an id anchor, and the
 *    one <img> that best represents the project carries a `data-featured`
 *    attribute (move the attribute to change which photo represents it).
 *  - This script collects every data-featured image (document order, max 8),
 *    with its alt text, caption, and section anchor, then rewrites the
 *    gallery tiles in index.html between the GALLERY_START/END markers.
 *  - It also refreshes the "image" array in the homepage LocalBusiness
 *    JSON-LD so structured data matches what's on the page.
 *
 * Usage: node build-gallery.js        (run after editing projects.html, then commit)
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PROJECTS = path.join(ROOT, 'projects.html');
const INDEX = path.join(ROOT, 'index.html');
const MAX_TILES = 8;
const SITE = 'https://ottawahandiman.ca';

function extractFeatured(html) {
    const tiles = [];
    const sectionRe = /<section id="([^"]+)" class="case-study-section[^"]*">([\s\S]*?)<\/section>/g;
    let m;
    while ((m = sectionRe.exec(html)) !== null) {
        const [, id, body] = m;
        const img = body.match(/<img data-featured[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/);
        if (!img) continue;
        const [, src, alt] = img;
        // caption: the image-caption that follows this img within its case-image block
        const after = body.slice(body.indexOf(img[0]));
        const cap = after.match(/<p class="image-caption">([\s\S]*?)<\/p>/);
        const title = (body.match(/<h2>([\s\S]*?)<\/h2>/) || [])[1] || '';
        tiles.push({
            id,
            src,
            alt,
            caption: (cap ? cap[1] : title).replace(/\s+/g, ' ').trim(),
        });
    }
    return tiles.slice(0, MAX_TILES);
}

function renderTile(t) {
    const webp = t.src.replace(/\.jpe?g$/i, '.webp');
    const hasWebp = fs.existsSync(path.join(ROOT, webp));
    const sourceTag = hasWebp
        ? `\n                        <source srcset="${webp}" type="image/webp">`
        : '';
    return `                <a class="gallery-item" href="projects.html#${t.id}">
                    <picture>${sourceTag}
                        <img src="${t.src}" alt="${t.alt}" loading="lazy">
                    </picture>
                    <div class="gallery-caption">${t.caption}</div>
                </a>`;
}

function main() {
    const projectsHtml = fs.readFileSync(PROJECTS, 'utf8');
    let indexHtml = fs.readFileSync(INDEX, 'utf8');

    const tiles = extractFeatured(projectsHtml);
    if (tiles.length === 0) {
        console.error('ERROR: no data-featured images found in projects.html — gallery left untouched');
        process.exit(1);
    }

    const START = '<!-- GALLERY_START -->';
    const END = '<!-- GALLERY_END -->';
    const s = indexHtml.indexOf(START);
    const e = indexHtml.indexOf(END);
    if (s === -1 || e === -1 || e < s) {
        console.error('ERROR: GALLERY_START/GALLERY_END markers missing in index.html');
        process.exit(1);
    }
    const block = `${START}\n${tiles.map(renderTile).join('\n')}\n                ${END}`;
    indexHtml = indexHtml.slice(0, s) + block + indexHtml.slice(e + END.length);

    // keep the LocalBusiness JSON-LD image list in sync (hero + featured jpgs)
    const imageList = [
        `${SITE}/assets/images/workshop-hero.jpg`,
        ...tiles.map(t => `${SITE}/${t.src}`),
    ];
    const jsonImages = imageList.map(u => `            "${u}"`).join(',\n');
    indexHtml = indexHtml.replace(
        /"image": \[[\s\S]*?\]/,
        `"image": [\n${jsonImages}\n        ]`
    );

    fs.writeFileSync(INDEX, indexHtml);
    console.log(`gallery rebuilt: ${tiles.length} tiles`);
    tiles.forEach(t => console.log(`  #${t.id} <- ${path.basename(t.src)}`));
}

main();
