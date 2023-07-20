import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import "../styles/ham.css";

import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ch1llMark3t</title>
        <meta name="description" content="This Market is chill." />
      </Head>
      <div className="smContainer">
        <p>
          Sorry you can&apos;t view app on this device, please switch to a
          larger device.
        </p>
      </div>
      <div className="mainContainer">
        <ThirdwebProvider activeChain={activeChain}>
          <Navbar />
          <Component {...pageProps} />
        </ThirdwebProvider>{" "}
      </div>
    </>
  );
}

export default MyApp;
