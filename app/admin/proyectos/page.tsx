"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectForm } from "@/components/ProjectForm";
import { supabase } from "@/lib/SupabaseClient";
import { type Project } from "@/lib/SupabaseClient";
import { PlusCircle, Edit, Trash2, Star, XCircle } from "lucide-react";

export default function AdminProyectos() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar proyectos
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error("Error al cargar proyectos:", err);
      setError(err instanceof Error ? err.message : "Error al cargar los proyectos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este proyecto?")) return;

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Actualizar lista de proyectos
      fetchProjects();
    } catch (err) {
      console.error("Error al eliminar proyecto:", err);
      alert("Error al eliminar el proyecto");
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ featured: !project.featured })
        .eq("id", project.id);

      if (error) throw error;

      // Actualizar lista de proyectos
      fetchProjects();
    } catch (err) {
      console.error("Error al actualizar proyecto:", err);
      alert("Error al actualizar el proyecto");
    }
  };

  const handleFormSuccess = () => {
    fetchProjects();
    setShowForm(false);
    setSelectedProject(null);
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administrar Proyectos</h1>
        <Button onClick={() => { setSelectedProject(null); setShowForm(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Proyecto
        </Button>
      </div>

      {showForm ? (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedProject ? "Editar Proyecto" : "Nuevo Proyecto"}
              </h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => { setShowForm(false); setSelectedProject(null); }}
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
            <ProjectForm 
              project={selectedProject || undefined} 
              onSuccess={handleFormSuccess} 
            />
          </CardContent>
        </Card>
      ) : null}

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <div className="grid gap-6">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hay proyectos. ¡Crea uno nuevo!
            </div>
          ) : (
            projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image_url || "/placeholder.svg"} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:col-span-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                        </div>
                        <span className="text-xs text-gray-500">ID: {project.id}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 my-3">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Orden: {project.order_index}</span>
                        {project.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" /> Destacado
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleFeatured(project)}
                        >
                          {project.featured ? "Quitar destacado" : "Destacar"}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
