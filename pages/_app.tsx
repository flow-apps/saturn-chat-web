import Head from "next/head";
import type { AppProps } from "next/app";
import { GlobalStyle } from "../src/styles/global";
import { ThemeProvider } from "styled-components";
import light from "../src/styles/themes/light";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Saturn Chat" />
        <meta
          name="keywords"
          content="saturn chat, chat online, mobile chat, voice chat, chat for gamers, chat para jogar, chat para gamers, aplicativo grátis de conversa online, batepapo online"
        />
        <meta
          name="og:keywords"
          content="saturn chat, chat online, mobile chat, voice chat, chat for gamers, chat para jogar, chat para gamers, aplicativo grátis de conversa online, batepapo online"
        />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        />

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
