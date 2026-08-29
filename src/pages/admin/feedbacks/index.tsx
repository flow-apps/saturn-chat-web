import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch, FiMessageSquare, FiHelpCircle } from "react-icons/fi";
import AdminSideBar from "@component/AdminSideBar";
import { FeedbackType } from "@_types/enums";
import { IFeedback } from "@_types/interfaces";
import { api } from "@services/api";
import {
  Container,
  AppContainer,
  Header,
  Title,
  FilterContainer,
  FilterButton,
  SearchContainer,
  SearchInput,
  FeedbackList,
  FeedbackCard,
  UserHeader,
  Avatar,
  UserInfo,
  UserName,
  FeedbackDate,
  CategoryTag,
  CommentText,
  EmptyState,
} from "@styles/pages/admin/feedbacks";
import { AiFillBug } from "react-icons/ai";

const DEFAULT_LIMIT = 50;

interface IResponseData {
  feedbacks: IFeedback[];
  total: number;
}

const Feedbacks: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const observer = useRef<IntersectionObserver | null>(null);

  // Debounce para a busca (aguarda 500ms após o usuário parar de digitar)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchFeedbacks = useCallback(
    async (currentPage: number, search: string) => {
      setLoading(true);
      try {
        const { status, data } = await api.get<IResponseData>(
          "/admin/feedbacks",
          {
            params: {
              _page: currentPage,
              _limit: DEFAULT_LIMIT,
              ...(search ? { query: search } : {}),
            },
          },
        );

        if (status === 200) {
          if (currentPage === 0) {
            setTotal(data.total);
          }

          setFeedbacks((prev) => {
            const updated =
              currentPage === 0 ? data.feedbacks : [...prev, ...data.feedbacks];
            if (updated.length >= data.total || data.feedbacks.length === 0) {
              setHasMore(false);
            }
            return updated;
          });
        }
      } catch (error) {
        console.error("Erro ao buscar feedbacks:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Recarrega do zero quando a busca por texto muda
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchFeedbacks(0, debouncedSearch);
  }, [debouncedSearch, fetchFeedbacks]);

  // Carrega páginas adicionais durante o scroll
  useEffect(() => {
    if (page > 0) {
      fetchFeedbacks(page, debouncedSearch);
    }
  }, [page, debouncedSearch, fetchFeedbacks]);

  const lastElementRef = useCallback(
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

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = "/avatar-placeholder.png";
    },
    [],
  );

  // Filtragem local por tipo no frontend
  const filteredFeedbacks = feedbacks.filter((item) => {
    return selectedType === "all" || item.type === selectedType;
  });

  const renderCategoryTag = (type?: FeedbackType) => {
    switch (type) {
      case FeedbackType.BUG:
        return (
          <CategoryTag color="#E53E3E" bg="#FFF5F5">
            <AiFillBug size={14} />
            <span>Bug</span>
          </CategoryTag>
        );
      case FeedbackType.SUGGESTION:
        return (
          <CategoryTag color="#3182CE" bg="#EBF8FF">
            <FiMessageSquare size={14} />
            <span>Sugestão</span>
          </CategoryTag>
        );
      case FeedbackType.OTHER:
        return (
          <CategoryTag color="#805AD5" bg="#FAF5FF">
            <FiHelpCircle size={14} />
            <span>Outro</span>
          </CategoryTag>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <AdminSideBar />
      <AppContainer>
        <Header>
          <Title>Feedbacks dos Usuários ({total})</Title>
          <SearchContainer>
            <FiSearch size={18} color="#8C8C8C" />
            <SearchInput
              type="text"
              placeholder="Buscar por conteúdo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </Header>

        <FilterContainer>
          <FilterButton
            active={selectedType === "all"}
            onClick={() => setSelectedType("all")}
          >
            Todos
          </FilterButton>
          <FilterButton
            active={selectedType === FeedbackType.BUG}
            onClick={() => setSelectedType(FeedbackType.BUG)}
          >
            Bugs
          </FilterButton>
          <FilterButton
            active={selectedType === FeedbackType.SUGGESTION}
            onClick={() => setSelectedType(FeedbackType.SUGGESTION)}
          >
            Sugestões
          </FilterButton>
          <FilterButton
            active={selectedType === FeedbackType.OTHER}
            onClick={() => setSelectedType(FeedbackType.OTHER)}
          >
            Outros
          </FilterButton>
        </FilterContainer>

        {filteredFeedbacks.length === 0 && !loading ? (
          <EmptyState>
            <p>Nenhum feedback encontrado.</p>
          </EmptyState>
        ) : (
          <FeedbackList>
            {filteredFeedbacks.map((feedback, index) => {
              const isLastElement = filteredFeedbacks.length === index + 1;
              return (
                <FeedbackCard
                  key={feedback.id}
                  ref={isLastElement ? lastElementRef : null}
                >
                  <UserHeader>
                    <Avatar
                      src={
                        feedback.user?.avatar?.url || "/avatar-placeholder.png"
                      }
                      alt={feedback.user?.name || "Avatar"}
                      onError={handleImageError}
                    />
                    <UserInfo>
                      <UserName>{feedback.user?.name || "Usuário"}</UserName>
                      <FeedbackDate>
                        {feedback.created_at
                          ? new Date(feedback.created_at).toLocaleDateString(
                              "pt-BR",
                            )
                          : ""}
                      </FeedbackDate>
                    </UserInfo>
                    {renderCategoryTag(feedback.type)}
                  </UserHeader>

                  <CommentText>{feedback.content}</CommentText>
                </FeedbackCard>
              );
            })}
          </FeedbackList>
        )}

        {loading && <p style={{ marginTop: 16 }}>Carregando feedbacks...</p>}
      </AppContainer>
    </Container>
  );
};

export default Feedbacks;
