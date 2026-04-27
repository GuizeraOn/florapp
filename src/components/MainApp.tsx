import React, { useState, useEffect } from 'react';
import { Home, Tool, Gift, HelpCircle, Activity } from 'lucide-react';
import { HomeTab } from './tabs/HomeTab';
import { ToolsTab } from './tabs/ToolsTab';
import { GiftsTab } from './tabs/GiftsTab';
import { HelpTab } from './tabs/HelpTab';
import { Onboarding, UserData } from './Onboarding';

type TabType = 'inicio' | 'herramientas' | 'regalos' | 'ayuda';

interface MainAppProps {
  onLogout: () => void;
}

export function MainApp({ onLogout }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  
  // States that need to persist across tabs
  const [daysStreak, setDaysStreak] = useState(1);
  const [hasTakenRitual, setHasTakenRitual] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('flora_onboarding_complete');
    if (status === 'true') {
      setHasCompletedOnboarding(true);
      const data = localStorage.getItem('flora_user_data');
      if (data) {
        setUserData(JSON.parse(data));
      }
    }
  }, []);

  const handleCompleteQuiz = (data: UserData) => {
    localStorage.setItem('flora_onboarding_complete', 'true');
    localStorage.setItem('flora_user_data', JSON.stringify(data));
    setUserData(data);
    setHasCompletedOnboarding(true);
    setIsQuizOpen(false);
  };

  const handleResetDiagnosis = () => {
    localStorage.removeItem('flora_onboarding_complete');
    localStorage.removeItem('flora_user_data');
    setHasCompletedOnboarding(false);
    setUserData(null);
    setActiveTab('inicio');
  };

  if (isQuizOpen) {
    return <Onboarding onComplete={handleCompleteQuiz} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'inicio':
        return <HomeTab daysStreak={daysStreak} setDaysStreak={setDaysStreak} hasTakenRitual={hasTakenRitual} setHasTakenRitual={setHasTakenRitual} hasCompletedOnboarding={hasCompletedOnboarding} onStartQuiz={() => setIsQuizOpen(true)} userData={userData} />;
      case 'herramientas':
        return <ToolsTab daysStreak={daysStreak} />;
      case 'regalos':
        return <GiftsTab />;
      case 'ayuda':
        return <HelpTab onReset={handleResetDiagnosis} onLogout={onLogout} />;
      default:
        return <HomeTab daysStreak={daysStreak} setDaysStreak={setDaysStreak} hasTakenRitual={hasTakenRitual} setHasTakenRitual={setHasTakenRitual} hasCompletedOnboarding={hasCompletedOnboarding} onStartQuiz={() => setIsQuizOpen(true)} userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-[70px]">
      {/* Global Header */}
      <header className="fixed top-0 left-0 right-0 h-[70px] bg-white border-b border-emerald-50 shadow-sm z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#065F46] text-white flex items-center justify-center font-bold text-sm shadow-md">
            F
          </div>
          <span className="font-heading font-[800] text-xl text-[#064E3B] tracking-tight">Flora App</span>
        </div>
        {hasCompletedOnboarding && (
          <div className="bg-[#EBF5F0] text-[#065F46] px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ACTIVO
          </div>
        )}
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        {renderTab()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-[#f0f0f0] pb-safe z-50">
        <ul className="flex justify-around items-center max-w-md mx-auto relative">
          {!hasCompletedOnboarding && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px]" />
          )}
          <NavItem 
            id="inicio" 
            icon={<Home size={26} />} 
            label="Inicio" 
            isActive={activeTab === 'inicio'} 
            onClick={() => setActiveTab('inicio')} 
          />
          <NavItem 
            id="herramientas" 
            icon={<Activity size={26} />} 
            label="Herramientas" 
            isActive={activeTab === 'herramientas'} 
            onClick={() => setActiveTab('herramientas')} 
          />
          <NavItem 
            id="regalos" 
            icon={<Gift size={26} />} 
            label="Regalos" 
            isActive={activeTab === 'regalos'} 
            onClick={() => setActiveTab('regalos')} 
          />
          <NavItem 
            id="ayuda" 
            icon={<HelpCircle size={26} />} 
            label="Ayuda" 
            isActive={activeTab === 'ayuda'} 
            onClick={() => setActiveTab('ayuda')} 
          />
        </ul>
      </nav>
    </div>
  );
}

interface NavItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <li className="flex-1">
      <button 
        onClick={onClick}
        className={`w-full flex flex-col justify-center items-center h-[85px] transition-all duration-200 ${isActive ? 'text-[#065F46]' : 'text-[#9ca3af]'}`}
      >
        <div className={`mb-1 transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-sm' : 'scale-100'}`}>
          {icon}
        </div>
        <span className="text-[11px] font-[600]">
          {label}
        </span>
      </button>
    </li>
  );
}
