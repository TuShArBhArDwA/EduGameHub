import React, { useState, useEffect } from 'react';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PokemonGame } from './components/PokemonGame';
import { LoginScreen } from './components/LoginScreen';
import { LanguageToggle } from './components/LanguageToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { OfflineStatus } from './components/OfflineStatus';
import { 
  BookOpen, 
  LogOut
} from 'lucide-react';

// IMPROVEMENT 1: Added a User interface for better type safety
interface User {
  id: string;
  nameKey: string;
  xp: number;
  level: number;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLiteMode, setIsLiteMode] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine); // Set initial state accurately
  const [currentGame, setCurrentGame] = useState<any>(null);
  const [gameActive, setGameActive] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Use the User interface

  // IMPROVEMENT 2: Replaced mock offline simulation with real browser events
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const translations = {
    en: {
      appTitle: 'EduGameHub',
      logout: 'Logout',
      welcome: 'Welcome back',
      // ADD THESE
      demoStudentName: 'Tushar Bhardwaj',
      demoTeacherName: 'Dr. Tushar Bhardwaj',
      demoAdminName: 'Tushar Bhardwaj'
    },
    hi: {
      appTitle: 'एडुगेमहब',
      logout: 'लॉगआउट',
      welcome: 'वापसी पर स्वागत',
      // ADD THESE
      demoStudentName: 'तुषार भारद्वाज',
      demoTeacherName: 'डॉ. तुषार भारद्वाज',
      demoAdminName: 'तुषार भारद्वाज'
    },
    pa: {
      appTitle: 'ਐਡੁਗੇਮਹੱਬ',
      logout: 'ਲੌਗਆਉਟ',
      welcome: 'ਵਾਪਸੀ ਤੇ ਸੁਆਗਤ ਹੈ',
      // ADD THESE
      demoStudentName: 'ਤੁਸ਼ਾਰ ਭਾਰਦਵਾਜ',
      demoTeacherName: 'ਡਾ. ਤੁਸ਼ਾਰ ਭਾਰਦਵਾਜ',
      demoAdminName: 'ਤੁਸ਼ਾਰ ਭਾਰਦਵਾਜ'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // Authentication handlers
  const handleLogin = (user: User, role: 'student' | 'teacher' | 'admin') => {
    setCurrentUser(user);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setGameActive(false);
    setCurrentGame(null);
  };

  // Game handlers
  const handleGameLaunch = (subject: any) => {
    setCurrentGame(subject);
    setGameActive(true);
  };

  const handleGameExit = () => {
    setCurrentGame(null);
    setGameActive(false);
  };

  const handleGameComplete = (score: number, xp: number) => {
    if (!currentUser) return;
    setCurrentUser(prevUser => {
      if (!prevUser) return null;
      const newXp = prevUser.xp + xp;
      return {
        ...prevUser,
        xp: newXp,
        level: Math.floor(newXp / 200) + 1
      };
    });
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isLiteMode ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900'}`}>
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b-2 border-blue-200 dark:border-gray-600">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.appTitle}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                {/* FIX: Pass the language prop to OfflineStatus */}
                <OfflineStatus isOffline={isOffline} language={language} />
                <ThemeToggle theme={theme} setTheme={setTheme} />
                <LanguageToggle language={language} setLanguage={setLanguage} />
              </div>
            </div>
          </div>
        </header>

        <LoginScreen language={language} onLogin={handleLogin} />
      </div>
    );
  }

  // Show game interface if game is active
  if (gameActive && currentGame) {
    return (
      <PokemonGame
        subject={currentGame}
        language={language}
        isLiteMode={isLiteMode}
        onExit={handleGameExit}
        onGameComplete={handleGameComplete}
      />
    );
  }

  // Main authenticated app
  return (
    <div className={`min-h-screen ${isLiteMode ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900'}`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b-2 border-blue-200 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
              {currentUser && (
                <span className="hidden md:inline text-gray-600 dark:text-gray-300">
  - {t.welcome}, {t[currentUser.nameKey as keyof typeof t]}!
</span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {/* FIX: Pass the language prop to OfflineStatus */}
              <OfflineStatus isOffline={isOffline} language={language} />
              <ThemeToggle theme={theme} setTheme={setTheme} />
              <LanguageToggle language={language} setLanguage={setLanguage} />
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {userRole === 'student' && currentUser && (
          <StudentDashboard 
            user={{ ...currentUser, name: t[currentUser.nameKey as keyof typeof t] }} 
            language={language} 
            isOffline={isOffline}
            isLiteMode={isLiteMode}
            onLiteModeToggle={setIsLiteMode}
            onGameLaunch={handleGameLaunch}
          />
        )}

        {userRole === 'teacher' && currentUser && (
          <TeacherDashboard 
            user={{ ...currentUser, name: t[currentUser.nameKey as keyof typeof t] }} 
            language={language} 
            isOffline={isOffline}
            isLiteMode={isLiteMode}
            onLiteModeToggle={setIsLiteMode}
          />
        )}

        {userRole === 'admin' && currentUser && (
          <AdminDashboard 
            user={{ ...currentUser, name: t[currentUser.nameKey as keyof typeof t] }} 
            language={language} 
            isOffline={isOffline}
            isLiteMode={isLiteMode}
            onLiteModeToggle={setIsLiteMode}
          />
        )}
      </main>
    </div>
  );
}