"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, X } from "lucide-react"

interface RatingModalProps {
  onClose: () => void
  onSubmit: (rating: number, comment: string) => void
}

export function RatingModal({ onClose, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Rate Your Partner</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-4">How was the experience?</label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                className="transition"
              >
                <Star className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Add a comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your feedback..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            rows={4}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSubmit(rating, comment)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
          >
            Submit Rating
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
