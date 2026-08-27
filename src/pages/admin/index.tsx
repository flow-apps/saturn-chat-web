import AdminSideBar from "@component/AdminSideBar";
import {
  AppContainer,
  Container,
  DashboardCard,
  DashboardCardHeader,
  DashboardCardsContainer,
  DashboardContainer,
  GrettingContainer,
} from "@styles/pages/admin";
import React from "react";
import { useAdminAuth } from "@hooks/useAdminAuth";

const AdminPage: React.FC = () => {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || user.type !== "ADMIN") {
    return null;
  }

  return (
    <Container>
      <AdminSideBar />
      <AppContainer>
        <GrettingContainer>
          <h1>Bem-vindo de volta, {user.name}!</h1>
          <p>Vamos conferir como anda o Saturn Chat?</p>
        </GrettingContainer>
        <DashboardContainer>
          <DashboardCardsContainer>
            <DashboardCard>
              <DashboardCardHeader>
                <p>Usuários ativos</p>
              </DashboardCardHeader>
              <h2>1352</h2>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardHeader>
                <p>Grupos ativos</p>
              </DashboardCardHeader>
              <h2>1352</h2>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardHeader>
                <p>Mensagens enviadas</p>
              </DashboardCardHeader>
              <h2>1352</h2>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardHeader>
                <p>Denúncias abertas</p>
              </DashboardCardHeader>
              <h2>1352</h2>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardHeader>
                <p>Assinantes ativos</p>
              </DashboardCardHeader>
              <h2>1352</h2>
            </DashboardCard>
          </DashboardCardsContainer>
        </DashboardContainer>
      </AppContainer>
    </Container>
  );
};

export default AdminPage;
