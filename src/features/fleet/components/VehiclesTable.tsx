import { Vehicle } from "../schemas";
import { Truck, Users, MoreVertical, Wrench } from "lucide-react";

interface VehiclesTableProps {
  vehicles: Vehicle[];
}

export function VehiclesTable({ vehicles }: VehiclesTableProps) {
  const getStatusUi = (status: Vehicle["status"]) => {
    switch (status) {
      case "active":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          dot: "bg-emerald-500",
          label: "Operativo",
        };
      case "maintenance":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          dot: "bg-amber-500",
          label: "En revisión",
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
                Unidad
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider hidden sm:table-cell">
                Capacidad
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
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                  No hay unidades registradas en la flota.
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle) => {
                const ui = getStatusUi(vehicle.status);
                return (
                  <tr 
                    key={vehicle.id}
                    className="hover:bg-surface-low/40 transition-colors group"
                  >
                    {/* Placa y modelo */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 mt-0.5">
                          {vehicle.status === "maintenance" ? (
                            <Wrench size={18} strokeWidth={2} />
                          ) : (
                            <Truck size={20} strokeWidth={2} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface font-mono tracking-wide group-hover:text-primary transition-colors">
                            {vehicle.plate}
                          </p>
                          <p className="text-xs text-on-surface-variant mt-1.5 uppercase font-medium tracking-wider">
                            {[vehicle.brand, vehicle.model, vehicle.year].filter(Boolean).join(' ')}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Capacidad */}
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-50 text-orange-600">
                          <Users size={14} />
                        </div>
                        <span className="text-sm font-medium text-on-surface">
                          {vehicle.capacity} pax
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
