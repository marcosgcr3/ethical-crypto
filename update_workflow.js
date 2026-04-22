const https = require('https');
const fs = require('fs');

const workflowData = JSON.parse(fs.readFileSync('workflow_v3_fixed_ops.json', 'utf8'));
workflowData.active = true;
const data = JSON.stringify(workflowData);
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZWQwYjhiZS03ZWQ4LTQ1NWEtYjExOS0yMWJhOGNiMGJlZGQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOGYxMzUwZTctOWQ4Mi00NzVkLWFjN2ItYjkwNGE3OTMzNzcyIiwiaWF0IjoxNzc0MTk4NjIzfQ.Z0qNNDD99cnclH9WTvBHWRhVCudkNvpryQs3byy5Xvg';
const workflowId = '5iXWxVyYQT7oBPBO';
const url = new URL(`https://n8n.187.124.172.149.sslip.io/api/v1/workflows/${workflowId}`);

const options = {
  hostname: url.hostname,
  port: 443,
  path: url.pathname,
  method: 'PUT',
  rejectUnauthorized: false,
  headers: {
    'X-N8N-API-KEY': apiKey,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  console.log(`Status Code: ${res.statusCode}`);
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  res.on('end', () => {
    try {
      console.log('Response:', JSON.parse(responseData));
    } catch (e) {
      console.log('Response (text):', responseData);
    }
    if (res.statusCode === 200) {
      console.log('Workflow updated successfully.');
    } else {
      console.error('Failed to update workflow.');
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
  process.exit(1);
});

req.write(data);
req.end();
