"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DriverForm as DriverFormType, driverFormSchema } from "../schemas";
import { User, Phone, ShieldCheck, Activity, AlertCircle, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { createDriverAction } from "@/app/actions/fleet";
import { type User as AuthUser } from "@/app/actions/auth";

interface DriverFormProps {
  users: AuthUser[];
}

export function DriverForm({ users }: DriverFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createDriverAction, null);

  const {
    register,
    formState: { errors },
  } = useForm<DriverFormType>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      status: "active",
      license_type: "Tipo E",
    },
  });

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <div className="bg-error/10 text-error p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={18} />
          {state.error}
        </div>
      )}

      <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm p-8">
        <h2 className="text-base font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4">
          Perfil del Conductor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Selection */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="user_id" className="text-sm font-medium text-on-surface">
              Usuario del Sistema
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <User size={16} />
              </div>
              <select
                id="user_id"
                {...register("user_id")}
                className="w-full pl-10 pr-10 py-2.5 appearance-none rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              >
                <option value="">Seleccione un usuario...</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.first_name} {u.last_name} ({u.email})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-on-surface-variant">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {errors.user_id && (
              <p className="text-xs text-error font-medium">{errors.user_id.message}</p>
            )}
            <p className="text-[10px] text-on-surface-variant/70 italic">
              * Solo aparecen usuarios con rol de conductor.
            </p>
          </div>

          {/* Cedula ID */}
          <div className="space-y-2">
            <label htmlFor="cedula_id" className="text-sm font-medium text-on-surface">
              Cédula de Identidad
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <ShieldCheck size={16} />
              </div>
              <input
                id="cedula_id"
                {...register("cedula_id")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. 1712345678"
              />
            </div>
            {errors.cedula_id && (
              <p className="text-xs text-error font-medium">{errors.cedula_id.message}</p>
            )}
          </div>

          {/* Emergency Phone */}
          <div className="space-y-2">
            <label htmlFor="emergency_phone" className="text-sm font-medium text-on-surface">
              Teléfono de emergencia
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Phone size={16} />
              </div>
              <input
                id="emergency_phone"
                {...register("emergency_phone")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="+593 99 999 9999"
              />
            </div>
            {errors.emergency_phone && (
              <p className="text-xs text-error font-medium">{errors.emergency_phone.message}</p>
            )}
          </div>

          {/* License Expiry */}
          <div className="space-y-2">
            <label htmlFor="license_expiry" className="text-sm font-medium text-on-surface">
              Vencimiento de Licencia
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Calendar size={16} />
              </div>
              <input
                id="license_expiry"
                type="date"
                {...register("license_expiry")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              />
            </div>
            {errors.license_expiry && (
              <p className="text-xs text-error font-medium">{errors.license_expiry.message}</p>
            )}
          </div>

          {/* License Number */}
          <div className="space-y-2">
            <label htmlFor="license_number" className="text-sm font-medium text-on-surface">
              Número de Licencia
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <ShieldCheck size={16} />
              </div>
              <input
                id="license_number"
                {...register("license_number")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface font-mono tracking-wide bg-surface-low/30"
                placeholder="0912345678"
              />
            </div>
            {errors.license_number && (
              <p className="text-xs text-error font-medium">{errors.license_number.message}</p>
            )}
          </div>

          {/* License Type */}
          <div className="space-y-2">
            <label htmlFor="license_type" className="text-sm font-medium text-on-surface">
              Tipo de Licencia
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <ShieldCheck size={16} />
              </div>
              <select
                id="license_type"
                {...register("license_type")}
                className="w-full pl-10 pr-10 py-2.5 appearance-none rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              >
                <option value="Tipo B">Tipo B (Automóvil)</option>
                <option value="Tipo C">Tipo C (Camiones pequeños)</option>
                <option value="Tipo D">Tipo D (Servicio público/Bus)</option>
                <option value="Tipo E">Tipo E (Servicio pesado)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-on-surface-variant">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-on-surface">
              Estado operativo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Activity size={16} />
              </div>
              <select
                id="status"
                {...register("status")}
                className="w-full pl-10 pr-4 py-2.5 appearance-none rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              >
                <option value="active">Activo</option>
                <option value="on_leave">De permiso</option>
                <option value="inactive">Inactivo / Cese</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-on-surface-variant">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-low rounded-xl transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark active:scale-[0.98] rounded-xl transition-all shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? "Registrando..." : "Registrar conductor"}
        </button>
      </div>
    </form>
  );
}
