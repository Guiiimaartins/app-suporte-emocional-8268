'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Erro no callback:', error);
        router.push('/login');
        return;
      }

      if (data.session) {
        // Criar perfil se não existir
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();

        if (!profile) {
          const trialEndsAt = new Date();
          trialEndsAt.setDate(trialEndsAt.getDate() + 3);

          await supabase.from('user_profiles').insert({
            id: data.session.user.id,
            email: data.session.user.email!,
            name: data.session.user.user_metadata.name || 'Usuário',
            subscription_status: 'free',
            free_trial_ends_at: trialEndsAt.toISOString(),
          });

          router.push('/onboarding');
        } else {
          router.push('/dashboard');
        }
      } else {
        router.push('/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Autenticando...</p>
      </div>
    </div>
  );
}
