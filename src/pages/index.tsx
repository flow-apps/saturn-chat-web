import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Header from "@component/Header";
import Footer from "@component/Footer";
import {
  Container,
  GetAppContainer,
  PresentationsContainer,
  WelcomeContainer,
  WelcomeContentContainer,
} from "@styles/pages/home";
import { FaAndroid } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="Saturn Chat | O lugar certo conectar você ao mundo"
        />
        <title>Saturn Chat | O lugar certo conectar você ao mundo</title>
        <meta
          name="description"
          content="Saturn Chat é o melhor lugar para conversar com seus amigos, sua família e sua comunidade."
        />
        <meta
          name="og:description"
          content="Saturn Chat é o melhor lugar para conversar com seus amigos, sua família e sua comunidade."
        />
      </Head>
      <Container>
        <WelcomeContainer>
          <Header />
          <WelcomeContentContainer>
            <div className="welcome_content">
              <h1>{t("title")}</h1>
              <p>{t("subtitle")}</p>
              <div className="download_buttons_container">
                <Link href="https://play.google.com/store/apps/details?id=com.flowapps.saturnchat">
                  <div className="download_button android">
                    <FaAndroid className="icon" /> Android
                  </div>
                </Link>
                {/* <Link href="/">
                  <div className="download_button ios">
                    <FaApple className="icon" /> IOS
                  </div>
                </Link> */}
              </div>
            </div>
          </WelcomeContentContainer>
        </WelcomeContainer>
        <PresentationsContainer>
          <div className="presentation_container">
            <div className="image_container">
              <Image
                src={require("../../public/assets/community.png")}
                alt="Imagem comunidade unida"
                quality={70}
              />
            </div>
            <div className="content_container">
              <h2>{t("sections.0.title")}</h2>
              <p>{t("sections.0.subtitle")}</p>
            </div>
          </div>
          <div className="presentation_container">
            <div className="image_container">
              <Image
                src={require("../../public/assets/privacy.png")}
                alt="Imagem mostrando privacidade internet"
                quality={70}
              />
            </div>
            <div className="content_container">
              <h2>{t("sections.1.title")}</h2>
              <p>{t("sections.1.subtitle")}</p>
            </div>
          </div>
          <div className="presentation_container">
            <div className="image_container">
              <Image
                src={require("../../public/assets/simple-tools.svg")}
                alt="Imagem mostrando ferramentas Saturn Chat"
                quality={70}
              />
            </div>
            <div className="content_container">
              <h2>{t("sections.2.title")}</h2>
              <p>{t("sections.2.subtitle")}</p>
            </div>
          </div>
          <div className="presentation_container">
            <div className="image_container">
              <Image
                src={require("../../public/assets/boost-speed.png")}
                alt="Imagem mostrando a velocidade do Saturn Chat"
                quality={70}
              />
            </div>
            <div className="content_container">
              <h2>{t("sections.3.title")}</h2>
              <p>{t("sections.3.subtitle")}</p>
            </div>
          </div>
        </PresentationsContainer>
        <GetAppContainer>
          <h3>{t("call_action")}</h3>
          <Link href="/download">
            <div>
              <FiDownload fontSize={18} className="icon" /> {t("download")}
            </div>
          </Link>
        </GetAppContainer>
        <Footer />
      </Container>
    </>
  );
}
