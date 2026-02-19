"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Mail, ArrowLeft, ArrowRight } from "lucide-react"
import Button from "../Button"

const photos = [
  "/images/1.gif",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
  "/images/5.jpeg",
  "/images/6.jpeg",
  "/images/7.jpeg",
  "/images/8.jpeg",
  "/images/9.jpeg",
  "/images/10.jpeg",
  "/images/11.jpeg",
  "/images/12.jpeg",
  "/images/13.jpeg",
  "/images/14.jpeg",
  "/images/15.jpeg",
  "/images/16.jpeg",
  "/images/17.jpeg",
  "/images/18.gif",
]

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10">
      <div
        className="text-center">
        <h2
          className="text-2xl md:text-3xl font-semibold text-accent"
        >
          Some Photos of You!
        </h2>
        <p className="text-sm text-accent/70 mt-1">(Swipe for more)</p>
      </div>

      <div className="relative p-6 bg-linear-to-b from-white/80 to-violet-200 w-full rounded-[40px] flex items-end justify-center shadow-inner">

        <div>
          <Swiper
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(s) => setCurrentIndex(s.realIndex)}
            loop={true}
            slidesPerView={1}
            className="w-53.75 h-70 md:w-59.25 md:h-77.5"
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  className="h-full w-full rounded-3xl"
                >

                  <div className="relative h-full w-full rounded-2xl overflow-hidden ">

                    {/* Image */}
                    <img
                      loading="lazy"
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="h-full w-full rounded-2xl object-contain"
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
              className="bg-white/80 text-accent px-4 py-2 rounded-lg shadow"
            >
              <ArrowLeft size={18} />
            </Button>
            <Button
              onClick={() => swiperRef.current && swiperRef.current.slideNext()}
              className="bg-white/80 text-accent px-4 py-2 rounded-lg shadow"
            >
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div
        className="mt-4 flex justify-center"
      >
        <Button onClick={onNext} className="bg-[#ddd6ff] text-accent">
          <Mail size={18} /> Open My Message
        </Button>
      </div>
    </div >
  )
}