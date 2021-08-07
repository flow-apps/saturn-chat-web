import React from "react";
import Image from "next/image"
import Link from "next/link"
import { FiDownload } from "react-icons/fi"
import { Container, IconContainer, NavContainer, NavOption, NavOptions } from "../styles/components/header";
import icon from "../../public/assets/icon.png"

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/" passHref>
        <IconContainer>
          <Image 
            src={icon}
            alt="Ícone do Saturn Chat"
            width={90}
            height={90}
          />
          <h1>Saturn Chat <sup>Beta</sup></h1>
        </IconContainer>
      </Link>
      <NavContainer>
        <NavOptions>
          <NavOption>
            <Link href="#">
              <a>Baixar</a>
            </Link>
          </NavOption>
          <NavOption>
            <Link href="#">
              <a>Star</a>
            </Link>
          </NavOption>
          <NavOption>
            <Link href="#">
              <a>Políticas de Privacidade</a>
            </Link>
          </NavOption>
        </NavOptions>
      </NavContainer>
    </Container>
  );
};

export default Header;
