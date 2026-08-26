import { Container } from "@styles/pages/login";
import React, { FormEvent, useState } from "react";
import { api, nextApi } from "src/services/api";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await nextApi.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <Container>
      <h1>Página de login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" id="email-input" />
        <input type="password" name="password" id="" />
        <button type="submit">Fazer Login</button>
      </form>
    </Container>
  );
};

export default LoginPage;
