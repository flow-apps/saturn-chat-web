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
    <div>
      <h1>Painel de Administração</h1>
      <p>Bem-vindo, {user.name}!</p>
    </div>
  );
};

export default AdminPage;
