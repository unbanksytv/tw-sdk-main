import "../styles/globals.css";
import Header from "../components/Header";
import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Rinkeby;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Head>
        <title>thirdweb Marketplace with Next.JS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content=""
        />
        <meta
          name="keywords"
          content=""
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ThirdwebProvider>
  )
}

export default MyApp
