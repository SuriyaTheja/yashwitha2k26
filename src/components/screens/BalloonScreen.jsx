"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { MoveRight } from "lucide-react"
import Button from "../Button"

const confettiColors = [
  "#ff8fab",  // pink
  "#ffb3c6",  // light pink
  "#fca5a5",  // soft red
  "#e9a8ff",  // lavender
  "#ffd166",  // soft yellow
]

const balloonWords = ["You", "Are", "A", "Star!"]

const starWords = [
  "⭐ Star!",
  "👑 Queen",
  "💪 Leading lady",
  "⚔️ Warrior girl",
  "🏆 Champion",
  "❤️‍🔥 Braveheart",
  "💫 Wonder woman",
  "💼 Girlboss",
  "👸 Princess",
  "🌟 Legend",
  "🎭 Main character",
  "🔥 Radiant",
  "😍 Gorgeous",
  "🌸 Beautiful soul",
  "💖 Dreaming girl",
  "✨ Amazing person",
  "⚡ Wonder Women",
]



export default function BalloonScreen({ onNext }) {
  const [poppedBalloons, setPoppedBalloons] = useState([])
  const [currentStarWordIndex, setCurrentStarWordIndex] = useState(0)

  // Cycle star words only after special balloon (#3) is popped
  useEffect(() => {
    if (poppedBalloons.includes(3)) {
      const interval = setInterval(() => {
        setCurrentStarWordIndex((prev) => (prev + 1) % starWords.length)
      }, 750) // FASTER transition – 1 seconds per word

      return () => clearInterval(interval)
    }
  }, [poppedBalloons])

  const popBalloon = (index) => {
    if (poppedBalloons.includes(index)) return

    setPoppedBalloons((prev) => [...prev, index])

    // Bigger confetti for the star balloon
    setTimeout(() => {
      confetti({
        particleCount: index === 3 ? 100 : 60,
        spread: index === 3 ? 90 : 70,
        startVelocity: index === 3 ? 35 : 25,
        origin: { y: 0.65 },
        colors: confettiColors,
      })
    }, 180)
  }

  const allPopped = poppedBalloons.length === 4

  return (
    <div
      className="
        bg-[#fff8fc]
        px-6 py-8 sm:px-8 sm:py-10
        rounded-[40px] sm:rounded-[56px]
        drop-shadow-2xl
        w-full max-w-[480px]
        mx-auto
        flex flex-col items-center gap-6 sm:gap-8
        my-6 sm:my-10
        relative overflow-hidden
      "
    >
      {/* Title */}
      <motion.div
        className="
          text-center text-3xl sm:text-4xl md:text-5xl
          font-bold text-pink-600 drop-shadow-md
          leading-tight px-4
        "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        Pop the Balloons! 🎈
      </motion.div>

      {/* Balloons Area */}
      <div className="relative w-full flex justify-center">
        <div className="grid grid-cols-2 gap-10 sm:gap-14 max-w-[380px] w-full">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center"
              initial={{ scale: 0.4, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15 * index,
                type: "spring",
                stiffness: 180,
              }}
            >
              <div className="relative h-32 sm:h-40 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {!poppedBalloons.includes(index) ? (
                    <motion.div
                      className="cursor-pointer relative"
                      whileHover={{ scale: 1.12, y: -8 }}
                      whileTap={{ scale: 0.92 }}
                      exit={{
                        scale: [1, 1.4, 0.2],
                        opacity: [1, 1, 0],
                        rotate: [0, -8, 12, -15],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      onClick={() => popBalloon(index)}
                    >
                      <div
                        className="text-7xl sm:text-8xl md:text-9xl select-none drop-shadow-xl"
                        style={{
                          color: confettiColors[index % confettiColors.length],
                          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.15))",
                        }}
                      >
                        🎈
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.15, type: "spring" }}
                      className="
                        absolute inset-0 flex items-center justify-center
                        text-2xl sm:text-3xl md:text-4xl font-extrabold
                        text-secondary drop-shadow-lg
                        select-none px-2 text-center leading-tight
                      "
                    >
                      {index === 3
                        ? starWords[currentStarWordIndex]
                        : balloonWords[index]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <AnimatePresence>
        {allPopped && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8, type: "spring" }}
          >
            <Button
              onClick={onNext}
              className="
                bg-gradient-to-r from-pink-400 to-rose-300
                hover:from-pink-500 hover:to-rose-400
                text-white font-semibold
                px-8 py-4 text-lg shadow-lg
                mt-4
              "
            >
              Next
              <MoveRight size={20} className="ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}