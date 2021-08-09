import React, { useState } from "react";
import icon from "../../public/assets/icon.png";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiArrowLeft } from "react-icons/fi"
import {
  Container,
  IconContainer,
  NavContainer,
  NavHeader,
  NavOption,
  NavOptions,
  OpenMenu,
} from "../styles/components/header";

const Header: React.FC = () => {
  const [hiddenNav, setHiddenNav] = useState(true);

  const toggleMenu = () => {
    setHiddenNav(old => !old)
  }

  return (
    <Container>
      <Link href="/" passHref>
        <IconContainer>
          <Image
            src={icon}
            alt="Ícone do Saturn Chat"
            width={90}
            height={90}
            quality={60}
          />
          <span>
            Saturn Chat <sup>Beta</sup>
          </span>
        </IconContainer>
      </Link>
      <OpenMenu onClick={toggleMenu}>
        <FiMenu />
      </OpenMenu>
      <NavContainer hidden={hiddenNav}>
        <NavHeader hidden={hiddenNav} onClick={toggleMenu}>
          <h2><FiArrowLeft id="icon" /> Saturn Chat</h2>
          <div className="hr" />
        </NavHeader>
        <NavOptions hidden={hiddenNav}>
          <NavOption>
            <Link href="#">
              <a>Baixar</a>
            </Link>
          </NavOption>
          <NavOption>
            <Link href="#">
              <a>Seja uma Star</a>
            </Link>
          </NavOption>
        </NavOptions>
      </NavContainer>
    </Container>
  );
};

export default Header;
