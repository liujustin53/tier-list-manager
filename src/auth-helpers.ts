import { getCodeChallenge, getState } from "./helpers";

const configuration = {
  client_id: "9edb52c76f29f5f66fd4917927e44473",
  redirect_uri: "http://localhost:8000/oauth/redirect",
}

const code_challenge = getCodeChallenge();
const state = getState();

const link = 'https://myanimelist.net/v1/oauth2/authorize?'
  + 'response_type=code'
  + `&client_id=${configuration.client_id}`
  + `&code_challenge=${code_challenge}`
  + `&state=${state}`
  + `&redirect_uri=${configuration.redirect_uri}`;

export const login = async () => {
  try {
    const response = await fetch(`http://localhost:8000/oauth/authorize?code_challenge=${code_challenge}&state=${state}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    // redirect user to MAL login page
    window.location.href = link;

  } catch (err) {
    console.error(err);
  }
}

export const logout = async () => {
  try {
    const response = await fetch('http://localhost:8000/oauth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    // redirect to home page
    window.location.href = '/';
  } catch (err) {
    console.error(err);
  }
}