const https = require('https');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZWQwYjhiZS03ZWQ4LTQ1NWEtYjExOS0yMWJhOGNiMGJlZGQiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOGYxMzUwZTctOWQ4Mi00NzVkLWFjN2ItYjkwNGE3OTMzNzcyIiwiaWF0IjoxNzc0MTk4NjIzfQ.Z0qNNDD99cnclH9WTvBHWRhVCudkNvpryQs3byy5Xvg';
const host = 'n8n.187.124.172.149.sslip.io';

const data = JSON.stringify({
    name: "historial_tweets",
    columns: [
        { name: "url", type: "string" },
        { name: "fecha", type: "string" }
    ]
});

const options = {
    hostname: host,
    port: 443,
    path: '/api/v1/binary-data/storage',
    method: 'POST',
    rejectUnauthorized: false,
    headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': apiKey,
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let responseBody = '';
    res.on('data', (d) => responseBody += d);
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        console.log('Response:', responseBody);
    });
});

req.on('error', (e) => {
    console.error('Error:', e);
});

req.write(data);
req.end();
