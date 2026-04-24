import { Header } from "@/components/layout/header";
import { StopForm } from "@/features/routes/components/StopForm";
import { getRoutesAction } from "@/app/actions/routes";
import { getStudentsAction } from "@/app/actions/students";
import { AlertCircle, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function NewStopPage() {
  const [routes, students] = await Promise.all([
    getRoutesAction(),
    getStudentsAction(),
  ]);

  const hasDependencies = routes.length > 0 && students.length > 0;

  return (
    <>
      <Header
        title="Configurar Parada"
        subtitle="Añade un nuevo punto de trazado en el mapa de recolección"
      />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {!hasDependencies ? (
            <div className="bg-surface-container/30 border border-outline-variant/40 rounded-3xl p-12 text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <AlertCircle size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-on-surface">Faltan Requisitos</h3>
                <p className="text-on-surface-variant text-sm max-w-md mx-auto">
                  Para configurar una parada, primero debes tener rutas registradas y estudiantes en el sistema.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {routes.length === 0 && (
                  <Link 
                    href="/dashboard/routes/new"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all"
                  >
                    <PlusCircle size={16} /> Crear Ruta
                  </Link>
                )}
                {students.length === 0 && (
                  <Link 
                    href="/dashboard/students/new"
                    className="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary rounded-xl text-sm font-semibold hover:bg-secondary-dark transition-all"
                  >
                    <PlusCircle size={16} /> Registrar Estudiante
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <StopForm routes={routes} students={students} />
          )}
        </div>
      </main>
    </>
  );
}
