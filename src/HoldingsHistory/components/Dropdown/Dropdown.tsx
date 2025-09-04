import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef, useEffect } from 'react';
import "./Dropdown.css";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  defaultValue?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  /** Ensure a default value will be selected and displayed 
   * even if the user does not interact with the dropdown
   * */
  useEffect(() => {
    if (!selected && options.length > 0) {
      const defaultOption = defaultValue;
      if (defaultOption !== undefined) {
        setSelected(defaultOption);
        onSelect(defaultOption);
      }
    }
  }, [defaultValue, onSelect, options, selected]);

  // Close dropdown if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div
      ref={dropdownRef}
      style={{ position: 'relative', width: '200px' }}
    >
      <div className='label'>{label}</div>
      <button
        className='select-button'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <FontAwesomeIcon icon={faChevronDown} />
      </button>

      {isOpen && (
        <ul className='options-list'>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className='option'
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#e3e3e3')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'white')
              }
            >
              {option}
              {option === selected && (<FontAwesomeIcon icon={faCheck} />)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
