const fs = require('fs');
const crypto = require('crypto');

let content = fs.readFileSync('workflow_v2_2_utf8.json', 'utf8');
if (content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 0xFFFE) {
    content = content.slice(1);
}
const workflow = JSON.parse(content);

const sheetCredId = 'RpHGKyKTRuBCsobT';
const spreadsheetId = '1fynb4U5nIGxXSyMHHR1Eg83fPyT-Sns1CFx43WU5UQw';

// 1. Add Configuration Node (Set)
const configNodeId = workflow.nodes.find(n => n.name === 'Configuracion')?.id || crypto.randomBytes(8).toString('hex');
const configNode = {
    parameters: {
        values: {
            string: [
                {
                    name: "spreadsheetId",
                    value: spreadsheetId
                },
                {
                    name: "sheetName",
                    value: "Hoja 1"
                }
            ]
        }
    },
    id: configNodeId,
    name: "Configuracion",
    type: "n8n-nodes-base.set",
    typeVersion: 1,
    position: [-100, 480]
};

// 2. Add Read Google Sheets Node (v4)
const readSheetsNodeId = workflow.nodes.find(n => n.name === 'Leer Historial Google')?.id || crypto.randomBytes(8).toString('hex');
const readSheetsNode = {
    parameters: {
        resource: "sheet",
        operation: "getRows",
        documentId: {
            mode: "id",
            value: "={{ $node[\"Configuracion\"].json[\"spreadsheetId\"] }}"
        },
        sheetName: {
            mode: "name",
            value: "={{ $node[\"Configuracion\"].json[\"sheetName\"] }}"
        },
        options: {}
    },
    id: readSheetsNodeId,
    name: "Leer Historial Google",
    type: "n8n-nodes-base.googleSheets",
    typeVersion: 4.2, // Probamos con la más alta
    position: [120, 680],
    credentials: {
        googleSheetsOAuth2Api: { id: sheetCredId }
    }
};

// 3. Add Append Google Sheets Node (v4)
const appendSheetsNodeId = workflow.nodes.find(n => n.name === 'Guardar en Google')?.id || crypto.randomBytes(8).toString('hex');
const appendSheetsNode = {
    parameters: {
        resource: "sheet",
        operation: "append",
        documentId: {
            mode: "id",
            value: "={{ $node[\"Configuracion\"].json[\"spreadsheetId\"] }}"
        },
        sheetName: {
            mode: "name",
            value: "={{ $node[\"Configuracion\"].json[\"sheetName\"] }}"
        },
        columns: {
            mappingMode: "defineBelow",
            value: {
                "URL": "={{ $('Construir Tweet').first().json.url }}"
            }
        },
        options: {}
    },
    id: appendSheetsNodeId,
    name: "Guardar en Google",
    type: "n8n-nodes-base.googleSheets",
    typeVersion: 4.2,
    position: [1950, 480],
    credentials: {
        googleSheetsOAuth2Api: { id: sheetCredId }
    }
};

// Replace or Push nodes
workflow.nodes = workflow.nodes.filter(n => !['Configuracion', 'Leer Historial Google', 'Guardar en Google'].includes(n.name));
workflow.nodes.push(configNode, readSheetsNode, appendSheetsNode);

// Wiring (Same as before)
workflow.connections['Cada 12 horas'] = { main: [[{ node: "Configuracion", type: "main", index: 0 }]] };
workflow.connections['Configuracion'] = { main: [[{ node: "Obtener Sitemap1", type: "main", index: 0 }]] };
workflow.connections['Parsear Sitemap'] = { main: [[{ node: "Leer Historial Google", type: "main", index: 0 }]] };
workflow.connections['Leer Historial Google'] = { main: [[{ node: "Seleccionar Articulo", type: "main", index: 0 }]] };
workflow.connections['Create Tweet'] = { main: [[{ node: "Guardar en Google", type: "main", index: 0 }]] };

const cleanedWorkflow = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: {}
};

fs.writeFileSync('workflow_v2_2_v4_fix.json', JSON.stringify(cleanedWorkflow));
console.log('Workflow fixed with Google Sheets v4 successfully.');
