"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, ArrowLeft, Heart, MessageCircle, Send, 
  Lock, Crown, Users, TrendingUp, Filter, Plus
} from 'lucide-react';

type Post = {
  id: string;
  content: string;
  category: 'anxiety' | 'stress' | 'loneliness' | 'motivation' | 'vent';
  likes: number;
  comments: number;
  createdAt: Date;
  isAnonymous: boolean;
  isLiked?: boolean;
};

export default function CommunityPage() {
  const [isPremium] = useState(false); // Simular status de assinatura
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos', icon: Users },
    { id: 'anxiety', label: 'Ansiedade', icon: Heart },
    { id: 'stress', label: 'Estresse', icon: TrendingUp },
    { id: 'loneliness', label: 'Solidão', icon: MessageCircle },
    { id: 'motivation', label: 'Motivação', icon: Sparkles },
    { id: 'vent', label: 'Desabafo', icon: MessageCircle },
  ];

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: 'Hoje consegui sair da cama e fazer uma caminhada. Parece pouco, mas para mim foi uma grande vitória. 💪',
      category: 'motivation',
      likes: 24,
      comments: 8,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isAnonymous: true,
      isLiked: false,
    },
    {
      id: '2',
      content: 'Alguém mais sente aquele aperto no peito do nada? Como vocês lidam com isso?',
      category: 'anxiety',
      likes: 15,
      comments: 12,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isAnonymous: true,
      isLiked: false,
    },
    {
      id: '3',
      content: 'Queria agradecer a todos aqui. Saber que não estou sozinho nessa jornada faz toda diferença. Obrigado por existirem. ❤️',
      category: 'motivation',
      likes: 42,
      comments: 15,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isAnonymous: true,
      isLiked: true,
    },
    {
      id: '4',
      content: 'Dias difíceis no trabalho. Me sinto sobrecarregado e não sei como pedir ajuda sem parecer fraco.',
      category: 'stress',
      likes: 18,
      comments: 9,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isAnonymous: true,
      isLiked: false,
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      anxiety: 'bg-red-100 text-red-700',
      stress: 'bg-orange-100 text-orange-700',
      loneliness: 'bg-blue-100 text-blue-700',
      motivation: 'bg-green-100 text-green-700',
      vent: 'bg-purple-100 text-purple-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Agora há pouco';
    if (hours === 1) return 'Há 1 hora';
    if (hours < 24) return `Há ${hours} horas`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Há 1 dia';
    return `Há ${days} dias`;
  };

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Recurso Premium
          </h2>
          <p className="text-gray-600 mb-6">
            A comunidade é exclusiva para assinantes Premium. 
            Conecte-se com outras pessoas que entendem o que você está passando.
          </p>
          <div className="space-y-3">
            <Link 
              href="/subscription"
              className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300"
            >
              <Crown className="w-5 h-5 inline mr-2" />
              Assinar Premium
            </Link>
            <Link 
              href="/dashboard"
              className="block w-full bg-gray-100 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Comunidade</h1>
                <p className="text-xs text-gray-500">Espaço seguro e anônimo</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Categories Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Posts Feed */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Info Banner */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Bem-vindo à Comunidade!</h3>
              <p className="text-sm text-blue-800">
                Este é um espaço seguro e anônimo. Seja gentil, respeite os outros e lembre-se: 
                todos aqui estão na mesma jornada de cuidado emocional.
              </p>
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Anônimo</p>
                  <p className="text-xs text-gray-500">{getTimeAgo(post.createdAt)}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                {categories.find(c => c.id === post.category)?.label}
              </span>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {post.content}
            </p>

            <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  post.isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-semibold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-purple-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">{post.comments}</span>
              </button>
            </div>
          </div>
        ))}

        {/* Load More */}
        <button className="w-full bg-white text-gray-600 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-md">
          Carregar mais posts
        </button>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Novo Post</h3>
            <textarea
              placeholder="Compartilhe seus pensamentos de forma anônima..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:border-purple-500 focus:outline-none"
            />
            <div className="mt-4">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Categoria</label>
              <div className="flex gap-2 flex-wrap">
                {categories.slice(1).map((category) => (
                  <button
                    key={category.id}
                    className="px-4 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full text-sm font-medium transition-all duration-300"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                Cancelar
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
