import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Award, CheckCircle2, Activity, Play, ArrowRight, Scale, AlertTriangle, Zap, Clock } from 'lucide-react';

export interface UserData {
  weight: number;
  height: number;
  imc: number;
  imcCategory: string;
  answers: Record<string, string>;
}

interface OnboardingProps {
  onComplete: (data: UserData) => void;
}

type QuestionType = 'choice' | 'measurements';

interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 'edad',
    question: "¿Cuál es tu edad?",
    type: 'choice',
    options: ["30-45 años", "46-55 años", "56 años o más"]
  },
  {
    id: 'medidas',
    question: "Para calcular tu Índice de Retención de Toxinas, ¿cuál es tu peso y altura aproximada?",
    type: 'measurements'
  },
  {
    id: 'frecuencia',
    question: "¿Cuántos días llevas sin ir al baño regularmente?",
    type: 'choice',
    options: ["1 a 2 días", "3 a 5 días", "Más de 5 días (Crónico)"]
  },
  {
    id: 'sintoma',
    question: "¿Cuál es tu síntoma más molesto hoy?",
    type: 'choice',
    options: ["Vientre muy hinchado como globo", "Gases y cólicos dolorosos", "Pesadez extrema y cansancio constante"]
  },
  {
    id: 'metabolismo',
    question: "¿Cómo describirías tu metabolismo últimamente?",
    type: 'choice',
    options: ["Súper lento, retengo muchos líquidos", "Irregular, a veces bien a veces mal", "Estancado, no bajo de peso con nada"]
  },
  {
    id: 'laxantes',
    question: "¿Has intentado usar laxantes de farmacia antes?",
    type: 'choice',
    options: ["Sí, pero me dan retorcijones horribles", "Sí, pero siento que ya no me hacen efecto", "No, prefiero buscar algo 100% natural"]
  },
  {
    id: 'agua',
    question: "¿Cuánta agua bebes al día en promedio?",
    type: 'choice',
    options: ["Menos de 3 vasos (muy poca)", "Entre 4 y 6 vasos", "Más de 8 vasos (buena hidratación)"]
  },
  {
    id: 'estres',
    question: "¿Cómo es tu nivel de estrés o ansiedad actual?",
    type: 'choice',
    options: ["Muy alto, siento que afecta mi digestión", "Moderado, el estrés del día a día", "Bajo, me siento muy tranquila en general"]
  }
];

const LOADING_TEXTS = [
  "Analizando tu historial metabólico y respuestas...",
  "Cruzando datos de edad, peso y nivel de estrés...",
  "Calculando tu Índice de Masa Corporal (IMC)...",
  "Estimando niveles ocultos de inflamación intestinal...",
  "Ajustando dosis de papaína, bromelina y probióticos...",
  "Optimizando protocolo natural Fase 2...",
  "Protegiendo mucosas digestivas...",
  "¡Hemos diseñado tu ritual perfecto!"
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<'welcome' | 'questions' | 'loading' | 'result'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => {
        setLoadingTextIndex((prev) => {
          if (prev < LOADING_TEXTS.length - 1) return prev + 1;
          clearInterval(interval);
          setTimeout(() => setStep('result'), 1200);
          return prev;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      processResults();
      setStep('loading');
    }
  };

  const handleChoiceAnswer = (option: string) => {
    setAnswers({ ...answers, [QUESTIONS[currentQuestion].id]: option });
    handleNextQuestion();
  };

  const handleMeasurementsSubmit = () => {
    if (!weight || !height) return;
    setAnswers({ 
      ...answers, 
      [QUESTIONS[currentQuestion].id]: `${weight}kg / ${height}cm` 
    });
    handleNextQuestion();
  };

  const processResults = () => {
    const w = parseFloat(weight) || 70;
    const h = parseFloat(height) || 160;
    const hMeters = h / 100;
    const imc = w / (hMeters * hMeters);
    
    let imcCategory = '';
    if (imc < 18.5) imcCategory = 'Bajo peso funcional';
    else if (imc < 25) imcCategory = 'Rango saludable (con posible retención de desechos)';
    else if (imc < 30) imcCategory = 'Sobrepeso metabólico (alta retención de toxinas)';
    else imcCategory = 'Obesidad / Inflamación severa';

    setUserData({
      weight: w,
      height: h,
      imc,
      imcCategory,
      answers
    });
  };

  const currentQ = QUESTIONS[currentQuestion];

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 overflow-y-auto overflow-x-hidden text-slate-800 w-full">
      <div className="flex flex-col items-center min-h-[100dvh] w-full p-4 sm:p-6 py-10">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center w-full max-w-md bg-white p-8 rounded-[24px] shadow-sm border border-emerald-100 my-auto shrink-0"
            >
            <div className="flex justify-center mb-6 text-[#065F46]">
              <Leaf size={64} />
            </div>
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">
              ¡Bienvenida a Flora! 🌿
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Para generar tu Ritual con las dosis exactas para tu cuerpo, necesitamos conocerte mejor para calcular tu <b>Nivel de Retención Metabólica</b>.
            </p>
            <button
              onClick={() => setStep('questions')}
              className="w-full py-[20px] px-6 rounded-[24px] font-[800] text-[18px] text-center flex items-center justify-center border-none transition-all bg-[#065F46] text-white shadow-[0_10px_20px_rgba(6,95,70,0.3)] active:scale-95"
            >
              Comenzar Diagnóstico Profundo
            </button>
          </motion.div>
        )}

          {step === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-emerald-100 my-auto shrink-0"
            >
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-[#065F46] mb-2">
                <span>Paso {currentQuestion + 1} de {QUESTIONS.length}</span>
                <span>{Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-[#d1e8df] rounded-full overflow-hidden w-full">
                <motion.div 
                  className="h-full bg-[#065F46]"
                  initial={{ width: `${((currentQuestion) / QUESTIONS.length) * 100}%` }}
                  animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            
            <h2 className="text-[22px] sm:text-[24px] font-heading font-bold text-[#064E3B] mb-8 leading-tight">
              {currentQ.question}
            </h2>
            
            {currentQ.type === 'choice' && currentQ.options && (
              <div className="space-y-3 sm:space-y-4">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoiceAnswer(option)}
                    className="w-full text-left bg-slate-50 hover:bg-[#d1e8df] border border-slate-200 hover:border-[#065F46]/30 text-slate-800 text-base sm:text-lg font-medium py-4 px-6 rounded-[16px] transition-all active:scale-[0.98]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === 'measurements' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">¿Cuál es tu peso estimado? (kg)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Ej: 75" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-[16px] py-4 px-6 text-xl font-bold text-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#065F46]/50"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">kg</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">¿Cuál es tu altura aproximada? (cm)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Ej: 165" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-[16px] py-4 px-6 text-xl font-bold text-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#065F46]/50"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">cm</span>
                  </div>
                </div>
                
                <button
                  onClick={handleMeasurementsSubmit}
                  disabled={!weight || !height}
                  className="w-full mt-4 py-[18px] px-6 rounded-[20px] font-[800] text-[18px] text-center flex items-center justify-center gap-2 transition-all bg-[#065F46] text-white disabled:bg-slate-300 disabled:shadow-none shadow-[0_10px_20px_rgba(6,95,70,0.3)] active:scale-95"
                >
                  Continuar <ArrowRight size={20} />
                </button>
                <p className="text-xs text-center text-slate-400">Tus datos están 100% seguros y son privados.</p>
              </div>
            )}
          </motion.div>
        )}

          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center w-full max-w-md bg-white p-8 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] my-auto shrink-0"
            >
            <div className="inline-block px-3 py-1 bg-[#EBF5F0] text-[#065F46] rounded-full text-[10px] font-bold mb-4 tracking-wide uppercase">
              Motor de Diagnóstico IA
            </div>
            <h3 className="text-xl font-bold mb-2">Procesando Perfil Clínico</h3>
            <p className="text-[14px] mb-8 text-[#064E3B]/80 font-medium h-14 flex items-center justify-center">
              {LOADING_TEXTS[loadingTextIndex]}
            </p>
            <div className="flex items-center justify-center gap-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-[#EBF5F0] border-t-[#065F46]"
              />
              <span className="text-[14px] font-bold text-[#065F46]">
                {Math.min(Math.round(((loadingTextIndex + 1) / LOADING_TEXTS.length) * 100), 100)}%
              </span>
            </div>
          </motion.div>
        )}

          {step === 'result' && userData && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md bg-white rounded-[24px] shadow-sm border border-emerald-100 overflow-hidden my-auto shrink-0"
            >
            <div className="bg-[#065F46] p-6 text-center text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#F59E0B] text-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Award size={32} />
                </div>
                <h2 className="text-2xl font-bold font-heading mb-1">Diagnóstico Finalizado</h2>
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest mt-2">
                  100% Personalizado para Ti
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-[#064E3B]/80 text-xs font-bold uppercase tracking-wider mb-3 px-1">Resumen de tu Metabolismo</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-100 flex flex-col items-center text-center">
                  <Scale className="text-[#F59E0B] mb-2" size={24} />
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Tu IMC Actual</p>
                  <p className="text-2xl font-black text-[#064E3B]">{userData.imc.toFixed(1)}</p>
                  <div className="mt-2 text-[10px] font-bold px-2 py-1 bg-white rounded-md text-slate-700 leading-tight border border-slate-200">
                    {userData.imcCategory}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-100 flex flex-col items-center text-center justify-between">
                  <AlertTriangle className="text-rose-500 mb-2" size={24} />
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Nivel de Inflamación</p>
                  <p className="text-sm font-bold text-[#064E3B] leading-tight">
                    {userData.answers['sintoma']?.includes('Vientre') ? 'Crónica (Hinchazón)' : 'Alta (Retención activa)'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 bg-[#EBF5F0]/50 p-3 rounded-[12px] border border-[#d1e8df]">
                  <Activity className="text-[#065F46] shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[11px] text-[#065F46] font-bold uppercase">Frecuencia Intestinal</p>
                    <p className="text-sm font-semibold text-slate-800">{userData.answers['frecuencia']}</p>
                    <p className="text-xs text-slate-600 mt-1">Causa principal del estancamiento de peso.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-[#EBF5F0]/50 p-3 rounded-[12px] border border-[#d1e8df]">
                  <Zap className="text-[#F59E0B] shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[11px] text-[#F59E0B] font-bold uppercase">La Solución Fase 2</p>
                    <p className="text-sm font-semibold text-slate-800">Protocolo enzimático adaptado a tus {userData.height}cm y {userData.weight}kg.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fdf8f6] border border-orange-100 rounded-xl p-4 mb-6">
                <h4 className="flex items-center text-orange-800 font-bold text-sm mb-2">
                  <Clock size={16} className="mr-2" />
                  El momento de actuar es ahora
                </h4>
                <p className="text-xs text-orange-900 leading-relaxed">
                  Llevas demasiado tiempo sufriendo de <b>{userData.answers['sintoma']?.toLowerCase()}</b>. Hemos calculado las dosis exactas de enzimas que ayudarán a tu sistema a expulsar los desechos acumulados hoy mismo.
                </p>
              </div>

              <button
                onClick={() => onComplete(userData)}
                className="w-full py-[20px] px-6 rounded-[24px] font-[800] text-[18px] text-center flex items-center justify-center gap-2 border-none transition-all bg-[#065F46] text-white shadow-[0_10px_20px_rgba(6,95,70,0.3)] hover:bg-[#054f3a] active:scale-95"
              >
                <Play fill="currentColor" size={20} />
                Desbloquear Mi Protocolo
              </button>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
