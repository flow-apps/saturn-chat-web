import AdminSideBar from "@component/AdminSideBar";
import { AppContainer, Container } from "@styles/pages/admin";
import React from "react";
import { useAdminAuth } from "src/hooks/useAdminAuth";

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
        <h1>Bem-vindo</h1>
      </AppContainer>
    </Container>
  );
};

export default AdminPage;
