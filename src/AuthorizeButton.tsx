import { Center, Button, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { getCodeChallenge, getState } from "./helpers";

const configuration = {
  client_id: "9edb52c76f29f5f66fd4917927e44473",
  redirect_uri: "http://localhost:8000/oauth/redirect",
}

const code_challenge = getCodeChallenge();
const state = getState();

export const AuthorizeButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const link = 'https://myanimelist.net/v1/oauth2/authorize?'
    + 'response_type=code'
    + `&client_id=${configuration.client_id}`
    + `&code_challenge=${code_challenge}`
    + `&state=${state}`
    + `&redirect_uri=${configuration.redirect_uri}`;

  const sendCodeChallenge = async () => {
    try {
      setLoading(true);
      const reqOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // console.log(code_challenge)
      // console.log(state)
      const response = await fetch(`http://localhost:8000/oauth/authorize?code_challenge=${code_challenge}&state=${state}`,
        reqOptions);
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      setSent(true);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading && !error && sent) {
      window.location.href = link;
    }
  }, [loading, error, sent, link]);

  return (
    <Center>
      <Stack>
        <Button onClick={() => {
          sendCodeChallenge();
        }}
        >
          Login
        </Button>
        {loading && (<Text>Loading...</Text>)}
        {error && (<Text>{error}</Text>)}
      </Stack>
    </Center>
  )
}