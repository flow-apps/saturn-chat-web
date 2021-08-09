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
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Saturn Chat" />
        <meta
          name="description"
          content="Saturn Chat é o melhor lugar para conversar com seus amigos, sua família e sua comunidade."
        />
        <meta
          name="og:description"
          content="Saturn Chat é o melhor lugar para conversar com seus amigos, sua família e sua comunidade."
        />
        <meta
          name="keywords"
          content="saturn chat, chat online, mobile chat, voice chat, chat for gamers, chat para jogar, chat para gamers, aplicativo grátis de conversa online"
        />
        <meta
          name="og:keywords"
          content="saturn chat, chat online, mobile chat, voice chat, chat for gamers, chat para jogar, chat para gamers, aplicativo grátis de conversa online"
        />
        <meta
          property="og:title"
          content="Saturn Chat | O lugar certo conectar você ao mundo"
        />
        <title>Saturn Chat | O lugar certo conectar você ao mundo</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
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
