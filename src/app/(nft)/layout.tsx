"use client";
import "@rainbow-me/rainbowkit/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/globals.scss";

import { gilroyFont } from "../../font/font";

import { ReactNode, Suspense } from "react";
import { spaceGrotesk } from "../../utils/spaceGroteskFontFamily";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import {
  getDefaultConfig,
  RainbowKitProvider,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import { SiweMessage } from "siwe";

// custom_components
import HeaderLk from "../../components/Headers/HeaderLk";
import Footer from "../../components/Footer/index";

// stores
import { setAuthenticated } from "../../stores/authenticated-store";
import { setJWT } from "../../stores/setJWT-store";
import { setInviteState } from "../../stores/setInviteState-store";
import { useRouter } from "next/navigation";
import { setData } from "../../stores/userData-store";

const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  chains: [
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [arbitrumSepolia]
      : []),
  ],
  ssr: true,
});

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
const path =
  "https://devmy.dagama.world/assets/components/dga/conector_jwt.php";

const Layout = ({ children }: { children: ReactNode }) => {
  const authStatus = setAuthenticated((state) => state.authenticated);
  const setUserData = setData((state) => state.setData);
  const setAuthStatus = setAuthenticated(
    (state) => state.setAuthenticatedStatus
  );
  const setJwtToken = setJWT((state) => state.setJwtToken);
  const setInvite = setInviteState((state) => state.setInviteState);

  const router = useRouter();

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      await new Promise((r) => setTimeout(r, 100));
      const nonce = "mockNonce"; // mock nonce
      return nonce;
    },

    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
    },

    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },

    verify: async ({ message, signature }) => {
      const verifyRes = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature, request: "authLk" }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Errror fetch data");
          }
          return res.json();
        })
        .then((data) => {
          setAuthStatus("authenticated");
          setJwtToken(data.object.jwt);
          setInvite(data.object.lk_state);
        })
        .catch((err) => console.log("Error status code: " + err.message));
      return true;
    },

    signOut: async () => {
      await fetch(`${path}?logout=true`);
      setAuthStatus("unauthenticated");
      setUserData(null);
      router.push("/");
      setJwtToken("");
    },
  });

  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        <title>DaGama</title>
        <meta content="Generated by Primarch Dev" name="description" />
        {/* Обязательный (и достаточный) тег для браузеров */}
        <link
          type="image/x-icon"
          rel="shortcut icon"
          href="/favicon_io/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_io/favicon-16x16.png"
        />
        {/* <link rel="manifest" href="/favicon_io/site.webmanifest" /> */}
      </head>
      <body className={gilroyFont.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <RainbowKitAuthenticationProvider
              adapter={authenticationAdapter}
              status={authStatus}
            >
              <RainbowKitProvider initialChain={arbitrum}>
                <div className="appWrapper">
                  <HeaderLk />
                  <div className="appContent">
                    <Suspense
                      fallback={<div className="container">Loading...</div>}
                    >
                      {children}
                    </Suspense>
                  </div>
                  <Footer />
                </div>
              </RainbowKitProvider>
            </RainbowKitAuthenticationProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
};

export default Layout;
