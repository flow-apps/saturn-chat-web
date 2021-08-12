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

interface HeaderProps {
  colorScheme?: "black" | "white"
}

const Header = ({ colorScheme }: HeaderProps) => {
  const [hiddenNav, setHiddenNav] = useState(true);

  const toggleMenu = () => {
    setHiddenNav(old => !old)
  }

  return (
    <Container>
      <Link href="/" passHref>
        <IconContainer colorScheme={colorScheme}>
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
      <OpenMenu colorScheme={colorScheme} aria-label="Abrir menu lateral" onClick={toggleMenu}>
        <FiMenu />
      </OpenMenu>
      <NavContainer hidden={hiddenNav}>
        <NavHeader hidden={hiddenNav} onClick={toggleMenu}>
          <h2><FiArrowLeft id="icon" /> Saturn Chat</h2>
          <div className="hr" />
        </NavHeader>
        <NavOptions hidden={hiddenNav}>
          <NavOption colorScheme={colorScheme}>
            <Link href="/download">
              <a>Baixar</a>
            </Link>
          </NavOption>
          <NavOption colorScheme={colorScheme}>
            <Link href="/star">
              <a>Seja Star</a>
            </Link>
          </NavOption>
        </NavOptions>
      </NavContainer>
    </Container>
  );
};

export default Header;
