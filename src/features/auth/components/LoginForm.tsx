"use client";

import { useState, useActionState } from "react";
import { cn } from "@/lib/utils";
import type { LoginRole } from "@/features/auth/types";
import { BusFront, GraduationCap, ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react";
import { loginAction } from "@/app/actions/auth";

const ROLES: { id: LoginRole; label: string; icon: React.ReactNode }[] = [
  { id: "parent", label: "Familiar", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "driver", label: "Conductor", icon: <BusFront className="w-4 h-4" /> },
  { id: "admin", label: "Admin", icon: <ShieldCheck className="w-4 h-4" /> },
];

export function LoginForm() {
  const [role, setRole] = useState<LoginRole>("parent");
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      {/* Card */}
      <div
        className="w-full max-w-md rounded-3xl shadow-xl overflow-hidden"
        style={{ background: "#ffffff" }}
      >
        {/* Top accent bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: "linear-gradient(90deg, #1E3A8A 60%, #EAB308 100%)" }}
        />

        <div className="p-8 sm:p-10">
          {/* Logo / Branding */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md"
              style={{ background: "linear-gradient(135deg, #1E3A8A, #3b5fcf)" }}
            >
              <BusFront className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className="text-xl font-bold leading-none tracking-tight"
                style={{ fontFamily: "Manrope, sans-serif", color: "#1E3A8A" }}
              >
                School Tracker
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Rutas Seguras. Tranquilidad total.
              </p>
            </div>
          </div>

          {/* Headline */}
          <h2
            className="text-2xl font-extrabold mb-1"
            style={{ fontFamily: "Manrope, sans-serif", color: "#191c1e" }}
          >
            Bienvenido de vuelta
          </h2>
          <p className="text-sm text-gray-500 mb-7">
            Ingresa al sistema según tu perfil asignado.
          </p>

          {/* Role Toggle */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
              Ingresar como…
            </label>
            <div
              className="flex rounded-2xl p-1 gap-1"
              style={{ background: "#f2f4f6" }}
            >
              {ROLES.map(({ id, label, icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRole(id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                    role === id
                      ? "text-white shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                  style={
                    role === id
                      ? {
                        background:
                          "linear-gradient(135deg, #1E3A8A, #2d52b8)",
                      }
                      : {}
                  }
                  aria-pressed={role === id}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-4">

            {state?.error && (
              <div aria-live="polite" className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-semibold rounded-xl text-center">
                {state.error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email-input"
                className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2"
              >
                Correo Electrónico
              </label>
              <div
                className="flex items-center rounded-2xl px-4 border-2 transition-colors focus-within:border-primary"
                style={{ background: "#eceef0" }}
              >
                <Mail className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
                <input
                  id="email-input"
                  name="email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  required
                  className="flex-1 bg-transparent outline-none text-sm py-3 text-on-surface placeholder-gray-400"
                  style={{ color: "#191c1e" }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password-input"
                className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2"
              >
                Contraseña
              </label>
              <div
                className="flex items-center rounded-2xl px-4 border-2 transition-colors focus-within:border-primary"
                style={{ background: "#eceef0" }}
              >
                <Lock className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="flex-1 bg-transparent outline-none text-sm py-3 text-on-surface placeholder-gray-400"
                  style={{ color: "#191c1e" }}
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={pending}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: pending
                  ? "#d1d5db"
                  : "linear-gradient(135deg, #EAB308, #ca9f06)",
                color: pending ? "#9ca3af" : "#1E3A8A",
              }}
            >
              {pending ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Autenticando…
                </>
              ) : (
                <>
                  Acceder al Sistema
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
