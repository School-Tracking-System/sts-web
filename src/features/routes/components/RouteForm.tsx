"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouteForm as RouteFormType, routeFormSchema } from "../schemas";
import { Route as RouteIcon, Clock, Navigation, CarFront, Building, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createRouteAction } from "@/app/actions/routes";

export function RouteForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createRouteAction, null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RouteFormType>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: {
      direction: "to_school",
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

      {/* Route Info */}
      <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm p-8">
        <h2 className="text-base font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4 flex items-center gap-2">
          <Navigation size={18} className="text-primary" />
          Especificaciones de la Ruta
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-on-surface">Nombre de la Ruta</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <RouteIcon size={16} />
              </div>
              <input
                id="name"
                {...register("name")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. Guayaquil Norte 01"
              />
            </div>
            {errors.name && <p className="text-xs text-error font-medium">{errors.name.message}</p>}
          </div>

          {/* School ID */}
          <div className="space-y-2">
            <label htmlFor="school_id" className="text-sm font-medium text-on-surface">Colegio</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Building size={16} />
              </div>
              <select
                id="school_id"
                {...register("school_id")}
                className="w-full pl-10 pr-4 py-2.5 appearance-none rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              >
                <option value="">-- Seleccionar Colegio --</option>
                <option value="1">Colegio San Marcos</option>
                <option value="2">Unidad Educativa Bilingüe Internacional</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-on-surface-variant">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {errors.school_id && <p className="text-xs text-error font-medium">{errors.school_id.message}</p>}
          </div>

          {/* Direction */}
          <div className="space-y-2">
            <label htmlFor="direction" className="text-sm font-medium text-on-surface">Sentido</label>
            <select
              id="direction"
              {...register("direction")}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
            >
              <option value="to_school">Hacia el Colegio (Recogida)</option>
              <option value="from_school">Desde el Colegio (Retorno)</option>
            </select>
            {errors.direction && <p className="text-xs text-error font-medium">{errors.direction.message}</p>}
          </div>

          {/* Schedule Time */}
          <div className="space-y-2">
            <label htmlFor="schedule_time" className="text-sm font-medium text-on-surface">Horario de Inicio</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Clock size={16} />
              </div>
              <input
                id="schedule_time"
                type="time"
                {...register("schedule_time")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              />
            </div>
            {errors.schedule_time && <p className="text-xs text-error font-medium">{errors.schedule_time.message}</p>}
          </div>
        </div>
      </div>

       <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm p-8">
        <h2 className="text-base font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4 flex items-center gap-2">
          <CarFront size={18} className="text-primary" />
          Unidad de Transporte (Opcional)
        </h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label htmlFor="vehicle_id" className="text-sm font-medium text-on-surface">Vehículo</label>
                <div className="relative">
                  <select
                    id="vehicle_id"
                    {...register("vehicle_id")}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30 appearance-none"
                  >
                    <option value="">-- Sin asignar --</option>
                    <option value="1">PBB-1290 (Mercedes-Benz 22p)</option>
                    <option value="2">XAC-9428 (Hino AK 45p)</option>
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
          {isPending ? "Guardando..." : "Crear Ruta"}
        </button>
      </div>
    </form>
  );
}
