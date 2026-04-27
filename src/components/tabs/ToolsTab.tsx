import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bug, Droplet, ChevronDown, ChevronUp, CheckSquare, Square, TrendingUp, GlassWater, Apple, Activity, Info } from 'lucide-react';

interface ToolsTabProps {
  daysStreak: number;
}

const SOS_STEPS = [
  {
    title: "Paso 1: Masaje Abdominal (I-L-U)",
    description: "Masajea tu abdomen trazando las letras I, L, U desde tu cadera derecha hasta la izquierda. Hazlo con presión media durante 2 minutos."
  },
  {
    title: "Paso 2: Postura Puntería",
    description: "Usa un taburete pequeño para elevar tus pies en el baño. Tus rodillas deben quedar por encima de tu cadera (emulando postura de cuclillas)."
  },
  {
    title: "Paso 3: Respiración de Globo",
    description: "Inhala inflando la barriga (no el pecho), exhala lentamente como si soplaras una vela. Repite 5 a 10 veces para relajar el suelo pélvico."
  },
  {
    title: "Paso 4: Hidratación Flash",
    description: "Toma un vaso grande (300ml) de agua tibia o caliente de una sola vez, preferiblemente con unas gotas de limón si tu estómago lo permite."
  },
  {
    title: "Paso 5: Caminata de Activación",
    description: "Camina por la habitación elevando las rodillas hacia el pecho durante 3 minutos. Esto estimula el peristaltismo intestinal mecánicamente."
  }
];

const BRISTOL_TYPES = [
  { type: 1, desc: "Trozos duros y separados", status: "Estreñimiento Severo", color: "bg-rose-500" },
  { type: 2, desc: "Forma de salchicha grumosa", status: "Estreñimiento Leve", color: "bg-orange-500" },
  { type: 3, desc: "Salchicha con grietas", status: "Normal", color: "bg-emerald-500" },
  { type: 4, desc: "Como una salchicha suave", status: "Óptimo", color: "bg-emerald-600" },
  { type: 5, desc: "Trozos pastosos con bordes", status: "Falta de Fibra", color: "bg-yellow-500" },
  { type: 6, desc: "Pedazos blandos y deshechos", status: "Inflamación/Diarrea leve", color: "bg-orange-500" },
  { type: 7, desc: "Acuosa, sin pedazos sólidos", status: "Diarrea Severa", color: "bg-rose-500" }
];

export function ToolsTab({ daysStreak }: ToolsTabProps) {
  const [openSosStep, setOpenSosStep] = useState<number | null>(0);
  const [parasiteChecks, setParasiteChecks] = useState([false, false, false, false]);
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [bristolSelected, setBristolSelected] = useState<number | null>(null);

  const toggleParasite = (index: number) => {
    const newChecks = [...parasiteChecks];
    newChecks[index] = !newChecks[index];
    setParasiteChecks(newChecks);
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <header className="mb-2">
        <h1 className="text-[28px] font-heading font-bold text-[#064E3B] leading-tight">
          Caja de Herramientas
        </h1>
        <p className="text-slate-600 mt-1 text-sm">Tu arsenal de salud digestiva diaria.</p>
      </header>

      {/* Diario del Alivio */}
      <section className="bg-white rounded-[24px] p-5 shadow-sm border border-emerald-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-[#EBF5F0] p-2 rounded-xl mr-3 text-[#065F46]">
                <TrendingUp size={24} />
              </div>
              <h2 className="text-lg font-bold text-slate-800 font-heading">El Diario del Alivio</h2>
            </div>
            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              Día {daysStreak}
            </span>
          </div>
          <p className="text-slate-600 font-medium mb-1 text-sm">
            Racha Actual: <span className="text-[#065F46] text-xl font-black">{daysStreak}</span> días continuos
          </p>
          <p className="text-xs text-slate-500 mb-5">
            Has eliminado apróximadamente <span className="font-bold text-slate-700">{daysStreak * 120}g</span> de toxinas acumuladas.
          </p>
          
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden w-full mb-1">
            <motion.div 
              className="h-full bg-[linear-gradient(90deg,#10B981_0%,#065F46_100%)] rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((daysStreak / 14) * 100, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
            </motion.div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
            <span>Inicio</span>
            <span>Meta: 14 Días</span>
          </div>
        </div>
      </section>

      {/* Escala de Bristol (NUEVO) */}
      <section className="bg-white rounded-[24px] p-5 shadow-sm border border-emerald-100">
        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center">
            <div className="bg-amber-50 p-2 rounded-xl mr-3 text-amber-600">
              <Activity size={24} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 font-heading">Escala de Bristol</h2>
          </div>
          <button className="text-slate-400 hover:text-emerald-600">
            <Info size={20} />
          </button>
        </div>
        <p className="text-sm text-slate-500 mb-4">Registra la forma de tus heces de hoy para ajustar tu ritual.</p>

        <div className="flex overflow-x-auto pb-4 gap-3 snap-x scrollbar-hide -mx-2 px-2">
          {BRISTOL_TYPES.map((item) => (
            <button
              key={item.type}
              onClick={() => setBristolSelected(item.type)}
              className={`snap-center shrink-0 w-32 border ${bristolSelected === item.type ? 'border-[#065F46] bg-[#EBF5F0]' : 'border-slate-100 bg-slate-50'} rounded-2xl p-3 text-left transition-all relative overflow-hidden`}
            >
              {bristolSelected === item.type && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#065F46] rounded-bl-3xl flex items-start justify-end p-1.5">
                  <CheckSquare size={12} className="text-white" />
                </div>
              )}
              <div className="text-[10px] font-bold text-slate-400 mb-1">TIPO {item.type}</div>
              <div className="text-xs font-semibold text-slate-700 leading-tight mb-2 h-8">{item.desc}</div>
              <div className={`text-[9px] font-bold text-white px-2 py-0.5 rounded-full inline-block ${item.color}`}>
                {item.status}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Track Hidratación (NUEVO) */}
      <section className="bg-blue-50/50 rounded-[24px] p-5 shadow-sm border border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-xl mr-3 text-blue-500">
              <GlassWater size={24} />
            </div>
            <h2 className="text-lg font-bold text-slate-800 font-heading">Reto del Agua</h2>
          </div>
          <span className="text-lg font-black text-blue-600">{waterGlasses}/8</span>
        </div>
        <p className="text-sm text-slate-500 mb-4">La papaína y la fibra necesitan agua para funcionar.</p>
        
        <div className="grid grid-cols-4 gap-3">
          {[...Array(8)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setWaterGlasses(idx === waterGlasses - 1 ? idx : idx + 1)}
              className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                idx < waterGlasses 
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-200 scale-105' 
                  : 'bg-white border border-blue-100 text-blue-200 hover:border-blue-300'
              }`}
            >
              <GlassWater size={28} />
            </button>
          ))}
        </div>
      </section>

      {/* SOS Evacuación */}
      <section className="bg-white rounded-[24px] p-5 shadow-sm border border-rose-100">
        <div className="flex items-center mb-4">
          <div className="bg-rose-100 p-2 rounded-xl mr-3 text-rose-500">
            <Droplet size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-800 font-heading">SOS Evacuación</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">Maniobras de emergencia para destrabar el intestino atascado en 15 minutos.</p>
        
        <div className="space-y-3">
          {SOS_STEPS.map((step, idx) => (
            <div key={idx} className="border border-slate-100 rounded-[16px] overflow-hidden bg-slate-50 relative">
              <button 
                onClick={() => setOpenSosStep(openSosStep === idx ? null : idx)}
                className="w-full flex justify-between items-center p-4 hover:bg-slate-100 transition-colors z-10 relative"
              >
                <span className="font-semibold text-slate-800 text-left text-sm">{step.title}</span>
                {openSosStep === idx ? (
                  <ChevronUp className="text-slate-400 shrink-0 ml-2" size={20} />
                ) : (
                  <ChevronDown className="text-slate-400 shrink-0 ml-2" size={20} />
                )}
              </button>
              <AnimatePresence>
                {openSosStep === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="p-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-1">
                      {step.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Lista de Alimentos (NUEVO) */}
      <section className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-[24px] p-5 shadow-lg text-white">
        <div className="flex items-center mb-2">
          <div className="bg-white/20 p-2 rounded-xl mr-3 text-white backdrop-blur-sm">
            <Apple size={24} />
          </div>
          <h2 className="text-lg font-bold font-heading">Guía Semáforo</h2>
        </div>
        <p className="text-emerald-100 text-sm mb-4 leading-relaxed">
          Revisa qué alimentos destapan tu intestino y cuáles causan fermentación y gases.
        </p>
        <button className="w-full bg-white text-[#065F46] font-bold py-3 rounded-xl hover:bg-emerald-50 transition-colors active:scale-95 shadow-md">
          Abrir Lista de Compras
        </button>
      </section>

      {/* Rastreador de Parásitos */}
      <section className="bg-white rounded-[24px] p-5 shadow-sm border border-orange-100">
        <div className="flex items-center mb-4">
          <div className="bg-orange-100 p-2 rounded-xl mr-3 text-orange-600">
            <Bug size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-800 font-heading">Hábitos Anti-Parásitos</h2>
        </div>
        <p className="text-sm text-slate-500 mb-4">Evita la reinfestación marcando estas acciones diarias.</p>
        
        <div className="space-y-3">
          {[
            "Lavé bien con vinagre las frutas y verduras",
            "Cambié o herví el agua del filtro",
            "Mantuve limpias las uñas de mis manos",
            "Desparasitamos a la mascota recientemente"
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-start cursor-pointer group p-2 hover:bg-slate-50 rounded-xl transition-colors"
              onClick={() => toggleParasite(idx)}
            >
              <div className={`mr-3 mt-0.5 transition-colors ${parasiteChecks[idx] ? 'text-orange-500' : 'text-slate-300 group-hover:text-orange-400'}`}>
                {parasiteChecks[idx] ? <CheckSquare size={22} className="fill-orange-100 text-orange-600" /> : <Square size={22} />}
              </div>
              <span className={`text-sm leading-snug ${parasiteChecks[idx] ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

