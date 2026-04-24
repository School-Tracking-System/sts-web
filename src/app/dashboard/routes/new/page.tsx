import { Header } from "@/components/layout/header";
import { RouteForm } from "@/features/routes/components/RouteForm";
import { getSchoolsAction } from "@/app/actions/schools";
import { getVehiclesAction, getDriversAction } from "@/app/actions/fleet";

export default async function NewRoutePage() {
  const [schools, vehicles, drivers] = await Promise.all([
    getSchoolsAction(),
    getVehiclesAction(),
    getDriversAction()
  ]);

  return (
    <>
      <Header
        title="Creación de Ruta Operativa"
        subtitle="Planifica la operación de una ruta y asigna agentes de servicio"
      />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <RouteForm schools={schools} vehicles={vehicles} drivers={drivers} />
        </div>
      </main>
    </>
  );
}
