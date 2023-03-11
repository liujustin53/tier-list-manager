import { Box } from "@chakra-ui/react"
import React, { useState } from "react"
import { AuthorizeButton } from "./AuthorizeButton";
import { LoginInOutButton } from "./LogInOutButton";

export const AuthPage = () => {
  const [isLoggedin, setIsLoggedin] = React.useState(false);

  React.useEffect(() => {
    // check for session id cookie
    const session_cookie = document.cookie.split('; ').find(row => row.startsWith('session_id=')) || '';
    if (!session_cookie) {
      return;
    }
    const session_id = session_cookie.split('=')[1];
    if (session_id) {
      setIsLoggedin(true);
    }
    // if logged in, redirect to dashboard
    if (isLoggedin) {
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <Box m={5}>
      <LoginInOutButton />
    </Box>
  )
}