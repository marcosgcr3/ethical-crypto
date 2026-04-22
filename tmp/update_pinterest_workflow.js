const fs = require('fs');

try {
  const filePath = 'C:/Users/marco/.gemini/antigravity/brain/37d80a39-94de-4efc-9a1a-c526ce6f099b/.system_generated/steps/80/output.txt';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const workflow = data.data || data;

  // 1. Update first DB node
  const db1 = workflow.nodes.find(n => n.name === '🗄 Leer Historial (DB)');
  db1.parameters.query = `CREATE TABLE IF NOT EXISTS pinterest_biohacking_published (
  id SERIAL PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  category TEXT,
  tweet_text TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT url, category FROM pinterest_biohacking_published ORDER BY published_at ASC;`;

  // 2. Update Extraer Metadata
  const ext_metadata = workflow.nodes.find(n => n.name === '🔬 Extraer Metadata');
  ext_metadata.parameters.jsCode = `// Extract metadata from raw HTML
const html = $input.first().json.data || '';

// Get context from upstream IF node
const context = $('¿Hay Novedades?').first().json;
const articleUrl = context.url;
const category   = context.category;
const hashtags   = context.hashtags;

// --- Title ---
const titleMatch = html.match(/<title[^>]*>([^<]+)<\\/title>/i);
let title = titleMatch ? titleMatch[1] : '';
title = title.replace(/\\s*[|\\-–—]\\s*[^|\\-–—]{1,50}$/, '').trim();

// --- Meta Description ---
const descMatch =
  html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
  html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i) ||
  html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
const description = descMatch ? descMatch[1].trim() : '';

// --- First meaningful paragraphs ---
const paragraphs = [];
const pRegex = /<p[^>]*>(.*?)<\\/p>/gi;
let match;
while ((match = pRegex.exec(html)) !== null) {
  const clean = match[1].replace(/<[^>]+>/g, '').trim();
  if (clean.length > 60) paragraphs.push(clean);
  if (paragraphs.length >= 4) break;
}
const firstParagraphs = paragraphs.join(' ').substring(0, 900);

// --- Image ---
const imgMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
const imageUrl = imgMatch ? imgMatch[1].trim() : '';

console.log(\`Extracted - Title: "\${title}" | Desc length: \${description.length} | Img: \${imageUrl} | Paragraphs: \${paragraphs.length}\`);

return [{
  json: {
    url: articleUrl,
    category,
    hashtags,
    title,
    description,
    firstParagraphs,
    imageUrl
  }
}];`;

  // 3. Update LLM Prompt
  const llmNode = workflow.nodes.find(n => n.name === 'Message a model');
  llmNode.parameters.responses.values[0].content = `=You are an expert in ethical biohacking and social media marketing. Generate Pinterest pin descriptions in ENGLISH for the blog ethicalbiohacking.com.

Rules:
- Maximum 450 characters
- Start with a relevant emoji and a catchy hook
- Include 3-5 relevant hashtags at the end (#biohacking #longevity #health etc)
- Share a concrete fact or spark curiosity that encourages clicking the link
- Do NOT include the URL in your response
- Return ONLY the pin description text

Generate a pin description for this article:
Title: {{ $json.title }}
Description: {{ $json.description }}
Category: {{ $json.category }}
Paragraphs: {{ $json.firstParagraphs }}`;

  // 4. Update the assembler node
  const buildNode = workflow.nodes.find(n => n.name === '🔧 Construir Tweet Final');
  buildNode.name = '🔧 Construir Pin Final';
  buildNode.parameters.jsCode = `// Build final Pin description
const aiResponse = $input.first().json;
const metadata   = $('🔬 Extraer Metadata').first().json;

// Extract text from OpenAI response
let pinText = '';
if (aiResponse.message && aiResponse.message.content) {
  pinText = aiResponse.message.content;
} else if (aiResponse.choices && aiResponse.choices[0]) {
  pinText = aiResponse.choices[0].message.content;
} else if (typeof aiResponse === 'string') {
  pinText = aiResponse;
}
pinText = pinText.replace(/^"|"$/g, '').replace(/\\n+/g, '\\n').trim();

const url      = metadata.url;
const hashtags = metadata.hashtags;

// Pinterest description limit is 500 characters
const maxChars = 500;

if (pinText.length > maxChars) {
  pinText = pinText.substring(0, maxChars - 3) + '...';
}

console.log(\`Pin built (\${pinText.length} chars visible):\\n\${pinText}\`);

return [{
  json: {
    pinContent: pinText,
    pinText,
    url,
    category: metadata.category,
    imageUrl: metadata.imageUrl,
    charCount: pinText.length
  }
}];`;

  // 5. Replace node Create Tweet 1
  const tweetNodeIndex = workflow.nodes.findIndex(n => n.name === 'Create Tweet1');
  if (tweetNodeIndex !== -1) {
    const oldNode = workflow.nodes[tweetNodeIndex];
    
    // Replace with HTTP request
    workflow.nodes[tweetNodeIndex] = {
      "parameters": {
        "method": "POST",
        "url": "https://api.pinterest.com/v5/pins",
        "authentication": "oAuth2",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"board_id\": \"YOUR_BOARD_ID_HERE\",\n  \"link\": \"{{ $('🔧 Construir Pin Final').item.json.url }}\",\n  \"title\": \"{{ $('🔬 Extraer Metadata').item.json.title }}\",\n  \"description\": \"{{ $('🔧 Construir Pin Final').item.json.pinContent }}\",\n  \"media_source\": {\n    \"source_type\": \"image_url\",\n    \"url\": \"{{ $('🔧 Construir Pin Final').item.json.imageUrl }}\"\n  }\n}"
      },
      "id": "e43b1767-1111-4444-9999-6c472d657179",
      "name": "📌 Publish to Pinterest API",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": oldNode.position,
      "credentials": {
        "oAuth2Api": {
          "id": "",
          "name": ""
        }
      }
    };
  }

  // 6. DB 2
  const db2 = workflow.nodes.find(n => n.name === '💾 Guardar en DB (Anti-duplicados)');
  db2.parameters.query = `INSERT INTO pinterest_biohacking_published (url, category, tweet_text, published_at)
VALUES (
  '{{ $('🔧 Construir Pin Final').first().json.url.replace(/'/g, "''") }}',
  '{{ $('🔧 Construir Pin Final').first().json.category }}',
  '{{ $('🔧 Construir Pin Final').first().json.pinText.replace(/'/g, "''").replace(/\\n/g, ' ') }}',
  NOW()
)
ON CONFLICT (url) DO NOTHING;`;

  // 7. Fix connections
  const connections = workflow.connections;

  // Change "Message a model" -> "🔧 Construir Tweet Final" to "🔧 Construir Pin Final"
  if (connections['Message a model'] && connections['Message a model'].main[0]) {
     const nextNodes = connections['Message a model'].main[0];
     for (let n of nextNodes) {
       if (n.node === '🔧 Construir Tweet Final') n.node = '🔧 Construir Pin Final';
     }
  }

  // Change "🔧 Construir Tweet Final" source connection
  if (connections['🔧 Construir Tweet Final']) {
    connections['🔧 Construir Pin Final'] = connections['🔧 Construir Tweet Final'];
    delete connections['🔧 Construir Tweet Final'];
  }

  // "🔧 Construir Pin Final" -> "Create Tweet1"
  if (connections['🔧 Construir Pin Final']) {
    const nextNodes = connections['🔧 Construir Pin Final'].main[0];
    for (let n of nextNodes) {
      if (n.node === 'Create Tweet1') n.node = '📌 Publish to Pinterest API';
    }
  }

  // "📌 Publish to Pinterest API" -> "💾 Guardar en DB (Anti-duplicados)"
  if (connections['Create Tweet1']) {
    connections['📌 Publish to Pinterest API'] = connections['Create Tweet1'];
    delete connections['Create Tweet1'];
  }

  fs.writeFileSync('C:/Users/marco/biohacking/tmp/pinterest_workflow_updated.json', JSON.stringify({
    id: workflow.id,
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections
  }, null, 2));

  console.log("Successfully prepared JSON at tmp/pinterest_workflow_updated.json");
} catch (e) {
  console.error(e);
}
