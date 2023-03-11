import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, ChakraProvider, Flex, Spacer } from '@chakra-ui/react'
import { AuthPage } from './AuthPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from './Dashboard';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
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
  }, []);

  return (
    <ChakraProvider>
      <Box m={5}>
        <Flex alignItems={'center'}>
          <Breadcrumb p={5}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                Authorize Page
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Spacer />
          <ColorModeSwitcher />
          {/* <LogInOutButton /> */}
        </Flex>
        <Center p={5}>
          <Router>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default App;