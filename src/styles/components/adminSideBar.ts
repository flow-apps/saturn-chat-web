import Link from "next/link";
import styled from "styled-components";

interface MobileProps {
  $isOpen?: boolean;
}

export const MobileToggle = styled.button`
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1001;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Overlay = styled.div<MobileProps>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

export const Container = styled.aside<MobileProps>`
  height: 100vh;
  width: 20%;
  min-width: 280px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 20px;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 280px;
    height: 100vh;
    transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease-in-out;
  }
`;

export const HeaderContainer = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const UserAvatarContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const UserDataContainer = styled.div`
  margin-left: 10px;
  overflow: hidden;

  h2 {
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

export const NavigatorContainer = styled.nav`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;

export const NavigatorOption = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;

  span {
    margin-right: 12px;
    display: flex;
    align-items: center;
  }

  transition: 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    background-color: rgba(255, 255, 255, 0.05);
    transform: scale(1.02);
  }
`;