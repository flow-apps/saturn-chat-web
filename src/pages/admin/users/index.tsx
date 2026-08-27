import AdminSideBar from "@component/AdminSideBar";
import { AppContainer, Container } from "@styles/pages/admin";
import {
  InputContainer,
  SearchButton,
  UserAvatar,
  UserAvatarContainer,
  UserCard,
  UserContainer,
  UserInput,
  UsersListContainer,
} from "@styles/pages/admin/users";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { UserData } from "@_types/interfaces";
import { api } from "@services/api";

const DEFAULT_LIMIT = 50;

interface IResponseData {
  users: UserData[];
  total: number;
}

const AdminUsersManager: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [users, setUsers] = useState<UserData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchUsers = useCallback(async (currentPage: number, searchQuery: string) => {
    setLoading(true);
    try {
      const { status, data } = await api.get<IResponseData>("/admin/users", {
        params: {
          _page: currentPage,
          _limit: DEFAULT_LIMIT,
          query: searchQuery || undefined,
        },
      });

      if (status === 200) {
        setTotal(data.total);
        setUsers((prevUsers) => {
          const updatedUsers = currentPage === 0 ? data.users : [...prevUsers, ...data.users];
          
          if (updatedUsers.length >= data.total || data.users.length === 0) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          
          return updatedUsers;
        });
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(page, query);
  }, [page, query, fetchUsers]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([]);
    setHasMore(true);
    if (page === 0) {
      setQuery(search);
    } else {
      setQuery(search);
      setPage(0);
    }
  };

  const lastUserElementRef = useCallback(
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
        <h1>Todos os usuários ({total})</h1>

        <InputContainer as="form" onSubmit={handleSearchSubmit}>
          <UserInput
            type="text"
            placeholder="Nome de usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton type="submit">
            <FiSearch size={20} />
          </SearchButton>
        </InputContainer>

        <UsersListContainer>
          {users.map((user, index) => {
            const isLastElement = users.length === index + 1;
            return (
              <UserContainer
                key={`${user.id}-${index}`}
                ref={isLastElement ? lastUserElementRef : null}
              >
                <UserCard href={`/admin/users/${user.id}`}>
                  <UserAvatarContainer>
                    <UserAvatar
                      src={
                        user?.avatar?.url
                          ? user.avatar.url
                          : "/avatar-placeholder.png"
                      }
                      onError={(e) => {
                        e.currentTarget.srcset = "/avatar-placeholder.png";
                        e.currentTarget.src = "/avatar-placeholder.png";
                      }}
                      width={75}
                      height={75}
                      alt="User Avatar"
                    />
                  </UserAvatarContainer>
                  <h2>{user.name}</h2>
                  <p>@{user.nickname}</p>
                </UserCard>
              </UserContainer>
            );
          })}
        </UsersListContainer>

        {loading && <p>Carregando mais usuários...</p>}
      </AppContainer>
    </Container>
  );
};

export default AdminUsersManager;