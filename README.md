Oi Ana, caso seja preciso fazer o reset do scrollbar funcionar, e nao queira perder muito tempo com isso, aqui vai uma sugestão. Quando eu voltar eu acerto para um melhor formato.

1. Criar um context para centralizar a operação. No final colocarei um código como sugestão.

2. No componente Footer tem a captura de dois eventos: um que captura o pedido de troca de página (acho que é handlePageChage) e outro para o numero de holdings por página (acho que é handleHoldingsPerPage).
No processamento de ambos chamar resetScrollbar() (ver context lá em baixo).

3. No hook que processa o scroll, incluir este código:

  useEffect(() => {
    // TODO: aqui chamar a função dentro deste hook que posiciona o scroll bar.
    // não recordo ao certo qual é, pf dê uma procurada. Qq coisa me fala.
    // A função deve ser chamada posicionando o scrollbar em 0.
  },[scrollCtl]);

Isso deve bastar.

Este é a sugestão para o context.
Obrigado!

-------------------------------------------------------------------------------
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

