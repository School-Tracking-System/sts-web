"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchApi } from "@/lib/api-client";

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Por favor provea correo y contraseña." };
  }

  let isSuccess = false;

  try {
    const data = await fetchApi<AuthResponse>("/auth/login", {
      method: "POST",
      requireAuth: false,
      body: JSON.stringify({ email, password }),
    });

    // Extraer role de la carga útil del JWT
    const payloadBase64 = data.access_token.split('.')[1];
    const payloadString = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const tokenData = JSON.parse(payloadString);
    const userRole = tokenData.role || "parent"; // Fallback seguro

    // Guardar tokens de manera segura
    const cookieStore = await cookies();
    cookieStore.set("session_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hora (o lo que dure el access token)
      path: "/",
    });

    cookieStore.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    });

    // Save user role for UI layouting 
    cookieStore.set("user_role", userRole, {
      httpOnly: false, // exposed for frontend usage if needed
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    isSuccess = true;
  } catch (error: any) {
    console.error("Login Server Action Error:", error.message);
    return { error: "Credenciales inválidas o el servicio no está disponible." };
  }

  if (isSuccess) {
    redirect("/dashboard");
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("user_role");
  redirect("/login");
}
