/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '@styles/global';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { ThemeChooseContext } from 'src/hooks/useTheme';
import LightTheme from '@styles/themes/light';
import BlackTheme from '@styles/themes/dark';
import { ThemeType } from 'src/@types/styled.theme';

function MyApp({ Component, pageProps }: AppProps) {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>(LightTheme);

    const changeTheme = () => {
        const expression = currentTheme.title === 'light' ? BlackTheme : LightTheme;
        return setCurrentTheme(expression);
    };

    return (
        <ThemeChooseContext.Provider value={{ changeTheme, currentTheme, setCurrentTheme }}>
            <ThemeProvider theme={currentTheme}>
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
                    <meta name="google-site-verification" content="QknoFbNAM4A4QAmJVKJvaMROn2gasuAII8y7Q_8XRls" />
                    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" />

                </Head>
                <Component {...pageProps} />
            </ThemeProvider>
        </ThemeChooseContext.Provider>
    );
}

export default MyApp;
