import { Box } from "@chakra-ui/react"
import React, { useState } from "react"
import { AuthorizeButton } from "./AuthorizeButton";

export const AuthPage = () => {
  return (
    <Box m={5}>
      <AuthorizeButton/>
    </Box>
  )
}