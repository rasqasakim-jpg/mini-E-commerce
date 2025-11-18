import React, { createContext, useContext, ReactNode } from 'react';
import { useSecureStorage } from '../hooks/useSecureStorage';

interface SecureStorageContextType {
  secureStorage: ReturnType<typeof useSecureStorage>;
}

const SecureStorageContext = createContext<SecureStorageContextType | undefined>(undefined);

export const SecureStorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const secureStorage = useSecureStorage();

  const value: SecureStorageContextType = {
    secureStorage,
  };

  return (
    <SecureStorageContext.Provider value={value}>
      {children}
    </SecureStorageContext.Provider>
  );
};

export const useSecureStorageContext = () => {
  const context = useContext(SecureStorageContext);
  if (context === undefined) {
    throw new Error('useSecureStorageContext must be used within a SecureStorageProvider');
  }
  return context;
};