"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { MoveRight } from "lucide-react"
import Button from "../Button"

const confettiColors = [
  "#ff8fab",
  "#ffb3c6",
  "#fca5a5",
  "#e9a8ff",
  "#ffd166"
];

const balloonWords = ["You", "Are", "A", "Star!"];

export default function BalloonScreen({ onNext }) {
  const [poppedBalloons, setPoppedBalloons] = useState([]);

  const popBalloon = (index) => {
    if (poppedBalloons.includes(index)) return;

    setPoppedBalloons(prev => [...prev, index]);

    // Trigger confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: confettiColors,
      });
    }, 200);
  };

  const allPopped = poppedBalloons.length === 4;

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-6 my-10">

      <motion.div
        className="text-center text-3xl md:text-4xl font-semibold text-primary drop-shadow leading-tight px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Pop the Balloons!
      </motion.div>

      <div className="relative flex flex-col items-center gap-8 w-full">
        {/* Balloons Grid */}
        <div className="grid grid-cols-2 gap-8 w-full max-w-md">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center gap-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              {/* Balloon Container */}
              <div className="relative h-24 flex items-center justify-center overflow-visible">
                {/* Balloon */}
                <AnimatePresence>
                  {!poppedBalloons.includes(index) && (
                    <motion.div
                      className="relative cursor-pointer"
                      exit={{
                        scale: [1, 1.2, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        y: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => popBalloon(index)}
                    >
                      <div className="text-6xl md:text-7xl select-none filter drop-shadow-lg">
                        <span style={{ color: confettiColors[index % confettiColors.length] }}>🎈</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Word - Always visible once popped */}
                <AnimatePresence>
                  {poppedBalloons.includes(index) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl font-bold text-secondary select-none drop-shadow-lg"
                    >
                      {balloonWords[index]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Next Button */}
        <AnimatePresence>
          {allPopped && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Button onClick={onNext} className="bg-[#ffccd3] text-secondary">
                Next
                <MoveRight size={18} className="mt-0.5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}