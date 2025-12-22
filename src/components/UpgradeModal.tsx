"use client";

import Link from 'next/link';
import { Crown, X } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  cta: string;
}

export default function UpgradeModal({ isOpen, onClose, title, message, cta }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
            <Crown className="w-10 h-10 text-purple-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {title}
          </h3>

          <p className="text-gray-600 mb-8">
            {message}
          </p>

          <div className="space-y-3">
            <Link
              href="/subscription"
              className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-full font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {cta}
            </Link>

            <button
              onClick={onClose}
              className="block w-full text-gray-500 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Continuar com Plano Gratuito
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              ✨ Teste grátis por 7 dias • Cancele quando quiser
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
