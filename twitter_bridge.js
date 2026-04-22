const http = require('http');
const https = require('https');
const crypto = require('crypto');

// --- TUS CLAVES (Limpiadas de espacios automáticamente) ---
let consumer_key = 'o6Pa6xn1qHVFGu8Dzcxs6Np0Y'.replace(/\s/g, '');
let consumer_secret = 'V71dmHSiLK2lWistOcKEs4I4OTVZRIHNaXvI7ra3rz8qqBXH4Y'.replace(/\s/g, '');
let token = '2041063467306651648-BTwGcJSRbXVrfVgMVM38pd26hd2xIz'.replace(/\s/g, '');
let token_secret = 'f3bfE6Hh8Hs0YYWuuk6aySIAzvwd0mBN0s9toYmCLSr n5'.replace(/\s/g, '');
// --------------------------------------------------------

function percentEncode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

function generateOAuthHeader(method, url, params) {
  const nonce = crypto.randomBytes(32).toString('hex');
  const timestamp = Math.floor(Date.now() / 1000).toString();
  
  const oauthParams = {
    oauth_consumer_key: consumer_key,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_token: token,
    oauth_version: '1.0',
    ...params
  };

  const paramString = Object.keys(oauthParams).sort().map(k => {
    return `${percentEncode(k)}=${percentEncode(oauthParams[k])}`;
  }).join('&');

  const baseString = [
    method.toUpperCase(),
    percentEncode(url),
    percentEncode(paramString)
  ].join('&');

  const signingKey = [
    percentEncode(consumer_secret),
    percentEncode(token_secret)
  ].join('&');

  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
  oauthParams.oauth_signature = signature;

  return 'OAuth ' + Object.keys(oauthParams).sort().map(k => {
    return `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`;
  }).join(', ');
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/tweet') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const tweetText = payload.text || payload.tweetText;
        
        if (!tweetText) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Missing text field' }));
          return;
        }

        console.log(`[${new Date().toISOString()}] Publicando: ${tweetText.substring(0, 50)}...`);

        const xUrl = 'https://api.twitter.com/2/tweets';
        const postData = JSON.stringify({ text: tweetText });
        
        const headers = {
          'Authorization': generateOAuthHeader('POST', xUrl, {}),
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        };

        const xReq = https.request(xUrl, { method: 'POST', headers }, (xRes) => {
          let xBody = '';
          xRes.on('data', d => xBody += d);
          xRes.on('end', () => {
            console.log(`[${new Date().toISOString()}] Twitter respondió con status: ${xRes.statusCode}`);
            res.writeHead(xRes.statusCode, { 'Content-Type': 'application/json' });
            res.end(xBody);
          });
        });

        xReq.on('error', e => {
          console.error('Error enviando a X:', e);
          res.writeHead(500);
          res.end(JSON.stringify({ error: e.message }));
        });

        xReq.write(postData);
        xReq.end();

      } catch (e) {
        console.error('Error parseando JSON:', e);
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Twitter Bridge funcionando con limpieza automatica en http://localhost:${PORT}`);
});
