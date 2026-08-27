import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow-x: hidden;
`;

export const PresentationContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 95vh;
  width: 100%;
  background: linear-gradient(45deg, #0088ff 20%, #0055dd);

  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 5rem;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: var(--page-max-width, 1200px);

    #content_container {
      display: flex;
      flex-direction: column;
      width: 45%;
      color: #fff;
      margin-top: 2rem;

      h1 {
        font-size: 5rem;
        text-transform: uppercase;
        line-height: 1.1;
      }

      p {
        font-size: 1.6rem;
        margin: 1.5rem 0;
      }

      .price {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        font-weight: bold;
        font-size: 3rem;
        color: #fff;

        #currency,
        #per {
          font-size: 1.8rem;
        }

        #discount_container {
          font-size: 1.5rem;
          text-decoration: line-through ${(props) => props.theme.colors.red};
          margin-left: 1rem;
          background-color: ${(props) => props.theme.colors.secondary};
          padding: 0.5rem 1.5rem;
          border-radius: 30px;
        }
      }
    }

    #image_container {
      width: 50%;
      display: flex;
      justify-content: center;

      img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
      }
    }
  }

  @media (max-width: 875px) {
    min-height: auto;
    padding: 3rem 0;

    .content {
      align-items: center;
      flex-direction: column-reverse;
      padding: 2rem 2rem;

      #content_container {
        width: 100%;
        text-align: center;

        h1 {
          font-size: 3rem;
        }

        .price {
          justify-content: center;
        }
      }

      #image_container {
        margin: 0 auto 2rem;
        width: 100%;
        max-width: 520px;
      }
    }
  }
`;

export const BenefitsContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin: 6rem auto;
  max-width: 1400px;
  width: 100%;
  padding: 0 1.5rem;

  .content {
    text-align: center;
    padding: 2rem 1rem;

    h2 {
      font-size: 3rem;
      color: ${(props) => props.theme.colors.dark_heading};
    }

    p {
      font-size: 1.6rem;
      color: ${(props) => props.theme.colors.light_heading};
      margin: 1rem 0;
    }
  }

  .benefits {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    gap: 2rem;
    margin: 2rem 0;

    .benefit_card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 380px;
      min-height: 22rem;
      color: #fff;
      text-align: center;
      padding: 2.5rem;
      border-radius: 12px;
      filter: saturate(120%) contrast(105%);
      box-shadow: -1px 3px 4px #00000055;

      .benefit_title {
        h3 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
      }

      .benefit_description {
        p {
          font-size: 1.4rem;
          font-weight: 300;
          line-height: 1.4;
        }
      }

      .benefit_image {
        display: flex;
        align-self: center;
        justify-content: center;
        width: 100%;
        max-width: 180px;
        padding: 1rem;
        margin-top: 1.5rem;

        img {
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
      }

      &:nth-child(1) { background: linear-gradient(160deg, #5643f8, #19ab59); }
      &:nth-child(2) { background: linear-gradient(160deg, #4752d8, #f28259); }
      &:nth-child(3) { background: linear-gradient(160deg, #2409dd, #5ffec9); }
      &:nth-child(4) { background: linear-gradient(160deg, #2a11fc, #c100db); }
      &:nth-child(5) { background: linear-gradient(160deg, #b60b44, #d7741d); }
      &:nth-child(6) { background: linear-gradient(160deg, #472ff2, #e4f761); }
    }
  }

  @media (max-width: 760px) {
    margin: 3rem auto;

    .content {
      padding: 1rem;

      h2 {
        font-size: 2.2rem;
      }
    }
  }
`;

export const DownloadContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 6rem 2rem;
  background-color: ${(props) => props.theme.colors.shape};

  h3 {
    font-size: 2.5rem;
    max-width: var(--page-max-width, 1200px);
    color: ${(props) => props.theme.colors.black};

    @media (max-width: 780px) {
      font-size: 1.9rem;
    }

    @media (max-width: 520px) {
      font-size: 1.6rem;
    }
  }

  a {
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
    margin-top: 2rem;

    &:hover {
      background-color: ${(props) => props.theme.colors.light_primary};
      transition: 200ms;
      box-shadow: none;
    }
  }

  @media (max-width: 520px) {
    padding: 4rem 1.5rem;
  }
`;