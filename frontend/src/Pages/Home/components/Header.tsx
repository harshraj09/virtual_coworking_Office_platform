import { Link } from 'react-router-dom'
import styles from './Header.module.css'

interface HeaderProps {
  onLoginClick: () => void
}

export default function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          Metaverse Realms
        </Link>
        <ul className={styles.navList}>
          <li><Link to="/features" className={styles.navLink}>Features</Link></li>
          <li><Link to="/about" className={styles.navLink}>About US</Link></li>
          <li>
            <button
              onClick={onLoginClick}
              className={styles.loginButton}
            >
              Login
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

