
import { Link } from 'react-router-dom' 
import styles from './about.module.css'
import pranjail from '../../../images/members/Pranjali.jpg'
import harsh from '../../../images/members/harsh.jpg'
import mahi from '../../../images/members/Mahi.jpg'
import ashutosh from '../../../images/members/Ashutosh.jpg'
import createx from '../../../images/createx.mp4'

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>← Back to Home</Link>
        <h1 className={styles.title}>About Us</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <p className={styles.teamDescription}>
            We are a group of four passionate developers participating in the CreateX event. Our team brings together a diverse set of skills and experiences, united by our love for creating innovative solutions in the realm of virtual collaboration.
          </p>
          <div className={styles.teamMembers}>
            {/* Add team member details here */}
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>
                <img
                src={ashutosh}
                style={{
                  width : "100%",
                  height : "100%",
                  objectFit : "cover",
                  borderRadius : "50%"
                }}
              />
              </div>
              <h3 className={styles.memberName}>Ashutosh Paliwal</h3>
              <p className={styles.memberRole}>Full-stack Developer</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>
              <img
                src={harsh}
                style={{
                  width : "100%",
                  height : "100%",
                  objectFit : "cover",
                  borderRadius : "50%"
                }}
              />
              </div>
              <h3 className={styles.memberName}>Harsh Raj Singh Rathore</h3>
              <p className={styles.memberRole}>Frontend Developer</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>
              <img
                src={pranjail}
                style={{
                  width : "100%",
                  height : "100%",
                  objectFit : "cover",
                  borderRadius : "50%"
                }}
              />
              </div>
              <h3 className={styles.memberName}>Pranjali Bhatt</h3>
              <p className={styles.memberRole}>UI/UX Designer</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.memberAvatar}>
              <img
                src={mahi}
                style={{
                  width : "100%",
                  height : "100%",
                  objectFit : "cover",
                  borderRadius : "50%"
                }}
              />
              </div>
              <h3 className={styles.memberName}>Mahi Sharma</h3>
              <p className={styles.memberRole}>Frontend Developer</p>
            </div>
          </div>
        </section>
        <section className={styles.projectSection}>
          <h2 className={styles.sectionTitle}>Our Project</h2>
          <p className={styles.projectDescription}>
            Metaverse Realms is our innovative Virtual Coworking Office Platform, designed to revolutionize remote collaboration. We're excited to present this project as part of the CreateX event, showcasing the future of digital workspaces.
          </p>
          <div className={styles.techStack}>
            <h3 className={styles.techStackTitle}>Tech Stack</h3>
            <ul className={styles.techList}>
              <li>React: For building our dynamic and responsive user interface</li>
              <li>Express: Powering our robust backend server</li>
              <li>Socket.io: Enabling real-time, bidirectional communication</li>
              <li>MongoDB: Our choice for a flexible and scalable database solution</li>
            </ul>
          </div>
        </section>
        <section className={styles.eventSection}>
          <h2 className={styles.sectionTitle}>CreateX Event</h2>
          <div className={styles.eventImageContainer}>
          <video src={createx} width={"100%"} height={"100%"} loop autoPlay playsInline muted style={{
            borderRadius : "30px"
          }}></video>
          </div>
          <p className={styles.eventDescription}>
            We are proud participants in the CreateX event, where we have the opportunity to showcase our innovative virtual coworking solution. This event has challenged us to push the boundaries of what's possible in remote collaboration technology.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Metaverse Realms. All rights reserved.</p>
        <p>Virtual Coworking Office Platform - CreateX Competition</p>
      </footer>
    </div>
  )
}

