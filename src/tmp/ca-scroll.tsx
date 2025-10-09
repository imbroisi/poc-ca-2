import React, { createContext, useContext, useState } from 'react';

type TmpScrollContextValue = {
  scrollCtl: number;
  resetScroll: () => void;
};

const TmpScrollContext = createContext<TmpScrollContextValue | undefined>(undefined);

type TmpScrollProviderProps = {
  children: React.ReactNode;
};

export function TmpScrollProvider({ children }: TmpScrollProviderProps) {
  const [scrollCtl, setScrollCtl] = useState(1);

  const resetScroll = () => {
    setScrollCtl((prev) => -prev);
  };

  return (
    <TmpScrollContext.Provider
      value={{
        scrollCtl,
        resetScroll,
      }}
    >
      {children}
    </TmpScrollContext.Provider>
  );
}

export function useTmpScroll() {
  const ctx = useContext(TmpScrollContext);
  if (!ctx) {
    throw new Error('useTmpScroll must be used within TmpScrollProvider');
  }
  return ctx;
}
