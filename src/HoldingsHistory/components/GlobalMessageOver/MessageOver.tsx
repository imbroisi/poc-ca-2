import { useEffect, useRef } from 'react';
import './MessageOver.css';
import { disableAllScrolling, enableAllScrolling } from '../../utils/utils';
import { useMessageOverContext } from '../../context/MessageOverContext';

const MessageOver = (
  // message,
  // position,
  // show,
  // goHide,
  // onConfirm,
  // confirmButtonText = 'Confirm',
) => {
  const { 
    content, 
    isOpen, 
    opacity,
    close, 
    position,
    confirmButtonText, 
    fireConfirmed,
  } = useMessageOverContext();

  // console.log('MessageOver opacity:', opacity);

  const ref = useRef<HTMLDivElement>(null);
  const hideButtons = !confirmButtonText;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log("Click outside - hiding MessageOver");
        close();
      }
    };

    // Only add listener when component is shown
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      disableAllScrolling();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      enableAllScrolling();
    };
  }, [isOpen, close]);

  const onConfirmClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (fireConfirmed) {
      fireConfirmed();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="message-over-container"
      style={{ 
        top: position[1], 
        left: position[0],
        opacity: opacity,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <div style={{ whiteSpace: 'nowrap', margin: '0 8px', minWidth: '140px', textAlign: 'center' }}>
        {content}
        <div style={{ display: 'flex', justifyContent: hideButtons ? 'center' : 'space-between', marginTop: '16px' }}>
          {!hideButtons && (
            <>
              <button onClick={onConfirmClick}>{confirmButtonText}</button>
              <button onClick={(e) => {
                e.stopPropagation();
                console.log("Cancel button clicked");
                close();
              }}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageOver;
