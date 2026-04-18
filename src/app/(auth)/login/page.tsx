import { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Login — School Tracker",
  description: "Access the School Tracker platform securely.",
};

export default function LoginPage() {
  return <LoginForm />;
}
