import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const AppContainer = styled.main`
  padding: 3rem;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%
`;

export const GrettingContainer = styled.div`
  h1 {
    font-size: 2.2rem;
  }
  p {
    font-size: 1.2rem;
  }
`;

export const DashboardContainer = styled.section``;

export const DashboardCardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin: 2rem 0;
`;

export const DashboardCard = styled.div`
  width: 20rem;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-right: 1.5rem;
  padding: 2rem;
  border-radius: 12px;
  flex: 1;

  h2 {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const DashboardCardHeader = styled.div`
  margin-bottom: 1rem;
  p {
    font-weight: bold;
    font-size: 1.4rem;
  }
`;
