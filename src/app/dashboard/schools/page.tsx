import { Header } from "@/components/layout/header";
import { SchoolsTable } from "@/features/schools/components/SchoolsTable";
import { School } from "@/features/schools/schemas";
import { Plus } from "lucide-react";
import Link from "next/link";

import { fetchApi } from "@/lib/api-client";

// Retrieve Schools directly from API Gateway securely using Server Components
async function getSchools(): Promise<School[]> {
  try {
    // Calling protected REST route through the Next.js API wrapper
    const data = await fetchApi<{ schools: School[] } | School[]>("/fleet/schools");
    
    // Depending on standard backend payload response envelope
    return Array.isArray(data) ? data : (data?.schools || []);
  } catch (error) {
    console.error("Failed to load schools:", error);
    return [];
  }
}

export default async function SchoolsPage() {
  const schools = await getSchools();

  return (
    <>
      <Header
        title="Gestión de Colegios"
        subtitle="Administra las instituciones registradas en la plataforma"
      />

      <main className="flex-1 px-8 py-8 space-y-6">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full max-w-sm">
            {/* Si tuviéramos un input de búsqueda local iría aquí */}
          </div>
          
          <Link 
            href="/dashboard/schools/new"
            className="
              flex items-center gap-2 px-5 py-2.5 rounded-xl
              bg-[#EAB308] text-[#0f1b38] font-bold text-sm
              hover:bg-[#facc15] hover:shadow-lg hover:shadow-yellow-500/20
              active:scale-[0.98] transition-all duration-200
            "
          >
            <Plus size={18} strokeWidth={2.5} />
            Añadir Colegio
          </Link>
        </div>

        {/* Table */}
        <SchoolsTable schools={schools} />
      </main>
    </>
  );
}
