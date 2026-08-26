import AdminSideBar from "@component/AdminSideBar";
import { AppContainer, Container } from "@styles/pages/admin";
import { InputContainer, UserInput } from "@styles/pages/admin/users";
import React from "react";
import { useAdminAuth } from "src/hooks/useAdminAuth";

const AdminUsersManager: React.FC = () => {
  return (
    <Container>
      <AdminSideBar />
      <AppContainer>
        <h1>Tddos os usuários</h1>
        <InputContainer>
          <UserInput type="text" placeholder="Nome de usuário..." />
        </InputContainer>
      </AppContainer>
    </Container>
  );
};

export default AdminUsersManager;
