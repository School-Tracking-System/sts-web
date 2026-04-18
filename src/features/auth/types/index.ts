export type LoginRole = "parent" | "driver" | "admin";

export interface LoginPayload {
  role: LoginRole;
  phone: string;
}
