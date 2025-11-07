"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                Learn by Teaching
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Maven connects skilled individuals worldwide for peer-to-peer learning. Share your expertise, learn new
              skills, and grow together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/onboarding"
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              Find Your Match <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-800 font-semibold rounded-lg hover:border-teal-500 transition-all duration-300"
            >
              View Dashboard
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "1000+", desc: "Skill Categories" },
              { title: "Global", desc: "Community" },
              { title: "4.7★", desc: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-3xl font-bold text-teal-600">{stat.title}</p>
                <p className="text-gray-600 mt-2">{stat.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  )
}
