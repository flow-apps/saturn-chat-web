import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }
`;

export const AppContainer = styled.main`
  padding: 3rem;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  flex: 1;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
    overflow-y: visible;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const GrettingContainer = styled.div`
  h1 {
    font-size: 2.2rem;
    color: ${({ theme }) => theme.colors.dark_heading || "inherit"};
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.light_heading || "inherit"};
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export const DashboardContainer = styled.section`
  width: 100%;
`;

export const DashboardCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  margin: 2rem 0;
`;

export const DashboardCard = styled.div`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 2rem;
  border-radius: 12px;
  flex: 1;
  min-width: 240px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 2.5rem;
    word-break: break-word;
  }

  @media (max-width: 768px) {
    min-width: calc(50% - 0.75rem);
  }

  @media (max-width: 520px) {
    min-width: 100%;
    padding: 1.5rem;

    h2 {
      font-size: 1.6rem;
    }
  }
`;

export const DashboardCardHeader = styled.div`
  margin-bottom: 1rem;

  p {
    font-weight: bold;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.black || "inherit"};
  }

  @media (max-width: 480px) {
    p {
      font-size: 1.2rem;
    }
  }
`;
