import { Header } from "@/components/layout/header";
import { DriverForm } from "@/features/fleet/components/DriverForm";

export default function NewDriverPage() {
  return (
    <>
      <Header
        title="Incorporar Conductor"
        subtitle="Registra a un nuevo agente en el sistema"
      />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <DriverForm />
        </div>
      </main>
    </>
  );
}
