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
  GroupIcon,
  GroupDetailsSection,
  ReportsList,
  ReportCard,
} from "@styles/pages/admin/groupDetails";
import {
  FiAlertOctagon,
  FiArrowLeft,
  FiLock,
  FiTrash2,
  FiUnlock,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";
import { GroupData, IReport } from "@_types/interfaces";
import { api } from "@services/api";
import { ReportStatus, ReportToType, ReportType } from "@_types/enums";

const AdminGroupDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [group, setGroup] = useState<GroupData>();
  const [reports, setReports] = useState<IReport[]>([]);

  const fetchGroupDetails = useCallback(async (groupId: string) => {
    try {
      const { status, data } = await api.get(`/group/${groupId}`);
      if (status === 200) {
        setGroup(data);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do grupo:", error);
    }
  }, []);

  const fetchReports = useCallback(async (groupId: string) => {
    try {
      const { data } = await api.get(`/admin/reports`, {
        params: { to_id: groupId, type: ReportToType.GROUP },
      });
      setReports(data.reports);
    } catch (error) {
      console.error("Erro ao buscar denúncias do grupo:", error);
    }
  }, []);

  const handleTogglePrivacy = async () => {
    if (!group) return;
    const newPrivacy = group.privacy !== "PRIVATE";

    try {
      await api.patch(`/admin/groups/${id}/privacy`, {
        is_private: newPrivacy,
      });

      setGroup((prev) => (prev ? { ...prev, is_private: newPrivacy } : prev));
      alert(`Grupo alterado para ${newPrivacy ? "Privado" : "Público"}.`);
    } catch (error) {
      console.error("Erro ao alterar privacidade do grupo:", error);
      alert("Falha ao atualizar privacidade do grupo.");
    }
  };

  const handleResolveReport = async (reportId: string) => {
    try {
      await api.patch(`/admin/reports/${reportId}/resolve`);
      alert("Denúncia marcada como resolvida!");
      if (id) fetchReports(String(id));
    } catch (error) {
      console.error("Erro ao resolver denúncia:", error);
      alert("Falha ao atualizar o status da denúncia.");
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await api.delete(`/admin/groups/${id}`);
      setIsDeleteModalOpen(false);
      router.push("/admin/groups");
    } catch (error) {
      console.error("Erro ao deletar grupo:", error);
      alert("Falha ao excluir o grupo.");
    }
  };

  useEffect(() => {
    if (!id) return;
    const groupId = String(id);
    fetchGroupDetails(groupId);
    fetchReports(groupId);
  }, [id, fetchGroupDetails, fetchReports]);

  const pendingReportsCount = reports.filter(
    (r) => r.status === ReportStatus.OPEN,
  ).length;

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
          <div className="group-main-info">
            <GroupIcon
              src={
                group?.group_avatar?.url
                  ? group.group_avatar.url
                  : "/avatar-placeholder.png"
              }
              onError={(e) => {
                e.currentTarget.srcset = "/avatar-placeholder.png";
                e.currentTarget.src = "/avatar-placeholder.png";
              }}
              width={100}
              height={100}
              alt="Group Icon"
            />
            <div>
              <h1>{group?.name}</h1>
              <p>{group?.description || "Sem descrição informada."}</p>
              <BadgeStatus $isPrivate={group?.privacy === "PRIVATE"}>
                {group?.privacy === "PRIVATE" ? "Privado" : "Público"}
              </BadgeStatus>
            </div>
          </div>

          <GroupDetailsSection>
            <h2>Informações do Grupo</h2>
            <InfoGrid>
              <InfoGroup>
                <label>ID</label>
                <p>{id || "-"}</p>
              </InfoGroup>
              <InfoGroup>
                <label>Total de Membros</label>
                <p>{group?.participantsAmount || 0} membros</p>
              </InfoGroup>
              <InfoGroup>
                <label>Data de Criação</label>
                <p>
                  {group?.created_at
                    ? new Date(group.created_at).toLocaleDateString("pt-BR")
                    : "-"}
                </p>
              </InfoGroup>
              <InfoGroup>
                <label>Denúncias Pendentes</label>
                <p>{pendingReportsCount}</p>
              </InfoGroup>
            </InfoGrid>
          </GroupDetailsSection>

          <GroupDetailsSection>
            <h2>Denúncias Recebidas ({reports.length})</h2>
            {reports.length === 0 ? (
              <p style={{ opacity: 0.7, fontStyle: "italic" }}>
                Nenhuma denúncia registrada para este grupo.
              </p>
            ) : (
              <ReportsList>
                {reports.map((report) => (
                  <ReportCard
                    key={report.id}
                    $isResolved={report.status === ReportStatus.FINISHED}
                  >
                    <div className="report-content">
                      <div className="report-header">
                        <FiAlertOctagon
                          size={16}
                          color={
                            report.status === ReportStatus.OPEN
                              ? "#ed6c02"
                              : "#777"
                          }
                        />
                        <strong>Denúncia</strong>
                        <span className="status-tag">
                          {report.status === ReportStatus.OPEN
                            ? "Pendente"
                            : "Resolvida"}
                        </span>
                      </div>
                      <p>{report.message}</p>
                      <div className="report-footer">
                        <span>
                          Enviada em:{" "}
                          {new Date(report.created_at).toLocaleString("pt-BR")}
                        </span>
                        <span>
                          Por:{" "}
                          <Link href={`/admin/users/${report.from_user_id}`}>
                            {report.from_user?.nickname ||
                              `ID: ${report.from_user_id}`}
                          </Link>
                        </span>
                      </div>
                    </div>

                    {report.status === ReportStatus.OPEN && (
                      <ActionButton
                        $variant="success"
                        onClick={() => handleResolveReport(report.id)}
                        style={{
                          padding: "0.5rem 0.8rem",
                          fontSize: "0.85rem",
                        }}
                      >
                        <FiCheckCircle size={14} /> Resolver
                      </ActionButton>
                    )}
                  </ReportCard>
                ))}
              </ReportsList>
            )}
          </GroupDetailsSection>

          <GroupDetailsSection>
            <h2>Ações de Moderação</h2>
            <ActionButtonsGrid>
              <ActionButton onClick={handleTogglePrivacy} $variant="primary">
                {group?.privacy === "PRIVATE" ? (
                  <>
                    <FiUnlock size={18} /> Tornar Público
                  </>
                ) : (
                  <>
                    <FiLock size={18} /> Tornar Privado
                  </>
                )}
              </ActionButton>
            </ActionButtonsGrid>
          </GroupDetailsSection>

          <DangerZoneCard>
            <h2>Zona de Perigo</h2>
            <p>
              Ações irreversíveis no grupo e na exclusão do histórico de
              mensagens.
            </p>
            <ActionButton
              onClick={() => setIsDeleteModalOpen(true)}
              $variant="danger"
            >
              <FiTrash2 size={18} /> Excluir Grupo Definitivamente
            </ActionButton>
          </DangerZoneCard>
        </ProfileCard>

        {isDeleteModalOpen && (
          <ModalOverlay onClick={() => setIsDeleteModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>Excluir Grupo</h3>
              <p>
                Tem certeza que deseja apagar este grupo? Todas as mensagens e
                mídias associadas serão removidas permanentemente.
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
                  onClick={handleDeleteGroup}
                >
                  Deletar Grupo
                </button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </AppContainer>
    </Container>
  );
};

export default AdminGroupDetails;
