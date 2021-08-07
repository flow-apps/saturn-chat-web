import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WelcomeContainer = styled.header`
  display: flex;
  flex-direction: column;
  height: 98vh;
  background: linear-gradient(
    45deg,
    rgba(0, 136, 255, 1) 33%,
    rgba(0, 94, 176, 1) 100%
  );
`;

export const WelcomeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;

  & > h1 {
    font-size: 5rem;
    color: #fff;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.8rem;
    width: 70%;
    color: #fff;
    text-align: center;
    margin-bottom: 3.5rem;
  }

  .download_buttons_container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .download_button {
      :not(:last-child) {
        margin-right: 2.5rem;
      }
      display: flex;

      width: 280px;
      font-size: 1.6rem;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      border-radius: 35px;
      color: #fff;
      transition: 200ms;

      box-shadow: 1px 1px 5px 1px #00000055;

      &:hover {
        box-shadow: none;
        transition: 250ms;
      }

      .icon {
        font-size: 2.5rem;
        margin-right: 10px;
      }

      &.android {
        background-color: #3ddc84;
        &:hover {
          background-color: #3dda73;
        }
      }

      &.ios {
        background-color: #000;
        &:hover {
          background-color: #333;
        }
      }
    }
  }
`;

export const PresentationsContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;

  .presentation_container {
    display: flex;
    height: 100vh;
    flex: 1;
    padding: 10rem 5rem;

    &.left_image {
      flex-direction: row;
    }

    &.right_image {
      flex-direction: row-reverse;
    }

    & .image_container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60%;
      margin-right: 2rem;
      img {
        width: 100%;
      }
    }

    & .content_container {
      width: 40%;
    }

    h2 {
      font-size: 4.5rem;
      margin-bottom: 1.5rem;
      color: ${props => props.theme.colors.dark_heading};
    }

    p {
      font-size: 2rem;
      line-height: 3.5rem;
      color: ${(props) => props.theme.colors.light_heading};
    }
  }
`;

export const GetAppContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  padding: 10rem 5rem;

  background-color: ${props => props.theme.colors.shape};

  h3 {
    font-size: 2.5rem; 
    margin-bottom: 1.5rem;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 280px;
    font-size: 1.6rem;
    padding: 1.5rem;
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    text-align: center;
    border-radius: 35px;
    box-shadow: 1px 1px 5px 1px #00000055;

    .icon {
      margin-right: 5px;
    }

    &:hover {
      background-color: ${props => props.theme.colors.light_primary};
      transition: 200ms;
      box-shadow: none;
    }
  }
`