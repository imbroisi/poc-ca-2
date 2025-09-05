import React, { createContext, useCallback, useContext, useRef, useState } from 'react'

type ModalContextType = {
  isOpen: boolean;
  opacity: number;
  open: (content: React.ReactNode, callback?: () => void) => void;
  close: () => void;
  content: React.ReactNode;
  position: [x: number, y: number];
  setPosition: (position: [x: number, y: number]) => void;
  confirmButtonText: string | null;
  setConfirmButtonText: (confirmButtonText: string | null) => void;
  onConfirm: (callback: () => void) => void;
  fireConfirmed: () => void;
}

const MessageOverContext = createContext<ModalContextType | undefined>(undefined)

  export const MessageOverProvider = ({ children }: { children: React.ReactNode }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [position, setPosition] = useState<[x: number, y: number]>([0, 0]);
  const [confirmButtonText, setConfirmButtonText] = useState<string | null>(null);
  const callback = useRef<any>(() => {});

  const open = (modalContent: React.ReactNode) => {
    // console.log("====>>> MessageOverProvider open", modalContent);
    setContent(modalContent);
    setIsOpen(true);
    setOpacity(1);
  }

  // console.log("MessageOverProvider isOpen", isOpen);

  const close = () => {
    setContent(null);
    setIsOpen(false);
    setOpacity(1);
  }

  const closeWithAnimation = () => {
    // console.log('closeWithAnimation started');
    const duration = 300;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Linear interpolation from 1 to 0
      const currentOpacity = 1 - progress;
      // console.log('Setting opacity to:', currentOpacity);
      setOpacity(currentOpacity);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        close();
      }
    };
    
    requestAnimationFrame(animate);
  }

  const handleFireConfirmed = () => {
    if (callback.current) {
      callback.current();
    }

    closeWithAnimation();

  }

  const handleOnConfirm = (callbackInput?: () => void) => {
    callback.current = callbackInput || null;
  }

  return (
    <MessageOverContext.Provider value={{
        isOpen,
        opacity,
        open,
        close,
        content,
        position,
        confirmButtonText,
        onConfirm: handleOnConfirm,
        fireConfirmed: handleFireConfirmed,
        // confirmed,
        setPosition,
        setConfirmButtonText,
      }}>
      {children}
    </MessageOverContext.Provider>
  )
};

export const useMessageOverContext = () => {
  const context = useContext(MessageOverContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

