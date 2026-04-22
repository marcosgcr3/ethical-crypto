import fs from 'fs';
import path from 'path';

const rootDir = 'c:/Users/marco/biohacking';
const metadataPath = path.join(rootDir, 'scratch', 'new_articles_metadata.json');

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const draftFiles = fs.readdirSync(rootDir).filter(f => f.startsWith('article_') && f.endsWith('_draft.md'));

const mapping = [];

draftFiles.forEach(file => {
    const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    const titleMatch = content.match(/TITLE**: (.*)/);
    const slugMatch = content.match(/URL SLUG**: (.*)/);
    
    if (titleMatch) {
        mapping.push({
            file,
            title: titleMatch[1].trim(),
            slug: slugMatch ? slugMatch[1].trim() : null
        });
    }
});

console.log('--- Draft Files Found ---');
mapping.forEach(m => console.log(`${m.file}: "${m.title}" (Slug: ${m.slug})`));

console.log('\n--- Metadata in JSON ---');
metadata.forEach(m => console.log(`JSON: "${m.title}" (Slug: ${m.slug})`));

// Try to match by title similarity or category index
// (Actually, checking if any title in JSON matches any title in Drafts)
const matched = [];
metadata.forEach(meta => {
    const match = mapping.find(m => m.title.toLowerCase().includes(meta.title.toLowerCase()) || meta.title.toLowerCase().includes(m.title.toLowerCase()));
    if (match) {
        matched.push({ meta: meta.title, draft: match.file });
    }
});

console.log('\n--- Matched ---');
matched.forEach(m => console.log(`Match: "${m.meta}" -> ${m.draft}`));
