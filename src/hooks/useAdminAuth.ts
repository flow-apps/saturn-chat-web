import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "src/services/api";
import { UserData } from "src/@types/interfaces";

export function useAdminAuth() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdminPermissions() {
      try {
        const { status, data } = await api.get<UserData>("/users/@me");

        if (status === 200) {
          if (data.type !== "ADMIN") {
            router.replace("/");
            return;
          }

          setUser(data);
        }
      } catch (error) {
        console.error("Erro ao validar permissões de admin:", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAdminPermissions();
  }, [router]);

  return { user, loading };
}
