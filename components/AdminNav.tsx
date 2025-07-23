"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderKanban, Settings, LogOut } from "lucide-react";

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: FolderKanban, label: "Proyectos", href: "/admin/proyectos" },
    { icon: Settings, label: "Configuración", href: "/admin/configuracion" },
  ];

  return (
    <nav className="bg-white border-r border-gray-200 h-screen w-64 fixed left-0 top-0 px-3 py-6">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-xl font-bold">Portfolio Admin</h1>
      </div>

      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${isActive(item.href) 
              ? "bg-gray-100 text-gray-900 font-medium" 
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="absolute bottom-6 left-0 w-full px-3">
        <Link
          href="/"
          className="flex items-center px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors w-full">
          <LogOut className="w-5 h-5 mr-3" />
          Salir
        </Link>
      </div>
    </nav>
  );
}
