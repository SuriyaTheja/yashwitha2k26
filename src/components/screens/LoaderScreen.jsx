"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"

export default function LoaderScreen({ onDone }) {

    useEffect(() => {   
        const timer = setTimeout(() => {
            onDone?.()
        }, 3000)
        return () => clearTimeout(timer)
    }, [onDone])

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center will-change-transform"
        >
            <motion.div
                className="text-6xl md:text-7xl will-change-transform"
            >
                🎂
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="my-4 text-xl md:text-2xl font-semibold text-foreground text-center">
                Loading your birthday surprise...
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex space-x-2 mt-4"
            >
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="w-4 h-4 bg-primary rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: index * 0.2
                        }}
                    />
                ))}
            </motion.div>

        </motion.div>
    )
}
