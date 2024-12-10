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
    title: "Audio Rooms",
    description: "Create or join audio-only rooms for quick discussions, brainstorming sessions, or background chatter. Perfect for replicating the casual conversations you'd have in a physical office.",
  },
  {
    title: "Virtual Office Spaces",
    description: "Customizable 3D environments that mimic real office layouts. Move your avatar around the space, join conversations by proximity, and personalize your virtual desk.",
  },
  {
    title: "Task Management",
    description: "Built-in task boards and to-do lists to keep your team organized and productive. Assign tasks, set deadlines, and track progress all within the same platform you use for communication.",
  },
  {
    title: "Document Collaboration",
    description: "Real-time collaborative document editing, allowing multiple team members to work on the same file simultaneously. Includes version history and commenting features.",
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

