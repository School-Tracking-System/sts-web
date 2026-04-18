import { Header } from "@/components/layout/header";
import { RouteForm } from "@/features/routes/components/RouteForm";

export default function NewRoutePage() {
  return (
    <>
      <Header
        title="Creación de Ruta Operativa"
        subtitle="Planifica la operación de una ruta y asigna agentes de servicio"
      />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <RouteForm />
        </div>
      </main>
    </>
  );
}
