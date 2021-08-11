import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PresentationContainer = styled.header`
  height: 95vh;
  background-color: #292929;
  display: flex;
  flex-direction: column;
  text-align: center;

  & .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
    max-width: var(--page-max-width);
    margin: 0 auto;

    h1 {
      font-size: 4rem;
      color: #fff;
    }

    p {
      font-size: 2rem;
      color: #fff;
    }

    & .download_button_container {
      margin: 0 auto;
      margin-top: 2.5rem;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props => props.theme.colors.primary};
        padding: 2rem;
        font-size: 1.8rem;
        color: #fff;
        border-radius: 30px;
        width: 320px;

        & #icon {
          font-size: 2.2rem;
          margin-right: 1rem;
          margin-bottom: .4rem;
        }

        
        :hover {
          background-color: ${props => props.theme.colors.light_primary};
          transition: 200ms;
        }
      }

      span#not_supported {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.secondary};
      }

      span#soon {
        background-color: #c0c0c0;
        color: #444;
        padding: 1.5rem;
        font-size: 1.6rem;
        border-radius: 30px;
        width: 320px;
      }
    }
  }

  @media (max-width: 430px) {
    height: 85vh;

    & .content {
      h1 {
        font-size: 2.4rem;
      }
    p {
      
    }
  };
}
`

export const DownloadsContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 3rem 0;

  .downloads {
    display: flex;
    justify-content: space-around;
    padding: 2rem;
    max-width: var(--page-max-width);
    margin: 0 auto;

    .download_card {
      width: 100%;
      max-width: 400px;
      background-color: ${props => props.theme.colors.shape};
      padding: 1.5rem;
      border: 1px solid ${props => props.theme.colors.secondary};

      margin: 1.5rem;

      border-radius: 15px;

      .title_container {
        h2 {
          font-size: 2.5rem;
          text-align: center;
        }
      }

      .image_container {
        display: flex;
        width: 30rem;
        margin: 2rem auto;
        margin-bottom: 3rem;
        img {
          object-fit: cover;
        }
      }
      
      .get_container {
        text-align: center;
        margin: 1.5rem 0;
        a {
          font-size: 1.8rem;
          background-color: #000;
          color: #fff;
          padding: 1.5rem 3rem;
          border-radius: 30px;

          :hover {
            background-color: #333;
            transition: 200ms;
          }
        }

        span#soon {
          font-size: 1.8rem;
          background-color: #c0c0c0;
          color: #444;
          padding: 1.5rem 3rem;
          border-radius: 30px;
        }
      }
    }
  }

  @media (max-width: 680px) {
    .downloads {
      flex-direction: column;
      align-items: center;
      .download_card {

      } 
    }
  }

  @media (max-width: 430px) {
    .downloads {
      .download_card {

      } 
    }
  }
`
