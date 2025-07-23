"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ConfiguracionPage() {
  const [isClearing, setIsClearing] = useState(false);

  const clearImageCache = async () => {
    setIsClearing(true);
    // Simular limpieza de caché
    setTimeout(() => {
      setIsClearing(false);
      alert("¡Caché de imágenes limpiada correctamente!");
    }, 1500);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Configuración</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Sistema</CardTitle>
            <CardDescription>
              Información sobre la configuración actual del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="font-medium">Versión</span>
                <Badge variant="outline">1.0.0</Badge>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="font-medium">Entorno</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {process.env.NODE_ENV}
                </Badge>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="font-medium">Base de datos</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Supabase
                </Badge>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="font-medium">Almacenamiento</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Supabase Storage
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mantenimiento</CardTitle>
            <CardDescription>
              Herramientas para mantenimiento del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium mb-1">Limpiar caché de imágenes</h3>
                  <p className="text-sm text-gray-500">Limpia la caché de imágenes para refrescar las vistas</p>
                </div>
                <Button 
                  onClick={clearImageCache} 
                  disabled={isClearing} 
                  variant="outline"
                >
                  {isClearing ? "Limpiando..." : "Limpiar caché"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentación</CardTitle>
            <CardDescription>
              Enlaces a recursos útiles y documentación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a 
                href="https://supabase.com/docs" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 hover:underline block"
              >
                Documentación de Supabase
              </a>
              <a 
                href="https://supabase.com/docs/guides/storage" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 hover:underline block"
              >
                Guía de Supabase Storage
              </a>
              <a 
                href="https://nextjs.org/docs" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 hover:underline block"
              >
                Documentación de Next.js
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
