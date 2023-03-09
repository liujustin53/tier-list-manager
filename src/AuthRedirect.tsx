import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

export const AuthRedirect = () => {
  const [message, setMessage] = useState("");
  const [path, setPath] = useState("");
  const navigate = useNavigate();

  // receives authorization code and state from MAL in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');

  // sends authorization code and state to the backend
  const sendAuthCode = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code,
          state: state
        })
      });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      setMessage("Successfully authenticated!");
      setPath("/profile");
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      setMessage(message);
      setPath("/");
    }
  }, [code, state]);

  // wait some time before redirecting to the home page
  useEffect(() => {
    sendAuthCode();
    if (path !== "") {
      console.log(path)
      setTimeout(() => {
        navigate(path);
      }, 2000);
    }
  }, [navigate, path, sendAuthCode]);

  return (
    <Center>
      <Stack>
        <Text>{message}</Text>
        {message !== "" && (
          <Text>Redirecting...</Text>
        )}
      </Stack>
    </Center>
  )
}