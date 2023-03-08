import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, ChakraProvider } from '@chakra-ui/react'
import { Profile } from './Profile';

const configuration = {
  client_id: "9edb52c76f29f5f66fd4917927e44473",
  redirect_uri: "http://localhost:3000"
}

function App() {
  return (
    <ChakraProvider>
      <Box className="App">
        <Profile></Profile>
      </Box>
    </ChakraProvider>
  );
}

export default App;