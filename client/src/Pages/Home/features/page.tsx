import { Link } from 'react-router-dom'
import styles from './features.module.css'

const features = [
  {
    title: "Video Conferencing",
    description: "High-quality, lag-free video calls supporting up to 50 participants simultaneously. Share your screen, use virtual backgrounds, and enjoy HD audio for crystal-clear communication.",
  },
  {
    title: "Real-time Messaging",
    description: "Instant messaging with rich text formatting, file sharing, and threaded conversations. Create channels for different teams or projects, and enjoy seamless integration with other platform features.",
  },
  {
    title: "Virtual Office Spaces",
    description: "Customizable 2D environments that mimic real office layouts. Move your avatar around the space, join conversations by proximity, and personalize your virtual desk.",
  },
]

export default function FeaturePage() {
  return (
    <div className={styles.featurePage}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>Our Features</h1>
      </header>
      <main className={styles.main}>
        <p className={styles.intro}>
          Discover the powerful features that make Metaverse Realms the ultimate Virtual Coworking Office Platform. Our comprehensive suite of tools is designed to enhance collaboration, boost productivity, and create a seamless remote work experience.
        </p>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Metaverse Realms. All rights reserved.</p>
        <p>Virtual Coworking Office Platform - CreateX Competition</p>
      </footer>
    </div>
  )
}

