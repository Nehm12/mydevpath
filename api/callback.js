export default async function handler(req, res) {
  const { host } = req.headers;
  const url = new URL(req.url, `https://${host}`);
  const code = url.searchParams.get('code');
  const redirectUri = `https://${host}/api/callback`;

  let status = 'error';
  let content = { message: 'Unknown error' };

  try {
    if (!code) {
      throw new Error('Missing authorization code');
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
        client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await tokenResponse.json();
    if (!data.access_token) {
      throw new Error(data.error_description || data.error || 'Failed to obtain access token');
    }

    status = 'success';
    content = { token: data.access_token, provider: 'github' };
  } catch (error) {
    content = { message: error.message };
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(renderBody(status, content));
}

function escapeJsString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function renderBody(status, content) {
  const payload = escapeJsString(JSON.stringify(content));
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Authenticating...</title>
</head>
<body>
<script>
  window.opener.postMessage('authorizing:github', '*');
  var receiveMessage = function (message) {
    window.opener.postMessage('authorization:github:${status}:' + '${payload}', message.origin);
    window.removeEventListener('message', receiveMessage, false);
  };
  window.addEventListener('message', receiveMessage, false);
</script>
</body>
</html>`;
}
