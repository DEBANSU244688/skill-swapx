"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

interface Message {
  id: number
  author: string
  text: string
  timestamp: string
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, author: "You", text: "Hi! Ready to start learning?", timestamp: "10:30 AM" },
    { id: 2, author: "Partner", text: "Let's get started", timestamp: "10:31 AM" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        author: "You",
        text: input,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-full p-4">
      <h3 className="font-bold text-gray-900 mb-4">Chat</h3>
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.author === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.author === "You" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.author === "You" ? "text-teal-100" : "text-gray-500"}`}>
                {msg.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}
