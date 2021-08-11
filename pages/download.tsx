import Head from "next/head";
import React, { useState, useEffect } from "react";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import Image from "next/image"

import { FiDownload } from "react-icons/fi"
import { Container, DownloadsContainer, PresentationContainer } from "../src/styles/pages/download";

const Download: React.FC = () => {
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    setPlatform(navigator.platform.toLowerCase());
  }, []);

  const getDownloadButton = () => {
    const appleIncludes =
      platform.includes("iphone") || platform.includes("ipad");

    const androidIncludes =
      platform.includes("android") || platform.includes("linux") || platform.includes("null")

    if (androidIncludes) {
      return (
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          id="download_button"
        >
          <FiDownload id="icon" /> Baixar na Play Store
        </a>
      );
    }

    if (appleIncludes) {
      return (
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          id="download_button"
        >
          Baixar na App Store
        </a>
      );
    }

    return <></>;
  };

  return (
    <>
      <Head>
        <title>Baixe o Saturn Chat e comece sua jornada</title>
        <meta
          name="description"
          content="Baixe agora o melhor aplicativo de conversas da internet. Comunique-se por texto e voz agora mesmo! Disponível para Android e em breve IOS."
        />
        <meta
          name="og:title"
          content="Baixe o Saturn Chat e comece sua jornada"
        />
        <meta
          name="og:description"
          content="Baixe agora o melhor aplicativo de conversas da internet. Comunique-se por texto e voz agora mesmo! Disponível para Android e em breve IOS."
        />
      </Head>
      <Container>
        <PresentationContainer>
          <Header colorScheme="white" />
          <div className="content">
            <h1>Escolha seu dispositivo e comece agora a diversão.</h1>
            <p>
              Uma grande jornada te aguarda. Para isso, basta baixar o Saturn
              Chat em seu dispositivo.
            </p>
            <div className="download_button_container">
              {getDownloadButton()}
            </div>
          </div>
        </PresentationContainer>
        <DownloadsContainer>
          <div className="downloads">
            <div className="download_card">
              <div className="title_container">
                <h2>Android</h2>
              </div>
              <div className="image_container">
                <Image 
                  src={require("../public/assets/app-android.png")}
                  alt="Baixar Saturn Chat android"
                  quality={80}
                />
              </div>
              <div className="get_container">
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  Eu quero esse
                </a>
              </div>
            </div>
            <div className="download_card">
              <div className="title_container">
                <h2>IOS</h2>
              </div>
              <div className="image_container">
                <Image 
                  src={require("../public/assets/app-ios.png")}
                  alt="Baixar Saturn Chat IOS"
                  quality={80}
                />
              </div>
              <div className="get_container">
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  Eu quero esse
                </a>
              </div>
            </div>
          </div>
        </DownloadsContainer>
        <Footer />
      </Container>
    </>
  );
};

export default Download;
