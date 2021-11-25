import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import { SWRConfig } from "swr";
import Layout from "../components/Layout";
import fetchJson from "../utils/fetchJson";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{ fetcher: fetchJson, onError: (err) => console.error(err) }}
    >
      <ChakraProvider resetCSS>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SWRConfig>
  );
};

export default App;
