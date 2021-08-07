import React from 'react';
import Link from "next/link"
import { FiInstagram, FiYoutube } from "react-icons/fi"

import { Container } from '../styles/components/footer';

const Footer: React.FC = () => {
  return (
    <Container>
      <div className="social_networks_container">
        <a href="#" className="social_network">
          <FiInstagram />
        </a>
        <a href="#" className="social_network">
          <FiYoutube />
        </a>
      </div>
      <div className="policies_container">
        <div className="policie">
          <Link href="#">
            <a>Políticas de Privacidade</a>
          </Link>
        </div>
        <div className="policie">
          <Link href="#">
            <a>Termos de Uso</a>
          </Link>
        </div>
      </div>
      <p id="copyright">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
    </Container>
  );
}

export default Footer;