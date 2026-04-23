import { Header } from "@/components/layout/header";
import { DriverForm } from "@/features/fleet/components/DriverForm";
import { getUsersAction } from "@/app/actions/auth";

export default async function NewDriverPage() {
  const users = await getUsersAction("driver");

  return (
    <>
      <Header
        title="Incorporar Conductor"
        subtitle="Registra a un nuevo agente en el sistema"
      />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <DriverForm users={users} />
        </div>
      </main>
    </>
  );
}
