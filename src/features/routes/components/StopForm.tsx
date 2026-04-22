"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StopModel, stopSchema } from "../schemas";
import { MapPin, Route, Clock, Hash, MapPinned } from "lucide-react";
import { useRouter } from "next/navigation";

export function StopForm() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StopModel>({
    resolver: zodResolver(stopSchema),
    defaultValues: {
      route_id: "1", // simulated default selection
      order: 1
    },
  });

  const onSubmit = async (data: StopModel) => {
    // Simulate API Create action
    console.log("Submitting Stop:", data);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard/stops");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Search Stop Geo */}
      <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm p-8">
        <h2 className="text-base font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4 flex items-center gap-2">
          <MapPinned size={18} className="text-primary" />
          Punto de Control
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="route_id" className="text-sm font-medium text-on-surface">Ruta Padre</label>
             <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Route size={16} />
              </div>
              <select
                id="route_id"
                {...register("route_id")}
                className="w-full pl-10 pr-4 py-2.5 appearance-none rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              >
                <option value="1">Ruta Norte 01</option>
                <option value="2">Ruta Sur-Centro</option>
              </select>
            </div>
            {errors.route_id && <p className="text-xs text-error font-medium">{errors.route_id.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-on-surface">Nombre referencial</label>
             <div className="relative">
              <input
                id="name"
                {...register("name")}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Terminal Terrestre"
              />
            </div>
            {errors.name && <p className="text-xs text-error font-medium">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="order" className="text-sm font-medium text-on-surface">Orden Secuencial (1, 2, 3...)</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Hash size={16} />
              </div>
              <input
                id="order"
                type="number"
                {...register("order", { valueAsNumber: true })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              />
            </div>
            {errors.order && <p className="text-xs text-error font-medium">{errors.order.message}</p>}
          </div>

           <div className="space-y-2">
            <label htmlFor="eta" className="text-sm font-medium text-on-surface">ETA - Hora programada</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <Clock size={16} />
              </div>
              <input
                id="eta"
                type="time"
                {...register("eta")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
              />
            </div>
            {errors.eta && <p className="text-xs text-error font-medium">{errors.eta.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="address" className="text-sm font-medium text-on-surface">Geolocalización / Dirección</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <MapPin size={16} />
              </div>
              <input
                id="address"
                {...register("address")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-on-surface bg-surface-low/30"
                placeholder="Av. Las Américas y Luis Cordero..."
              />
            </div>
            {errors.address && <p className="text-xs text-error font-medium">{errors.address.message}</p>}
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
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark active:scale-[0.98] rounded-xl transition-all shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Marcando..." : "Fijar Parada"}
        </button>
      </div>
    </form>
  );
}
