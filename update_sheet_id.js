const fs = require('fs');
let content = fs.readFileSync('workflow_v2_2_utf8.json', 'utf8');
if (content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 0xFFFE) {
    content = content.slice(1);
}
const workflow = JSON.parse(content);

// Update Configuracion node
const configNode = workflow.nodes.find(n => n.name === 'Configuracion');
if (configNode) {
    const idField = configNode.parameters.values.string.find(s => s.name === 'spreadsheetId');
    if (idField) {
        idField.value = '1fynb4U5nIGxXSyMHHR1Eg83fPyT-Sns1CFx43WU5UQw';
        console.log('Updated spreadsheetId successfully.');
    }
}

const cleanedWorkflow = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: {}
};

fs.writeFileSync('workflow_v2_2_final.json', JSON.stringify(cleanedWorkflow));
