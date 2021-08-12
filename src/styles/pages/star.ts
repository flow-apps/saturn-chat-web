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
  flex: 1;
  margin: 6rem 0;
  max-width: 1400px;

  .content {
    text-align: center;
    padding: 2rem 5rem;
    margin: 1rem;

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
    padding: 0 5rem;
    gap: 1.5rem;

    .benefit_card {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      width: 100%;
      min-width: 300px;
      max-width: 400px;
      height: 30rem;
      color: #fff;
      text-align: center;

      padding: 3rem;
      border-radius: 12px;

      .benefit_title {
        h3 {
          font-size: 1.8rem;
        }
      }

      .benefit_description {
        p {
          font-size: 1.4rem;
          font-weight: lighter;
          margin-top: 1.2rem;
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
        background: linear-gradient(160deg, #d7741d, #b60b44);
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
