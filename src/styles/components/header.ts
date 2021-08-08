import styled, { keyframes } from 'styled-components';

interface NavProps {
  hidden: boolean;
}

const SlideHeader = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%)
  }

  100% {
    opacity: 1;
    transform: translateX(0%)
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 1.5rem;
`;

export const IconContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  margin-left: -.5rem;
  img {
    width: 9rem;
    height: 9rem;
    object-fit: cover;
  }

  h1 {
    font-family: Poppins, sans-serif;
    font-size: 2.5rem;
    color: #fff;
    sup {
      font-family: Poppins;
      font-size: 1rem;
      font-weight: 200;
    }
  }
`

export const NavContainer = styled.nav<NavProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;

  @media (max-width: 450px) {
    display: ${props => props.hidden ? "none" : "flex"};
    position: fixed;
    height: 100%;
    width: 80%;
    background-color: #fefefe;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    top: 0;
    right: 0;

    box-shadow: -3px 1px 10px 1px #00000055;

    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 1.2rem;

    animation: ${SlideHeader} 350ms ease-out;
  }
`

export const NavHeader = styled.header<NavProps>`
  display: ${props => props.hidden ? "none" : "block"};
  margin-top: 1.5rem;
  
  h2 {
    display: flex;
    align-items: center;
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 2rem;

    #icon {
      font-size: 3rem;
      margin-right: .5rem;
    }
  }

  .hr {
    border-bottom: 2px solid ${props => props.theme.colors.shape};
    border-radius: 12px;
  }
  width: 100%;
  padding: 1.2rem;
  margin-bottom: 2rem;

  @media (min-width: 450px) {
    display: none;
  }
`

export const OpenMenu = styled.button`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  background: transparent;
  border: none;
  font-size: 3.5rem;
  color: #fff;

  @media (min-width: 450px) {
    display: none;
  }
`

export const NavOptions = styled.div<NavProps>`
  display: ${props => props.hidden ? "none" : "flex"};
  padding: 1.2rem;

  @media (min-width: 450px) {
    display: flex;
  }
  
  @media (max-width: 450px) {
    flex-direction: column;
    width: 100%;
  }
`

export const NavOption = styled.div`
  &:not(:last-child) {
    margin-right: 2.5rem;
  }

  a {
    font-size: 1.6rem;
    font-weight: 600;
    color: #fff;
    text-align: center;
    line-height: 1.8rem;

  }

  @media (max-width: 450px) {
    margin-bottom: 2rem;
    width: 100%;
    padding: 1rem;
    
    border-radius: 5px;

    a {
      color: #000;
      font-weight: 400;
      font-size: 2rem;
    }
  }
  `
