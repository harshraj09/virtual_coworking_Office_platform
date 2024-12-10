import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2024 Metaverse Realms. All rights reserved.</p>
        <p>Virtual Coworking Office Platform - CreateX Competition</p>
      </div>
    </footer>
  )
}

