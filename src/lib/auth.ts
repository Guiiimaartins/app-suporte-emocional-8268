import { supabase } from './supabase';

export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) throw error;

  // Criar perfil do usuário com trial de 3 dias
  if (data.user) {
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 3);

    await supabase.from('user_profiles').insert({
      id: data.user.id,
      email,
      name,
      subscription_status: 'free',
      free_trial_ends_at: trialEndsAt.toISOString(),
    });
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const checkPremiumAccess = async (userId: string) => {
  const profile = await getUserProfile(userId);
  
  if (profile.subscription_status === 'premium') {
    return true;
  }

  // Verificar se ainda está no trial de 3 dias
  if (profile.free_trial_ends_at) {
    const trialEndsAt = new Date(profile.free_trial_ends_at);
    const now = new Date();
    return now < trialEndsAt;
  }

  return false;
};

export const upgradeToPremium = async (userId: string) => {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      subscription_status: 'premium',
      subscription_started_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) throw error;
};
