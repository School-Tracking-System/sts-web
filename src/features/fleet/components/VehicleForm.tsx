"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VehicleForm as VehicleFormType, vehicleFormSchema } from "../schemas";
import { Truck, Users, Activity, Tag, AlertCircle, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { createVehicleAction } from "@/app/actions/fleet";

export function VehicleForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createVehicleAction, null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormType>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      status: "active",
      capacity: 15,
      year: new Date().getFullYear(),
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
          Unidad de Transporte
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plate */}
          <div className="space-y-2">
            <label htmlFor="plate" className="text-sm font-medium text-on-surface">
              Placa Oficial
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Tag size={16} />
              </div>
              <input
                id="plate"
                {...register("plate")}
                className="w-full uppercase pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface font-mono bg-surface-low/30"
                placeholder="ABC-1234"
              />
            </div>
            {errors.plate && (
              <p className="text-xs text-error font-medium">{errors.plate.message}</p>
            )}
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm font-medium text-on-surface">
              Marca
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Truck size={16} />
              </div>
              <input
                id="brand"
                {...register("brand")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. Toyota"
              />
            </div>
            {errors.brand && (
              <p className="text-xs text-error font-medium">{errors.brand.message}</p>
            )}
          </div>

          {/* Model */}
          <div className="space-y-2">
            <label htmlFor="model" className="text-sm font-medium text-on-surface">
              Modelo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Truck size={16} />
              </div>
              <input
                id="model"
                {...register("model")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Ej. Hiace"
              />
            </div>
            {errors.model && (
              <p className="text-xs text-error font-medium">{errors.model.message}</p>
            )}
          </div>

          {/* Year */}
          <div className="space-y-2">
            <label htmlFor="year" className="text-sm font-medium text-on-surface">
              Año
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Calendar size={16} />
              </div>
              <input
                id="year"
                type="number"
                {...register("year", { valueAsNumber: true })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="2024"
              />
            </div>
            {errors.year && (
              <p className="text-xs text-error font-medium">{errors.year.message}</p>
            )}
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <label htmlFor="capacity" className="text-sm font-medium text-on-surface">
              Capacidad (pasajeros)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Users size={16} />
              </div>
              <input
                id="capacity"
                type="number"
                {...register("capacity", { valueAsNumber: true })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="15"
              />
            </div>
            {errors.capacity && (
              <p className="text-xs text-error font-medium">{errors.capacity.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-on-surface">
              Estado inicial
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
                <option value="active">Operativo</option>
                <option value="maintenance">En mantenimiento</option>
                <option value="inactive">Inactivo</option>
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
          {isPending ? "Registrando..." : "Registrar vehículo"}
        </button>
      </div>
    </form>
  );
}
