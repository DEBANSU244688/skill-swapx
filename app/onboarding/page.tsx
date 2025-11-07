"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { SkillInput } from "@/components/skill-input"
import { LevelSelector } from "@/components/level-selector"

const skillSuggestions = [
  "JavaScript",
  "Python",
  "React",
  "Design",
  "Music",
  "Guitar",
  "Spanish",
  "Photography",
  "Writing",
  "Marketing",
  "UI/UX",
  "Data Analysis",
  "Public Speaking",
  "Yoga",
  "Cooking",
]

export default function Onboarding() {
  const router = useRouter()
  const [skills, setSkills] = useState({
    teach: { skill: "", level: "Intermediate" as const },
    learn: { skill: "", level: "Beginner" as const },
  })

  const handleMatch = () => {
    if (skills.teach.skill && skills.learn.skill) {
      // Store in localStorage for demo
      localStorage.setItem("userSkills", JSON.stringify(skills))
      router.push("/dashboard")
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-indigo-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Maven</h1>
            <p className="text-lg text-gray-600">Learn by Teaching</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            {/* Teach Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center font-bold">
                  📚
                </span>
                Skill You Can Teach
              </h2>
              <SkillInput
                value={skills.teach.skill}
                onChange={(skill) => setSkills((prev) => ({ ...prev, teach: { ...prev.teach, skill } }))}
                suggestions={skillSuggestions}
                placeholder="What skill can you teach?"
              />
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Your Level</label>
                <LevelSelector
                  level={skills.teach.level}
                  onChange={(level) => setSkills((prev) => ({ ...prev, teach: { ...prev.teach, level } }))}
                />
              </div>
            </div>

            {/* Learn Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                  🎯
                </span>
                Skill You Want to Learn
              </h2>
              <SkillInput
                value={skills.learn.skill}
                onChange={(skill) => setSkills((prev) => ({ ...prev, learn: { ...prev.learn, skill } }))}
                suggestions={skillSuggestions}
                placeholder="What skill do you want to learn?"
              />
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Desired Level</label>
                <LevelSelector
                  level={skills.learn.level}
                  onChange={(level) => setSkills((prev) => ({ ...prev, learn: { ...prev.learn, level } }))}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={handleMatch}
              disabled={!skills.teach.skill || !skills.learn.skill}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold rounded-xl text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Find My Perfect Match
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-gray-600 text-sm"
          >
            <p>Built in 24 hours for the Global Hackathon 🌍</p>
          </motion.div>
        </div>
      </main>
    </>
  )
}
