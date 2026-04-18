import { Header } from "@/components/layout/header";
import { DriversTable } from "@/features/fleet/components/DriversTable";
import { getDriversAction } from "@/app/actions/fleet";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DriversPage() {
  const drivers = await getDriversAction();

  return (
    <>
      <Header
        title="Personal de Conducción"
        subtitle="Asigna vehículos y supervisa a tus conductores"
      />

      <main className="flex-1 px-8 py-8 space-y-6">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full max-w-sm">
            {/* Si tuviéramos un input de búsqueda local iría aquí */}
          </div>
          
          <Link 
            href="/dashboard/fleet/drivers/new"
            className="
              flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-[#EAB308] text-[#0f1b38] font-bold text-sm
              hover:bg-[#facc15] hover:shadow-lg hover:shadow-yellow-500/20
              active:scale-[0.98] transition-all duration-200
            "
          >
            <Plus size={18} strokeWidth={2.5} />
            Agente Nuevo
          </Link>
        </div>

        {/* Table */}
        <DriversTable drivers={drivers} />
      </main>
    </>
  );
}
