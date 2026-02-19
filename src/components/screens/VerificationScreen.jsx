"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Button from "../Button"

// ===== EDIT HERE =====
const CORRECT_DOB = "20060222"  // Format: YYYYMMDD
const CORRECT_CODE = "52022161"  // Set your code here
// ==================

export default function VerificationScreen({ onNext }) {
  const [dob, setDob] = useState("")
  const [code, setCode] = useState("")
  const [errors, setErrors] = useState({})
  const [isVerifying, setIsVerifying] = useState(false)

  const handleDobChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 8)
    setDob(value)
    if (errors.dob) setErrors(prev => ({ ...prev, dob: "" }))
  }

  const handleCodeChange = (e) => {
    const value = e.target.value.toUpperCase()
    setCode(value)
    if (errors.code) setErrors(prev => ({ ...prev, code: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!dob) {
      newErrors.dob = "DOB is required"
    } else if (dob.length !== 8) {
      newErrors.dob = "DOB must be YYYYMMDD"
    } else if (dob !== CORRECT_DOB) {
      newErrors.dob = "Incorrect DOB"
    }

    if (!code) {
      newErrors.code = "Code is required"
    } else if (code !== CORRECT_CODE) {
      newErrors.code = "Incorrect code"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsVerifying(true)
      setTimeout(() => {
        onNext?.()
      }, 600)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#fff8fc] p-7 md:p-10 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-lg relative flex flex-col items-center gap-6"
    >
      {/* Header */}
      <motion.h1
        className="text-2xl md:text-3xl font-semibold text-primary text-center drop-shadow"
        style={{
          filter: "drop-shadow(0 0 20px rgba(255,105,180,0.3))",
        }}
      >
        Verify to continue 🔐
      </motion.h1>

      <p className="text-center text-foreground text-sm md:text-base">
        Enter your date of birth and the secret code
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        {/* DOB Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          <label className="text-sm md:text-base font-semibold text-secondary drop-shadow">
            Date of Birth
          </label>
          <input
            type="text"
            value={dob}
            onChange={handleDobChange}
            placeholder="YYYYMMDD"
            maxLength="8"
            className="w-full px-4 py-3 rounded-[20px] border-2 border-pink-300 bg-white text-foreground text-center font-semibold tracking-widest placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 transition-all duration-200"
          />
          {errors.dob && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-medium"
            >
              ✗ {errors.dob}
            </motion.p>
          )}
        </motion.div>

        {/* Code Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-2"
        >
          <label className="text-sm md:text-base font-semibold text-secondary drop-shadow">
            Secret Code
          </label>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter code from gift card"
            className="w-full px-4 py-3 rounded-[20px] border-2 border-pink-300 bg-white text-foreground text-center font-semibold placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 transition-all duration-200"
          />
          {errors.code && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm font-medium"
            >
              ✗ {errors.code}
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-2"
        >
          <Button
            type="submit"
            disabled={isVerifying}
            className="w-full justify-center bg-[#ffccd3] text-secondary hover:bg-[#ffb3c6] disabled:opacity-75"
          >
            {isVerifying ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✓
                </motion.span>
              </>
            ) : (
              <>
                Verify
                <ArrowRight size={18} />
              </>
            )}
          </Button>
        </motion.div>
      </form>

      {/* Info tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-gray-500 text-center mt-2"
      >
        💡 Hint: Scan the Gift Card QR-Code for Secret Code
      </motion.div>
    </motion.div>
  )
}