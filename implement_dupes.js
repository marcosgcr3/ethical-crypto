const fs = require('fs');
const crypto = require('crypto');

let content = fs.readFileSync('current_workflow_utf8.json', 'utf8');
// Strip BOM if present
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}
const workflow = JSON.parse(content);

// 1. Refine "Seleccionar Articulo" code to avoid auto-restart of cycle if pool is empty
const selectorNode = workflow.nodes.find(n => n.name === 'Seleccionar Articulo');
if (selectorNode) {
    selectorNode.parameters.jsCode = `// Leer historial guardado en datos estáticos del workflow
const staticData = $getWorkflowStaticData('global');
const publishedUrls = staticData.publishedUrls || [];
const lastCategory = staticData.lastCategory || null;

// Artículos del sitemap
const sitemap = items.map(i => i.json);

// Filtrar los no publicados
const pending = sitemap.filter(a => !publishedUrls.includes(a.url));

if (pending.length === 0) {
    // Si no hay nada nuevo, devolvemos un objeto indicando el fin
    return [{ json: { stop: true, message: 'All articles have been published already.' } }];
}

// Evitar repetir categoría consecutiva (si es posible)
const diffCat = pending.filter(a => a.category !== lastCategory);
const pool = diffCat.length > 0 ? diffCat : pending;

// Seleccionar el primero (o podrías hacer random con Math.random)
return [{ json: pool[0] }];`;
}

// 2. Add Filter Node "Control Duplicados"
const filterNodeId = crypto.randomBytes(8).toString('hex');
const filterNode = {
    parameters: {
        conditions: {
            boolean: [
                {
                    value1: "={{ $json.stop }}",
                    value2: true,
                    operator: "notEqual"
                }
            ]
        }
    },
    id: filterNodeId,
    name: "Control Duplicados",
    type: "n8n-nodes-base.filter",
    typeVersion: 2.1,
    position: [640, 480]
};

workflow.nodes.push(filterNode);

// 3. Re-wire connections
// Current connection: Seleccionar Articulo -> Fetch Contenido
// Target: Seleccionar Articulo -> Control Duplicados -> Fetch Contenido

// Remove old connection
const connFromSelector = workflow.connections['Seleccionar Articulo'].main[0];
const fetchContenidoConn = connFromSelector.find(c => c.node === 'Fetch Contenido');

if (fetchContenidoConn) {
    // Redirect Seleccionar Articulo -> Control Duplicados
    fetchContenidoConn.node = "Control Duplicados";
    
    // Add new connection: Control Duplicados (true branch) -> Fetch Contenido
    workflow.connections['Control Duplicados'] = {
        main: [
            [
                {
                    node: "Fetch Contenido",
                    type: "main",
                    index: 0
                }
            ]
        ]
    };
}

// Clean up for API update (remove read-only fields)
const cleanWorkflow = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: {} // Empty to avoid 400 schema errors
};

fs.writeFileSync('updated_workflow_dupes.json', JSON.stringify(cleanWorkflow));
console.log('Modified workflow for duplication check successfully.');
