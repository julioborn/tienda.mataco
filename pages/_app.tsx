import React from 'react'
import { ChakraProvider, Container, VStack, Image, Box, Divider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import theme from 'tienda.mataco/theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <ChakraProvider theme={theme}>
        <Box padding={4}>
          {/* @ts-ignore */}
          <Container backgroundColor="white" boxShadow="md" maxWidth="container.xl" padding={4} borderRadius="sm" >
            <VStack>
              <Image width={200} src="https://res.cloudinary.com/dwz4lcvya/image/upload/v1684194736/logo-mataco-PhotoRoom_nusy39.jpg"></Image>
            </VStack>
            <Divider marginY={3} />
            <Component {...pageProps} />
          </Container>
        </Box>
      </ChakraProvider>
  )
}

export default App