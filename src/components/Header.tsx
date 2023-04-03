import React, { useState } from "react";
import icon from "../../public/assets/icon.png";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiArrowLeft, FiMoon, FiSun } from "react-icons/fi";
import { ImSwitch } from "react-icons/im";
import {
  Container,
  IconContainer,
  NavContainer,
  NavHeader,
  NavOption,
  NavOptions,
  OpenMenu,
} from "@styles/components/header";
import { useTheme } from "styled-components";
import { useChooseTheme } from "src/hooks/useTheme";

interface HeaderProps {
  colorScheme?: "black" | "white";
}

const Header = ({ colorScheme }: HeaderProps) => {
  const [hiddenNav, setHiddenNav] = useState(true);

  const theme = useTheme();
  const { changeTheme } = useChooseTheme();

  const NavBarOptions = [
    {
      path: "/download",
      text: "Baixar agora",
    },
    {
      path: "/star",
      text: "Seja Star",
    },
  ];

  const toggleMenu = () => {
    setHiddenNav((old) => !old);
  };

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
      <OpenMenu
        colorScheme={colorScheme}
        aria-label="Abrir menu lateral"
        onClick={toggleMenu}
      >
        <FiMenu />
      </OpenMenu>
      <NavContainer hidden={hiddenNav}>
        <NavHeader hidden={hiddenNav} onClick={toggleMenu}>
          <h2>
            <FiArrowLeft id="icon" /> Saturn Chat
          </h2>
          <div className="hr" />
        </NavHeader>

        <NavOptions hidden={hiddenNav}>
          <NavOption colorScheme={colorScheme}>
            <a onClick={changeTheme}>
              {
                theme.title === "light" ?
                <FiMoon
                  style={{
                    cursor: "pointer",
                    fontSize: 22,
                    color: theme.colors.primary,
                  }}
                /> :
                <FiSun
                  style={{
                    cursor: "pointer",
                    fontSize: 22,
                    color: theme.colors.secondary,
                  }}
                />
              }
            </a>
          </NavOption>

          {NavBarOptions.map(({ path, text }, key) => {
            return (
              <NavOption key={key} colorScheme={colorScheme}>
                <Link href={path}>
                  <a>{text}</a>
                </Link>
              </NavOption>
            );
          })}
        </NavOptions>
      </NavContainer>
    </Container>
  );
};

export default Header;
