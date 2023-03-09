import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Center, ChakraProvider } from '@chakra-ui/react'
import { AuthPage } from './AuthPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthRedirect } from './AuthRedirect';

const configuration = {
  client_id: "9edb52c76f29f5f66fd4917927e44473",
  redirect_uri: "http://localhost:3000"
}

function App() {
  return (
    <ChakraProvider>
      <Center p={5}>
        <Router>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/oauth" element={<AuthRedirect />} />
            <Route path="/profile" element={<Box>Profile</Box>} />
          </Routes>
        </Router>
      </Center>
    </ChakraProvider>
  );
}

export default App;