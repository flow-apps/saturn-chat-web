import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  background-color: #171717;

  #app_warning {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1rem;
    text-align: center;
  }
`;

export const InviteCard = styled.main`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #292929;
  margin-bottom: 1.5rem;

  .presentation_title {
    font-size: 1.4rem;
    color: #cccccc;
    margin-top: 1rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 1rem;

    .presentation_title {
      font-size: 1.2rem;
    }
  }
`;

export const GroupAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 22rem;
  aspect-ratio: 1 / 1;

  .group_avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  @media (max-width: 480px) {
    max-width: 14rem;
  }
`;

export const GroupInfosContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  #invalid_inv_message {
    font-size: 1.3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.dark_gray};
    margin-top: 0.8rem;
  }

  h1 {
    font-size: 2.2rem;
    color: #fff;
    text-align: center;
    word-break: break-word;
  }

  a {
    width: 100%;
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
    text-align: center;
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    font-size: 1.4rem;
    transition: 200ms;

    &:hover {
      background-color: ${(props) => props.theme.colors.light_primary};
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.7rem;
    }

    #invalid_inv_message {
      font-size: 1.1rem;
    }

    a {
      font-size: 1.2rem;
      padding: 0.8rem;
    }
  }
`;