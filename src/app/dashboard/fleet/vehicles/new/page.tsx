import { Header } from "@/components/layout/header";
import { VehicleForm } from "@/features/fleet/components/VehicleForm";

export default function NewVehiclePage() {
  return (
    <>
      <Header
        title="Incorporar Unidad"
        subtitle="Registra un nuevo vehículo a la flota operativa"
      />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <VehicleForm />
        </div>
      </main>
    </>
  );
}
