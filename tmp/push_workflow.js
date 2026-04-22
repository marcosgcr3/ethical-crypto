const fs = require('fs');

const url = "https://n8n.187.124.172.149.sslip.io/api/v1/workflows/syd0sFTAm4fGIWst";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZWQwYjhiZS03ZWQ4LTQ1NWEtYjExOS0yMWJhOGNiMGJlZGQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOGYxMzUwZTctOWQ4Mi00NzVkLWFjN2ItYjkwNGE3OTMzNzcyIiwiaWF0IjoxNzc0MTk4NjIzfQ.Z0qNNDD99cnclH9WTvBHWRhVCudkNvpryQs3byy5Xvg";

const workflowJson = JSON.parse(fs.readFileSync('tmp/pinterest_workflow_updated.json', 'utf8'));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

workflowJson.settings = {};
delete workflowJson.id;

fetch(url, {
  method: 'PUT',
  headers: {
    'X-N8N-API-KEY': apiKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(workflowJson)
})
.then(async res => {
    console.log("Status:", res.status);
    console.log(await res.json());
})
.catch(err => {
  console.error(err);
});
