import pkceChallenge from 'pkce-challenge';

export const getCodeChallenge = () => {
  return pkceChallenge(128).code_verifier;
}

export const getState = () => {
  return pkceChallenge(64).code_verifier;
}
