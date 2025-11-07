"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ChatPanel } from "@/components/chat-panel"
import { VideoPreview } from "@/components/video-preview"
import { Whiteboard } from "@/components/whiteboard"
import { RatingModal } from "@/components/rating-modal"

export default function SkillRoom({ params }: { params: { roomId: string } }) {
  const [sessionComplete, setSessionComplete] = useState(false)
  const [showRating, setShowRating] = useState(false)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl font-bold mb-8">Skill Exchange Room</h1>

            <div className="grid grid-cols-12 gap-4 h-[600px]">
              {/* Left: Video Preview */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="col-span-12 md:col-span-2"
              >
                <div className="space-y-3 h-full">
                  <VideoPreview name="You" />
                  <VideoPreview name="Partner" />
                </div>
              </motion.div>

              {/* Center: Whiteboard */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="col-span-12 md:col-span-7 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex items-center justify-center"
              >
                <Whiteboard />
              </motion.div>

              {/* Right: Chat Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="col-span-12 md:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col"
              >
                <ChatPanel />
              </motion.div>
            </div>

            {/* Mark Complete Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={() => setShowRating(true)}
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Mark Session Complete
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Rating Modal */}
        {showRating && (
          <RatingModal
            onClose={() => setShowRating(false)}
            onSubmit={() => {
              setSessionComplete(true)
              setShowRating(false)
            }}
          />
        )}
      </main>
    </>
  )
}
