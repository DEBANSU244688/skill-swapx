"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Zap } from "lucide-react"

interface MatchCardProps {
  id: number
  name: string
  avatar: string
  skillOffered: string
  skillWanted: string
  matchScore: number
  roomId: string
}

export function MatchCard({ name, avatar, skillOffered, skillWanted, matchScore, roomId }: MatchCardProps) {
  const router = useRouter()

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{avatar}</span>
          <div>
            <p className="font-bold text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">Member since 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-bold text-yellow-600">{matchScore}%</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="bg-teal-50 p-3 rounded-lg">
          <p className="text-xs font-semibold text-teal-700">They Teach</p>
          <p className="text-sm font-bold text-teal-900">{skillOffered}</p>
        </div>
        <div className="bg-indigo-50 p-3 rounded-lg">
          <p className="text-xs font-semibold text-indigo-700">They Learn</p>
          <p className="text-sm font-bold text-indigo-900">{skillWanted}</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push(`/classroom/${roomId}`)}
        className="w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-md transition"
      >
        Connect
      </motion.button>
    </motion.div>
  )
}
