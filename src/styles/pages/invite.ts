import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #171717;
`;

export const InviteCard = styled.main`
  width: 50%;
  min-width: 300px;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1.2rem;
  border-radius: 8px;
  background-color: #292929;

  .presentation_title {
    font-size: 1.4rem;
    color: #cccccc;
    margin-top: 1rem;
  }
`;

export const GroupAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22rem;
  height: 22rem;

  .group_avatar {
    width: 100%;
    border-radius: 50%;
  }
`;

export const GroupInfosContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: 2.2rem;
    color: #fff;
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
      background-color: ${props => props.theme.colors.light_primary};
    }
  }
`;
