// src/context/FlashContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type FlashType = 'success' | 'error' | null;

interface FlashContextType {
  message: string | null;
  type: FlashType;
  showMessage: (msg: string, type: FlashType) => void;
  clearMessage: () => void;
}

const FlashContext = createContext<FlashContextType | undefined>(undefined);

export const FlashProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<FlashType>(null);

  const showMessage = (msg: string, type: FlashType) => {
    setMessage(msg);
    setType(type);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 4000); // auto-clear after 4s
  };

  const clearMessage = () => {
    setMessage(null);
    setType(null);
  };

  return (
    <FlashContext.Provider value={{ message, type, showMessage, clearMessage }}>
      {children}
      {message && (
        <div className={`flash-message ${type}`}>
          {message}
        </div>
      )}
    </FlashContext.Provider>
  );
};

export const useFlash = () => {
  const ctx = useContext(FlashContext);
  if (!ctx) throw new Error('useFlash must be used within a FlashProvider');
  return ctx;
};
