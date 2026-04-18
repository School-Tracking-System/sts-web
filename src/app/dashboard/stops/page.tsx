import { Header } from "@/components/layout/header";
import { StopsTable } from "@/features/routes/components/StopsTable";
import { StopModel } from "@/features/routes/schemas";
import { Plus } from "lucide-react";
import Link from "next/link";

// Mock Data
async function getStops(): Promise<StopModel[]> {
  return [
    {
      id: "1",
      routeId: "1",
      name: "Terminal Terrestre (P1)",
      order: 1,
      eta: "06:00",
      address: "Av. de las Américas y Benjamín Rosales",
    },
    {
      id: "2",
      routeId: "1",
      name: "Av. Juan Tanca Marengo (P2)",
      order: 2,
      eta: "06:15",
      address: "Atrás del Mall del Sol",
    },
    {
      id: "3",
      routeId: "1",
      name: "Santuario Schoenstatt (P3)",
      order: 3,
      eta: "06:30",
      address: "Ciudadela Bellavista",
    },
  ];
}

export default async function StopsPage() {
  const stops = await getStops();

  return (
    <>
      <Header
        title="Puntos de Control (Paradas)"
        subtitle="Administra georreferencias y tiempos de paso por ruta"
      />

      <main className="flex-1 px-8 py-8 space-y-6">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full max-w-sm">
            {/* Si tuviéramos un input de búsqueda local iría aquí */}
          </div>
          
          <Link 
            href="/dashboard/stops/new"
            className="
              flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-[#EAB308] text-[#0f1b38] font-bold text-sm
              hover:bg-[#facc15] hover:shadow-lg hover:shadow-yellow-500/20
              active:scale-[0.98] transition-all duration-200
            "
          >
            <Plus size={18} strokeWidth={2.5} />
            Fijar Punto
          </Link>
        </div>

        {/* Table */}
        <StopsTable stops={stops} />
      </main>
    </>
  );
}
