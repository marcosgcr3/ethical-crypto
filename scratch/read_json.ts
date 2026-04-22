import fs from 'fs';

try {
  let content = fs.readFileSync('scratch/articles_output.json', 'utf16le');
  // Remove BOM if present
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  const articles = JSON.parse(content);
  console.log(JSON.stringify(articles.slice(0, 15), null, 2));
} catch (e) {
  console.error(e);
}
