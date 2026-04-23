"use client";

import { useState } from "react";
import { User, Plus, Search, Mail, Phone, Shield, MoreVertical } from "lucide-react";
import { type User as AuthUser } from "@/app/actions/auth";
import { UserForm } from "./UserForm";

interface UserListProps {
  initialUsers: AuthUser[];
}

export function UserList({ initialUsers }: UserListProps) {
  const [users, setUsers] = useState<AuthUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const filteredUsers = users.filter((user) => {
    const term = searchQuery.toLowerCase();
    return (
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  });

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin": return "Administrador";
      case "driver": return "Conductor";
      case "guardian": return "Apoderado";
      case "school_staff": return "Personal";
      default: return role;
    }
  };

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-700";
      case "driver": return "bg-blue-100 text-blue-700";
      case "guardian": return "bg-emerald-100 text-emerald-700";
      case "school_staff": return "bg-amber-100 text-amber-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-sm"
            placeholder="Buscar por nombre, email o rol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center justify-center"
        >
          <Plus size={18} className="mr-2" />
          Crear Nuevo Usuario
        </button>
      </div>

      {/* Modal / Inline Form */}
      {isCreating && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <UserForm 
              onSuccess={() => setIsCreating(false)} 
              onCancel={() => setIsCreating(false)} 
            />
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/60 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold font-display uppercase shrink-0">
                          {user.first_name[0]}{user.last_name[0]}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-slate-800">{user.first_name} {user.last_name}</div>
                          <div className="text-sm text-slate-500 font-mono text-xs">{user.id.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-slate-600">
                          <Mail size={14} className="mr-2 text-slate-400" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center text-sm text-slate-500">
                            <Phone size={14} className="mr-2 text-slate-400" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleStyle(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.is_active ? (
                        <span className="inline-flex items-center text-sm text-emerald-600">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-sm text-slate-500">
                          <span className="w-2 h-2 rounded-full bg-slate-400 mr-2"></span>
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <User size={48} className="text-slate-300 mb-4" />
                      <p className="text-lg font-medium text-slate-700">No se encontraron usuarios</p>
                      <p className="text-sm mt-1">Intenta con otros términos de búsqueda.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
