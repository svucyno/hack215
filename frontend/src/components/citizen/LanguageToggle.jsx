import React from 'react';
import { useCitizenLang } from '../../context/CitizenLanguageContext';

export function LanguageToggle() {
  const { language, setLanguage, t } = useCitizenLang();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      background: 'rgba(22,163,74,0.10)',
      border: '1px solid rgba(22,163,74,0.25)',
      borderRadius: '20px',
      padding: '3px',
      width: 'fit-content',
    }}>
      {/* English Button */}
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: '4px 12px',
          borderRadius: '16px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.03em',
          transition: 'all 0.2s ease',
          background: language === 'en' 
            ? '#16A34A' 
            : 'transparent',
          color: language === 'en' 
            ? '#ffffff' 
            : '#16A34A',
        }}
      >
        EN
      </button>

      {/* Telugu Button */}
      <button
        onClick={() => setLanguage('te')}
        style={{
          padding: '4px 12px',
          borderRadius: '16px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.03em',
          transition: 'all 0.2s ease',
          background: language === 'te' 
            ? '#16A34A' 
            : 'transparent',
          color: language === 'te' 
            ? '#ffffff' 
            : '#16A34A',
        }}
      >
        తె
      </button>
    </div>
  );
}
