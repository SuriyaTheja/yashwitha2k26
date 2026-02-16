"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import VerificationScreen from "@/components/screens/VerificationScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import BalloonScreen from "@/components/screens/BalloonScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import GiftScreen from "@/components/screens/GiftScreen"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize background music
    audioRef.current = new Audio('/hbd.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
    audioRef.current.preload = 'auto'

    let audioReady = false

    audioRef.current.addEventListener('canplaythrough', () => {
      audioReady = true
    })
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio error:', e)
    })

    const startAudio = () => {
      if (audioReady) {
        audioRef.current.play().catch(error => {
          console.error('Audio play failed:', error)
        })
      } else {
        audioRef.current.addEventListener('canplay', () => {
          audioRef.current.play().catch(error => {
            console.error('Audio play failed after canplay:', error)
          })
        }, { once: true })
      }
      document.removeEventListener('click', startAudio)
    }

    document.addEventListener('click', startAudio)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      document.removeEventListener('click', startAudio)
    }
  }, [])

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <VerificationScreen key="verification" onNext={() => setCurrentScreen(2)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(3)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(4)} />,
    <BalloonScreen key="balloon" onNext={() => setCurrentScreen(5)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(6)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(7)} />,
    <GiftScreen key="gift" />,
  ]

  return (
    <main className="min-h-screen overflow-hidden relative">

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center w-full"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
