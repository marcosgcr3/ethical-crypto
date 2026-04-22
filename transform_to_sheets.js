const fs = require('fs');
const crypto = require('crypto');

let content = fs.readFileSync('workflow_v2.2_input_utf8.json', 'utf8');
// Clean BOM and convert to UTF-8 if needed
if (content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 0xFFFE) {
    content = content.slice(1);
}
const workflow = JSON.parse(content);

const sheetCredId = 'RpHGKyKTRuBCsobT';

// 1. Add Configuration Node (Set)
const configNodeId = crypto.randomBytes(8).toString('hex');
const configNode = {
    parameters: {
        values: {
            string: [
                {
                    name: "spreadsheetId",
                    value: "PEGA_AQUI_TU_ID_DE_GOOGLE_SHEET"
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

// 2. Add Read Google Sheets Node
const readSheetsNodeId = crypto.randomBytes(8).toString('hex');
const readSheetsNode = {
    parameters: {
        operation: "getAll",
        spreadsheetId: "={{ $node[\"Configuracion\"].json[\"spreadsheetId\"] }}",
        range: "={{ $node[\"Configuracion\"].json[\"sheetName\"] }}!A:A",
        options: {}
    },
    id: readSheetsNodeId,
    name: "Leer Historial Google",
    type: "n8n-nodes-base.googleSheets",
    typeVersion: 3,
    position: [120, 680],
    credentials: {
        googleSheetsOAuth2Api: { id: sheetCredId, name: "Google Sheets account" }
    }
};

// 3. Add Append Google Sheets Node
const appendSheetsNodeId = crypto.randomBytes(8).toString('hex');
const appendSheetsNode = {
    parameters: {
        operation: "append",
        spreadsheetId: "={{ $node[\"Configuracion\"].json[\"spreadsheetId\"] }}",
        range: "={{ $node[\"Configuracion\"].json[\"sheetName\"] }}!A:A",
        options: {}
    },
    id: appendSheetsNodeId,
    name: "Guardar en Google",
    type: "n8n-nodes-base.googleSheets",
    typeVersion: 3,
    position: [1950, 480],
    credentials: {
        googleSheetsOAuth2Api: { id: sheetCredId, name: "Google Sheets account" }
    }
};

// 4. Update "Seleccionar Articulo" code
const selectorNode = workflow.nodes.find(n => n.name === 'Seleccionar Articulo');
if (selectorNode) {
    selectorNode.parameters.jsCode = `// Leer historial desde el nodo de Google Sheets
// Asumimos que el nodo 'Leer Historial Google' devuelve una lista de objetos { [nombre_columna]: 'url' }
const historyItems = $('Leer Historial Google').all();
const publishedUrls = historyItems.map(item => Object.values(item.json)[0]).filter(url => url);

// Artículos del sitemap (entrada de este nodo)
const sitemap = items.map(i => i.json);

// Filtrar los no publicados
const pending = sitemap.filter(a => !publishedUrls.includes(a.url));

if (pending.length === 0) {
    return [{ json: { stop: true, message: 'Todos los artículos ya están en Google Sheets.' } }];
}

// Seleccionar el primero disponible
return [{ json: pending[0] }];`;
}

// 5. Update "Guardar en Google" connection data
// The append node needs the URL to append. We can map it from the 'Construir Tweet' node or 'Create Tweet'.
appendSheetsNode.parameters.dataMode = "defineBelow";
appendSheetsNode.parameters.valuesAcrossColumns = { 
    values: [
        { columnValue: "={{ $('Construir Tweet').first().json.url }}" }
    ]
};

// 6. Clean and rewire
workflow.nodes.push(configNode, readSheetsNode, appendSheetsNode);

// Wiring:
// schedule -> config -> get_sitemap
workflow.connections['Cada 12 horas'] = { main: [[{ node: "Configuracion", type: "main", index: 0 }]] };
workflow.connections['Configuracion'] = { main: [[{ node: "Obtener Sitemap1", type: "main", index: 0 }]] };

// parse_sitemap -> read_google -> selector
workflow.connections['Parsear Sitemap'] = { main: [[{ node: "Leer Historial Google", type: "main", index: 0 }]] };
workflow.connections['Leer Historial Google'] = { main: [[{ node: "Seleccionar Articulo", type: "main", index: 0 }]] };

// create_tweet -> save_google
workflow.connections['Create Tweet'] = { main: [[{ node: "Guardar en Google", type: "main", index: 0 }]] };

// remove old "Guardar en Historial" if exists
const saveHistNode = workflow.nodes.find(n => n.name === 'Guardar en Historial');
if (saveHistNode) {
    workflow.nodes = workflow.nodes.filter(n => n.name !== 'Guardar en Historial');
    delete workflow.connections['Guardar en Historial'];
}

const cleanedWorkflow = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: {}
};

fs.writeFileSync('workflow_v2.2_sheets_final.json', JSON.stringify(cleanedWorkflow));
console.log('Workflow transformed with Google Sheets successfully.');
