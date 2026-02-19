"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Button from "../Button"

export default function MessageScreen({ onNext }) {
    const [opened, setOpened] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const messageRef = useRef(null)

    // Optimized scroll handler (stable reference)
    const handleScroll = useCallback(() => {
        const el = messageRef.current
        if (!el) return

        const { scrollTop, scrollHeight, clientHeight } = el
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setShowButton(true)
        }
    }, [])

    useEffect(() => {
        const el = messageRef.current
        if (!el || !opened) return

        const isScrollable = el.scrollHeight > el.clientHeight

        // If not scrollable → show button after animation
        if (!isScrollable) {
            const timer = setTimeout(() => setShowButton(true), 600)
            return () => clearTimeout(timer)
        }

        // Attach scroll listener
        el.addEventListener("scroll", handleScroll, { passive: true })

        // Check initial position
        handleScroll()

        return () => {
            el.removeEventListener("scroll", handleScroll)
        }
    }, [opened, handleScroll])

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
                onClick={() => setOpened(prev => !prev)}
                className={`card relative h-71.25 w-full rounded-[40px] overflow-hidden shadow-inner cursor-pointer transition-all bg-linear-to-b from-white/80 to-pink-200 flex items-center justify-center max-w-71.25`}
            >
                <div className={`cover ${opened ? "opacity-0" : "opacity-100"} pointer-events-none z-10 bg-[#ffedea]`} />

                <div
                    ref={messageRef}
                    className="relative px-6 h-56 overflow-y-auto text-foreground"
                >
                    <div className="leading-7 text-[15px]">

                        <p className="text-lg">
                            Happy Birthday,{" "}
                            <span className="font-bold italic text-pink-500 text-xl ml-1">
                            Yashwii! 🎉🎂
                            </span>
                        </p>

                        <p className="mt-3">
                            I hope your day is filled with{" "}
                            <span className="font-semibold text-pink-400">laughter</span>,{" "}
                            <span className="font-semibold text-purple-400">beautiful surprises</span>,{" "}
                            and all the{" "}
                            <span className="font-semibold text-rose-400">happiness</span>{" "}
                            you deserve. Keep being the{" "}
                            <span className="font-bold">amazing person</span>{" "}
                            you are, spreading joy and positivity wherever you go.
                        </p>

                        <p className="mt-3">
                            There’s something I admire about you —{" "}
                            <span className="font-semibold italic text-yellow-400">
                            The Excitement you feel for even the smallest things
                            </span>{" "}
                            and your eagerness to try and experience everything around you. 
                            That enthusiasm is one of your{" "}
                            <span className="font-bold text-pink-400">best qualities</span>.
                        </p>

                        <p className="mt-3">
                            Your <span className="font-semibold text-purple-400">genuineness</span>{" "}
                            is another thing that makes you unique. It’s not about whether you always 
                            speak truth or lie, but the{" "}
                            <span className="italic font-semibold">
                            honesty in the way you express yourself
                            </span>{" "}
                            and show up as your real self.
                        </p>

                        <p className="mt-3">
                            I believe you truly care about the people around you.{" "}
                            <span className="font-bold text-pink-400">
                            Don’t rush through things — go with the flow.
                            </span>
                        </p>

                        <p className="mt-4 text-center">
                            <span className="font-bold text-lg text-yellow-400">
                            दुःखालयम् अशाश्वतम्
                            </span>
                        </p>

                        <p className="mt-3">
                            Live freely like a{" "}
                            <span className="italic text-sky-400">
                            bird flying across the blue sky
                            </span>,{" "}
                            embracing every moment with courage and joy. Wishing you{" "}
                            <span className="font-bold text-pink-400">endless happiness</span>,{" "}
                            <span className="font-bold text-purple-400">success</span>,{" "}
                            and all the sweet and beautiful things life has to offer.
                        </p>

                        <p className="mt-3 text-sm italic text-gray-400">
                            (Don’t overthink — just a small opinion, message, and wish 🤍)
                        </p>

                    </div>
                </div>
            </div>

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
