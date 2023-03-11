import pkceChallenge from 'pkce-challenge';

export const getCodeChallenge = () => {
  return pkceChallenge(128).code_verifier;
}

export const getState = () => {
  // return pkceChallenge(64).code_verifier;
  // generate a random string of 16 characters
  const nums = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(nums, (n) => n.toString(16)).join('');
}

export const getSessionID = () => {
  // check for session id cookie
  const session_cookie = document.cookie.split('; ').find(row => row.startsWith('session_id=')) || '';
  if (!session_cookie) {
    return '';
  }
  const session_id = session_cookie.split('=')[1];
  if (session_id) {
    return session_id;
  }
  return '';
}

export const isLoggedIn = () => {
  return getSessionID() !== '';
}