import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 3rem 1.5rem;

  .social_networks_container {
    flex: 1;
    .social_network {
      font-size: 2.5rem;
      color: #fff;
      margin-right: 2rem;

      &:hover {
        color: #ccc;
        transition: 200ms;
      }
    }
  }

  .policies_container {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1rem;

    .policie {
      &:not(:last-child) {
        margin-right: 1rem;
      }

      a {
        font-size: 1.5rem;
        color: #FFF;
        text-align: center;

        &:hover {
          color: #bbb;
          transition: 200ms;
          text-decoration: underline;
        }
      }
    }
  }

  #copyright {
    color: #EAEAEA;
    font-size: 1.4rem;
    margin-top: 2rem;
    text-align: center;
  }
`;
