"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { RotateCcw } from "lucide-react"
import Button from "../Button"

const confettiColors = [
  "#ff8fab",
  "#ffb3c6",
  "#fca5a5",
  "#e9a8ff",
  "#ffd166"
];

export default function GiftScreen() {
    const [showPopup, setShowPopup] = useState(false)

    const handleReplay = () => {
        // This will trigger a page reload to restart from the beginning
        window.location.reload()
    }

    // Trigger confetti when popup opens
    useEffect(() => {
        if (showPopup) {
            // Burst confetti all over the page
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.8 },
                    colors: confettiColors,
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.8 },
                    colors: confettiColors,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };

            frame();

            // Also burst from center
            setTimeout(() => {
                confetti({
                    particleCount: 50,
                    spread: 90,
                    origin: { y: 0.6 },
                    colors: confettiColors,
                });
            }, 200);
        }
    }, [showPopup])

    return (
        <>
            <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-6 my-10">
                {/* Gift Display */}
                <div className="flex flex-col items-center gap-4">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-2">
                            A Gift to You! 🎁
                        </h2>
                        <p className="text-primary/70 text-sm mb-4">
                            Click to open your surprise
                        </p>
                    </div>
                    <motion.img
                        src="/gifs/gift.gif"
                        alt="Gift"
                        className="w-48 h-48 cursor-pointer rounded-2xl shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowPopup(true)}
                    />
                </div>
            </div>

            {/* Surprise Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowPopup(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-[#fff8fc] rounded-[40px] p-8 max-w-lg w-full mx-4 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute top-4 right-4 text-primary/60 hover:text-primary transition-colors text-xl"
                            >
                                ✕
                            </button>

                            {/* Surprise GIF */}
                            <div className="flex justify-center mb-6">
                                <img
                                    src="/gifs/surprise.gif"
                                    alt="Surprise"
                                    className="w-40 h-40 rounded-2xl"
                                />
                            </div>

                            {/* Messages */}
                            <div className="text-center space-y-4">
                                <p className="text-lg md:text-xl font-semibold text-secondary">
                                    All the best to you always!
                                </p>
                                <p className="text-base md:text-lg text-primary/80">
                                I hope <span className="font-bold">నువ్వు బాగా ఉన్నినావు, బాగున్నావు, బాగుండాలి...</span><br></br>
                                Once again Happy Birthday..🎂 MoodSwinger, Over-thinker, Rough & Tough Girl! <br></br>
                                </p>

                                <div className="mt-5 flex justify-center">
                                    <span className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold italic shadow-lg">
                                        My style of wishing to you <br></br>
                                        Hope you liked this..🎂✨
                                    </span>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <span className="text-lg font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                                        — Suryateja✨
                                    </span>
                                </div>


                            </div>

                            {/* Replay Button */}
                            <div className="flex justify-center mt-8">
                                <Button
                                    onClick={handleReplay}
                                    className="bg-[#ffccd3] text-secondary"
                                >
                                    <RotateCcw size={18} className="mr-2" />
                                    Replay
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}