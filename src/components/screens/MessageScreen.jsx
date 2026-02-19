"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Button from "../Button"

export default function MessageScreen({ onNext }) {
    const [opened, setOpened] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const messageRef = useRef(null)

    const handleScroll = () => {
        if (messageRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messageRef.current
            // Show button when scrolled to within 10px of the bottom
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                setShowButton(true)
            }
        }
    }

    useEffect(() => {
        const messageElement = messageRef.current
        if (messageElement && opened) {
            // Check if content is scrollable
            const isScrollable = messageElement.scrollHeight > messageElement.clientHeight
            
            if (!isScrollable) {
                // If not scrollable, show button immediately after animation
                const timer = setTimeout(() => {
                    setShowButton(true)
                }, 600)
                return () => clearTimeout(timer)
            }
            
            messageElement.addEventListener('scroll', handleScroll)
            // Check initial scroll position
            handleScroll()
            return () => messageElement.removeEventListener('scroll', handleScroll)
        }
    }, [opened])

    return (
        <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10">
            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center">
                    A Message/Wish from me!
                </h2>

                <p className="text-primary/70 text-sm">
                    Tap to open
                </p>
            </div>

            <div
                onClick={() => setOpened(!opened)}
                className={`card relative h-71.25 w-full rounded-[40px] overflow-hidden shadow-inner cursor-pointer transition-all bg-linear-to-b from-white/80 to-pink-200 flex items-center justify-center max-w-71.25`}
            >
                <div className={`cover ${opened ? "opacity-0" : "opacity-100"} pointer-events-none z-10 bg-[#ffedea]`} />

                <div
                    ref={messageRef}
                    className="relative px-6 h-56 overflow-y-auto text-foreground"
                >
                    <div className="leading-7 text-[15px]">

                        <p className="text-lg text-center">
                            Happy Birthday,{" "}
                            <span className="font-bold italic text-pink-500 text-2xl ml-1 drop-shadow">
                            Yashwii! 🎉🎂
                            </span>
                        </p>

                        <p className="mt-4 text-center text-primary/80">
                            I hope your day is filled with{" "}
                            <span className="font-semibold text-pink-400">laughter</span>,{" "}
                            <span className="font-semibold text-purple-400">beautiful surprises</span>,{" "}
                            and all the{" "}
                            <span className="font-semibold text-rose-400">happiness</span>{" "}
                            you truly deserve.
                        </p>

                        <p className="mt-3">
                            There’s something, I admire about you —{" "}
                            <span className="font-semibold italic text-yellow-400">
                            the excitement you feel even for the smallest moments
                            </span>{" "}
                            and your curiosity to experience everything around you.  
                            That energy is one of your{" "}
                            <span className="font-bold text-pink-400">most beautiful qualities</span>.
                        </p>

                        <p className="mt-3">
                            Your <span className="font-semibold text-purple-400">genuineness</span>{" "}
                            makes you different in the best way.  
                            It’s not about being perfect or always right, but the{" "}
                            <span className="italic font-semibold text-pink-400">
                            honesty in the way you express yourself
                            </span>{" "}
                            and the way you show up as your real self.
                        </p>

                        <p className="mt-3">
                            I believe you truly care about the people around you, more than you show.{" "}
                            <span className="font-bold text-pink-400">
                            Don’t rush — just go with the flow.
                            </span>
                        </p>

                        <p className="mt-5 text-center">
                            <span className="font-bold text-lg text-yellow-400 tracking-wide">
                            दुःखालयम् अशाश्वतम्
                            </span>
                        </p>

                        <p className="mt-4">
                            Live freely like a{" "}
                            <span className="italic text-sky-400">
                            bird flying across the endless blue sky
                            </span>,{" "}
                            embracing every moment with courage and joy.  
                            Wishing you{" "}
                            <span className="font-bold text-pink-400">endless happiness</span>,{" "}
                            <span className="font-bold text-purple-400">success</span>,{" "}
                            peace of mind, and all the sweet beautiful things life has to offer.
                        </p>

                        <p className="mt-4 text-center text-sm italic text-gray-400">
                            (Don’t overthink — just a small message, a small wish 🤍)
                        </p>

                    </div>


                </div>
            </div>

            {/* One Last Thing Button - Only shows when scrolled to bottom */}
            <AnimatePresence>
                {opened && showButton && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Button
                            onClick={onNext}
                            className="bg-[#ffccd3] text-secondary"
                        >
                            One Last Thing 🎁
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

