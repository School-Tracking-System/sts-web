"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchApi } from "@/lib/api-client";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  is_active: boolean;
}

interface AuthResponse {
  user: User;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
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
    const payloadBase64 = data.tokens.access_token.split('.')[1];
    const payloadString = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const tokenData = JSON.parse(payloadString);
    const userRole = tokenData.role || data.user.role || "parent";

    // Guardar tokens de manera segura
    const cookieStore = await cookies();
    cookieStore.set("session_token", data.tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hora (o lo que dure el access token)
      path: "/",
    });

    cookieStore.set("refresh_token", data.tokens.refresh_token, {
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
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    isSuccess = true;
  } catch (error: any) {
    console.error("Login Server Action Error:", error);
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

export async function getUsersAction(role?: string): Promise<User[]> {
  try {
    const data = await fetchApi<User[]>(`/auth/users${role ? `?role=${role}` : ""}`, {
      method: "GET",
      requireAuth: true,
    });
    return data;
  } catch (error) {
    console.error("GetUsers Server Action Error:", error);
    return [];
  }
}

import { revalidatePath } from "next/cache";

export async function registerUserAction(
  prevState: any,
  formData: FormData
) {
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as string;

  if (!first_name || !last_name || !email || !password || !role) {
    return { error: "Todos los campos obligatorios deben estar llenos." };
  }

  try {
    await fetchApi<any>("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
        phone: phone || undefined,
        role,
      }),
    });
  } catch (error: any) {
    console.error("RegisterUser Server Action Error:", error.message);
    return { error: "Error al registrar el usuario: " + (error.message || "desconocido") };
  }

  revalidatePath("/dashboard/users");
  
  // We return success instead of redirecting so the modal can close
  return { success: true };
}
