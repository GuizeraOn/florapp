import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-[24px] shadow-sm border border-emerald-100 text-center"
      >
        <div className="flex justify-center mb-6 text-[#065F46]">
          <Leaf size={48} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Bienvenida de nuevo</h1>
        <p className="text-slate-500 mb-8 text-sm">Ingresa tu correo electrónico para continuar en Flora App.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#065F46] transition-all text-center"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#065F46] text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-transform active:scale-95"
          >
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}
