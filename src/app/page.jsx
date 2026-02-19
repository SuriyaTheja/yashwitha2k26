"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
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

  // ===== AUDIO SETUP =====
  useEffect(() => {
    const audio = new Audio("/hbd.mp3")
    audio.loop = true
    audio.volume = 0.3
    audio.preload = "auto"
    audioRef.current = audio

    let hasStarted = false

    const tryPlay = () => {
      if (!audioRef.current || hasStarted) return
      hasStarted = true

      audioRef.current.play().catch(() => {
        // autoplay blocked silently
      })

      document.removeEventListener("click", tryPlay)
      document.removeEventListener("touchstart", tryPlay)
    }

    // User interaction required for autoplay
    document.addEventListener("click", tryPlay)
    document.addEventListener("touchstart", tryPlay)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      document.removeEventListener("click", tryPlay)
      document.removeEventListener("touchstart", tryPlay)
    }
  }, [])

  // ===== NAVIGATION HANDLER =====
  const goTo = useCallback((screenIndex) => {
    setCurrentScreen(screenIndex)
  }, [])

  // ===== SCREENS MEMOIZED =====
  const screens = useMemo(() => [
    <LoaderScreen key="loader" onDone={() => goTo(1)} />,
    <VerificationScreen key="verification" onNext={() => goTo(2)} />,
    <IntroScreen key="intro" onNext={() => goTo(3)} />,
    <CakeScreen key="cake" onNext={() => goTo(4)} />,
    <BalloonScreen key="balloon" onNext={() => goTo(5)} />,
    <PhotosScreen key="photos" onNext={() => goTo(6)} />,
    <MessageScreen key="message" onNext={() => goTo(7)} />,
    <GiftScreen key="gift" />,
  ], [goTo])

  return (
    <main className="min-h-screen overflow-hidden relative">

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
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
