import AdminSideBar from "@component/AdminSideBar";
import { AppContainer, Container } from "@styles/pages/admin";
import {
  GroupCard,
  GroupContainer,
  GroupIcon,
  GroupIconContainer,
  GroupInfo,
  GroupsListContainer,
  InputContainer,
  SearchButton,
  GroupInput,
} from "@styles/pages/admin/groups";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch, FiUsers } from "react-icons/fi";
import { GroupData } from "@_types/interfaces";
import { api } from "@services/api";

const DEFAULT_LIMIT = 50;

interface IResponseData {
  groups: GroupData[];
  total: number;
}

const AdminGroupsManager: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchGroups = useCallback(
    async (currentPage: number, searchQuery: string) => {
      setLoading(true);
      try {
        const { status, data } = await api.get<IResponseData>("/admin/groups", {
          params: {
            _page: currentPage,
            _limit: DEFAULT_LIMIT,
            query: searchQuery || undefined,
          },
        });

        if (status === 200) {
          setTotal(data.total);
          setGroups((prevGroups) => {
            const updatedGroups =
              currentPage === 0 ? data.groups : [...prevGroups, ...data.groups];

            if (
              updatedGroups.length >= data.total ||
              data.groups.length === 0
            ) {
              setHasMore(false);
            } else {
              setHasMore(true);
            }

            return updatedGroups;
          });
        }
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchGroups(page, query);
  }, [page, query, fetchGroups]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGroups([]);
    setHasMore(true);
    if (page === 0) {
      setQuery(search);
    } else {
      setQuery(search);
      setPage(0);
    }
  };

  const lastGroupElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <Container>
      <AdminSideBar />
      <AppContainer>
        <h1>Todos os grupos ({total})</h1>

        <InputContainer as="form" onSubmit={handleSearchSubmit}>
          <GroupInput
            type="text"
            placeholder="Nome do grupo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton type="submit">
            <FiSearch size={20} />
          </SearchButton>
        </InputContainer>

        <GroupsListContainer>
          {groups.map((group, index) => {
            const isLastElement = groups.length === index + 1;
            return (
              <GroupContainer
                key={`${group.id}-${index}`}
                ref={isLastElement ? lastGroupElementRef : null}
              >
                <GroupCard href={`/admin/groups/${group.id}`}>
                  <GroupIconContainer>
                    <GroupIcon
                      src={
                        group?.group_avatar?.url
                          ? group.group_avatar.url
                          : "/avatar-placeholder.png"
                      }
                      onError={(e) => {
                        e.currentTarget.srcset = "/group-placeholder.png";
                        e.currentTarget.src = "/group-placeholder.png";
                      }}
                      width={75}
                      height={75}
                      alt="Group Icon"
                    />
                  </GroupIconContainer>
                  <h2>{group.name}</h2>
                  <GroupInfo>
                    <FiUsers size={14} />
                    <span>{group.participantsAmount || 0} membros</span>
                  </GroupInfo>
                </GroupCard>
              </GroupContainer>
            );
          })}
        </GroupsListContainer>

        {loading && <p>Carregando mais grupos...</p>}
      </AppContainer>
    </Container>
  );
};

export default AdminGroupsManager;
