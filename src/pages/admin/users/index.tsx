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
import { UserData } from "src/@types/interfaces";
import { api } from "src/services/api";

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

  const observer = useRef<IntersectionObserver | null>(null);

  const fetchUsers = useCallback(async (currentPage: number) => {
    setLoading(true);
    try {
      const { status, data } = await api.get<IResponseData>("/admin/users", {
        params: {
          page: currentPage,
          limit: DEFAULT_LIMIT,
        },
      });

      if (status === 200) {
        if (!total) {
          setTotal(data.total);
        }
        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers, ...data.users];
          if (updatedUsers.length >= data.total || data.users.length === 0) {
            setHasMore(false);
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
    fetchUsers(page);
  }, [page, fetchUsers]);

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
        <InputContainer>
          <UserInput type="text" placeholder="Nome de usuário..." />
          <SearchButton>
            <FiSearch size={20} />
          </SearchButton>
        </InputContainer>

        <UsersListContainer>
          {users.map((user, index) => {
            const isLastElement = users.length === index + 1;
            return (
              <UserContainer
                key={index}
                ref={isLastElement ? lastUserElementRef : null}
              >
                <UserCard href={`/admin/users/${user.id}`}>
                  <UserAvatarContainer>
                    <UserAvatar
                      src={
                        user?.avatar
                          ? user.avatar.url
                          : "/avatar-placeholder.png"
                      }
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
