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

  & .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 1.5rem;

    h1 {
      font-size: 4rem;
      color: #fff;
      margin-bottom: 1rem;
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
        background-color: ${props => props.theme.colors.primary};
        padding: 1.5rem 3rem;
        font-size: 1.8rem;
        color: #fff;
        border-radius: 30px;

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
    }
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
    padding: 3rem;
    flex-wrap: wrap;
    max-width: var(--page-max-width);
    margin: 0 auto;

    .download_card {
      width: 100%;
      max-width: 320px;
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
      }
    }
  }
`
