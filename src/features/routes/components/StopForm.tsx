"use client";

import { useActionState, useEffect } from "react";
import { RouteApi } from "../schemas";
import { StudentApi } from "@/features/students/schemas";
import { MapPin, Route, Clock, Hash, MapPinned, User, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { addStopAction, FormState } from "@/app/actions/routes";

interface StopFormProps {
  routes: RouteApi[];
  students: StudentApi[];
}

const initialState: FormState = {
  message: null,
  errors: {},
};

export function StopForm({ routes, students }: StopFormProps) {
  const router = useRouter();
  const [state, action, pending] = useActionState(addStopAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard/stops");
    }
  }, [state.success, router]);

  return (
    <form action={action} className="space-y-8">
      {state.message && !state.success && (
        <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={16} />
          {state.message}
        </div>
      )}

      {/* Configuration Section */}
      <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm p-8 transition-all hover:shadow-md">
        <h2 className="text-base font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4 flex items-center gap-2">
          <MapPinned size={18} className="text-primary" />
          Configuración de Parada
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Route Selection */}
          <div className="space-y-2">
            <label htmlFor="route_id" className="text-sm font-semibold text-on-surface">Ruta de Asignación</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Route size={16} />
              </div>
              <select
                id="route_id"
                name="route_id"
                defaultValue={routes.length > 0 ? routes[0].id : ""}
                className={`w-full pl-10 pr-4 py-2.5 appearance-none rounded-xl border ${state.errors?.route_id ? 'border-error' : 'border-outline-variant/60'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30`}
              >
                <option value="">Seleccione una ruta...</option>
                {routes.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.direction === "to_school" ? "Entrada" : "Salida"})</option>
                ))}
              </select>
            </div>
            {state.errors?.route_id && (
              <p className="text-xs text-error font-medium mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {state.errors.route_id[0]}
              </p>
            )}
          </div>

          {/* Student Selection */}
          <div className="space-y-2">
            <label htmlFor="student_id" className="text-sm font-semibold text-on-surface">Estudiante</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <User size={16} />
              </div>
              <select
                id="student_id"
                name="student_id"
                className={`w-full pl-10 pr-4 py-2.5 appearance-none rounded-xl border ${state.errors?.student_id ? 'border-error' : 'border-outline-variant/60'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30`}
              >
                <option value="">Seleccione un estudiante...</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
                ))}
              </select>
            </div>
            {state.errors?.student_id && (
              <p className="text-xs text-error font-medium mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {state.errors.student_id[0]}
              </p>
            )}
          </div>

          {/* Sequential Order */}
          <div className="space-y-2">
            <label htmlFor="order" className="text-sm font-semibold text-on-surface">Orden Secuencial</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Hash size={16} />
              </div>
              <input
                id="order"
                name="order"
                type="number"
                defaultValue={1}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${state.errors?.order ? 'border-error' : 'border-outline-variant/60'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30`}
              />
            </div>
            {state.errors?.order && (
              <p className="text-xs text-error font-medium mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {state.errors.order[0]}
              </p>
            )}
          </div>

          {/* ETA */}
          <div className="space-y-2">
            <label htmlFor="eta" className="text-sm font-semibold text-on-surface">Hora Estimada (ETA)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Clock size={16} />
              </div>
              <input
                id="eta"
                name="eta"
                type="time"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${state.errors?.eta ? 'border-error' : 'border-outline-variant/60'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30`}
              />
            </div>
            {state.errors?.eta && (
              <p className="text-xs text-error font-medium mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {state.errors.eta[0]}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="address" className="text-sm font-semibold text-on-surface">Dirección / Referencia</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <MapPin size={16} />
              </div>
              <input
                id="address"
                name="address"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${state.errors?.address ? 'border-error' : 'border-outline-variant/60'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30`}
                placeholder="Ej. Calle 123 y Av. Principal"
              />
            </div>
            {state.errors?.address && (
              <p className="text-xs text-error font-medium mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {state.errors.address[0]}
              </p>
            )}
          </div>

          {/* Coordinates */}
          <div className="space-y-2">
            <label htmlFor="latitude" className="text-sm font-semibold text-on-surface">Latitud</label>
            <input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              placeholder="-2.8974"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="longitude" className="text-sm font-semibold text-on-surface">Longitud</label>
            <input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              placeholder="-79.0045"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-low rounded-xl transition-colors disabled:opacity-50"
          disabled={pending}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark active:scale-[0.98] rounded-xl transition-all shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {pending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            "Crear Parada"
          )}
        </button>
      </div>
    </form>
  );
}
