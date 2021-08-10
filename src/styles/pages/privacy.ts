import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PrivacyContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 60%;
  min-width: 320px;
  max-width: var(--page-max-width);
  margin: 3rem auto;

  @media (max-width: 450px) {
    width: 100%;
  }

  padding: 0 1rem;

  h1, h2, h3, h4 {
    margin: 1.2rem 0;
    color: ${props => props.theme.colors.dark_heading};
    margin-left: 1rem;
  }

  h1 {
    font-size: 4.5rem;
    color: ${props => props.theme.colors.primary};
  }

  h2 {
    font-size: 2.2rem;

    &#updated_in {
      font-size: 2rem;
      font-family: Poppins, sans-serif;
      font-weight: lighter;
      color: ${props => props.theme.colors.dark_gray};
    }
  }

  h3 {
    font-size: 1.8rem;
  }

  p, li {
    font-size: 1.6rem;
    margin: 1rem;
    color: ${props => props.theme.colors.light_heading};
    strong {
      color: ${props => props.theme.colors.dark_heading};
    }
  }

  li {
    margin-left: 5rem;
  }


  a {
    color: ${props => props.theme.colors.secondary};
    font-weight: 700;

    :hover {
      text-decoration: underline;
    }
  }
`
