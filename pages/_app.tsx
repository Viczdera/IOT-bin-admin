import React from "react";
import "../styles/globals.css";
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
    <QueryClientProvider client={queryClient}  >
      <DataValueProvider>
        <ChakraProvider theme={appTheme}>
          <Head>
            <title>IOT Bin Admin</title>
            <meta name="description" content="IOT Bin Admin application" />
            <link rel="icon" href="/shopLogo2.gif" />
          </Head>

          <NextNProgress height={2} color="var(--blue200)" />
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
