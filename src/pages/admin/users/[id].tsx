import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminSideBar from "@component/AdminSideBar";
import {
  ActionButtonsGrid,
  ActionButton,
  AppContainer,
  BadgeStatus,
  Container,
  DangerZoneCard,
  HeaderActions,
  InfoGroup,
  InfoGrid,
  ModalContent,
  ModalOverlay,
  ProfileCard,
  UserAvatar,
  UserDetailsSection,
} from "@styles/pages/admin/userDetails";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiKey,
  FiLock,
  FiTrash2,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import { UserData } from "@_types/interfaces";
import { api } from "@services/api";

const AdminUserDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Estados de controle das modais
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Estados de formulário
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("7");
  const [newPassword, setNewPassword] = useState("");

  const [user, setUser] = useState<UserData>();

  const handleApplyBan = (e: React.FormEvent) => {
    e.preventDefault();
    // Integração com API
    console.log("Ban aplicado:", { id, banReason, banDuration });
    setIsBanModalOpen(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Integração com API
    console.log("Senha alterada:", { id, newPassword });
    setIsPasswordModalOpen(false);
  };

  const handleDeleteUser = () => {
    // Integração com API
    console.log("Usuário deletado:", id);
    setIsDeleteModalOpen(false);
    router.push("/admin/users");
  };

  useEffect(() => {
    (async () => {
      const { status, data } = await api.get(`/users`, {
        params: {
          user_id: id,
        },
      });

      if (status === 200) {
        setUser(data);
      }
    })();
  }, []);

  return (
    <Container>
      <AdminSideBar />
      <AppContainer>
        <HeaderActions>
          <button onClick={() => router.back()} className="back-button">
            <FiArrowLeft size={20} /> Voltar
          </button>
        </HeaderActions>

        <ProfileCard>
          <div className="user-main-info">
            <UserAvatar
              src={
                user?.avatar?.url ? user.avatar.url : "/avatar-placeholder.png"
              }
              onError={(e) => {
                e.currentTarget.srcset = "/avatar-placeholder.png";
                e.currentTarget.src = "/avatar-placeholder.png";
              }}
              width={100}
              height={100}
              alt="User Avatar"
            />
            <div>
              <h1>{user?.name}</h1>
              <p>@{user?.nickname}</p>
              <BadgeStatus $status="active">Ativo</BadgeStatus>
            </div>
          </div>

          <UserDetailsSection>
            <h2>Informações da Conta</h2>
            <InfoGrid>
              <InfoGroup>
                <label>ID</label>
                <p>{id || "1"}</p>
              </InfoGroup>
              <InfoGroup>
                <label>E-mail</label>
                <p>{user?.email || "não disponível"}</p>
              </InfoGroup>
              <InfoGroup>
                <label>Data de Cadastro</label>
                {/* @ts-ignore */}
                <p>{new Date(user?.created_at).toLocaleDateString("pt-BR")}</p>
              </InfoGroup>
              <InfoGroup>
                <label>Cargo</label>
                <p>
                  {user?.type === "ADMIN" ? "Administrador" : "Usuário Comum"}
                </p>
              </InfoGroup>
            </InfoGrid>
          </UserDetailsSection>

          <UserDetailsSection>
            <h2>Ações de Controle</h2>
            <ActionButtonsGrid>
              <ActionButton onClick={() => setIsPasswordModalOpen(true)}>
                <FiKey size={18} /> Mudar Senha
              </ActionButton>
              <ActionButton
                onClick={() => setIsBanModalOpen(true)}
                $variant="warning"
              >
                <FiAlertTriangle size={18} /> Aplicar Punição / Ban
              </ActionButton>
              <ActionButton $variant="success">
                <FiUserCheck size={18} /> Tornar Admin
              </ActionButton>
            </ActionButtonsGrid>
          </UserDetailsSection>

          <DangerZoneCard>
            <h2>Zona de Perigo</h2>
            <p>Ações irreversíveis na conta do usuário.</p>
            <ActionButton
              onClick={() => setIsDeleteModalOpen(true)}
              $variant="danger"
            >
              <FiTrash2 size={18} /> Deletar Conta Definitivamente
            </ActionButton>
          </DangerZoneCard>
        </ProfileCard>

        {/* Modal: Banir / Punir */}
        {isBanModalOpen && (
          <ModalOverlay onClick={() => setIsBanModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>Aplicar Punição</h3>
              <form onSubmit={handleApplyBan}>
                <label>Motivo da Punição</label>
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="Descreva o motivo..."
                  required
                />

                <label>Duração (dias)</label>
                <select
                  value={banDuration}
                  onChange={(e) => setBanDuration(e.target.value)}
                >
                  <option value="1">1 Dia</option>
                  <option value="7">7 Dias</option>
                  <option value="30">30 Dias</option>
                  <option value="permanent">Permanente</option>
                </select>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setIsBanModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="confirm-ban">
                    Confirmar Punição
                  </button>
                </div>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Modal: Mudar Senha */}
        {isPasswordModalOpen && (
          <ModalOverlay onClick={() => setIsPasswordModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>Redefinir Senha</h3>
              <form onSubmit={handleChangePassword}>
                <label>Nova Senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                  required
                />

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit">Atualizar Senha</button>
                </div>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Modal: Deletar Usuário */}
        {isDeleteModalOpen && (
          <ModalOverlay onClick={() => setIsDeleteModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>Excluir Conta</h3>
              <p>
                Tem certeza que deseja apagar esta conta? Esta ação é
                irreversível.
              </p>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="confirm-delete"
                  onClick={handleDeleteUser}
                >
                  Deletar
                </button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </AppContainer>
    </Container>
  );
};

export default AdminUserDetails;
