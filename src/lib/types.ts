// Tipos do App Aura - Suporte Emocional

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
};

export type QuizOption = {
  value: string;
  label: string;
  icon?: string;
};

export type QuizAnswers = {
  reason?: string;
  frequency?: string;
  impact?: string;
  expectation?: string;
};

export type EmotionalProfile = {
  type: string;
  title: string;
  description: string;
  recommendedTracks: string[];
  recommendedExercises: string[];
};

export type Exercise = {
  id: string;
  title: string;
  duration: number; // em minutos
  type: 'breathing' | 'grounding' | 'reflection' | 'meditation';
  description: string;
  isPremium: boolean;
  instructions: string[];
};

export type Track = {
  id: string;
  title: string;
  description: string;
  steps: number;
  duration: string;
  category: string;
  isPremium: boolean;
  progress?: number;
};

export type Content = {
  id: string;
  title: string;
  category: 'breathing' | 'quick-exercise' | 'motivation' | 'meditation' | 'lesson';
  duration: number;
  isPremium: boolean;
  content: string;
};

export type CommunityPost = {
  id: string;
  content: string;
  category: 'anxiety' | 'stress' | 'loneliness' | 'motivation' | 'vent';
  likes: number;
  comments: number;
  createdAt: Date;
  isAnonymous: boolean;
};

export type UserProgress = {
  streak: number;
  totalExercises: number;
  completedTracks: string[];
  badges: Badge[];
  lastExerciseDate?: Date;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  total: number;
};

export type DiaryEntry = {
  id: string;
  date: Date;
  mood: 1 | 2 | 3 | 4 | 5;
  note: string;
};
