import React from 'react';
import { Gift, Lock, Sparkles, Smile, Flower2, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export function GiftsTab() {
  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <header className="mb-2">
        <h1 className="text-2xl font-heading font-bold text-slate-800">
          Tus Regalos
        </h1>
        <p className="text-slate-600 mt-1">Bonos y mejoras para tu bienestar.</p>
      </header>

      {/* Unlocked Bonuses */}
      <div className="grid grid-cols-1 gap-4">
        {/* Bono 1 */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100 flex flex-col relative overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 text-emerald-50 opacity-50">
            <Sparkles size={100} />
          </div>
          <div className="flex items-start mb-3 relative z-10">
            <div className="bg-emerald-100 p-2.5 rounded-2xl mr-4 text-emerald-600 shrink-0">
              <Gift size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1 block">Bono Desbloqueado</span>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Mounjaro Natural de la Amazonía</h3>
            </div>
          </div>
          <button className="mt-3 w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold py-3 rounded-xl transition-colors relative z-10 text-sm">
            Ver Protocolo y Lista de 26 Alimentos
          </button>
        </motion.div>

        {/* Bono 2 */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100 flex flex-col relative overflow-hidden"
        >
          <div className="flex items-start mb-3 relative z-10">
            <div className="bg-pink-100 p-2.5 rounded-2xl mr-4 text-pink-500 shrink-0">
              <Smile size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400 mb-1 block">Bono Desbloqueado</span>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Botox Coreano de Dedos</h3>
            </div>
          </div>
          <button className="mt-3 w-full bg-pink-50 text-pink-600 hover:bg-pink-100 font-semibold py-3 rounded-xl transition-colors relative z-10 text-sm">
            Ver los 3 Movimientos (5 minutos)
          </button>
        </motion.div>

        {/* Bono 3 */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100 flex flex-col relative overflow-hidden"
        >
          <div className="flex items-start mb-3 relative z-10">
            <div className="bg-purple-100 p-2.5 rounded-2xl mr-4 text-purple-500 shrink-0">
              <Flower2 size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1 block">Bono Desbloqueado</span>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">Rescate Hormonal</h3>
            </div>
          </div>
          <button className="mt-3 w-full bg-purple-50 text-purple-600 hover:bg-purple-100 font-semibold py-3 rounded-xl transition-colors relative z-10 text-sm">
            Descubrir la Frutita de la Menopausia
          </button>
        </motion.div>
      </div>

      <div className="my-6 border-b border-dashed border-slate-300"></div>

      {/* Locked Upsell */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        className="bg-[#f3f4f6] border-2 border-dashed border-[#d1d5db] rounded-[16px] p-4 text-center text-[#9ca3af] relative overflow-hidden mt-6"
      >
        <div className="absolute top-2 right-2 p-1">
          <Lock size={14} className="text-[#9ca3af]" />
        </div>
        
        <div className="text-[24px] mb-2 flex justify-center">
          <Zap size={24} className="text-amber-500" fill="currentColor" />
        </div>
        
        <div className="font-bold text-[#4b5563] mb-1">Acelerador Metabólico 10X</div>
        
        <div className="text-[11px] font-medium">
          Desbloquear por $17
        </div>
      </motion.div>
    </div>
  );
}
