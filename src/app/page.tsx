"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Sparkles, Music, Music2, X } from "lucide-react"
import Confetti from "react-confetti"

export default function BirthdayCard() {
  const [currentScreen, setCurrentScreen] = useState("greeting")
  const [isDark, setIsDark] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const audioRef = useRef(null)

  // Drag to cut cake functionality
  const dragY = useMotionValue(0)
  const [_isCakeSliced, setIsCakeSliced] = useState(false)
  const cakeOpacity = useTransform(dragY, [0, 200], [1, 0])

  useEffect(() => {
    // Initialize audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5 // Set initial volume to 50%
    }
  }, [])

  const screens = {
    greeting: {
      title: "Happy Birthday Revati Jiii!!",
      subtitle: "Words Won't Be Enough, and neither will any dish, to express how much you mean to me. So, I’ll just say Hello, Future Michelin Star!.",
      footer: "With Love, (whatever you call me) ❤️",
    },
    question: {
      title: "Do you wanna see what I made??",
    },
    message: {
      title: "Dear Madam Ji,",
      content: `Even though we met in school and didn’t know much about each other, I just wanted to show you how much you mean to me. Let’s forget the past—this is the start of something new, and I hope we create amazing memories together.I’m stepping into this new year with a new friend (who was once just a schoolmate), and I hope our friendship lasts forever. I know I’m not the best at making websites, but hey, sometimes the simplest dishes turn out to be the most special.`,
      highlight: "and on your special day, i wish you the happiest birthday",
    },
    cake: {
      title: "Drag down to cut the cake!",
      subtitle: "Make a wish! ⭐",
    },
  }

  const handleDragEnd = () => {
    if (dragY.get() > 150) {
      setIsCakeSliced(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setTimeout(() => {
          setShowPopup(true);
        }, 5000);
      }, 5000);
    }
  };
  

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-pink-50 text-gray-900"
      }`}
    >
      {showConfetti && <Confetti />}

      <audio
        ref={audioRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SkyFullOfStars-%5BAudioTrimmer.com%5D-YsBTTGvpPdWASTfNEtEIcpWNsklIhh.mp3"
        loop
        className="hidden"
      />

      <div className="container mx-auto px-4 py-8 relative min-h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          >
            {currentScreen === "greeting" && (
              <div className="text-center space-y-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 mx-auto text-pink-500">
                  ❤️
                </motion.div>
                <h1 className="text-3xl font-bold text-pink-600">{screens.greeting.title}</h1>
                <p className="text-gray-600">{screens.greeting.subtitle}</p>
                <p className="text-pink-500 font-medium">{screens.greeting.footer}</p>
                <button
                  onClick={() => setCurrentScreen("question")}
                  className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {currentScreen === "question" && (
              <div className="text-center space-y-6">
                <Sparkles className="w-8 h-8 text-yellow-400 mx-auto" />
                <h2 className="text-2xl font-semibold">{screens.question.title}</h2>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setCurrentScreen("message")
                      if (audioRef.current) {
                        audioRef.current.play()
                        setIsMusicPlaying(true)
                      }
                    }}
                    className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                  >
                    Yes!
                  </button>
                  <button
                    onClick={() => setCurrentScreen("greeting")}
                    className="px-8 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {currentScreen === "message" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">{screens.message.title}</h2>
                <p className="text-gray-600 leading-relaxed">{screens.message.content}</p>
                <p className="text-pink-500 font-medium">{screens.message.highlight}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setCurrentScreen("cake")}
                    className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                  >
                    See Your Surprise
                  </button>
                </div>
                <button
                  onClick={toggleMusic}
                  className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isMusicPlaying ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
                  {isMusicPlaying ? "Pause Music" : "Play Music"}
                </button>
              </div>
            )}

            {currentScreen === "cake" && (
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-semibold text-pink-600">{screens.cake.title}</h2>

                <div className="relative h-64 w-full">
                  <motion.div
                    style={{ y: dragY, opacity: cakeOpacity }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 200 }}
                    onDragEnd={handleDragEnd}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-32 bg-gray-300 rounded cursor-pointer"
                  >
                    <div className="w-full h-8 bg-gray-400 rounded-t" />
                  </motion.div>

                  <motion.div
                    style={{ opacity: cakeOpacity }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-pink-400 rounded-lg"
                  >
                    <div className="absolute top-0 left-0 w-full h-4 bg-pink-300 rounded-t-lg flex justify-around">
                      <div className="w-2 h-4 bg-orange-400" />
                      <div className="w-2 h-4 bg-orange-400" />
                      <div className="w-2 h-4 bg-orange-400" />
                    </div>
                  </motion.div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    {isDark ? "Lights On" : "Lights Off"}
                  </button>
                </div>
                <button
                  onClick={toggleMusic}
                  className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {isMusicPlaying ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
                  {isMusicPlaying ? "Pause Music" : "Play Music"}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pop-up message */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            >
              <div className="text-3xl font-bold text-pink-300">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold text-pink-600 mb-4">Again I am Wishing You The Happiest Birthday Revati!</h3>
                <p className="text-gray-600">May your day be filled with joy, laughter, and wonderful memories!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instagram Handle */}
        <div className="absolute bottom-4 right-4 text-sm opacity-75"></div>
      </div>
    </div>
  )
}

