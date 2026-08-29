import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@services/api";
import { UserData } from "@_types/interfaces";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { status, data } = await api.get<UserData>("/users/@me");

        if (status === 200) {
          setUser(data);
        }
      } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
}
