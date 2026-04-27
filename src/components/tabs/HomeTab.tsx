import React from 'react';
import { Check, Info, Activity, Scale, Droplet } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { UserData } from '../Onboarding';

interface HomeTabProps {
  daysStreak: number;
  setDaysStreak: React.Dispatch<React.SetStateAction<number>>;
  hasTakenRitual: boolean;
  setHasTakenRitual: React.Dispatch<React.SetStateAction<boolean>>;
  hasCompletedOnboarding: boolean;
  onStartQuiz: () => void;
  userData: UserData | null;
}

export function HomeTab({ daysStreak, setDaysStreak, hasTakenRitual, setHasTakenRitual, hasCompletedOnboarding, onStartQuiz, userData }: HomeTabProps) {
  const handleRitualClick = () => {
    if (!hasTakenRitual) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#fbbf24', '#ffffff']
      });
      setHasTakenRitual(true);
      setDaysStreak(prev => prev + 1);
    }
  };

  if (!hasCompletedOnboarding) {
    return (
      <div className="pb-24 pt-6 px-4 max-w-md mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center">
        <header className="mb-8">
          <h1 className="text-[28px] font-[800] text-emerald-500 m-0 leading-tight">
            Hola, hermosa 💚
          </h1>
          <p className="text-[14px] opacity-80 mt-3 m-0">
            Aún no tienes un protocolo activo. Realiza nuestro diagnóstico para recibir tus dosis personalizadas.
          </p>
        </header>
        <button
          onClick={onStartQuiz}
          className="w-full py-[20px] px-6 rounded-[24px] font-[800] text-[18px] text-center flex items-center justify-center border-none transition-all bg-[#065F46] text-white shadow-[0_10px_20px_rgba(6,95,70,0.3)] active:scale-95 hover:bg-[#054f3a]"
        >
          Montar mi plan
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-[28px] font-[800] text-emerald-500 m-0 leading-tight">
          Hola, hermosa 💚
        </h1>
        <p className="text-[14px] opacity-80 mt-1 m-0">Este es tu protocolo para hoy.</p>
      </header>

      {userData && (
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[24px] p-5 shadow-sm border border-emerald-100 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-[800] text-[#064E3B] text-lg">Tu Perfil Biológico</h3>
            <div className="bg-[#EBF5F0] text-[#065F46] text-[10px] font-bold px-2 py-1 rounded-full uppercase">
              Actualizado
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center justify-center text-center">
              <Scale size={20} className="text-[#F59E0B] mb-1" />
              <span className="text-[10px] text-slate-500 font-bold uppercase">IMC Actual</span>
              <span className="text-lg font-[800] text-[#064E3B]">{userData.imc.toFixed(1)}</span>
              <span className="text-[10px] text-slate-600 font-medium leading-tight mt-1">{userData.imcCategory}</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col items-center justify-center text-center">
              <Activity size={20} className="text-rose-500 mb-1" />
              <span className="text-[10px] text-slate-500 font-bold uppercase">Estado Metabólico</span>
              <span className="text-sm font-[800] text-[#064E3B] leading-tight mt-1">
                {userData.answers['metabolismo']?.includes('lento') ? 'Lento / Estancado' : 'Inflamación Activa'}
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 bg-[#fdf8f6] border border-orange-100 rounded-xl p-3">
            <Droplet size={18} className="text-orange-500 shrink-0 mt-0.5" />
            <p className="text-[12px] text-orange-900 leading-tight">
              <span className="font-bold">Análisis de Retención:</span> Basado en tus respuestas, tu cuerpo está reteniendo exceso de desechos. El ritual de hoy ajusta la bromelina para destrabar tu sistema.
            </p>
          </div>
        </motion.section>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[linear-gradient(135deg,#065F46_0%,#064E3B_100%)] text-white rounded-[24px] p-6 shadow-[0_12px_24px_rgba(6,95,70,0.2)] mb-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl -z-0"></div>
        <div className="text-[10px] uppercase tracking-[1px] bg-white/20 px-2 py-1 rounded-full w-fit mb-3 relative z-10 font-bold border border-white/20">
          Recomendación IA
        </div>
        <h2 className="text-[24px] font-[800] mb-2 relative z-10 leading-[1.1] font-heading">
          Tu Ritual de Desbloqueo<br />
          <span className="font-normal text-[16px] text-emerald-200">Dosis Clínica {userData?.imc ? `(IMC ${userData.imc.toFixed(1)})` : ''}</span>
        </h2>
        
        <div className="bg-black/10 rounded-xl p-3 mb-4 relative z-10 backdrop-blur-sm border border-white/10 mt-4">
          <ul className="space-y-3">
            <li className="flex items-start text-[14px]">
              <div className="bg-[#F59E0B] text-white rounded-full w-[24px] h-[24px] flex items-center justify-center mr-3 mt-0 flex-shrink-0 shadow-lg">
                <Check size={14} strokeWidth={3} />
              </div>
              <p className="leading-tight">
                <span className="font-bold text-white text-[15px]">1 taza de Papaya Madura</span><br />
                <span className="text-emerald-100 text-[12px]">Extra carga de Papaína (aprox. 180g) para deshacer mucosa vieja.</span>
              </p>
            </li>
            <li className="flex items-start text-[14px]">
              <div className="bg-[#F59E0B] text-white rounded-full w-[24px] h-[24px] flex items-center justify-center mr-3 mt-0 flex-shrink-0 shadow-lg">
                <Check size={14} strokeWidth={3} />
              </div>
              <p className="leading-tight">
                <span className="font-bold text-white text-[15px]">1 cda. Semillas de Linaza molidas</span><br />
                <span className="text-emerald-100 text-[12px]">Activador de movilidad intestinal.</span>
              </p>
            </li>
            <li className="flex items-start text-[14px]">
              <div className="bg-[#F59E0B] text-white rounded-full w-[24px] h-[24px] flex items-center justify-center mr-3 mt-0 flex-shrink-0 shadow-lg">
                <Check size={14} strokeWidth={3} />
              </div>
              <p className="leading-tight">
                <span className="font-bold text-white text-[15px]">1/2 cdta. de Cúrcuma en polvo</span><br />
                <span className="text-emerald-100 text-[12px]">Modulador inflamatorio severo (con pizca de pimienta).</span>
              </p>
            </li>
            <li className="flex items-start text-[14px]">
              <div className="bg-[#F59E0B] text-white rounded-full w-[24px] h-[24px] flex items-center justify-center mr-3 mt-0 flex-shrink-0 shadow-lg">
                <Check size={14} strokeWidth={3} />
              </div>
              <p className="leading-tight">
                <span className="font-bold text-white text-[15px]">Vaso de Agua (250ml)</span><br />
                <span className="text-emerald-100 text-[12px]">Vehículo hidratante para la fibra.</span>
              </p>
            </li>
          </ul>
        </div>

        <div className="relative z-10 text-[13px] bg-white/10 rounded-lg p-3 text-emerald-50 border border-white/20">
          <b>Preparación:</b> Licúa todo a máxima potencia por 2 minutos. Tómalo en ayunas diariamente por los próximos 14 días. No lo cueles.
        </div>
      </motion.div>

      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-sm">Diario del Alivio</span>
          <span className="text-[#065F46] font-[800] text-sm">{daysStreak} Días Récord</span>
        </div>
        <div className="h-2 bg-[#f0f0f0] rounded-full mt-2 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#F59E0B] rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((daysStreak / 7) * 100, 100)}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleRitualClick}
        disabled={hasTakenRitual}
        className={`w-full py-[20px] px-6 rounded-[24px] font-[800] text-[18px] text-center flex items-center justify-center border-none transition-all ${
          hasTakenRitual 
            ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
            : 'bg-[#065F46] text-white shadow-[0_10px_20px_rgba(6,95,70,0.3)] active:scale-95'
        }`}
      >
        {hasTakenRitual ? (
          <>¡Ritual completado hoy!</>
        ) : (
          <>✔️ ¡Ya tomé mi ritual hoy!</>
        )}
      </button>
    </div>
  );
}
