import { Header } from "@/components/layout/header";
import { StopForm } from "@/features/routes/components/StopForm";

export default function NewStopPage() {
  return (
    <>
      <Header
        title="Configurar Parada"
        subtitle="Añade un nuevo punto de trazado en el mapa de recolección"
      />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <StopForm />
        </div>
      </main>
    </>
  );
}
