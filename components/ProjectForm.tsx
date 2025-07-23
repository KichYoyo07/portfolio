"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { supabase } from "@/lib/SupabaseClient";
import { type Project } from "@/lib/SupabaseClient";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

// Esquema de validación
const projectSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  technologies: z.string().min(3, "Ingresa al menos una tecnología"),
  github_url: z.string().url("Ingresa una URL válida").or(z.string().length(0)),
  demo_url: z.string().url("Ingresa una URL válida").or(z.string().length(0)),
  featured: z.boolean().default(false),
  order_index: z.number().int().default(0)
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  onSuccess: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(project?.image_url || "");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
      ...project,
      technologies: project.technologies.join(", "),
    } : {
      title: "",
      description: "",
      technologies: "",
      github_url: "",
      demo_url: "",
      featured: false,
      order_index: 0
    }
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Preparar datos
      const projectData = {
        ...data,
        technologies: data.technologies.split(",").map(tech => tech.trim()),
        image_url: imageUrl
      };

      let response;

      if (project?.id) {
        // Actualizar proyecto existente
        response = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);
      } else {
        // Crear nuevo proyecto
        response = await supabase
          .from("projects")
          .insert([projectData]);
      }

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Éxito
      reset();
      onSuccess();
    } catch (err) {
      console.error("Error al guardar proyecto:", err);
      setError(err instanceof Error ? err.message : "Error al guardar el proyecto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title">Título del proyecto</Label>
        <Input
          id="title"
          {...register("title")}
          className="mt-1"
          placeholder="Mi proyecto increíble"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          {...register("description")}
          className="mt-1 min-h-32"
          placeholder="Una breve descripción de tu proyecto..."
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label>Imagen del proyecto</Label>
        <ImageUpload 
          onImageUploaded={handleImageUploaded}
          defaultImage={project?.image_url}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="technologies">Tecnologías (separadas por comas)</Label>
        <Input
          id="technologies"
          {...register("technologies")}
          className="mt-1"
          placeholder="React, TypeScript, Tailwind CSS"
        />
        {errors.technologies && (
          <p className="text-sm text-red-500 mt-1">{errors.technologies.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="github_url">URL de GitHub</Label>
          <Input
            id="github_url"
            {...register("github_url")}
            className="mt-1"
            placeholder="https://github.com/tuusuario/proyecto"
          />
          {errors.github_url && (
            <p className="text-sm text-red-500 mt-1">{errors.github_url.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="demo_url">URL de Demo</Label>
          <Input
            id="demo_url"
            {...register("demo_url")}
            className="mt-1"
            placeholder="https://miproyecto.com"
          />
          {errors.demo_url && (
            <p className="text-sm text-red-500 mt-1">{errors.demo_url.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            {...register("featured")}
            className="rounded text-gray-900 focus:ring-gray-900"
          />
          <Label htmlFor="featured" className="cursor-pointer">Destacar proyecto</Label>
        </div>

        <div>
          <Label htmlFor="order_index" className="mr-2">Orden:</Label>
          <Input
            id="order_index"
            type="number"
            {...register("order_index", { valueAsNumber: true })}
            className="inline-block w-20"
            min="0"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => reset()}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>{project ? "Actualizar" : "Guardar"} Proyecto</>
          )}
        </Button>
      </div>
    </form>
  );
}
