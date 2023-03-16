import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { login, logout } from "./auth-helpers";
import { isLoggedIn } from "./helpers";

export const LoginInOutButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn());
  }, []);


  return (
    <Button
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      margin="2"
      onClick={isAuthenticated ? logout : login}
    >
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </Button >
  )
}