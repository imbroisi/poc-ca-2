import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './GlobalModal.css';
import { useModal } from '../../PocCa/context/ModalContext';


const GlobalModal = () => {

  const { isOpen, closeModal, content, title, icon } = useModal();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faClose} size={"sm"} color="#151616" />
        </button>
        {(title || icon) && (
          <div className='modal-header'>
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
