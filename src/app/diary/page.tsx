"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Calendar, TrendingUp, Smile, Frown, 
  Meh, Plus, Edit3, Trash2, BookOpen
} from 'lucide-react';

type DiaryEntry = {
  id: string;
  date: Date;
  mood: 1 | 2 | 3 | 4 | 5;
  note: string;
};

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      mood: 4,
      note: 'Hoje foi um dia produtivo. Consegui completar todos os exercícios e me senti mais calmo.',
    },
    {
      id: '2',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      mood: 3,
      note: 'Dia normal. Tive alguns momentos de ansiedade mas consegui controlar.',
    },
    {
      id: '3',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      mood: 5,
      note: 'Excelente dia! Dormi bem e acordei com energia. Fiz uma caminhada pela manhã.',
    },
  ]);

  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [noteText, setNoteText] = useState('');

  const moods = [
    { value: 1, emoji: '😢', label: 'Muito mal', color: 'bg-red-100 text-red-700 border-red-300' },
    { value: 2, emoji: '😔', label: 'Mal', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    { value: 3, emoji: '😐', label: 'Ok', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { value: 4, emoji: '🙂', label: 'Bem', color: 'bg-green-100 text-green-700 border-green-300' },
    { value: 5, emoji: '😊', label: 'Muito bem', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  ];

  const getMoodData = (moodValue: number) => {
    return moods.find(m => m.value === moodValue) || moods[2];
  };

  const getAverageMood = () => {
    if (entries.length === 0) return 3;
    const sum = entries.reduce((acc, entry) => acc + entry.mood, 0);
    return Math.round(sum / entries.length);
  };

  const handleSaveEntry = () => {
    if (!selectedMood || !noteText.trim()) return;

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood: selectedMood as 1 | 2 | 3 | 4 | 5,
      note: noteText,
    };

    setEntries([newEntry, ...entries]);
    setShowNewEntryModal(false);
    setSelectedMood(null);
    setNoteText('');
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long',
        year: 'numeric'
      });
    }
  };

  const averageMood = getAverageMood();
  const averageMoodData = getMoodData(averageMood);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Meu Diário</h1>
                <p className="text-xs text-gray-500">Registre suas emoções diárias</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewEntryModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nova Entrada
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-purple-500" />
              <h3 className="font-bold text-gray-800">Total de Registros</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">{entries.length}</p>
            <p className="text-sm text-gray-500 mt-1">Dias registrados</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h3 className="font-bold text-gray-800">Humor Médio</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{averageMoodData.emoji}</span>
              <div>
                <p className="font-bold text-gray-800">{averageMoodData.label}</p>
                <p className="text-sm text-gray-500">Últimos 7 dias</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h3 className="font-bold text-gray-800">Sequência</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">3 dias</p>
            <p className="text-sm text-gray-500 mt-1">Continue assim!</p>
          </div>
        </div>

        {/* Mood Chart Preview */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Evolução do Humor
          </h3>
          <div className="flex items-end justify-between h-32 gap-2">
            {entries.slice(0, 7).reverse().map((entry, index) => {
              const moodData = getMoodData(entry.mood);
              const height = (entry.mood / 5) * 100;
              return (
                <div key={entry.id} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-300 ${moodData.color.split(' ')[0]}`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">
                    {new Date(entry.date).getDate()}/{new Date(entry.date).getMonth() + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 text-lg">Entradas Recentes</h3>
          
          {entries.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Nenhuma entrada ainda
              </h3>
              <p className="text-gray-600 mb-6">
                Comece a registrar suas emoções diárias para acompanhar seu progresso
              </p>
              <button
                onClick={() => setShowNewEntryModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Criar Primeira Entrada
              </button>
            </div>
          ) : (
            entries.map((entry) => {
              const moodData = getMoodData(entry.mood);
              return (
                <div key={entry.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 ${moodData.color}`}>
                        {moodData.emoji}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{formatDate(entry.date)}</p>
                        <p className={`text-sm font-semibold ${moodData.color.split(' ')[1]}`}>
                          {moodData.label}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Edit3 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-full transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {entry.note}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* New Entry Modal */}
      {showNewEntryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Nova Entrada no Diário</h3>
            
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Como você está se sentindo?
              </label>
              <div className="flex gap-3 justify-between">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 flex-1 border-2 ${
                      selectedMood === mood.value
                        ? mood.color + ' scale-105 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-3xl">{mood.emoji}</span>
                    <span className="text-xs font-semibold text-gray-600">
                      {mood.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                O que aconteceu hoje?
              </label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Escreva sobre seu dia, seus sentimentos, conquistas ou desafios..."
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl resize-none focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNewEntryModal(false);
                  setSelectedMood(null);
                  setNoteText('');
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEntry}
                disabled={!selectedMood || !noteText.trim()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar Entrada
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
