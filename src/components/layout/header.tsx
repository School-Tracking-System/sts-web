"use client";

import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-20
        flex items-center gap-4 px-8 h-16
        bg-surface/80 backdrop-blur-md
        border-b border-outline-variant/50
      "
    >
      {/* ── Page title ─────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-bold text-on-surface truncate leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-on-surface-variant mt-0.5 leading-none">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Actions ────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Search pill */}
        <button
          aria-label="Buscar"
          className="
            hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg
            text-sm text-on-surface-variant
            bg-surface-container hover:bg-surface-low
            border border-outline-variant/50
            transition-colors duration-200
          "
        >
          <Search size={14} strokeWidth={2} />
          <span className="text-xs">Buscar...</span>
          <kbd
            className="
              hidden lg:inline-flex items-center gap-0.5 ml-2
              px-1.5 py-0.5 rounded text-[10px]
              font-mono font-medium
              bg-surface-low border border-outline-variant/60
              text-on-surface-variant
            "
          >
            ⌘K
          </kbd>
        </button>

        {/* Notification bell */}
        <button
          aria-label="Notificaciones"
          className="
            relative flex items-center justify-center
            w-9 h-9 rounded-lg
            bg-surface-container hover:bg-surface-low
            border border-outline-variant/50
            text-on-surface-variant hover:text-on-surface
            transition-all duration-200 group
          "
        >
          <Bell
            size={16}
            className="transition-transform duration-200 group-hover:scale-110"
          />
          {/* unread badge */}
          <span
            aria-hidden="true"
            className="
              absolute top-1.5 right-1.5
              w-2 h-2 rounded-full bg-[#EAB308]
              ring-2 ring-surface
            "
          />
        </button>
      </div>
    </header>
  );
}
