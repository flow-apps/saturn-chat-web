import React from "react";
import Link from "next/link";
import { FiInstagram, FiYoutube } from "react-icons/fi";

import { Container } from "../styles/components/footer";

const Footer: React.FC = () => {
  return (
    <Container>
      <div className="social_networks_container">
        <a
          href="https://www.instagram.com/saturn_chat/"
          rel="external nofollow noreferrer"
          target="_blank"
          className="social_network"
          aria-label="Acessar Instagram do Saturn Chat"
        >
          <FiInstagram />
        </a>
        <a
          href="https://www.youtube.com/gamesantos"
          rel="external nofollow noreferrer"
          target="_blank"
          className="social_network"
          aria-label="Acessar YouTube do criador do Saturn Chat"
        >
          <FiYoutube />
        </a>
      </div>
      <div className="policies_container">
        <div className="policie">
          <Link href="/privacy">
            <a>Políticas de Privacidade</a>
          </Link>
        </div>
        <div className="policie">
          <Link href="#">
            <a>Termos de Uso</a>
          </Link>
        </div>
      </div>
      <p id="copyright">
        &copy; {new Date().getFullYear()} Todos os direitos reservados
      </p>
    </Container>
  );
};

export default Footer;
