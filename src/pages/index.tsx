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
import { FaApple, FaAndroid } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { randInt } from "../utils/random";

export default function Home() {
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
              <h1>Converse com o mundo.</h1>
              <p>
                No Saturn Chat você consegue se unir ao seu grupo escolar, com
                seus amigos ou até mesmo com sua família, sempre aproveitando todos os
                recursos que tornam a conversa mais rápida, dinâmica e sempre
                mantendo sua privacidade. Que tal começar sua jornada agora?
              </p>
              <div className="download_buttons_container">
                <Link href="https://play.google.com/store/apps/details?id=com.flowapps.saturnchat">
                  <a className="download_button android">
                    <FaAndroid className="icon" /> Android
                  </a>
                </Link>
                <Link href="/">
                  <a className="download_button ios">
                    <FaApple className="icon" /> IOS
                  </a>
                </Link>
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
              <h2>Crie sua comunidade e começe a interagir!</h2>
              <p>
                Os grupos do Saturn Chat são preparados para receber quantas
                pessoas você precisar. Com poucos toques você já cria seu grupo
                e já pode convidar toda sua comunidade, através de convites
                personalizáveis e totalmente controláveis por você.
              </p>
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
              <h2>Seja encontrado, ou fique no seu cantinho privado.</h2>
              <p>
                Você pode escolher entre criar grupos públicos, onde você pode
                ser encontrado nas buscas no Saturn Chat (incluindo as buscas do
                Google também!) e qualquer pessoa pode entrar. Você também pode
                criar grupos privados, que não podem ser encontrados e onde só
                podem entrar pessoas que tiverem seu convite.
              </p>
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
              <h2>Simples para todos.</h2>
              <p>
                No Saturn Chat, você não se sente perdido com tantos botões.
                Temos uma interface simples, porém poderosa, para que em
                pouquíssimos toques você já tenha um grupo totalmente
                configurado e prontinho receber seus usuários com muito conforto
                e segurança.
              </p>
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
              <h2>Rápido, fácil e seguro.</h2>
              <p>
                Com o Saturn Chat, você tem a garantia que vai ter um aplicativo
                rápido na maioria dos dispositivos, com baixa latência e sem
                riscos de segurança no envio de mensagens e bem leve.
              </p>
            </div>
          </div>
        </PresentationsContainer>
        <GetAppContainer>
          <h3>Que tal começar agora?</h3>
          <Link href="/download">
            <a>
              <FiDownload fontSize={18} className="icon" /> Baixe agora
            </a>
          </Link>
        </GetAppContainer>
        <Footer />
      </Container>
    </>
  );
}
