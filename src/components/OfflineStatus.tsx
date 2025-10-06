import React from 'react';
import { Badge } from './ui/badge';
import { Wifi, WifiOff } from 'lucide-react'; // Removed unused Download icon

interface OfflineStatusProps {
  isOffline: boolean;
  language: string; // Added language prop
}

export function OfflineStatus({ isOffline, language }: OfflineStatusProps) {
  // Translations object for this component
  const translations = {
    en: {
      online: 'Online',
      offline: 'Offline',
    },
    hi: {
      online: 'ऑनलाइन',
      offline: 'ऑफ़लाइन',
    },
    pa: {
      online: 'ਔਨਲਾਈਨ',
      offline: 'ਔਫਲਾਈਨ',
    },
  };

  // Select the correct translation, with English as a fallback
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <Badge 
      variant={isOffline ? "destructive" : "default"}
      className={`flex items-center gap-1 transition-colors ${
        isOffline 
          ? 'bg-orange-500 text-white border-orange-600' 
          : 'bg-green-500 text-white border-green-600'
      }`}
    >
      {isOffline ? (
        <>
          <WifiOff className="w-3 h-3" />
          {/* Use translated text */}
          <span className="text-xs">{t.offline}</span>
        </>
      ) : (
        <>
          <Wifi className="w-3 h-3" />
          {/* Use translated text */}
          <span className="text-xs">{t.online}</span>
        </>
      )}
    </Badge>
  );
}