'use client'

import { Link } from 'react-router-dom'
import styles from './Hero.module.css'
import createx from '../../../images/createx.mp4';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Welcome to <span className={styles.highlight}>Metaverse Realms</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Experience the future of remote collaboration in our Virtual Coworking Office
        </p>
        <div className={styles.buttonGroup}>
          <Link to="/dashboard" className={styles.heroButton}>
            Get Start
          </Link>
          <Link to="/about" className={styles.secondaryButton}>
            About Us
          </Link>
        </div>
        <div className={styles.createxContainer}>
          <video src={createx} width={"100%"} height={"100%"} loop autoPlay playsInline muted style={{
            borderRadius : "30px"
          }}></video><br></br>
          <p className={styles.createxText}>Proud participant of the CreateX event</p>
        </div>
      </div>
    </section>
  )
}

