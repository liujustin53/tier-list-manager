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
  const [sent, setSent] = useState(false);

  const link = 'https://myanimelist.net/v1/oauth2/authorize?'
    + 'response_type=code'
    + `&client_id=${configuration.client_id}`
    + `&code_challenge=${code_challenge}`
    + `&state=${state}`
    + `&redirect_uri=${configuration.redirect_uri}`;

  const sendCodeChallenge = async () => {
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
      setSent(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (sent) {
      window.location.href = link;
    }
  }, [sent, link]);

  return (
    <Center>
      <Stack>
        <Button
          size="md"
          fontSize="lg"
          variant="ghost"
          color="current"
          margin="2"
          onClick={() => {
            sendCodeChallenge();
          }}
        >
          Login
        </Button>
      </Stack>
    </Center>
  )
}