import { Box, Button, Heading, Input, Link } from "@chakra-ui/react"
import pkceChallenge from "pkce-challenge";
import React, { useState } from "react"
import { getCodeChallenge } from "./helpers";

const configuration = {
  client_id: "9edb52c76f29f5f66fd4917927e44473",
  redirect_uri: "http://localhost:3000"
}

export const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState("");
  const [codeChallenge, setCodeChallenge] = useState("");

  const link = 'https://myanimelist.net/v1/oauth2/authorize?'
    + 'response_type=code'
    + `&client_id=${configuration.client_id}`
    + `&code_challenge=${codeChallenge}`
    + '&state=RequestID42';

  const makeRequest = async () => {
    try {
      setLoading(true);
      setError("");
      const reqOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      };

      const response = await fetch('https://myanimelist.net/v1/oauth2/authorize?'
        + 'response_type=code'
        + '&client_id=${configuration.client_id}'
        + '&code_challenge=${}'
        + '&state=${}',
        reqOptions);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      setError(message);
    }
  }

  return (
    <Box>
      <Heading>Auth</Heading>
      <Input
        value={codeChallenge}
        onChange={(e) => setCodeChallenge(e.target.value)}
      />
      <Button
        onClick={() => {
          setCodeChallenge(getCodeChallenge());
        }}>
        Generate Code Challenge
      </Button>
      <Link href={link}>
        <Button>
          Authorize
        </Button>
      </Link>
    </Box>
  )
}