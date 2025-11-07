"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { MatchCard } from "@/components/match-card"
import { TrustBadge } from "@/components/trust-badge"
import { Zap } from "lucide-react"

interface UserSkills {
  teach: { skill: string; level: string }
  learn: { skill: string; level: string }
}

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "👩‍💻",
    skillOffered: "React.js",
    skillWanted: "UI/UX Design",
    matchScore: 92,
    roomId: "room-1",
  },
  {
    id: 2,
    name: "Marco Rodriguez",
    avatar: "👨‍🎨",
    skillOffered: "Graphic Design",
    skillWanted: "JavaScript",
    matchScore: 88,
    roomId: "room-2",
  },
  {
    id: 3,
    name: "Akira Tanaka",
    avatar: "🎵",
    skillOffered: "Music Production",
    skillWanted: "Python",
    matchScore: 85,
    roomId: "room-3",
  },
]

export default function Dashboard() {
  const router = useRouter()
  const [userSkills, setUserSkills] = useState<UserSkills | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("userSkills")
    if (stored) {
      setUserSkills(JSON.parse(stored))
    }
  }, [])

  if (!userSkills) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No skills configured</p>
            <button
              onClick={() => router.push("/onboarding")}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
              Complete Onboarding
            </button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold mb-8">Your Maven Dashboard</h1>

            {/* User Skills Card */}
            <div className="bg-gradient-to-br from-teal-50 to-indigo-50 rounded-2xl p-8 border border-teal-200 mb-12 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">YOU TEACH</p>
                  <p className="text-2xl font-bold text-teal-600">{userSkills.teach.skill}</p>
                  <p className="text-xs text-gray-500 mt-1">{userSkills.teach.level}</p>
                </div>
                <div className="flex justify-center">
                  <TrustBadge score={4.7} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">YOU WANT TO LEARN</p>
                  <p className="text-2xl font-bold text-indigo-600">{userSkills.learn.skill}</p>
                  <p className="text-xs text-gray-500 mt-1">{userSkills.learn.level}</p>
                </div>
              </div>
            </div>

            {/* Perfect Matches Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Perfect Matches
                </h2>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-teal-500 transition text-sm font-medium">
                  Refresh Matches
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {mockMatches.map((match, i) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <MatchCard {...match} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
