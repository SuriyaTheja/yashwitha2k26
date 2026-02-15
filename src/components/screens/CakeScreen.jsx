"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Flame, MoveRight, Sparkles } from "lucide-react"
import Button from "../Button"

const confettiColors = [
  "#ff8fab",
  "#ffb3c6",
  "#fca5a5",
  "#e9a8ff",
  "#ffd166"
];


export default function CakeScreen({ onNext }) {
  const [lit, setLit] = useState(false)
  const [decorated, setDecorated] = useState(false)

  const decorate = () => {
    if (decorated) return
    setDecorated(true)
  }

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(() => burst(), 600);
  }

  const burst = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    })
  }

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10">

      {/* Decorative Confetti */}
      <AnimatePresence>
        {decorated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none overflow-hidden"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 + '%',
                  y: -20,
                  rotate: 0,
                  scale: 0
                }}
                animate={{
                  y: 120,
                  rotate: Math.random() * 360,
                  scale: [0, 1, 0.8]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="relative z-10 left-0 w-full text-center text-3xl md:text-4xl font-semibold text-secondary drop-shadow leading-tight px-4 will-change-transform"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={lit ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, ease: "easeOut", delay: lit ? 0.5 : 0 }}
      >
        Happy Birthday, YASHWITHA!🤩
      </motion.div>


      <div className="relative flex flex-col items-center gap-8 w-full">
        <div className="relative h-72 bg-linear-to-b from-white/80 to-rose-200 w-full flex items-end justify-center rounded-[40px] shadow-inner pb-10">
          <Cake lit={lit} />
        </div>
        <AnimatePresence mode="wait">
          {!decorated ? (
            <motion.div
              key="decorate"
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Button onClick={decorate} className="bg-[#ffccd3] text-secondary">
                <Sparkles size={18} className="mb-0.5" />
                Decorate
              </Button>
            </motion.div>
          ) : !lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Button onClick={lightCandle} className="bg-[#ffccd3] text-secondary">
                <Flame size={18} className="mb-0.5" />
                Light the Candle
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 2 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Button onClick={onNext} className="bg-[#ffccd3] text-secondary">
                Next
                <MoveRight size={18} className="mt-0.5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div >
  )
}

function Cake({ lit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
          {lit && <motion.div
            initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="flame"></motion.div>}
        </div>
      </div>
    </div>
  )
}