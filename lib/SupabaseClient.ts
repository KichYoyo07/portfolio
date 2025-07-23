// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Proporcionamos valores por defecto para evitar errores durante el desarrollo
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  image_detalle?: string;
  technologies: string[];
  github_url: string;
  demo_url: string;
  featured?: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
};
