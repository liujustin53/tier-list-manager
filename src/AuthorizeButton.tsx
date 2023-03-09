


export const AuthorizeButton = () => {
  const link = 'https://myanimelist.net/v1/oauth2/authorize?'
  + 'response_type=code'
  + `&client_id=${configuration.client_id}`
  + `&code_challenge=${codeChallenge}`
  + `&state=${state}`;
}