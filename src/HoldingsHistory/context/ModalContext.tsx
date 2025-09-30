import { IconProp } from '@fortawesome/fontawesome-svg-core'
import React, { createContext, useContext, useState } from 'react'
import { disableAllScrolling, enableAllScrolling } from '../utils/utils';

type ModalContextType = {
  isOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  handleSetTitle: (title: string) => void;
  handleSetIcon: (icon: IconProp) => void;
  closeModal: () => void;
  content: React.ReactNode;
  title?: string;
  icon?: IconProp;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [icon, setIcon] = useState<IconProp>();
  const [title, setTitle] = useState("");

  const openModal = (modalContent: React.ReactNode) => {
    disableAllScrolling();
    setContent(modalContent);
    setIsOpen(true);
  }

  const closeModal = () => {
    enableAllScrolling();
    setIsOpen(false);
    setContent(null);
  }

  const handleSetTitle = ( title: string) => {
    setTitle(title);
  }

  const handleSetIcon = (icon: IconProp) => {
    setIcon(icon);
  }

  return (
    <ModalContext.Provider value={{
        isOpen,
        openModal,
        closeModal,
        content,
        icon,
        title,
        handleSetTitle,
        handleSetIcon,
      }}>
      {children}
    </ModalContext.Provider>
  )
};

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
