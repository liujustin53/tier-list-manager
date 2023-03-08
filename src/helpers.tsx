import { randomBytes } from "crypto";


// GENERATING CODE VERIFIER
const dec2hex = (dec: Number) => {
  return ("0" + dec.toString(16)).substr(-2);
}

const generateVerifier = () => {
  const codeVerifier = randomBytes(128).toString('hex');
  return codeVerifier;
}

export const getCodeChallenge = () => {
  return generateVerifier();
}