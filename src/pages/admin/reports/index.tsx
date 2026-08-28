import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AdminSideBar from "@component/AdminSideBar";
import { AppContainer, Container } from "@styles/pages/admin";
import {
  FilterContainer,
  FilterSelect,
  InputContainer,
  ReportCard,
  ReportContent,
  ReportFooter,
  ReportHeader,
  ReportInfoGroup,
  ReportsListContainer,
  SearchButton,
  StatusBadge,
  TagBadge,
  ReportInput,
  ActionButtons,
} from "@styles/pages/admin/reports";
import {
  FiAlertOctagon,
  FiCheckCircle,
  FiEye,
  FiMessageSquare,
  FiSearch,
  FiTrash2,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { api } from "@services/api";
import {
  UserData,
  GroupData,
  MessageData,
  IReport,
  ReportStatus,
  ReportToType,
} from "@_types/interfaces";

interface IResponseData {
  reports: IReport[];
  total: number;
}

const DEFAULT_LIMIT = 20;

const AdminReportsManager: React.FC = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Filtros
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchReports = useCallback(
    async (
      currentPage: number,
      searchQuery: string,
      status: string,
      type: string,
    ) => {
      setLoading(true);
      try {
        const { status: resStatus, data } = await api.get<IResponseData>(
          "/admin/reports",
          {
            params: {
              _page: currentPage,
              _limit: DEFAULT_LIMIT,
              query: searchQuery || undefined,
              status: status || undefined,
              report_to_type: type || undefined,
            },
          },
        );

        if (resStatus === 200) {
          setTotal(data.total);
          setReports((prev) => {
            const updated =
              currentPage === 0 ? data.reports : [...prev, ...data.reports];
            setHasMore(updated.length < data.total && data.reports.length > 0);
            return updated;
          });
        }
      } catch (error) {
        console.error("Erro ao buscar denúncias:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchReports(page, query, statusFilter, typeFilter);
  }, [page, query, statusFilter, typeFilter, fetchReports]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReports([]);
    setHasMore(true);
    setPage(0);
    setQuery(search);
  };

  const handleResolveReport = async (
    reportId: string,
    newStatus: ReportStatus,
  ) => {
    try {
      await api.patch(`/admin/reports/${reportId}`, { status: newStatus });
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r)),
      );
    } catch (error) {
      console.error("Erro ao atualizar denúncia:", error);
      alert("Falha ao atualizar o status da denúncia.");
    }
  };

  const handleDeleteTargetItem = async (report: IReport) => {
    if (!confirm("Tem certeza que deseja apagar o item/conteúdo denunciado?"))
      return;

    try {
      if (
        report.report_to_type === ReportToType.MESSAGE &&
        report.to_message_id
      ) {
        await api.delete(`/admin/messages/${report.to_message_id}`);
      } else if (
        report.report_to_type === ReportToType.USER &&
        report.to_user_id
      ) {
        await api.delete(`/admin/users/${report.to_user_id}`);
      } else if (
        report.report_to_type === ReportToType.GROUP &&
        report.to_group_id
      ) {
        await api.delete(`/admin/groups/${report.to_group_id}`);
      }

      await handleResolveReport(report.id, ReportStatus.FINISHED);
      alert("Item excluído e denúncia resolvida!");
    } catch (error) {
      console.error("Erro ao excluir item denunciado:", error);
      alert("Falha ao excluir o conteúdo denunciado.");
    }
  };

  const lastReportRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const getReportTypeIcon = (type: ReportToType) => {
    switch (type) {
      case ReportToType.USER:
        return <FiUser size={16} />;
      case ReportToType.GROUP:
        return <FiUsers size={16} />;
      case ReportToType.MESSAGE:
        return <FiMessageSquare size={16} />;
      default:
        return <FiAlertOctagon size={16} />;
    }
  };

  return (
    <Container>
      <AdminSideBar />
      <AppContainer>
        <h1>Central de Denúncias ({total})</h1>

        <FilterContainer>
          <InputContainer as="form" onSubmit={handleSearchSubmit}>
            <ReportInput
              type="text"
              placeholder="Buscar por motivo ou mensagem..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchButton type="submit">
              <FiSearch size={20} />
            </SearchButton>
          </InputContainer>

          <FilterSelect
            value={statusFilter}
            onChange={(e) => {
              setReports([]);
              setPage(0);
              setStatusFilter(e.target.value);
            }}
          >
            <option value="">Todos os Status</option>
            <option value={ReportStatus.OPEN}>Pendentes</option>
            <option value={ReportStatus.FINISHED}>Resolvidas</option>
          </FilterSelect>

          <FilterSelect
            value={typeFilter}
            onChange={(e) => {
              setReports([]);
              setPage(0);
              setTypeFilter(e.target.value);
            }}
          >
            <option value="">Todos os Alvos</option>
            <option value={ReportToType.USER}>Usuários</option>
            <option value={ReportToType.GROUP}>Grupos</option>
            <option value={ReportToType.MESSAGE}>Mensagens</option>
          </FilterSelect>
        </FilterContainer>

        <ReportsListContainer>
          {reports.map((report, index) => {
            const isLast = reports.length === index + 1;

            return (
              <ReportCard
                key={`${report.id}-${index}`}
                ref={isLast ? lastReportRef : null}
                status={report.status}
              >
                <ReportHeader>
                  <div className="tags">
                    <TagBadge>
                      {getReportTypeIcon(report.report_to_type)}
                      {report.report_to_type}
                    </TagBadge>
                    <TagBadge $variant="warning">{report.report_type}</TagBadge>
                  </div>
                  <StatusBadge status={report.status}>
                    {report.status}
                  </StatusBadge>
                </ReportHeader>

                <ReportContent>
                  {/* Link no motivo da denúncia para abrir os detalhes */}
                  <Link
                    href={`/admin/reports/${report.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p className="reason" style={{ cursor: "pointer" }}>
                      "{report.message || "Sem mensagem informada"}"
                    </p>
                  </Link>

                  <ReportInfoGroup>
                    <div>
                      <label>Denunciante:</label>
                      <Link href={`/admin/users/${report.from_user_id}`}>
                        @{report.from_user?.nickname || report.from_user_id}
                      </Link>
                    </div>

                    <div>
                      <label>Alvo:</label>
                      {report.report_to_type === ReportToType.USER && (
                        <Link href={`/admin/users/${report.to_user_id}`}>
                          @{report.to_user?.nickname || report.to_user_id}
                        </Link>
                      )}
                      {report.report_to_type === ReportToType.GROUP && (
                        <Link href={`/admin/groups/${report.to_group_id}`}>
                          {report.to_group?.name || report.to_group_id}
                        </Link>
                      )}
                      {report.report_to_type === ReportToType.MESSAGE && (
                        <span>
                          Mensagem:{" "}
                          {report.to_message?.message || report.to_message_id}
                        </span>
                      )}
                    </div>
                  </ReportInfoGroup>
                </ReportContent>

                <ReportFooter>
                  <span className="date">
                    {new Date(report.created_at).toLocaleString("pt-BR")}
                  </span>

                  <ActionButtons>
                    <Link
                      href={`/admin/reports/${report.id}`}
                      passHref
                      legacyBehavior
                    >
                      <button
                        type="button"
                        style={{ backgroundColor: "#0088ff" }}
                        title="Ver Detalhes"
                      >
                        <FiEye size={16} /> Ver Detalhes
                      </button>
                    </Link>
                  </ActionButtons>
                </ReportFooter>
              </ReportCard>
            );
          })}
        </ReportsListContainer>

        {loading && <p>Carregando denúncias...</p>}
      </AppContainer>
    </Container>
  );
};

export default AdminReportsManager;
