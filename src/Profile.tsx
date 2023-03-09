import { Box, Button, Stack, Heading, Input, Link, Textarea } from "@chakra-ui/react"
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
  const [authCode, setAuthCode] = useState("");

  const link = 'https://myanimelist.net/v1/oauth2/authorize?'
    + 'response_type=code'
    + `&client_id=${configuration.client_id}`
    + `&code_challenge=${codeChallenge}`
    + '&state=RequestID42';

  const authorizeUser = () => {
    fetch('localhost:8000/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: authCode,
        code_verifier: codeChallenge
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
    });
  }

  return (
    <Box>
      <Heading>Auth</Heading>
      <Stack direction='column'>
        <Box>
          <Textarea resize='vertical' width='500px' placeholder="Code Challenge"
            value={codeChallenge}
            onChange={(e) => setCodeChallenge(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            onClick={() => {
              setCodeChallenge(getCodeChallenge());
            }}>
            Generate Code Challenge
          </Button>
        </Box>
        <Link href={link}>
          <Button>
            Authorize
          </Button>
        </Link>
        <Box>
          <Textarea resize='vertical' width='500px' placeholder="Auth Code"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
        </Box>
        <Box>
          <Button>
            Send Auth Code
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}