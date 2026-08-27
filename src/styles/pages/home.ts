import styled from "styled-components";

interface AnimationProps {
  size: number;
  opacity: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const WelcomeContainer = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 97vh;
  background: #181d3b;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 3rem 0;
  }
`;

export const WelcomeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2rem 1.5rem;
  align-items: center;
  justify-content: center;

  & .welcome_content {
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h1 {
      font-size: 5rem;
      color: #fff;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    p {
      font-size: 1.8rem;
      width: 70%;
      color: #fff;
      text-align: center;
      margin-bottom: 3.5rem;
    }
  }

  @media (max-width: 800px) {
    .welcome_content {
      h1 {
        width: 100%;
        font-size: 3rem;
        text-align: center;
      }

      p {
        width: 100%;
        font-size: 1.6rem;
        text-align: center;
      }
    }
  }

  .download_buttons_container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;

    .download_button {
      display: flex;
      width: 28rem;
      max-width: 100%;
      font-size: 1.6rem;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      border-radius: 35px;
      color: #fff;
      transition: 200ms;
      box-shadow: 2px 0px 5px 2px #00000055;

      &:hover {
        box-shadow: none;
        transition: 250ms;
      }

      .icon {
        font-size: 2.5rem;
        margin-right: 10px;
      }

      &.android {
        background-color: #3cca62;
        &:hover {
          background-color: #3ddc84;
        }
      }

      &.ios {
        background-color: #000;
        &:hover {
          background-color: #333;
        }
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;
      width: 100%;

      .download_button {
        width: 100%;
        max-width: 280px;
      }
    }
  }
`;

export const PresentationsContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  .presentation_container {
    display: flex;
    min-height: 85vh;
    width: 100%;
    padding: 6rem 5rem;
    align-items: center;

    &:nth-child(odd) {
      flex-direction: row;
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
      background-color: ${(props) => props.theme.colors.shape};
    }

    & .image_container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      padding: 0 1rem;

      img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
      }
    }

    & .content_container {
      width: 50%;
      padding: 0 1rem;
    }

    h2 {
      font-size: 4.5rem;
      margin-bottom: 1.5rem;
      color: ${(props) => props.theme.colors.dark_heading};
    }

    p {
      font-size: 2rem;
      line-height: 3.5rem;
      color: ${(props) => props.theme.colors.light_heading};
    }

    @media (max-width: 900px) {
      min-height: auto;
      padding: 4rem 2rem;
      flex-direction: column !important;

      & .image_container,
      & .content_container {
        width: 100%;
        padding: 0;
      }

      & .image_container {
        margin-bottom: 2.5rem;
      }

      & .content_container {
        text-align: center;

        h2 {
          font-size: 3rem;
        }

        p {
          font-size: 1.6rem;
          line-height: 2.5rem;
        }
      }
    }
  }
`;

export const GetAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;

  h3 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: ${(props) => props.theme.colors.black};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 280px;
    font-size: 1.6rem;
    padding: 1.5rem;
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
    text-align: center;
    border-radius: 35px;
    box-shadow: 1px 1px 5px 1px #00000055;

    .icon {
      margin-right: 5px;
    }

    &:hover {
      background-color: ${(props) => props.theme.colors.light_primary};
      transition: 200ms;
      box-shadow: none;
    }
  }
`;
