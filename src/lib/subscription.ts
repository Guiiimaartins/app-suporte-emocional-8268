// Sistema de controle de assinatura e limites

export type SubscriptionTier = 'free' | 'premium';

export interface SubscriptionLimits {
  chatMessagesPerDay: number;
  exercisesPerDay: number;
  diaryEntriesPerMonth: number;
  communityPostsPerDay: number;
  hasAIChat: boolean;
  hasCommunityAccess: boolean;
  hasPremiumExercises: boolean;
  hasProgressTracking: boolean;
}

export const SUBSCRIPTION_LIMITS: Record<SubscriptionTier, SubscriptionLimits> = {
  free: {
    chatMessagesPerDay: 3, // Apenas 3 mensagens por dia no chat com IA
    exercisesPerDay: 2, // Apenas 2 exercícios básicos por dia
    diaryEntriesPerMonth: 10, // Limite de 10 entradas no diário por mês
    communityPostsPerDay: 1, // 1 post por dia na comunidade
    hasAIChat: true, // Tem acesso limitado ao chat
    hasCommunityAccess: false, // SEM acesso à comunidade
    hasPremiumExercises: false, // SEM exercícios premium
    hasProgressTracking: false, // SEM gráficos de progresso detalhados
  },
  premium: {
    chatMessagesPerDay: -1, // Ilimitado
    exercisesPerDay: -1, // Ilimitado
    diaryEntriesPerMonth: -1, // Ilimitado
    communityPostsPerDay: -1, // Ilimitado
    hasAIChat: true,
    hasCommunityAccess: true,
    hasPremiumExercises: true,
    hasProgressTracking: true,
  },
};

export function getSubscriptionLimits(tier: SubscriptionTier): SubscriptionLimits {
  return SUBSCRIPTION_LIMITS[tier];
}

export function canAccessFeature(
  tier: SubscriptionTier,
  feature: keyof SubscriptionLimits
): boolean {
  const limits = getSubscriptionLimits(tier);
  return limits[feature] as boolean;
}

export function getRemainingUsage(
  tier: SubscriptionTier,
  feature: 'chatMessagesPerDay' | 'exercisesPerDay' | 'diaryEntriesPerMonth' | 'communityPostsPerDay',
  currentUsage: number
): number {
  const limits = getSubscriptionLimits(tier);
  const limit = limits[feature];
  
  if (limit === -1) return -1; // Ilimitado
  
  return Math.max(0, limit - currentUsage);
}

export function hasReachedLimit(
  tier: SubscriptionTier,
  feature: 'chatMessagesPerDay' | 'exercisesPerDay' | 'diaryEntriesPerMonth' | 'communityPostsPerDay',
  currentUsage: number
): boolean {
  const remaining = getRemainingUsage(tier, feature, currentUsage);
  return remaining === 0;
}

// Mensagens motivacionais para upgrade
export const UPGRADE_MESSAGES = {
  chatLimit: {
    title: 'Limite de Conversas Atingido',
    message: 'Você usou suas 3 mensagens gratuitas de hoje. Desbloqueie conversas ilimitadas com o Premium!',
    cta: 'Desbloquear Chat Ilimitado',
  },
  exerciseLimit: {
    title: 'Limite de Exercícios Atingido',
    message: 'Você completou seus 2 exercícios gratuitos de hoje. Acesse todos os exercícios com Premium!',
    cta: 'Desbloquear Todos os Exercícios',
  },
  diaryLimit: {
    title: 'Limite do Diário Atingido',
    message: 'Você atingiu o limite de 10 entradas gratuitas este mês. Continue registrando suas emoções com Premium!',
    cta: 'Desbloquear Diário Ilimitado',
  },
  communityLocked: {
    title: 'Comunidade Premium',
    message: 'Conecte-se com outras pessoas que entendem sua jornada. A comunidade é exclusiva para membros Premium!',
    cta: 'Acessar Comunidade',
  },
  premiumExercise: {
    title: 'Exercício Premium',
    message: 'Este exercício avançado está disponível apenas para membros Premium. Desbloqueie agora!',
    cta: 'Desbloquear Exercícios Premium',
  },
  progressTracking: {
    title: 'Análise de Progresso Premium',
    message: 'Veja gráficos detalhados da sua evolução emocional com o Premium!',
    cta: 'Ver Meu Progresso Completo',
  },
};
