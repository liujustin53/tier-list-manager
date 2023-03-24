import { Box, Center, Text } from "@chakra-ui/react"
import React from "react"
import { isLoggedIn } from "./helpers";

export const AuthPage = () => {

  React.useEffect(() => {
    // if logged in, redirect to dashboard
    if (isLoggedIn()) {
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <Center m={5}>
      <Text>Log in to access your tier lists</Text>
    </Center>
  )
}