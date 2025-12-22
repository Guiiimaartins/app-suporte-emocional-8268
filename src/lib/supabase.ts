import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Verificação de configuração
export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http');
};

// Cliente Supabase com fallback seguro que não quebra o app
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://demo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTc2OTIwMCwiZXhwIjoxOTU3MzQ1MjAwfQ.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE');

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
