import { supabase } from "./SupabaseClient";

/**
 * Sube una imagen a Supabase Storage
 * @param file Archivo de imagen a subir
 * @param bucket Nombre del bucket (por defecto 'project-images')
 * @param folder Carpeta dentro del bucket (por defecto 'projects')
 * @returns URL pública de la imagen o null si hay error
 */
export async function uploadProjectImage(
  file: File,
  bucket: string = "project-images",
  folder: string = "projects"
): Promise<string | null> {
  try {
    // Crear un nombre de archivo único para evitar colisiones
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

    // Subir la imagen a Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      console.error("Error al subir imagen:", error.message);
      return null;
    }

    // Obtener la URL pública de la imagen
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error inesperado al subir imagen:", error);
    return null;
  }
}

/**
 * Elimina una imagen de Supabase Storage
 * @param imageUrl URL de la imagen a eliminar
 * @param bucket Nombre del bucket (por defecto 'project-images')
 * @returns true si se eliminó correctamente, false si hubo error
 */
export async function deleteProjectImage(
  imageUrl: string,
  bucket: string = "project-images"
): Promise<boolean> {
  try {
    // Extraer la ruta del archivo de la URL pública
    const url = new URL(imageUrl);
    const pathSegments = url.pathname.split("/");
    const filePath = pathSegments.slice(pathSegments.indexOf(bucket) + 1).join("/");

    // Eliminar la imagen
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error("Error al eliminar imagen:", error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error inesperado al eliminar imagen:", error);
    return false;
  }
}
