import { motion } from 'framer-motion'
import { Video, MessageSquare, Headphones } from 'lucide-react'
import styles from './Features.module.css'

const features = [
  { icon: Video, title: 'Video Conferencing', description: 'High-quality video calls for face-to-face interactions' },
  { icon: MessageSquare, title: 'Real-time Messaging', description: 'Instant messaging for quick communication and file sharing' },
  { icon: Headphones, title: 'Audio Rooms', description: 'Create or join audio rooms for discussions and brainstorming' },
]

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.featuresTitle}>Our Features</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <feature.icon className={styles.featureIcon} />
              <h3 className={styles.featureCardTitle}>{feature.title}</h3>
              <p className={styles.featureCardDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

