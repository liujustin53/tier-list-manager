import { Button } from "@chakra-ui/react";
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
      const response = await fetch(`http://localhost:8000/oauth/logout?session_id=${session_id}`, {
        method: 'POST',
        credentials: 'same-origin',
      });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      // remove the session id cookie
      document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";

      setIsAuthenticated(isLoggedIn());

      // redirect to home page
      window.location.href = '/';
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      console.log(message);
    }
  }

  return (
    <>
      {isAuthenticated ? (
        <Button
          size="md"
          fontSize="lg"
          variant="ghost"
          color="current"
          margin="2"
          onClick={logout}>Logout
        </Button>)
        : (<AuthorizeButton />)}
    </>
  )
}