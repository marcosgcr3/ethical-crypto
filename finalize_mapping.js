const fs = require('fs');
const crypto = require('crypto');

let content = fs.readFileSync('workflow_v3_0_utf8.json', 'utf8');
if (content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 0xFFFE) {
    content = content.slice(1);
}
const workflow = JSON.parse(content);

const tableName = "x_biohacking_published";

// Update Read Data Table Node
const readTableNode = workflow.nodes.find(n => n.name === 'Leer Historial Local');
if (readTableNode) {
    readTableNode.parameters.tableId = tableName;
    console.log('Updated Read node table name.');
}

// Update Insert Data Table Node
const insertTableNode = workflow.nodes.find(n => n.name === 'Guardar Localmente');
if (insertTableNode) {
    insertTableNode.parameters.tableId = tableName;
    insertTableNode.parameters.columns.value = {
        "url": "={{ $('Construir Tweet').first().json.url }}",
        "category": "={{ $('Construir Tweet').first().json.category }}",
        "published_at": "={{ new Date().toISOString() }}",
        "tweet_text": "={{ $('Construir Tweet').first().json.text }}"
    };
    console.log('Updated Insert node table name and mappings.');
}

const cleanedWorkflow = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: {}
};

fs.writeFileSync('workflow_v3_final_mapped.json', JSON.stringify(cleanedWorkflow));
console.log('Workflow finalized with existing table x_biohacking_published.');
