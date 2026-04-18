"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  School,
  Truck,
  Users,
  Route,
  MapPin,
  GraduationCap,
  LogOut,
  Bus,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

/* ─── Navigation items ─────────────────────────────────────────── */
const navGroups = [
  {
    label: "General",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Gestión",
    items: [
      { href: "/dashboard/schools", label: "Colegios", icon: School },
      { href: "/dashboard/students", label: "Alumnos", icon: GraduationCap },
    ],
  },
  {
    label: "Flota",
    items: [
      { href: "/dashboard/fleet/vehicles", label: "Vehículos", icon: Truck },
      { href: "/dashboard/fleet/drivers", label: "Conductores", icon: Users },
    ],
  },
  {
    label: "Operaciones",
    items: [
      { href: "/dashboard/routes", label: "Rutas", icon: Route },
      { href: "/dashboard/stops", label: "Paradas", icon: MapPin },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="
        flex flex-col w-64 shrink-0 h-screen sticky top-0
        bg-[#0f1b38] text-white overflow-y-auto
        border-r border-white/5
      "
    >
      {/* ── Brand ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
        <div
          className="
            flex items-center justify-center w-9 h-9 rounded-xl
            bg-[#EAB308] text-[#0f1b38] shadow-lg shadow-yellow-500/30
          "
        >
          <Bus size={18} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[13px] font-bold leading-tight tracking-wide text-white">
            Academic
          </p>
          <p className="text-[11px] font-semibold leading-tight tracking-widest text-white/40 uppercase">
            Pulse
          </p>
        </div>
      </div>

      {/* ── Nav groups ────────────────────────────────────────── */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`
                        group flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-sm font-medium transition-all duration-200
                        ${
                          active
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-white/55 hover:bg-white/5 hover:text-white/90"
                        }
                      `}
                    >
                      <Icon
                        size={16}
                        strokeWidth={active ? 2.5 : 2}
                        className={`
                          shrink-0 transition-transform duration-200
                          group-hover:scale-110
                          ${active ? "text-[#EAB308]" : ""}
                        `}
                      />
                      {label}
                      {active && (
                        <span className="ml-auto w-1 h-1 rounded-full bg-[#EAB308]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Bottom: user + logout ─────────────────────────────── */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2">
          <div
            className="
              w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600
              flex items-center justify-center text-xs font-bold text-white
              shrink-0
            "
          >
            A
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">Admin</p>
            <p className="text-[10px] text-white/40 truncate">admin@school.com</p>
          </div>
        </div>
        <button
          onClick={() => logoutAction()}
          className="
            group flex w-full items-center gap-3 px-3 py-2.5 rounded-lg
            text-sm font-medium text-white/40
            hover:bg-red-500/10 hover:text-red-400
            transition-all duration-200
          "
        >
          <LogOut
            size={15}
            className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
