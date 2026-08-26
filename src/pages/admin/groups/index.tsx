import AdminSideBar from "@component/AdminSideBar";
import {
  AppContainer,
  Container,
} from "@styles/pages/admin";
import React from "react";
import { useAdminAuth } from "src/hooks/useAdminAuth";

const AdminGroupsManager: React.FC = () => {
  return (
    <Container>
      <AdminSideBar />
      <AppContainer>
        <h1>Grupos</h1>
      </AppContainer>
    </Container>
  );
};

export default AdminGroupsManager;
