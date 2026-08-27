import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 50%;
`;

export const UserInput = styled.input`
  flex: 1;
  padding: 1rem;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.shape};
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  background-color: ${({ theme }) => theme.colors.primary};
  outline: none;
  border: none;
  color: #fff;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export const UsersListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
`;

export const UserContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.shape};
  margin-right: 2rem;
  width: 20rem;
  padding: 1.2rem;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.black};

  transition: 200ms;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.1)
  }
`;

export const UserCard = styled(Link)`
  color: ${({ theme }) => theme.colors.black};
  transition: 200ms;

  &:hover {
    color: #fff;
  }
`;

export const UserAvatarContainer = styled.div``;

export const UserAvatar = styled(Image)`
  border-radius: 50%;
`;
