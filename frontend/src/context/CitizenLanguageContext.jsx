import React, { createContext, useContext, useState } from 'react';
import { citizenTranslations } from '../locales/citizenTranslations';

const CitizenLangContext = createContext(null);

export function CitizenLanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Persist preference in localStorage key 'citizen_lang'
    return localStorage.getItem('citizen_lang') || 'en';
  });

  const t = (key) => {
    return citizenTranslations[language]?.[key] || 
           citizenTranslations['en'][key] || 
           key;
  };

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('citizen_lang', lang);
  };

  return (
    <CitizenLangContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t 
    }}>
      <div style={{
          fontFamily: language === 'te' ? "'Noto Sans Telugu', sans-serif" : "inherit"
      }}>
        {children}
      </div>
    </CitizenLangContext.Provider>
  );
}

export function useCitizenLang() {
  const context = useContext(CitizenLangContext);
  if (!context) {
    return {
      language: 'en',
      setLanguage: () => {},
      t: (key) => citizenTranslations['en'][key] || key
    };
  }
  return context;
}
