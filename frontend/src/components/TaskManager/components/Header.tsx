import React from 'react';
import { Briefcase, Menu, User, UserCog } from 'lucide-react';
import styles from './Header.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';

interface HeaderProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

interface DropdownMenuItem {
  label: string;
  onClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();
  const {spaceId} = useParams();
  const menuItems:DropdownMenuItem[] = [
    {
      label : "Home",
      onClick : () => {
        navigate("/")
      }
    },
    {
      label : "Back",
      onClick : () => {
        navigate(`/space/${spaceId}/room`)
      }
    },
    {
      label : "Log Out",
      onClick : () => {
        localStorage.clear();
        window.location.href = "/";
      }
    },
  ]
  
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Briefcase size={24} />
            <h1>TaskMaster</h1>
          </div>
          <div style={{
            display : "flex",
            alignItems : "center",
            justifyContent : "center",
            gap : "30px"
          }}>
            <DropdownMenu label={<Menu />} items={menuItems} />
            <button
              className={`${styles.adminToggle} ${isAdmin ? styles.admin : ''}`}
              onClick={() => setIsAdmin(!isAdmin)}
            >
              {isAdmin ? <UserCog size={20} /> : <User size={20} />}
              <span>{isAdmin ? 'Admin Mode' : 'User Mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

