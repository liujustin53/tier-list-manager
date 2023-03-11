import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  Button,
} from "@chakra-ui/react"

export const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")

  return (
    <Button
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      margin="2"
      onClick={toggleColorMode}
    >
      Switch to {text} mode
    </Button>
  )
}