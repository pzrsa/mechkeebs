import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
