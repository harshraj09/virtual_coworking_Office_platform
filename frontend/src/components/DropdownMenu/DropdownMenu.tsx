import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './DropdownMenu.css';

interface DropdownMenuItem {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
}

export default function DropdownMenu({ items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="icon-button" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index} onClick={() => { item.onClick(); setIsOpen(false); }}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

