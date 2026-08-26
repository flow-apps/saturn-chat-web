// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "src/services/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const { email, password } = req.body;

    const response = await api.post("/auth", { email, password });
    const { token, user } = response.data;

    // Define as flags do cookie
    const isProduction = process.env.NODE_ENV === "production";
    const maxAge = 60 * 60 * 24 * 3; // 3 dias em segundos

    res.setHeader(
      "Set-Cookie",
      `@SaturnChat:token=Bearer ${token}; Path=/; Max-Age=${maxAge}; SameSite=Strict${
        isProduction ? "; Secure" : ""
      }`,
    );

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Falha na autenticação",
    });
  }
}
