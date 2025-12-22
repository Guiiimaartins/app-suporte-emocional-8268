import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Verificação de configuração
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http');
};

// Cliente Supabase - retorna null se não configurado (evita erro no build)
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper para verificar se pode usar Supabase
export const canUseSupabase = () => {
  return supabase !== null;
};

// Tipos do banco de dados
export type UserProfile = {
  id: string;
  email: string;
  name: string;
  subscription_status: 'free' | 'premium';
  subscription_started_at: string | null;
  free_trial_ends_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DiaryEntry = {
  id: string;
  user_id: string;
  mood: number;
  content: string;
  created_at: string;
};

export type Exercise = {
  id: string;
  user_id: string;
  exercise_type: string;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
};

export type CommunityPost = {
  id: string;
  user_id: string;
  content: string;
  anonymous: boolean;
  likes_count: number;
  created_at: string;
};
