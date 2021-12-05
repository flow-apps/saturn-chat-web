import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PresentationContainer = styled.header`
  min-height: 95vh;
  background-color: #292929;
  display: flex;
  flex-direction: column;

  & .content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2rem 5rem;
    max-width: var(--page-max-width);
    margin: auto;

    h1 {
      font-size: 3.5rem;
      color: ${props => props.theme.colors.secondary};
    }

    p {
      font-size: 1.8rem;
      color: #fff;
      margin: 1.5rem 0;
    }

    & .download_button_container {
      display: flex;
      margin: 0 auto;
      margin-top: 2.5rem;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props => props.theme.colors.primary};
        padding: 2rem;
        font-size: 1.6rem;
        color: #fff;
        border-radius: 60px;
        width: 30rem;

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
        color: ${({ theme }) => theme.colors.primary};
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

    #image_wrapper {
      width: 70%;
      margin-left: 1rem;
      img {
        object-fit: cover;
      }
    }

    @media (max-width: 780px) {
      flex-direction: column-reverse;
      text-align: center;

      padding: 3rem;

      #content_wrapper {
        margin-top: 1.5rem;

        h1 {
          font-size: 2.5rem;
        }

        p {
          font-size: 1.8rem;
        }
      }

      .download_button_container {
        justify-content: center;
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
      background-color: ${props => props.theme.colors.shape}99;
      padding: 1.5rem;

      margin: 1.5rem;

      border-radius: 8px;

      .title_container {
        h2 {
          font-size: 2.5rem;
          text-align: center;
          color: ${props => props.theme.colors.black};
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
