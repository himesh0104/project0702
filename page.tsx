"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CelebrationCard() {
  const [currentScreen, setCurrentScreen] = useState<"greeting" | "question">("greeting")

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            initial={{
              top: "100%",
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              top: "-10%",
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center"
        >
          {currentScreen === "greeting" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">It&apos;s Your Special Day Yeyey!</h1>
              <Button className="mt-6" onClick={() => setCurrentScreen("question")}>
                Continue
              </Button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto" />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Do you wanna see what I made??</h2>
              <div className="flex gap-4 justify-center">
                <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => alert("🎉 Surprise coming soon!")}>
                  Yes!
                </Button>
                <Button
                  variant="secondary"
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => setCurrentScreen("greeting")}
                >
                  No
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Instagram Handle */}
        <div className="absolute bottom-4 right-4 text-gray-600 text-sm">@PINAKK.IO</div>
      </div>
    </div>
  )
}

