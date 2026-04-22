const fs = require('fs');
const crypto = require('crypto');

let content = fs.readFileSync('workflow_v2_2_utf8.json', 'utf8');
if (content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 0xFFFE) {
    content = content.slice(1);
}
const workflow = JSON.parse(content);

const dataTableType = "n8n-nodes-base.dataTable"; 

// 1. Add Read Data Table Node
const readTableNodeId = crypto.randomBytes(8).toString('hex');
const readTableNode = {
    parameters: {
        operation: "getRows",
        tableId: "x_biohacking_published",
        options: {}
    },
    id: readTableNodeId,
    name: "Leer Historial Local",
    type: dataTableType,
    typeVersion: 1,
    position: [120, 680]
};

// 2. Add Insert Data Table Node
const insertTableNodeId = crypto.randomBytes(8).toString('hex');
const insertTableNode = {
    parameters: {
        operation: "insertRow",
        tableId: "x_biohacking_published",
        columns: {
            mappingMode: "defineBelow",
            value: {
                "url": "={{ $('Construir Tweet').first().json.url }}",
                "category": "={{ $('Construir Tweet').first().json.category }}",
                "published_at": "={{ new Date().toISOString() }}",
                "tweet_text": "={{ $('Construir Tweet').first().json.text }}"
            },
            schema: [
                { id: "url", displayName: "url", type: "string" },
                { id: "category", displayName: "category", type: "string" },
                { id: "published_at", displayName: "published_at", type: "string" },
                { id: "tweet_text", displayName: "tweet_text", type: "string" }
            ]
        },
        options: {}
    },
    id: insertTableNodeId,
    name: "Guardar Localmente",
    type: dataTableType,
    typeVersion: 1,
    position: [1950, 480]
};

// Update Seleccionar Articulo
const selectorNode = workflow.nodes.find(n => n.name === 'Seleccionar Articulo');
if (selectorNode) {
    selectorNode.parameters.jsCode = `// Leer historial desde la tabla interna de n8n
const historyItems = $('Leer Historial Local').all();
const publishedUrls = historyItems.map(item => item.json.url).filter(url => url);

// Artículos del sitemap (entrada de este nodo)
const sitemap = items.map(i => i.json);

// Filtrar los no publicados
const pending = sitemap.filter(a => !publishedUrls.includes(a.url));

if (pending.length === 0) {
    return [{ json: { stop: true, message: 'Todos los artículos ya están en la base de datos local.' } }];
}

// Seleccionar el primero disponible
return [{ json: pending[0] }];`;
}

// Limpieza de nodos antiguos y nuevos
workflow.nodes = workflow.nodes.filter(n => !['Configuracion', 'Leer Historial Google', 'Guardar en Google', 'Control Duplicados', 'Leer Historial Local', 'Guardar Localmente', 'Hay Novedades?'].includes(n.name));
workflow.nodes.push(readTableNode, insertTableNode);

// Wiring
const ifNodeId = crypto.randomBytes(8).toString('hex');
const ifNode = {
    parameters: {
        conditions: {
            boolean: [
                {
                    value1: "={{ $json.stop }}",
                    value2: true
                }
            ]
        }
    },
    id: ifNodeId,
    name: "Hay Novedades?",
    type: "n8n-nodes-base.if",
    typeVersion: 1,
    position: [700, 480]
};
workflow.nodes.push(ifNode);

workflow.connections['Cada 12 horas'] = { main: [[{ node: "Obtener Sitemap1", type: "main", index: 0 }]] };
workflow.connections['Obtener Sitemap1'] = { main: [[{ node: "Parsear Sitemap", type: "main", index: 0 }]] };
workflow.connections['Parsear Sitemap'] = { main: [[{ node: "Leer Historial Local", type: "main", index: 0 }]] };
workflow.connections['Leer Historial Local'] = { main: [[{ node: "Seleccionar Articulo", type: "main", index: 0 }]] };
workflow.connections['Seleccionar Articulo'] = { main: [[{ node: "Hay Novedades?", type: "main", index: 0 }]] };
workflow.connections['Hay Novedades?'] = { 
    main: [
        [], // True branch (Stop: true)
        [{ node: "Fetch Contenido", type: "main", index: 0 }] // False branch
    ] 
};
workflow.connections['Create Tweet'] = { main: [[{ node: "Guardar Localmente", type: "main", index: 0 }]] };

const cleanedWorkflow = {
  name: workflow.name,
  nodes: workflow.nodes,
  connections: workflow.connections,
  settings: {}
};

fs.writeFileSync('workflow_v3_fixed_with_schema.json', JSON.stringify(cleanedWorkflow));
console.log('Workflow fixed with explicit schema mapping.');
