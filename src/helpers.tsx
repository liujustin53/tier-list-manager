import pkceChallenge from 'pkce-challenge';

export const getCodeChallenge = () => {
  const codeChallenge = pkceChallenge(128);
  return codeChallenge.code_verifier;
}
