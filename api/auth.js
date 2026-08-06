export default function handler(req, res) {
  const { host } = req.headers;
  const redirectUri = `https://${host}/api/callback`;
  const params = new URLSearchParams({
    client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'repo',
  });
  res.writeHead(302, { Location: `https://github.com/login/oauth/authorize?${params.toString()}` });
  res.end();
}
