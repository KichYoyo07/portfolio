"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/SupabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Star, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Obtener todos los proyectos
        const { data: projects, error } = await supabase
          .from("projects")
          .select("id, featured");

        if (error) throw error;

        // Calcular estadísticas
        const totalProjects = projects?.length || 0;
        const featuredProjects = projects?.filter(p => p.featured)?.length || 0;

        setStats({
          totalProjects,
          featuredProjects,
        });
      } catch (err) {
        console.error("Error al obtener estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/admin/proyectos">
          <Button>
            Gestionar Proyectos
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proyectos</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "--" : stats.totalProjects}
            </div>
            <p className="text-xs text-muted-foreground">Proyectos en tu portafolio</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyectos Destacados</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "--" : stats.featuredProjects}
            </div>
            <p className="text-xs text-muted-foreground">Proyectos marcados como destacados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ver Portfolio</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-6">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Ver sitio público
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Guía Rápida</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-800 text-sm mr-3">1</span>
                <div>
                  <h3 className="font-medium">Gestionar Proyectos</h3>
                  <p className="text-sm text-gray-600">Añade, edita o elimina proyectos desde la sección de Proyectos.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-800 text-sm mr-3">2</span>
                <div>
                  <h3 className="font-medium">Destacar Proyectos</h3>
                  <p className="text-sm text-gray-600">Marca tus mejores proyectos como destacados para que aparezcan primero.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-800 text-sm mr-3">3</span>
                <div>
                  <h3 className="font-medium">Subir Imágenes</h3>
                  <p className="text-sm text-gray-600">Añade imágenes atractivas a tus proyectos usando el cargador de imágenes.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
