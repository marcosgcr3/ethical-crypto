const fs = require('fs');
const crypto = require('crypto');

let content = fs.readFileSync('workflow_v2_2_utf8.json', 'utf8');
if (content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 0xFFFE) {
    content = content.slice(1);
}
const workflow = JSON.parse(content);

// 1. Add Read Data Table Node
const readTableNodeId = crypto.randomBytes(8).toString('hex');
const readTableNode = {
    parameters: {
        operation: "getRows",
        tableId: "historial_tweets",
        options: {}
    },
    id: readTableNodeId,
    name: "Leer Historial Local",
    type: "n8n-nodes-base.n8nDataTable",
    typeVersion: 1,
    position: [120, 680]
};

// 2. Add Insert Data Table Node
const insertTableNodeId = crypto.randomBytes(8).toString('hex');
const insertTableNode = {
    parameters: {
        operation: "insertRow",
        tableId: "historial_tweets",
        columns: {
            mappingMode: "defineBelow",
            value: {
                "url": "={{ $('Construir Tweet').first().json.url }}",
                "fecha": "={{ new Date().toISOString() }}"
            }
        },
        options: {}
    },
    id: insertTableNodeId,
    name: "Guardar Localmente",
    type: "n8n-nodes-base.n8nDataTable",
    typeVersion: 1,
    position: [1950, 480]
};

// 3. Update "Seleccionar Articulo" code to handle Data Table format
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

// 4. Remove Config and Google nodes if they exist
workflow.nodes = workflow.nodes.filter(n => !['Configuracion', 'Leer Historial Google', 'Guardar en Google', 'Control Duplicados'].includes(n.name));

// Add new nodes
workflow.nodes.push(readTableNode, insertTableNode);

// 5. Rewire
// schedule -> sitemap
workflow.connections['Cada 12 horas'] = { main: [[{ node: "Obtener Sitemap1", type: "main", index: 0 }]] };

// parse_sitemap -> read_local -> selector
workflow.connections['Parsear Sitemap'] = { main: [[{ node: "Leer Historial Local", type: "main", index: 0 }]] };
workflow.connections['Leer Historial Local'] = { main: [[{ node: "Seleccionar Articulo", type: "main", index: 0 }]] };

// selector -> fetch (only if not stopped)
// Note: Seleccionar Articulo now returns a 'stop' flag if nothing is found.
// I'll add an IF node or update Fetch Contenido to check this.
// To keep it simple, I'll add an IF node back.

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

workflow.connections['Seleccionar Articulo'] = { main: [[{ node: "Hay Novedades?", type: "main", index: 0 }]] };
workflow.connections['Hay Novedades?'] = { 
    main: [
        [], // True branch (Stop: true) -> Do nothing
        [{ node: "Fetch Contenido", type: "main", index: 0 }] // False branch (Stop: false) -> Continue
    ] 
};

// create_tweet -> insert_local
workflow.connections['Create Tweet'] = { main: [[{ node: "Guardar Localmente", type: "main", index: 0 }]] };

const cleanedWorkflow = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: {}
};

fs.writeFileSync('workflow_v3_local_db.json', JSON.stringify(cleanedWorkflow));
console.log('Workflow transformed with n8n Data Table successfully.');
