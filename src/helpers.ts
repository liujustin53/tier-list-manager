import pkceChallenge from 'pkce-challenge';

export type ListEntry = {
  animanga_id: number;
  main_picture: string;
  score: number;
  tier: string;
  // is_changed: boolean;
}

export const getCodeChallenge = () => {
  return pkceChallenge(128).code_verifier;
}

export const getState = () => {
  // return pkceChallenge(64).code_verifier;
  // generate a random string of 16 characters
  const nums = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(nums, (n) => n.toString(16)).join('');
}

export const isLoggedIn = () => {
  // check for is_logged_in cookie
  return document.cookie.includes('is_logged_in=1');
}