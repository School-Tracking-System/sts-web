import { Header } from "@/components/layout/header";
import { StopsTable } from "@/features/routes/components/StopsTable";
import { RouteFilter } from "@/features/routes/components/RouteFilter";
import { getRoutesAction, getRouteStopsAction } from "@/app/actions/routes";
import { getStudentsAction } from "@/app/actions/students";
import { StopApi } from "@/features/routes/schemas";
import { Plus, MapPin } from "lucide-react";
import Link from "next/link";

export default async function StopsPage({
  searchParams,
}: {
  searchParams: Promise<{ routeId?: string }>;
}) {
  const [routes, students, resolvedSearchParams] = await Promise.all([
    getRoutesAction(),
    getStudentsAction(),
    searchParams,
  ]);

  const selectedRouteId = resolvedSearchParams.routeId || (routes.length > 0 ? routes[0].id : undefined);
  
  let stops: StopApi[] = [];
  if (selectedRouteId) {
    stops = await getRouteStopsAction(selectedRouteId);
  }

  return (
    <div className="min-h-screen bg-surface-lowest flex flex-col">
      <Header
        title="Gestión de Paradas"
        subtitle="Optimiza los tiempos y ubicaciones de recolección"
      />

      <main className="flex-1 px-8 py-8 space-y-6">
        {/* Barra de Acciones Reactiva */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
          <RouteFilter routes={routes} selectedRouteId={selectedRouteId} />
          
          <Link 
            href="/dashboard/stops/new"
            className="
              flex items-center gap-2 px-6 py-2.5 rounded-xl
              bg-[#EAB308] text-[#0f1b38] font-bold text-sm
              hover:shadow-lg hover:shadow-yellow-500/20
              active:scale-[0.98] transition-all duration-200
              w-full md:w-auto justify-center
            "
          >
            <Plus size={18} strokeWidth={2.5} />
            Nueva Parada
          </Link>
        </div>

        {/* Sección de Tabla con Empty State mejorado */}
        {routes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-outline-variant/50">
             <MapPin size={48} className="text-on-surface-variant/30 mb-4" />
             <h3 className="text-lg font-bold text-on-surface">No hay rutas configuradas</h3>
             <p className="text-on-surface-variant text-sm mb-6">Debes crear una ruta antes de poder asignar paradas.</p>
             <Link href="/dashboard/routes" className="text-primary font-bold hover:underline">Ir a Rutas</Link>
          </div>
        ) : (
          <StopsTable stops={stops} students={students} />
        )}
      </main>
    </div>
  );
}
