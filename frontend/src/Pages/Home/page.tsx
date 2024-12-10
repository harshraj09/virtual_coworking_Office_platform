'use client'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import styles from './page.module.css'
import {useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.landingPage}>
      <Header onLoginClick={() => navigate("/login")} />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

