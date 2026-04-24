"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Filter, Loader2, ChevronDown } from "lucide-react";
import { RouteApi } from "../schemas";

interface RouteFilterProps {
  routes: RouteApi[];
  selectedRouteId?: string;
}

export function RouteFilter({ routes, selectedRouteId }: RouteFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleRouteChange = (routeId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (routeId) {
      params.set("routeId", routeId);
    } else {
      params.delete("routeId");
    }

    startTransition(() => {
      router.push(`/dashboard/stops?${params.toString()}`);
    });
  };

  return (
    <div className="relative flex-1 w-full max-w-md">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        {isPending ? (
          <Loader2 className="text-primary animate-spin" size={18} />
        ) : (
          <Filter className="text-on-surface-variant/70" size={18} />
        )}
      </div>

      <select
        value={selectedRouteId || ""}
        onChange={(e) => handleRouteChange(e.target.value)}
        disabled={isPending}
        className="
          w-full pl-10 pr-10 py-2.5 rounded-xl border border-outline-variant/60
          bg-white text-sm text-on-surface font-medium
          focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary
          transition-all appearance-none cursor-pointer
          disabled:opacity-70 disabled:cursor-not-allowed
        "
      >
        <option value="" disabled>Seleccionar ruta para ver paradas...</option>
        {routes.map((route) => (
          <option key={route.id} value={route.id}>
            {route.name} — {route.direction === 'to_school' ? 'Matutina' : 'Vespertina'}
          </option>
        ))}
      </select>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/50">
        <ChevronDown size={16} />
      </div>
    </div>
  );
}
