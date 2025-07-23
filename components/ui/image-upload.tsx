"use client";

import React, { useState, useRef } from "react";
import { Button } from "./button";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadProjectImage } from "@/lib/uploadImage";

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  defaultImage?: string;
  className?: string;
}

export function ImageUpload({ onImageUploaded, defaultImage, className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [error, setError] = useState<string | null>(null);
    const [showPredefined, setShowPredefined] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Tipo de archivo no válido. Sube una imagen JPG, PNG, WebP o GIF.');
      return;
    }

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen es demasiado grande. El tamaño máximo es 2MB.');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Mostrar vista previa
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Subir imagen a Supabase
      const imageUrl = await uploadProjectImage(file);
      if (imageUrl) {
        onImageUploaded(imageUrl);
      } else {
        setError('Error al subir la imagen. Inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error al procesar la imagen.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        disabled={isUploading}
      />

      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={handleClearImage}
              disabled={isUploading}
              className="rounded-full h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors h-64 flex flex-col items-center justify-center"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 text-gray-400 animate-spin mb-2" />
              <p className="text-sm text-gray-500">Subiendo imagen...</p>
            </>
          ) : (
            <>
              <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">Haz clic para subir una imagen</p>
              <p className="text-xs text-gray-400">JPG, PNG, WebP o GIF (máx. 2MB)</p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
