import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PresentationContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 95vh;
  background: linear-gradient(45deg, #0088ff 20%, #0055dd);

  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 5rem;
    justify-content: space-around;
    align-items: center;
    max-width: var(--page-max-width);

    #content_container {
      display: flex;
      flex-direction: column;
      width: 40%;
      color: #fff;
      margin-top: 2rem;

      h1 {
        font-size: 5rem;
        text-transform: uppercase;
      }

      p {
        font-size: 1.6rem;
        margin-bottom: 1.5rem;
      }

      .price {
        font-weight: bold;
        font-size: 3rem;
        color: #fff;
        #currency {
          font-size: 1.8rem;
        }

        #per {
          font-size: 1.8rem;
        }

        #discount_container {
          font-size: 1.5rem;
          text-decoration: line-through ${(props) => props.theme.colors.red};
          margin: 0 2rem;
          background-color: ${(props) => props.theme.colors.secondary};
          padding: 0.5rem 1.5rem;
          border-radius: 30px;
        }
      }
    }

    #image_container {
      width: 50%;
      img {
        object-fit: cover;
      }
    }
  }
  @media (max-width: 875px) {
    .content {
      align-items: flex-start;
      flex-direction: column-reverse;
      padding: 2rem 3rem;
      #content_container {
        width: 100%;

        h1 {
          font-size: 3rem;
        }
      }
      #image_container {
        margin: 0 auto;
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
  padding: 0 1rem;

  .content {
    text-align: center;
    padding: 2rem 5rem;


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
    align-items: center;
    gap: 1.5rem;
    margin: 1rem 0;

    .benefit_card {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-width: 300px;
      max-width: 400px;
      height: 40rem;
      color: #fff;
      text-align: center;

      padding: 3rem;
      border-radius: 12px;

      .benefit_title {
        h3 {
          font-size: 1.8rem;
          height: 6rem;
        }
      }

      .benefit_description {
        p {
          font-size: 1.4rem;
          font-weight: lighter;
        }
      }

      .benefit_image {
        display: flex;
        align-self: center;
        justify-self: flex-end;
        width: 80%;
        padding: 3rem;
        margin: auto;

        @media (max-width: 1030px) {
          width: 65%;
          padding: 5rem;
        }
        img {
          object-fit: cover;
        }
      }

      filter: saturate(120%) contrast(105%);
      box-shadow: -1px 3px 4px #00000055;

      &:nth-child(1) {
        background: linear-gradient(160deg, #5643f8, #19ab59);
      }

      &:nth-child(2) {
        background: linear-gradient(160deg, #4752d8, #f28259);
      }

      &:nth-child(3) {
        background: linear-gradient(160deg, #2409dd, #5ffec9);
      }

      &:nth-child(4) {
        background: linear-gradient(160deg, #2a11fc, #c100db);
      }

      &:nth-child(5) {
        background: linear-gradient(160deg, #b60b44, #d7741d);
      }

      &:nth-child(6) {
        background: linear-gradient(160deg, #472ff2, #e4f761);
      }
    }
  }
  @media (max-width: 760px) {
    .content {
    padding: 1rem;
      h2 {
        font-size: 2rem;
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
  padding: 7rem;
  background-color: ${props => props.theme.colors.shape};

  h3 {
    font-size: 2.5rem;
    max-width: var(--page-max-width);

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
    width: 280px;
    font-size: 1.6rem;
    padding: 1.5rem;
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    text-align: center;
    border-radius: 35px;
    box-shadow: 1px 1px 5px 1px #00000055;
    margin-top: 1rem;
    max-width: var(--page-max-width);

    &:hover {
      background-color: ${props => props.theme.colors.light_primary};
      transition: 200ms;
      box-shadow: none;
    }
  }
`
