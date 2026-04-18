"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentForm as StudentFormType, studentFormSchema } from "../schemas";
import { User, Phone, MapPin, Building2, BookUser, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createStudentAction } from "@/app/actions/students";
import { SchoolApi } from "@/features/schools/schemas";

interface StudentFormProps {
  schools: SchoolApi[];
}

export function StudentForm({ schools }: StudentFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createStudentAction, null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormType>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      status: "active",
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

      {/* Student Profile */}
      <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm p-8">
        <h2 className="text-base font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4 flex items-center gap-2">
          <BookUser size={18} className="text-primary" />
          Perfil del Alumno
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="first_name" className="text-sm font-medium text-on-surface">Nombre</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <User size={16} />
              </div>
              <input
                id="first_name"
                {...register("first_name")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. Luis"
              />
            </div>
            {errors.first_name && <p className="text-xs text-error font-medium">{errors.first_name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="last_name" className="text-sm font-medium text-on-surface">Apellido</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <User size={16} />
              </div>
              <input
                id="last_name"
                {...register("last_name")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. Ramírez"
              />
            </div>
            {errors.last_name && <p className="text-xs text-error font-medium">{errors.last_name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="cedula_id" className="text-sm font-medium text-on-surface">Cédula / Pasaporte</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <BookUser size={16} />
              </div>
              <input
                id="cedula_id"
                {...register("cedula_id")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. 1712345678"
              />
            </div>
            {errors.cedula_id && <p className="text-xs text-error font-medium">{errors.cedula_id.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="school_id" className="text-sm font-medium text-on-surface">Colegio Asignado</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Building2 size={16} />
              </div>
              <select
                id="school_id"
                {...register("school_id")}
                className="w-full pl-10 pr-4 py-2.5 appearance-none rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              >
                <option value="">-- Seleccionar Colegio --</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-on-surface-variant">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {errors.school_id && <p className="text-xs text-error font-medium">{errors.school_id.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="grade" className="text-sm font-medium text-on-surface">Grado / Paralelo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <BookUser size={16} />
              </div>
              <input
                id="grade"
                {...register("grade")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. 1ro de Básica 'A'"
              />
            </div>
            {errors.grade && <p className="text-xs text-error font-medium">{errors.grade.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="pickup_address" className="text-sm font-medium text-on-surface">Dirección Residencial</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <MapPin size={16} />
              </div>
              <input
                id="pickup_address"
                {...register("pickup_address")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Calle, Barrio, Referencia..."
              />
            </div>
            {errors.pickup_address && <p className="text-xs text-error font-medium">{errors.pickup_address.message}</p>}
          </div>
        </div>
      </div>

      {/* Parent Information */}
      <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm p-8">
        <h2 className="text-base font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4">
          Representante Legal / Tutor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="parent_name" className="text-sm font-medium text-on-surface">Nombre del Tutor</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <User size={16} />
              </div>
              <input
                id="parent_name"
                {...register("parent_name")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Nombre del apoderado"
              />
            </div>
            {errors.parent_name && <p className="text-xs text-error font-medium">{errors.parent_name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="parent_phone" className="text-sm font-medium text-on-surface">Teléfono de Emergencia</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Phone size={16} />
              </div>
              <input
                id="parent_phone"
                {...register("parent_phone")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="+593 999 999 999"
              />
            </div>
            {errors.parent_phone && <p className="text-xs text-error font-medium">{errors.parent_phone.message}</p>}
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
          {isPending ? "Registrando..." : "Registrar alumno"}
        </button>
      </div>
    </form>
  );
}
