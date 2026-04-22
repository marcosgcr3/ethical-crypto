const https = require('https');
const crypto = require('crypto');

// --- TUS CLAVES ---
const consumer_key = 'o6Pa6xn1qHVFGu8Dzcxs6Np0Y';
const consumer_secret = 'V71dmHSiLK2lWistOcKEs4I4OTVZRIHNaXvI7ra3rz8qqBXH4Y';
const token = '2041063467306651648-BTwGcJSRbXVrfVgMVM38pd26hd2xIz';
const token_secret = 'f3bfE6Hh8Hs0YYWuuk6aySIAzvwd0mBN0s9toYmCLSr n5';
// ------------------

const tweetText = process.argv[2] || 'Hello from Ethical Biohacking Bot!';

function percentEncode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function generateOAuthHeader(method, url, body) {
  const nonce = crypto.randomBytes(32).toString('hex');
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const params = {
    oauth_consumer_key: consumer_key,
    oauth_nonce: nonce,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_token: token,
    oauth_version: '1.0'
  };

  const paramString = Object.keys(params).sort().map(key => {
    return `${percentEncode(key)}=${percentEncode(params[key])}`;
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
  params.oauth_signature = signature;

  return 'OAuth ' + Object.keys(params).sort().map(key => {
    return `${percentEncode(key)}="${percentEncode(params[key])}"`;
  }).join(', ');
}

const data = JSON.stringify({ text: tweetText });
const url = 'https://api.twitter.com/2/tweets';
const authHeader = generateOAuthHeader('POST', url, {});

const options = {
  hostname: 'api.twitter.com',
  path: '/2/tweets',
  method: 'POST',
  headers: {
    'Authorization': authHeader,
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    console.log(body);
    process.exit(res.statusCode === 201 ? 0 : 1);
  });
});

req.on('error', (e) => {
  console.error(e);
  process.exit(1);
});

req.write(data);
req.end();
