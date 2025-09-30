import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import styles from './GlobalModal.module.scss';
import { useModal } from '../../context/ModalContext';


const GlobalModal = () => {

  const { isOpen, closeModal, content, title, icon } = useModal();

  // console.log("POS 6 isOpen", isOpen);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          <FontAwesomeIcon icon={faClose} size={"sm"} color="#151616" />
        </button>
        {(title || icon) && (
          <div className={styles.modalHeader}>
            {title && <h3>{title}</h3>}
            {icon && <FontAwesomeIcon icon={icon} size="sm"/>}
          </div>
        )}
        {content}
      </div>
    </div>
  )
}

export default GlobalModal;
