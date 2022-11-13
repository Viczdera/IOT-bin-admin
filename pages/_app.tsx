import React from "react";
import "../styles/globals.css";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import appTheme from "../theme/appTheme";
import Head from "next/head";
import { DataValueProvider } from "../context/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import NextNProgress from "nextjs-progressbar";
import "antd/dist/antd.css";
import "../styles/main.scss";
import "../styles/nav.scss";
import { motion } from "framer-motion";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataValueProvider>
        <ChakraProvider theme={appTheme}>
          <Head>
            <title>Shop Admin Demo</title>
            <meta name="description" content="Shop admin demo application" />
            <link rel="icon" href="/Primeries-icon-bg-black.svg" />
          </Head>

          <NextNProgress height={2} color="#000" />
          <motion.div
            key={router.route}
            initial="initial"
            animate="animate"
            style={{ width: "100%" }}
            variants={{
              initial: {
                opacity: 0.5,
              },
              animate: {
                opacity: 1,
              },
            }}
          >
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen />
          </motion.div>
        </ChakraProvider>
      </DataValueProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
