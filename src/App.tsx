import React from 'react';
import './App.css';
import { Box, Center, ChakraProvider, Flex, Spacer } from '@chakra-ui/react'
import { AuthPage } from './AuthPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from './Dashboard';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { LoginInOutButton } from './LogInOutButton';

function App() {
  return (
    <ChakraProvider>
      <Box m={5}>
        <Flex alignItems={'center'}>
          <Spacer />
          <ColorModeSwitcher />
          <LoginInOutButton />
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