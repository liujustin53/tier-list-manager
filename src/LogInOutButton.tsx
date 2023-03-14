import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AuthorizeButton } from "./AuthorizeButton";
import { isLoggedIn } from "./helpers";

export const LoginInOutButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);

  const logout = async () => {
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