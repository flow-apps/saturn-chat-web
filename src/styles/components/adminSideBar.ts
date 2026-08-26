import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 25%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 20px;
`;

export const HeaderContainer = styled.div`
    margin-top: 20px;
`;

export const UserContainer = styled.div`
  display: flex;
`;

export const UserAvatarContainer = styled.div`
  img {
    border-radius: 50%;
  }
`;

export const UserDataContainer = styled.div`
  margin-left: 10px;
`;

export const NavigatorContainer = styled.nav`
  margin-top: 30px;
`;

export const NavigatorOption = styled(Link)`
  display: flex;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;

  span {
    margin-right: 10px;
  }

  transition: 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.02)
  }
`;
