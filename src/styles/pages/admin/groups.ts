import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const InputContainer = styled.form`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
`;

export const GroupInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 1rem 1.2rem;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.shape};
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    opacity: 0.6;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  outline: none;
  border: none;
  color: #fff;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
  transition: background-color 200ms;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.light_primary || theme.colors.primary};
  }

  @media (max-width: 480px) {
    padding: 1rem 1.5rem;
  }
`;

export const GroupsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0;
  gap: 1.5rem;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const GroupContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.shape};
  width: calc(33.333% - 1rem);
  min-width: 240px;
  max-width: 100%;
  padding: 1.2rem;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.black};
  transition: transform 200ms, background-color 200ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-4px);
  }

  @media (max-width: 1024px) {
    width: calc(50% - 0.75rem);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const GroupCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  transition: color 200ms;

  &:hover {
    color: #fff;
  }

  h2 {
    font-size: 1.2rem;
    margin-top: 0.8rem;
    word-break: break-word;
  }
`;

export const GroupIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GroupIcon = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

export const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.4rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;