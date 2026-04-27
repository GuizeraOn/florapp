import React from 'react';
import { MessageSquare, HeartHandshake, Settings, RotateCcw, LogOut } from 'lucide-react';

interface HelpTabProps {
  onReset: () => void;
  onLogout: () => void;
}

export function HelpTab({ onReset, onLogout }: HelpTabProps) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hola equipo de Flora App, necesito ayuda con mi protocolo...");
    window.open(`https://wa.me/1234567890?text=${text}`, '_blank');
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <header className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-slate-800">
          Ayuda y Soporte
        </h1>
        <p className="text-slate-600 mt-1">No estás sola en este proceso.</p>
      </header>

      <section className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-24 bg-emerald-50 -z-0"></div>
        <div className="relative z-10">
          <div className="w-24 h-24 bg-emerald-200 rounded-full mx-auto mb-4 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
            {/* Avatar placeholder - representing friendly support */}
            <HeartHandshake className="text-emerald-600" size={40} />
          </div>
          
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            El equipo del Dr. Carlos
          </h2>
          
          <p className="text-slate-600 mb-8 leading-relaxed text-sm px-2">
            ¿Tienes alguna duda, no encuentras un ingrediente o necesitas ayuda con tu receta? Mi equipo y yo estamos aquí para ti.
          </p>
          
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-2xl shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] flex items-center justify-center transition-transform active:scale-95 text-lg"
          >
            <MessageSquare className="mr-3" fill="currentColor" />
            Hablar por WhatsApp Ahora
          </button>
        </div>
      </section>

      <section className="space-y-3 mt-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-2 mb-3">Configuración</h3>
        
        <button 
          onClick={onReset}
          className="w-full bg-white flex items-center p-4 rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors text-slate-700"
        >
          <div className="bg-slate-100 p-2 rounded-xl mr-4 text-slate-500">
            <RotateCcw size={20} />
          </div>
          <span className="font-semibold">Reiniciar mi diagnóstico</span>
        </button>

        <button className="w-full bg-white flex items-center p-4 rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors text-slate-700">
          <div className="bg-slate-100 p-2 rounded-xl mr-4 text-slate-500">
            <Settings size={20} />
          </div>
          <span className="font-semibold">Ajustes de la cuenta</span>
        </button>

        <button 
          onClick={onLogout}
          className="w-full bg-white flex items-center p-4 rounded-2xl border border-slate-100 shadow-sm hover:bg-rose-50 transition-colors text-rose-600 mt-4"
        >
          <div className="bg-rose-50 p-2 rounded-xl mr-4 text-rose-500">
            <LogOut size={20} />
          </div>
          <span className="font-semibold">Cerrar sesión</span>
        </button>
      </section>
    </div>
  );
}
