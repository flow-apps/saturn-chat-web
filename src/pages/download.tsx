import Head from "next/head";
import React, { useState, useEffect } from "react";
import Header from "@component/Header";
import Footer from "@component/Footer";
import Image from "next/image";

import { FiDownload } from "react-icons/fi";
import { Container, DownloadsContainer, PresentationContainer } from "@styles/pages/download";
import { isAndroid, isIOS } from "react-device-detect";

import downloadMobileImg from "../../public/assets/download-mobile.svg";
import appAndroidImg from "../../public/assets/app-android.png";
import appIosImg from "../../public/assets/app-ios.png";

const Download: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getDownloadButton = () => {
    if (!isMounted) return null;

    if (isAndroid) {
      return (
        <a
          href="https://play.google.com/store/apps/details?id=com.flowapps.saturnchat"
          target="_blank"
          rel="noopener noreferrer"
          id="download_button"
        >
          <FiDownload id="icon" /> Baixar na Play Store
        </a>
      );
    } else if (isIOS) {
      return <span id="soon">Em breve no seu dispositivo</span>;
    }

    return (
      <span id="not_supported">
        No momento, o aplicativo não é suportado nesse aparelho. Veja as plataformas suportadas abaixo.
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Baixe o Saturn Chat e comece sua jornada</title>
        <meta
          name="description"
          content="Baixe agora o melhor aplicativo de conversas da internet. Comunique-se por texto e voz agora mesmo! Disponível para Android e em breve IOS."
        />
        <meta name="og:title" content="Baixe o Saturn Chat e comece sua jornada" />
        <meta
          name="og:description"
          content="Baixe agora o melhor aplicativo de conversas da internet. Comunique-se por texto e voz agora mesmo! Disponível para Android e em breve IOS."
        />
      </Head>
      <Container>
        <PresentationContainer>
          <Header colorScheme="white" />
          <div className="content">
            <div id="content_wrapper">
              <h1>Escolha seu dispositivo e comece agora a diversão.</h1>
              <p>
                Uma grande jornada te aguarda. Para isso, basta baixar o Saturn Chat em seu dispositivo.
              </p>
              <div className="download_button_container">{getDownloadButton()}</div>
            </div>
            <div id="image_wrapper">
              <Image
                src={downloadMobileImg}
                alt="Mulher olhando celular fazendo download"
                quality={70}
                priority
              />
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
                  src={appAndroidImg}
                  alt="Baixar Saturn Chat android"
                  quality={80}
                />
              </div>
              <div className="get_container">
                <a
                  href="https://play.google.com/store/apps/details?id=com.flowapps.saturnchat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Baixar agora
                </a>
              </div>
            </div>
            <div className="download_card">
              <div className="title_container">
                <h2>IOS</h2>
              </div>
              <div className="image_container">
                <Image
                  src={appIosImg}
                  alt="Baixar Saturn Chat IOS"
                  quality={80}
                />
              </div>
              <div className="get_container">
                <span id="soon">Em breve</span>
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