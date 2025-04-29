export const oktaConfig = {
    clientId: '0oaogfysmhqfrzHYY5d7',
    issuer: 'https://dev-86588692.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disablehttpsCheck: true,
}
