import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AuthorizeButton } from "./AuthorizeButton";
import { getSessionID, isLoggedIn } from "./helpers";

export const LoginInOutButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const logout = async () => {
    try {
      const session_id = getSessionID();
      const reqOptions = {
        method: 'POST',
        Credentials: 'include',
      };
      const response = await fetch(`http://localhost:8000/oauth/logout?session_id=${session_id}`, reqOptions);
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      // remove the session id cookie
      document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setIsAuthenticated(isLoggedIn());
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      console.log(message);
    }
  }

  return (
    <>
      {isAuthenticated
        ? (<Button onClick={logout}>Logout</Button>)
        : (<AuthorizeButton />)}
    </>
  )
}