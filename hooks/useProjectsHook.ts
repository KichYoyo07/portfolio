// hooks/useProjects.ts
import { useState, useEffect } from 'react';
import { supabase, Project } from '@/lib/SupabaseClient';

export function useProjects(featuredOnly = false) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        
        let query = supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (featuredOnly) {
          query = query.eq('featured', true);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Asegúrate de que data sea un array antes de asignarlo
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error al cargar proyectos:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido al cargar proyectos'));
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [featuredOnly]);

  return { projects, loading, error };
}
