import Link from "next/link";
import Image from "next/image";
import Header from "../src/components/Header";
import {
  Container,
  GetAppContainer,
  PresentationsContainer,
  WelcomeContainer,
  WelcomeContentContainer,
} from "../src/styles/pages/home";
import { FaApple, FaAndroid } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <Container>
      <WelcomeContainer>
        <Header />
        <WelcomeContentContainer>
          <h1>Converse com o mundo.</h1>
          <p>
            No Saturn Chat você consegue se unir ao seu grupo escolar, com seus
            amigos ou até mesmo com sua familia. Onde todos passam o tempo
            juntos e se divertem. Sempre aproveitando todos os recursos que
            tornam a conversa mais rápida, dinâmica e sempre mantendo sua
            privacidade.
          </p>
          <div className="download_buttons_container">
            <Link href="/">
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
        </WelcomeContentContainer>
      </WelcomeContainer>
      <PresentationsContainer>
        <div className="presentation_container left_image">
          <div className="image_container">
            <Image 
              src={require("../public/assets/community.png")}
              alt="Imagem de uma comunidade unida"
              quality={80}
            />
          </div>
          <div className="content_container">
            <h2>Crie sua comunidade e começe a interagir!</h2>
            <p>
              Os grupos do Saturn Chat são preparados para receber quantas
              pessoas você precisar. Com poucos toques você já cria seu grupo e
              já pode convidar toda sua comunidade queira, através de convites
              personalizáveis.
            </p>
          </div>
        </div>
        <div className="presentation_container right_image">
          <div className="image_container">
            <Image 
              src={require("../public/assets/privacy.png")}
              alt="Imagem mostrando a privacidade na internet"
              quality={80}
            />
          </div>
          <div className="content_container">
            <h2>Seja encontrado, ou fique no seu cantinho privado.</h2>
            <p>
              Você pode escolher entre criar grupos públicos, onde você pode ser
              encontrado nas buscas no Saturn Chat e qualquer pessoa pode
              entrar. Você também pode criar grupos privados, que não podem ser
              encontrados e onde só podem entrar pessoas que tiverem seu
              convite.
            </p>
          </div>
        </div>
        <div className="presentation_container left_image">
          <div className="image_container">
            <Image 
              src={require("../public/assets/boost-speed.png")}
              alt="Imagem mostrando a velocidade do Saturn Chat"
              quality={80}
            />
          </div>
          <div className="content_container">
            <h2>Rápido, fácil e seguro.</h2>
            <p>
              Com o Saturn Chat, você tem a garantia que vai ter um aplicativo
              rápido na maioria dos dispositivos, com baixa latência e sem
              riscos de segurança no envio de mensagens e mais leve que todos os
              outros apps (menos de 40MB).
            </p>
          </div>
        </div>
      </PresentationsContainer>
      <GetAppContainer>
        <h3>Que tal começar agora?</h3>
        <Link href="#">
          <a>
            <FiDownload fontSize={18} className="icon" /> Baixe agora
          </a>
        </Link>
      </GetAppContainer>
      <Footer />
    </Container>
  );
}
