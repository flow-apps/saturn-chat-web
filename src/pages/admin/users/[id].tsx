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
  FiTrash2,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import { UserData } from "@_types/interfaces";
import { api } from "@services/api";
import { useAdminAuth } from "@hooks/useAdminAuth";

export enum PenaltyType {
  WARNING = "WARNING",
  RESTRICTION = "RESTRICTION",
  TEMP_BAN = "TEMP_BAN",
  PERM_BAN = "BANNED",
}

const AdminUserDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user: currentUser } = useAdminAuth();

  // Modais
  const [isPunishModalOpen, setIsPunishModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Formulário de Punição
  const [penaltyType, setPenaltyType] = useState<PenaltyType>(
    PenaltyType.WARNING,
  );
  const [punishReason, setPunishReason] = useState("");
  const [punishDuration, setPunishDuration] = useState("7");

  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState<UserData>();

  const isSelf = String(currentUser?.id) === String(user?.id);
  const isAdmin = user?.type === "ADMIN";

  const handleToggleAdminStatus = async () => {
    if (isSelf) return;

    const newType = isAdmin ? "USER" : "ADMIN";
    try {
      await api.patch(`/admin/users/${id}/toggle`);

      setUser((prev) => (prev ? { ...prev, type: newType } : prev));
      alert(
        isAdmin
          ? "Permissões de administrador removidas."
          : "Usuário promovido a Administrador!",
      );
    } catch (error) {
      console.error("Erro ao alterar cargo do usuário:", error);
      alert("Falha ao atualizar as permissões do usuário.");
    }
  };

  const handleApplyPenalty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/admin/users/${id}/penalties`, {
        type: penaltyType,
        reason: punishReason,
        durationInDays:
          penaltyType === PenaltyType.TEMP_BAN ||
          penaltyType === PenaltyType.RESTRICTION
            ? Number(punishDuration)
            : null,
      });

      alert("Punição aplicada com sucesso!");
      setIsPunishModalOpen(false);
      setPunishReason("");
    } catch (error) {
      console.error("Erro ao aplicar punição:", error);
      alert("Falha ao aplicar a punição.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/admin/users/${id}/password`, {
        password: newPassword,
      });

      alert("Senha alterada com sucesso!");
      setIsPasswordModalOpen(false);
      setNewPassword("");
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      alert("Falha ao alterar a senha.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/admin/users/${id}`);
      setIsDeleteModalOpen(false);
      router.push("/admin/users");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Falha ao deletar a conta.");
    }
  };

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const { status, data } = await api.get(`/users`, {
          params: { user_id: id },
        });

        if (status === 200) {
          setUser(data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    })();
  }, [id]);

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
                <p>{id || "-"}</p>
              </InfoGroup>
              <InfoGroup>
                <label>E-mail</label>
                <p>{user?.email || "não disponível"}</p>
              </InfoGroup>
              <InfoGroup>
                <label>Data de Cadastro</label>
                <p>
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("pt-BR")
                    : "-"}
                </p>
              </InfoGroup>
              <InfoGroup>
                <label>Cargo</label>
                <p>{isAdmin ? "Administrador" : "Usuário Comum"}</p>
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
                onClick={() => setIsPunishModalOpen(true)}
                $variant="warning"
              >
                <FiAlertTriangle size={18} /> Aplicar Punição
              </ActionButton>

              <ActionButton
                onClick={handleToggleAdminStatus}
                $variant={isAdmin ? "danger" : "success"}
                disabled={isSelf}
                style={{
                  opacity: isSelf ? 0.5 : 1,
                  cursor: isSelf ? "not-allowed" : "pointer",
                }}
                title={
                  isSelf ? "Você não pode remover suas próprias permissões" : ""
                }
              >
                {isAdmin ? (
                  <>
                    <FiUserX size={18} /> Remover Admin
                  </>
                ) : (
                  <>
                    <FiUserCheck size={18} /> Tornar Admin
                  </>
                )}
              </ActionButton>
            </ActionButtonsGrid>
          </UserDetailsSection>

          <DangerZoneCard>
            <h2>Zona de Perigo</h2>
            <p>Ações irreversíveis na conta do usuário.</p>
            <ActionButton
              onClick={() => setIsDeleteModalOpen(true)}
              $variant="danger"
              disabled={isSelf}
              style={{
                opacity: isSelf ? 0.5 : 1,
                cursor: isSelf ? "not-allowed" : "pointer",
              }}
              title={
                isSelf
                  ? "Você não pode deletar sua própria conta no painel"
                  : ""
              }
            >
              <FiTrash2 size={18} /> Deletar Conta Definitivamente
            </ActionButton>
          </DangerZoneCard>
        </ProfileCard>

        {/* Modal: Aplicar Punição */}
        {isPunishModalOpen && (
          <ModalOverlay onClick={() => setIsPunishModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>Aplicar Punição ao Usuário</h3>
              <form onSubmit={handleApplyPenalty}>
                <label>Tipo de Punição</label>
                <select
                  value={penaltyType}
                  onChange={(e) =>
                    setPenaltyType(e.target.value as PenaltyType)
                  }
                >
                  <option value={PenaltyType.WARNING}>
                    Advertência (Warning)
                  </option>
                  <option value={PenaltyType.RESTRICTION}>
                    Restrição de Conta
                  </option>
                  <option value={PenaltyType.TEMP_BAN}>
                    Banimento Temporário
                  </option>
                  <option value={PenaltyType.PERM_BAN}>
                    Banimento Permanente
                  </option>
                </select>

                <label>Motivo da Punição</label>
                <textarea
                  value={punishReason}
                  onChange={(e) => setPunishReason(e.target.value)}
                  placeholder="Descreva detalhadamente o motivo..."
                  required
                />

                {(penaltyType === PenaltyType.TEMP_BAN ||
                  penaltyType === PenaltyType.RESTRICTION) && (
                  <>
                    <label>Duração (dias)</label>
                    <select
                      value={punishDuration}
                      onChange={(e) => setPunishDuration(e.target.value)}
                    >
                      <option value="1">1 Dia</option>
                      <option value="3">3 Dias</option>
                      <option value="7">7 Dias</option>
                      <option value="15">15 Dias</option>
                      <option value="30">30 Dias</option>
                    </select>
                  </>
                )}

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setIsPunishModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="confirm-ban">
                    Aplicar Punição
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
