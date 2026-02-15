"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
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

    // Add event listeners for debugging
    audioRef.current.addEventListener('canplaythrough', () => {
      console.log('Audio can play through')
      audioReady = true
    })
    audioRef.current.addEventListener('error', (e) => {
      console.log('Audio error:', e)
    })
    audioRef.current.addEventListener('loadstart', () => {
      console.log('Audio load start')
    })

    const startAudio = () => {
      console.log('Attempting to play audio, ready:', audioReady)
      if (audioReady) {
        audioRef.current.play().then(() => {
          console.log('Audio started playing')
        }).catch(error => {
          console.log('Audio play failed:', error)
        })
      } else {
        // Wait for audio to be ready
        audioRef.current.addEventListener('canplay', () => {
          audioRef.current.play().then(() => {
            console.log('Audio started playing after canplay')
          }).catch(error => {
            console.log('Audio play failed after canplay:', error)
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
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} />,
    <BalloonScreen key="balloon" onNext={() => setCurrentScreen(4)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(5)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(6)} />,
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
