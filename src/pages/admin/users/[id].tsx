import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
  FiShieldOff,
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

interface IPenalty {
  id: string;
  penalty_type: PenaltyType;
  reason: string;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
  user_id: string;
  applied_by: string;
  applied_by_user?: {
    id: string;
    name: string;
    nickname: string;
  };
}

const AdminUserDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user: currentUser } = useAdminAuth();

  const [isPunishModalOpen, setIsPunishModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [penaltyType, setPenaltyType] = useState<PenaltyType>(
    PenaltyType.WARNING,
  );
  const [punishReason, setPunishReason] = useState("");
  const [punishDuration, setPunishDuration] = useState("7");

  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState<UserData>();
  const [penalties, setPenalties] = useState<IPenalty[]>([]);

  const isSelf = String(currentUser?.id) === String(user?.id);
  const isAdmin = user?.type === "ADMIN";

  const activePenaltiesCount = penalties.filter((p) => p.is_active).length;

  const fetchPenalties = useCallback(async (userId: string) => {
    try {
      const { data } = await api.get<IPenalty[]>(`/admin/penalties`, {
        params: { user_id: userId },
      });
      setPenalties(data);
    } catch (error) {
      console.error("Erro ao buscar punições:", error);
    }
  }, []);

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
    if (isSelf) {
      alert("Você não pode aplicar uma punição a si mesmo.");
      return;
    }

    try {
      await api.post(`/admin/penalties`, {
        user_id: user?.id,
        penalty_type: penaltyType,
        reason: punishReason,
        applied_by: currentUser?.id,
        duration_in_days:
          penaltyType === PenaltyType.TEMP_BAN ||
          penaltyType === PenaltyType.RESTRICTION
            ? Number(punishDuration)
            : null,
      });

      alert("Punição aplicada com sucesso!");
      setIsPunishModalOpen(false);
      setPunishReason("");
      if (id) fetchPenalties(String(id));
    } catch (error) {
      console.error("Erro ao aplicar punição:", error);
      alert("Falha ao aplicar a punição.");
    }
  };

  const handleRevokePenalty = async (penaltyId: string) => {
    if (!confirm("Tem certeza que deseja revogar/remover esta punição?"))
      return;

    try {
      await api.delete(`/admin/penalties/${penaltyId}`);
      alert("Punição revogada!");
      if (id) fetchPenalties(String(id));
    } catch (error) {
      console.error("Erro ao revogar punição:", error);
      alert("Falha ao revogar a punição.");
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
    if (isSelf) return;

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
          fetchPenalties(String(id));
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    })();
  }, [id, fetchPenalties]);

  const getPenaltyLabel = (type: PenaltyType) => {
    switch (type) {
      case PenaltyType.WARNING:
        return "Advertência";
      case PenaltyType.RESTRICTION:
        return "Restrição";
      case PenaltyType.TEMP_BAN:
        return "Ban. Temporário";
      case PenaltyType.PERM_BAN:
        return "Ban. Permanente";
      default:
        return type;
    }
  };

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
              <BadgeStatus
                $status={activePenaltiesCount > 0 ? "banned" : "active"}
              >
                {activePenaltiesCount > 0
                  ? `${activePenaltiesCount} Punição(ões) Ativa(s)`
                  : "Ativo"}
              </BadgeStatus>
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
            <h2>Histórico de Punições ({penalties.length})</h2>
            {penalties.length === 0 ? (
              <p style={{ opacity: 0.7, fontStyle: "italic" }}>
                Nenhuma punição registrada para este usuário.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {penalties.map((penalty) => {
                  const adminId =
                    penalty.applied_by_user?.id || penalty.applied_by;
                  const adminName =
                    penalty.applied_by_user?.name ||
                    `ID: ${penalty.applied_by}`;

                  return (
                    <div
                      key={penalty.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem 1.2rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        backgroundColor: penalty.is_active
                          ? "rgba(237, 108, 2, 0.05)"
                          : "rgba(0, 0, 0, 0.02)",
                        opacity: penalty.is_active ? 1 : 0.75,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.3rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <FiShieldOff
                            size={16}
                            color={penalty.is_active ? "#ed6c02" : "#777"}
                          />
                          <strong>
                            {getPenaltyLabel(penalty.penalty_type)}
                          </strong>
                          <span
                            style={{
                              fontSize: "0.75rem",
                              backgroundColor: penalty.is_active
                                ? "#ed6c02"
                                : "#ddd",
                              color: penalty.is_active ? "#fff" : "#333",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {penalty.is_active ? "Ativa" : "Inativa / Expirada"}
                          </span>
                        </div>

                        <p style={{ fontSize: "0.95rem" }}>{penalty.reason}</p>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1rem",
                            fontSize: "0.8rem",
                            opacity: 0.75,
                            marginTop: "0.2rem",
                          }}
                        >
                          <span>
                            Aplicado em:{" "}
                            {new Date(penalty.created_at).toLocaleString(
                              "pt-BR",
                            )}
                          </span>
                          {penalty.expires_at ? (
                            <span>
                              Término:{" "}
                              {new Date(penalty.expires_at).toLocaleString(
                                "pt-BR",
                              )}
                            </span>
                          ) : (
                            <span>Duração: Permanente</span>
                          )}
                          <span>
                            Por:{" "}
                            {adminId ? (
                              <Link
                                href={`/admin/users/${adminId}`}
                                style={{
                                  fontWeight: "bold",
                                  color: "inherit",
                                  textDecoration: "underline",
                                }}
                              >
                                {adminName}
                              </Link>
                            ) : (
                              "Sistema"
                            )}
                          </span>
                        </div>
                      </div>

                      {penalty.is_active && (
                        <ActionButton
                          $variant="danger"
                          onClick={() => handleRevokePenalty(penalty.id)}
                          style={{
                            padding: "0.5rem 0.8rem",
                            fontSize: "0.85rem",
                          }}
                          title="Revogar punição"
                        >
                          <FiTrash2 size={14} /> Revogar
                        </ActionButton>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
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
                disabled={isSelf}
                style={{
                  opacity: isSelf ? 0.5 : 1,
                  cursor: isSelf ? "not-allowed" : "pointer",
                }}
                title={
                  isSelf ? "Você não pode aplicar punições a si mesmo" : ""
                }
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
                      <option value="7">7 Dias</option>
                      <option value="15">15 Dias</option>
                      <option value="30">30 Dias</option>
                      <option value="90">90 Dias</option>
                      <option value="180">180 Dias</option>
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
