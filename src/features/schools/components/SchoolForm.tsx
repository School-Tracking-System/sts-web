"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchoolForm as SchoolFormType, schoolFormSchema } from "../schemas";
import { Building2, Mail, MapPin, Phone, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createSchoolAction } from "@/app/actions/schools";

export function SchoolForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createSchoolAction, null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchoolFormType>({
    resolver: zodResolver(schoolFormSchema),
  });

  const onSubmit = async () => {
    // handleSubmit will validate, and if passes, we can just let the form submit 
    // but we want to use Server Actions with useFormState
  };

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
          Información Principal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-on-surface">
              Nombre de la institución
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Building2 size={16} />
              </div>
              <input
                id="name"
                {...register("name")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. Colegio San Marcos"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-error font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-on-surface">
              Dirección detallada
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <MapPin size={16} />
              </div>
              <input
                id="address"
                {...register("address")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. Av. Principal #123, Ciudad"
              />
            </div>
            {errors.address && (
              <p className="text-xs text-error font-medium">{errors.address.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="contactEmail" className="text-sm font-medium text-on-surface">
              Email de contacto
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Mail size={16} />
              </div>
              <input
                id="contact_email"
                type="email"
                {...register("contact_email")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="contacto@colegio.edu"
              />
            </div>
            {errors.contact_email && (
              <p className="text-xs text-error font-medium">{errors.contact_email.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label htmlFor="contactPhone" className="text-sm font-medium text-on-surface">
              Teléfono
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Phone size={16} />
              </div>
              <input
                id="contact_phone"
                {...register("contact_phone")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="+593 999 999 999"
              />
            </div>
            {errors.contact_phone && (
              <p className="text-xs text-error font-medium">{errors.contact_phone.message}</p>
            )}
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
          {isPending ? "Registrando..." : "Registrar colegio"}
        </button>
      </div>
    </form>
  );
}
