import { Header } from "@/components/layout/header";
import { SchoolForm } from "@/features/schools/components/SchoolForm";

export default function NewSchoolPage() {
  return (
    <>
      <Header
        title="Nuevo Colegio"
        subtitle="Registra una nueva institución en el sistema"
      />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <SchoolForm />
        </div>
      </main>
    </>
  );
}
