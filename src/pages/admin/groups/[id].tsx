import AdminSideBar from "@component/AdminSideBar";
import {
  AppContainer,
  Container,
} from "@styles/pages/admin";
import { useRouter } from "next/router";
import React from "react";
import { useAdminAuth } from "src/hooks/useAdminAuth";

const AdminGroupManager: React.FC = () => {

    const router = useRouter()

  return (
    <Container>
      <AdminSideBar />
      <AppContainer>
        <h1>Grupo {router.query.id}</h1>
      </AppContainer>
    </Container>
  );
};

export default AdminGroupManager;
