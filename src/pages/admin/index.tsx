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
import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@hooks/useAdminAuth";
import { api } from "@services/api";
import { IDashboardData } from "@_types/interfaces";

const AdminPage: React.FC = () => {
  const { user, loading } = useAdminAuth();
  const [dashData, setDashData] = useState<IDashboardData>();

  useEffect(() => {
    (async () => {
      const { status, data } =
        await api.get<IDashboardData>("/admin/dashboard");

      if (status === 200) {
        setDashData(data);
      }
    })();
  }, []);

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
                <p>Contas ativos</p>
              </DashboardCardHeader>
              <h2>{dashData?.counts.users}</h2>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardHeader>
                <p>Grupos ativos</p>
              </DashboardCardHeader>
              <h2>{dashData?.counts.groups}</h2>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardHeader>
                <p>Mensagens enviadas</p>
              </DashboardCardHeader>
              <h2>{dashData?.counts.messages}</h2>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardHeader>
                <p>Denúncias abertas</p>
              </DashboardCardHeader>
              <h2>{dashData?.counts.messages}</h2>
            </DashboardCard>
            <DashboardCard>
              <DashboardCardHeader>
                <p>Assinantes ativos</p>
              </DashboardCardHeader>
              <h2>{dashData?.counts.subscriptions}</h2>
            </DashboardCard>
          </DashboardCardsContainer>
        </DashboardContainer>
      </AppContainer>
    </Container>
  );
};

export default AdminPage;
