import { Users } from "lucide-react";
import { getUsersAction } from "@/app/actions/auth";
import { UserList } from "@/features/users/components/UserList";

export const metadata = {
  title: "Gestión de Usuarios | Academic Curator",
  description: "Administración de usuarios del sistema",
};

export default async function UsersPage() {
  const users = await getUsersAction();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-800 tracking-tight flex items-center">
            <Users className="mr-3 text-blue-600" size={32} />
            Usuarios del Sistema
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl text-lg leading-relaxed">
            Gestione los accesos y roles de administradores, conductores, personal de la escuela y apoderados.
          </p>
        </div>
      </div>

      <UserList initialUsers={users} />
    </div>
  );
}
