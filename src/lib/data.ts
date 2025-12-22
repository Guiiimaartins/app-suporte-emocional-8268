import { QuizQuestion, EmotionalProfile, Exercise, Track } from './types';

// Perguntas do Quiz Inicial
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "O que te trouxe ao Aura hoje?",
    options: [
      { value: 'anxiety', label: 'Ansiedade' },
      { value: 'stress', label: 'Estresse' },
      { value: 'loneliness', label: 'Solidão' },
      { value: 'sleep', label: 'Problemas para dormir' },
      { value: 'explore', label: 'Apenas explorar' },
    ],
  },
  {
    id: 2,
    question: "Com que frequência isso te afeta?",
    options: [
      { value: 'daily', label: 'Todos os dias' },
      { value: 'weekly', label: 'Algumas vezes por semana' },
      { value: 'occasionally', label: 'Uma vez ou outra' },
    ],
  },
  {
    id: 3,
    question: "Isso atrapalha seu dia a dia?",
    options: [
      { value: 'very-much', label: 'Sim, muito' },
      { value: 'sometimes', label: 'Às vezes' },
      { value: 'not-much', label: 'Não muito' },
    ],
  },
  {
    id: 4,
    question: "O que você espera do Aura?",
    options: [
      { value: 'immediate-relief', label: 'Alívio imediato' },
      { value: 'daily-plan', label: 'Plano diário' },
      { value: 'community', label: 'Comunidade' },
      { value: 'learn', label: 'Aprender sobre emoções' },
    ],
  },
];

// Perfis Emocionais baseados nas respostas
export const emotionalProfiles: Record<string, EmotionalProfile> = {
  anxiety: {
    type: 'anxiety',
    title: 'Perfil: Buscando Calma',
    description: 'Você está lidando com ansiedade. Vamos trabalhar juntos para trazer mais tranquilidade ao seu dia.',
    recommendedTracks: ['7-dias-menos-ansioso', 'respiracoes-crises'],
    recommendedExercises: ['breathing-calm', 'grounding-5-senses'],
  },
  stress: {
    type: 'stress',
    title: 'Perfil: Reduzindo Tensão',
    description: 'O estresse tem afetado você. Vamos criar uma rotina para aliviar essa sobrecarga.',
    recommendedTracks: ['rotina-antiestresse', 'relaxamento-profundo'],
    recommendedExercises: ['progressive-relaxation', 'breathing-stress'],
  },
  loneliness: {
    type: 'loneliness',
    title: 'Perfil: Conectando-se',
    description: 'A solidão pode ser difícil. Vamos trabalhar para você se sentir mais conectado.',
    recommendedTracks: ['vencendo-solidao', 'autocompaixao'],
    recommendedExercises: ['self-compassion', 'gratitude-practice'],
  },
  sleep: {
    type: 'sleep',
    title: 'Perfil: Melhorando o Sono',
    description: 'Problemas com sono afetam tudo. Vamos criar uma rotina noturna relaxante.',
    recommendedTracks: ['sono-tranquilo', 'rotina-noturna'],
    recommendedExercises: ['bedtime-breathing', 'body-scan'],
  },
  explore: {
    type: 'explore',
    title: 'Perfil: Explorador do Bem-Estar',
    description: 'Que bom ter você aqui! Vamos explorar juntos práticas para seu bem-estar.',
    recommendedTracks: ['introducao-mindfulness', 'habitos-saudaveis'],
    recommendedExercises: ['breathing-basics', 'mindful-moment'],
  },
};

// Exercícios Diários
export const exercises: Exercise[] = [
  {
    id: 'breathing-calm',
    title: 'Respiração da Calma',
    duration: 5,
    type: 'breathing',
    description: 'Uma técnica simples de respiração para acalmar a mente em momentos de ansiedade.',
    isPremium: false,
    instructions: [
      'Encontre um lugar confortável para sentar ou deitar',
      'Feche os olhos suavemente',
      'Inspire profundamente pelo nariz contando até 4',
      'Segure a respiração por 4 segundos',
      'Expire lentamente pela boca contando até 6',
      'Repita por 5 minutos',
    ],
  },
  {
    id: 'grounding-5-senses',
    title: 'Ancoragem dos 5 Sentidos',
    duration: 7,
    type: 'grounding',
    description: 'Técnica de grounding para te trazer de volta ao momento presente.',
    isPremium: false,
    instructions: [
      'Identifique 5 coisas que você pode VER ao seu redor',
      'Identifique 4 coisas que você pode TOCAR',
      'Identifique 3 coisas que você pode OUVIR',
      'Identifique 2 coisas que você pode CHEIRAR',
      'Identifique 1 coisa que você pode SABOREAR',
      'Respire profundamente e observe como se sente agora',
    ],
  },
  {
    id: 'progressive-relaxation',
    title: 'Relaxamento Progressivo',
    duration: 10,
    type: 'grounding',
    description: 'Libere a tensão do corpo progressivamente, músculo por músculo.',
    isPremium: true,
    instructions: [
      'Deite-se confortavelmente',
      'Comece pelos pés: contraia por 5 segundos, depois relaxe',
      'Suba para as panturrilhas, depois coxas',
      'Continue pelo abdômen, peito, braços',
      'Finalize com ombros, pescoço e rosto',
      'Observe a diferença entre tensão e relaxamento',
    ],
  },
];

// Trilhas Guiadas
export const tracks: Track[] = [
  {
    id: '7-dias-menos-ansioso',
    title: '7 Dias Menos Ansioso',
    description: 'Uma jornada de 7 dias com exercícios práticos para reduzir a ansiedade.',
    steps: 7,
    duration: '7 dias',
    category: 'Ansiedade',
    isPremium: false,
  },
  {
    id: 'vencendo-solidao',
    title: 'Vencendo a Solidão',
    description: 'Práticas para se conectar consigo mesmo e com os outros.',
    steps: 5,
    duration: '5 dias',
    category: 'Conexão',
    isPremium: false,
  },
  {
    id: 'rotina-antiestresse',
    title: 'Rotina Antiestresse',
    description: 'Crie hábitos diários para gerenciar o estresse de forma eficaz.',
    steps: 7,
    duration: '1 semana',
    category: 'Estresse',
    isPremium: true,
  },
  {
    id: 'respiracoes-crises',
    title: 'Respirações para Crises',
    description: 'Técnicas rápidas de respiração para momentos de crise.',
    steps: 3,
    duration: '3 dias',
    category: 'Emergência',
    isPremium: false,
  },
];
