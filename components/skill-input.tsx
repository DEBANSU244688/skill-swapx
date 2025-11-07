"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SkillInputProps {
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  placeholder?: string
}

export function SkillInput({ value, onChange, suggestions, placeholder }: SkillInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filtered = suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()) && s !== value)

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
      />

      <AnimatePresence>
        {showSuggestions && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto"
          >
            {filtered.map((skill) => (
              <button
                key={skill}
                onClick={() => {
                  onChange(skill)
                  setShowSuggestions(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-teal-50 transition text-sm"
              >
                {skill}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
