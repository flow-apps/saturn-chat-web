import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AdminSideBar from "@component/AdminSideBar";
import {
  ActionButtonsGrid,
  ActionButton,
  AppContainer,
  AudioPlayer,
  Container,
  DangerZoneCard,
  FileAttachment,
  FilesGrid,
  HeaderActions,
  InfoGrid,
  InfoGroup,
  MessagePreviewCard,
  ModalContent,
  ModalOverlay,
  PollOptionItem,
  PollPreview,
  ReportDetailsCard,
  ReportDetailsSection,
  StatusBadge,
  TagBadge,
  UserOrGroupPreview,
} from "@styles/pages/admin/reportDetails";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiCornerDownRight,
  FiDownload,
  FiFile,
  FiGlobe,
  FiMessageSquare,
  FiMusic,
  FiTrash2,
  FiUser,
  FiUsers,
  FiXCircle,
} from "react-icons/fi";
import { api } from "@services/api";
import { useAdminAuth } from "@hooks/useAdminAuth";
import {
  IReport,
  ReportStatus,
  ReportToType,
  UserData,
} from "@_types/interfaces";

export enum PenaltyType {
  WARNING = "WARNING",
  RESTRICTION = "RESTRICTION",
  TEMP_BAN = "TEMP_BAN",
  PERM_BAN = "BANNED",
}

const AdminReportDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user: currentUser } = useAdminAuth();

  const [report, setReport] = useState<IReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Estados dos Modais
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteMessageModalOpen, setIsDeleteMessageModalOpen] =
    useState<boolean>(false);
  const [isPunishModalOpen, setIsPunishModalOpen] = useState<boolean>(false);

  // Estados da Punição
  const [penaltyType, setPenaltyType] = useState<PenaltyType>(
    PenaltyType.WARNING,
  );
  const [punishReason, setPunishReason] = useState<string>("");
  const [punishDuration, setPunishDuration] = useState<string>("7");

  const fetchReportDetails = useCallback(async (reportId: string) => {
    setLoading(true);
    try {
      const { status, data } = await api.get<IReport>(
        `/admin/reports/${reportId}`,
      );
      if (status === 200) {
        setReport(data);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da denúncia:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchReportDetails(String(id));
  }, [id, fetchReportDetails]);

  // Atualizar apenas o status da denúncia
  const handleUpdateStatus = async (newStatus: ReportStatus) => {
    if (!report) return;

    try {
      await api.patch(`/admin/reports/${report.id}`, { status: newStatus });
      setReport((prev) => (prev ? { ...prev, status: newStatus } : prev));
      alert(`Status da denúncia atualizado para ${newStatus}.`);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Falha ao atualizar o status da denúncia.");
    }
  };

  // Apagar mensagem isoladamente
  const handleDeleteMessage = async () => {
    if (!report || !report.to_message_id) return;

    try {
      await api.delete(`/admin/messages/${report.to_message_id}`);

      setReport((prev) =>
        prev
          ? {
              ...prev,
              to_message: undefined,
            }
          : prev,
      );

      setIsDeleteMessageModalOpen(false);
      alert("Mensagem apagada com sucesso!");
    } catch (error) {
      console.error("Erro ao apagar mensagem:", error);
      alert("Falha ao apagar a mensagem.");
    }
  };

  // Identifica quem é o usuário alvo a ser punido
  const targetUserToPunish: UserData | null =
    report?.report_to_type === ReportToType.USER
      ? report.to_user || null
      : report?.report_to_type === ReportToType.MESSAGE
        ? report.to_message?.author || null
        : null;

  // Ação de Punir Usuário/Autor da Mensagem
  const handleApplyPenalty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report || !targetUserToPunish) return;

    try {
      // 1. Aplica a punição ao usuário responsável
      await api.post(`/admin/penalties`, {
        user_id: targetUserToPunish.id,
        penalty_type: penaltyType,
        reason: punishReason,
        applied_by: currentUser?.id,
        report_id: report.id,
        duration_in_days:
          penaltyType === PenaltyType.TEMP_BAN ||
          penaltyType === PenaltyType.RESTRICTION
            ? Number(punishDuration)
            : null,
      });

      // 2. Se a denúncia for sobre uma mensagem, apaga a mensagem denunciada
      if (
        report.report_to_type === ReportToType.MESSAGE &&
        report.to_message_id
      ) {
        await api.delete(`/admin/messages/${report.to_message_id}`);
        setReport((prev) => (prev ? { ...prev, to_message: undefined } : prev));
      }

      // 3. Atualiza o status da denúncia para FINISHED
      await handleUpdateStatus(ReportStatus.FINISHED);

      setIsPunishModalOpen(false);
      alert("Punição aplicada e denúncia resolvida!");
    } catch (error) {
      console.error("Erro ao aplicar punição:", error);
      alert("Falha ao aplicar a punição.");
    }
  };

  const handleDeleteGroup = async () => {
    if (!report || !report.to_group_id) return;

    try {
      await api.delete(`/admin/groups/${report.to_group_id}`);

      await handleUpdateStatus(ReportStatus.FINISHED);

      setIsDeleteModalOpen(false);
      alert("Grupo excluído e denúncia resolvida!");
      router.push("/admin/reports");
    } catch (error) {
      console.error("Erro ao excluir grupo:", error);
      alert("Falha ao excluir o grupo.");
    }
  };

  if (loading) {
    return (
      <Container>
        <AdminSideBar />
        <AppContainer>
          <p>Carregando detalhes da denúncia...</p>
        </AppContainer>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container>
        <AdminSideBar />
        <AppContainer>
          <HeaderActions>
            <button onClick={() => router.back()} className="back-button">
              <FiArrowLeft size={20} /> Voltar
            </button>
          </HeaderActions>
          <p>Denúncia não encontrada.</p>
        </AppContainer>
      </Container>
    );
  }

  return (
    <Container>
      <AdminSideBar />
      <AppContainer>
        <HeaderActions>
          <button onClick={() => router.back()} className="back-button">
            <FiArrowLeft size={20} /> Voltar
          </button>
        </HeaderActions>

        <ReportDetailsCard>
          {/* Cabeçalho da Denúncia */}
          <div className="report-main-info">
            <div>
              <div className="tags-container">
                <TagBadge>
                  {report.report_to_type === ReportToType.USER && (
                    <FiUser size={14} />
                  )}
                  {report.report_to_type === ReportToType.GROUP && (
                    <FiUsers size={14} />
                  )}
                  {report.report_to_type === ReportToType.MESSAGE && (
                    <FiMessageSquare size={14} />
                  )}
                  {report.report_to_type}
                </TagBadge>
                <TagBadge $variant="warning">{report.report_type}</TagBadge>
              </div>
              <h1>Denúncia #{report.id.slice(0, 8)}</h1>
              <p className="creation-date">
                Enviada em:{" "}
                {new Date(report.created_at).toLocaleString("pt-BR")}
              </p>
            </div>
            <StatusBadge $status={report.status}>{report.status}</StatusBadge>
          </div>

          {/* Informações Gerais */}
          <ReportDetailsSection>
            <h2>Visão Geral</h2>
            <InfoGrid>
              <InfoGroup>
                <label>Denunciante</label>
                <Link href={`/admin/users/${report.from_user_id}`}>
                  @
                  {report.from_user?.nickname ||
                    report.from_user?.name ||
                    report.from_user_id}
                </Link>
              </InfoGroup>
              <InfoGroup>
                <label>Alvo</label>
                <p>{report.report_to_type}</p>
              </InfoGroup>
              <InfoGroup>
                <label>Última Atualização</label>
                <p>{new Date(report.updated_at).toLocaleString("pt-BR")}</p>
              </InfoGroup>
            </InfoGrid>

            {report.message && (
              <div className="reason-box">
                <label>Motivo da Denúncia:</label>
                <p>"{report.message}"</p>
              </div>
            )}
          </ReportDetailsSection>

          {/* Conteúdo Denunciado */}
          <ReportDetailsSection>
            <h2>Conteúdo Denunciado</h2>

            {report.report_to_type === ReportToType.USER && report.to_user && (
              <UserOrGroupPreview>
                <div className="avatar-wrapper">
                  <img
                    src={
                      report.to_user.avatar?.url || "/avatar-placeholder.png"
                    }
                    alt="User Avatar"
                  />
                </div>
                <div>
                  <h3>{report.to_user.name}</h3>
                  <p>@{report.to_user.nickname}</p>
                  <span className="email">{report.to_user.email}</span>
                  <Link
                    href={`/admin/users/${report.to_user.id}`}
                    className="view-link"
                  >
                    Ver perfil completo
                  </Link>
                </div>
              </UserOrGroupPreview>
            )}

            {report.report_to_type === ReportToType.GROUP &&
              report.to_group && (
                <UserOrGroupPreview>
                  <div className="avatar-wrapper">
                    <img
                      src={
                        report.to_group.group_avatar?.url ||
                        "/group-placeholder.png"
                      }
                      alt="Group Avatar"
                    />
                  </div>
                  <div>
                    <h3>{report.to_group.name}</h3>
                    <p>{report.to_group.description || "Sem descrição"}</p>
                    <span className="email">
                      {report.to_group.privacy} • {report.to_group.type}
                    </span>
                    <Link
                      href={`/admin/groups/${report.to_group.id}`}
                      className="view-link"
                    >
                      Ver detalhes do grupo
                    </Link>
                  </div>
                </UserOrGroupPreview>
              )}

            {report.report_to_type === ReportToType.MESSAGE && (
              <>
                {!report.to_message ? (
                  <p className="deleted-notice">
                    Esta mensagem já foi apagada ou não está disponível no
                    sistema.
                  </p>
                ) : (
                  <MessagePreviewCard>
                    <div className="message-header">
                      <div className="author-info">
                        <img
                          src={
                            report.to_message.author?.avatar?.url ||
                            "/avatar-placeholder.png"
                          }
                          alt="Author Avatar"
                        />
                        <div>
                          <strong>{report.to_message.author?.name}</strong>
                          <span>@{report.to_message.author?.nickname}</span>
                        </div>
                      </div>
                      <span className="time">
                        {new Date(report.to_message.created_at).toLocaleString(
                          "pt-BR",
                        )}
                      </span>
                    </div>

                    {report.to_message.reply_to && (
                      <div className="reply-container">
                        <FiCornerDownRight size={14} />
                        <div>
                          <small>
                            Respondendo a @
                            {report.to_message.reply_to.author?.nickname}:
                          </small>
                          <p>{report.to_message.reply_to.message}</p>
                        </div>
                      </div>
                    )}

                    {/* Texto Principal */}
                    {report.to_message.message && (
                      <p className="message-body">
                        {report.to_message.message}
                      </p>
                    )}

                    {/* Mensagem de Áudio */}
                    {report.to_message.voice_message && (
                      <AudioPlayer>
                        <FiMusic size={20} />
                        <audio
                          controls
                          src={report.to_message.voice_message.url}
                        />
                      </AudioPlayer>
                    )}

                    {/* Anexos de Arquivos */}
                    {report.to_message.files &&
                      report.to_message.files.length > 0 && (
                        <FilesGrid>
                          {report.to_message.files.map(
                            (file: any, idx: number) => (
                              <FileAttachment
                                key={file.id || idx}
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FiFile size={18} />
                                <div className="file-info">
                                  <span>{file.original_name || file.name}</span>
                                  <small>
                                    {(file.size / 1024).toFixed(1)} KB
                                  </small>
                                </div>
                                <FiDownload size={16} />
                              </FileAttachment>
                            ),
                          )}
                        </FilesGrid>
                      )}

                    {report.to_message.links &&
                      report.to_message.links.length > 0 && (
                        <div className="links-container">
                          {report.to_message.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-card"
                            >
                              <FiGlobe size={16} />
                              <div>
                                <strong>{link.title || link.siteName}</strong>
                                <p>{link.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}

                    {report.to_message.poll && (
                      <PollPreview>
                        <h4>{report.to_message.poll.question}</h4>
                        {report.to_message.poll.options?.map((opt) => (
                          <PollOptionItem key={opt.id}>
                            <span>{opt.option_text}</span>
                            <small>{opt.votes_count || 0} votos</small>
                          </PollOptionItem>
                        ))}
                      </PollPreview>
                    )}

                    {report.to_message.group && (
                      <div className="message-footer">
                        <span>
                          Enviada no grupo:{" "}
                          <Link
                            href={`/admin/groups/${report.to_message.group.id}`}
                          >
                            <strong>{report.to_message.group.name}</strong>
                          </Link>
                        </span>
                      </div>
                    )}
                  </MessagePreviewCard>
                )}
              </>
            )}
          </ReportDetailsSection>

          {/* Ações de Moderação */}
          <ReportDetailsSection>
            <h2>Ações de Moderação</h2>
            <ActionButtonsGrid>
              {/* Botão de Punir Usuário / Autor */}
              {(report.report_to_type === ReportToType.USER ||
                report.report_to_type === ReportToType.MESSAGE) && (
                <ActionButton
                  onClick={() => {
                    setPunishReason(
                      `Denúncia #${report.id.slice(0, 8)}: ${
                        report.message || "Violação de termos"
                      }`,
                    );
                    setIsPunishModalOpen(true);
                  }}
                  $variant="warning"
                  disabled={!targetUserToPunish}
                  style={{
                    opacity: !targetUserToPunish ? 0.5 : 1,
                    cursor: !targetUserToPunish ? "not-allowed" : "pointer",
                  }}
                >
                  <FiAlertTriangle size={18} /> Punir{" "}
                  {report.report_to_type === ReportToType.MESSAGE
                    ? "Autor da Mensagem"
                    : "Usuário"}
                </ActionButton>
              )}

              {/* Botão de Apagar Mensagem Denunciada */}
              {report.report_to_type === ReportToType.MESSAGE &&
                report.to_message && (
                  <ActionButton
                    onClick={() => setIsDeleteMessageModalOpen(true)}
                    $variant="danger"
                  >
                    <FiTrash2 size={18} /> Apagar Mensagem
                  </ActionButton>
                )}

              {/* Botão de Excluir Grupo Denunciado */}
              {report.report_to_type === ReportToType.GROUP && (
                <ActionButton
                  onClick={() => setIsDeleteModalOpen(true)}
                  $variant="danger"
                >
                  <FiTrash2 size={18} /> Excluir Grupo Denunciado
                </ActionButton>
              )}

              {/* Opção para Descartar Denúncia */}
              {report.status === ReportStatus.OPEN && (
                <ActionButton
                  onClick={() => handleUpdateStatus(ReportStatus.FINISHED)}
                  $variant="secondary"
                >
                  <FiXCircle size={18} /> Descartar Denúncia
                </ActionButton>
              )}
            </ActionButtonsGrid>
          </ReportDetailsSection>
        </ReportDetailsCard>

        {/* Modal: Aplicar Punição */}
        {isPunishModalOpen && targetUserToPunish && (
          <ModalOverlay onClick={() => setIsPunishModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>
                Punir Usuário (@
                {targetUserToPunish.nickname || targetUserToPunish.name})
              </h3>
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
                  placeholder="Descreva o motivo detalhadamente..."
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
                    Aplicar Punição e Resolver
                  </button>
                </div>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Modal: Apagar Mensagem */}
        {isDeleteMessageModalOpen && (
          <ModalOverlay onClick={() => setIsDeleteMessageModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>Apagar Mensagem</h3>
              <p>
                Tem certeza que deseja apagar esta mensagem? Ela será removida
                permanentemente do chat e do banco de dados.
              </p>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsDeleteMessageModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="confirm-delete"
                  onClick={handleDeleteMessage}
                >
                  Apagar Mensagem
                </button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Modal: Excluir Grupo */}
        {isDeleteModalOpen && (
          <ModalOverlay onClick={() => setIsDeleteModalOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>Excluir Grupo</h3>
              <p>
                Tem certeza que deseja apagar este grupo? Esta ação removerá o
                grupo e todo o histórico de conversas e mídias do banco de
                dados.
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

export default AdminReportDetails;
