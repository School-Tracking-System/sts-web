import { Driver } from "../schemas";
import { UserCircle, ShieldCheck, Phone, MoreVertical } from "lucide-react";

interface DriversTableProps {
  drivers: Driver[];
}

export function DriversTable({ drivers }: DriversTableProps) {
  const getStatusUi = (status: Driver["status"]) => {
    switch (status) {
      case "active":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
          label: "Activo",
        };
      case "on_leave":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          dot: "bg-blue-500",
          label: "De permiso",
        };
      case "inactive":
        return {
          bg: "bg-surface-container",
          text: "text-on-surface-variant",
          dot: "bg-outline-variant",
          label: "Inactivo",
        };
    }
  };

  return (
    <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-low/50 border-b border-outline-variant/40">
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Conductor
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider hidden md:table-cell">
                Licencia
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {drivers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                  No hay conductores registrados en la plataforma.
                </td>
              </tr>
            ) : (
              drivers.map((driver) => {
                const ui = getStatusUi(driver.status);
                return (
                  <tr 
                    key={driver.id}
                    className="hover:bg-surface-low/40 transition-colors group"
                  >
                    {/* Perfil */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-surface-low text-on-surface-variant border border-outline-variant/50">
                          <UserCircle size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                            {/* Name may be absent in API listing — fall back to license */}
                            {driver.first_name && driver.last_name
                              ? `${driver.first_name} ${driver.last_name}`
                              : driver.license_number}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-1.5">
                            <Phone size={12} className="shrink-0" />
                            <span>{driver.phone ?? "—"}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Licencia */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-primary/70" />
                        <span className="text-sm font-mono text-on-surface font-medium tracking-wide">
                          {driver.license_number}
                        </span>
                      </div>
                    </td>

                    {/* Estado */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${ui.bg} ${ui.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${ui.dot}`} />
                        {ui.label}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 rounded-lg text-on-surface-variant hover:bg-surface hover:text-on-surface transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
