import { Header } from "@/components/layout/header";
import { StudentForm } from "@/features/students/components/StudentForm";
import { getSchoolsAction } from "@/app/actions/schools";

export default async function NewStudentPage() {
  const schools = await getSchoolsAction();

  return (
    <>
      <Header
        title="Matrícula y Asignación"
        subtitle="Registra a un estudiante y emparenta la información familiar"
      />

      <main className="flex-1 px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <StudentForm schools={schools} />
        </div>
      </main>
    </>
  );
}
