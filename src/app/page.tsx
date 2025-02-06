"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Sparkles, Music, Music2, X, Heart, Gift, Cake } from "lucide-react"
import Confetti from "react-confetti"

export default function BirthdayCard() {
  const [currentScreen, setCurrentScreen] = useState("greeting")
  const [isDark, setIsDark] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const audioRef = useRef(null)

  const dragY = useMotionValue(0)
  const [isCakeSliced, setIsCakeSliced] = useState(false)
  const cakeOpacity = useTransform(dragY, [0, 200], [1, 0])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
    }
  }, [])

  const screens = {
    greeting: {
      title: "Happy Birthday Revati Ji!",
      subtitle: "Words won't be enough, and neither will any dish, to express how much you mean to me. So, I'll just say Hello, Future Michelin Star!",
      footer: "With Love ❤️",
    },
    question: {
      title: "Would you like to see your surprise?",
    },
    message: {
      title: "Dear Madam Ji,",
      content: `Even though we met in school and didn't know much about each other, I just wanted to show you how much you mean to me. Let's forget the past—this is the start of something new, and I hope we create amazing memories together. I'm stepping into this new year with a new friend (who was once just a schoolmate), and I hope our friendship lasts forever. I know I'm not the best at making websites, but hey, sometimes the simplest dishes turn out to be the most special.`,
      highlight: "On your special day, I wish you the happiest birthday!",
    },
    cake: {
      title: "Make a Wish & Cut Your Cake!",
      subtitle: "Drag down to slice ✨",
    },
  }

  const handleDragEnd = () => {
    if (dragY.get() > 150) {
      setIsCakeSliced(true)
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
        setTimeout(() => {
          setShowPopup(true)
        }, 1000)
      }, 3000)
    }
  }

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

  const buttonClass = "px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? "bg-gray-900 text-white" : "bg-gradient-to-br from-pink-100 to-purple-100 text-gray-900"
    }`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

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
            className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
          >
            {currentScreen === "greeting" && (
              <div className="text-center space-y-8">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Heart className="w-16 h-16 mx-auto text-pink-500" />
                </motion.div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {screens.greeting.title}
                </h1>
                <p className="text-gray-600 text-lg">{screens.greeting.subtitle}</p>
                <p className="text-pink-500 font-medium text-lg">{screens.greeting.footer}</p>
                <button
                  onClick={() => setCurrentScreen("question")}
                  className={`${buttonClass} bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg`}
                >
                  Open Your Card
                </button>
              </div>
            )}

            {currentScreen === "question" && (
              <div className="text-center space-y-8">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <Gift className="w-16 h-16 text-purple-500 mx-auto" />
                </motion.div>
                <h2 className="text-3xl font-semibold text-purple-600">{screens.question.title}</h2>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setCurrentScreen("message")
                      if (audioRef.current) {
                        audioRef.current.play()
                        setIsMusicPlaying(true)
                      }
                    }}
                    className={`${buttonClass} bg-gradient-to-r from-pink-500 to-purple-500 text-white`}
                  >
                    Yes, please!
                  </button>
                  <button
                    onClick={() => setCurrentScreen("greeting")}
                    className={`${buttonClass} bg-gray-200 text-gray-700 hover:bg-gray-300`}
                  >
                    Not yet
                  </button>
                </div>
              </div>
            )}

            {currentScreen === "message" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-purple-600">{screens.message.title}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{screens.message.content}</p>
                <p className="text-2xl font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {screens.message.highlight}
                </p>
                <div className="flex flex-col gap-4 items-center">
                  <button
                    onClick={() => setCurrentScreen("cake")}
                    className={`${buttonClass} bg-gradient-to-r from-pink-500 to-purple-500 text-white`}
                  >
                    See Your Surprise
                  </button>
                  <button
                    onClick={toggleMusic}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                  >
                    {isMusicPlaying ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
                    {isMusicPlaying ? "Pause Music" : "Play Music"}
                  </button>
                </div>
              </div>
            )}

            {currentScreen === "cake" && (
              <div className="space-y-8 text-center">
                <h2 className="text-3xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {screens.cake.title}
                </h2>
                <p className="text-gray-600">{screens.cake.subtitle}</p>

                <div className="relative h-80 w-full">
                  {/* Knife */}
                  <motion.div
                    style={{ y: dragY, opacity: cakeOpacity }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 200 }}
                    onDragEnd={handleDragEnd}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 cursor-pointer z-10"
                  >
                    <div className="w-12 h-40">
                      {/* Handle */}
                      <div className="w-full h-16 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg">
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg" />
                      </div>
                      {/* Blade */}
                      <div className="w-4 h-24 mx-auto bg-gradient-to-b from-gray-300 to-gray-400">
                        <div className="w-full h-full relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cake */}
                  <motion.div
                    style={{ opacity: cakeOpacity }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-48"
                  >
                    <div className="relative w-full h-full">
                      {/* Bottom Layer */}
                      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-pink-400 to-pink-500 rounded-lg shadow-lg">
                        {/* Decorative patterns */}
                        <div className="absolute bottom-4 w-full flex justify-around px-4">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-2 h-8 bg-pink-300 rounded-full" />
                          ))}
                        </div>
                      </div>

                      {/* Middle Layer */}
                      <div className="absolute bottom-16 w-56 h-24 left-1/2 -translate-x-1/2 bg-gradient-to-b from-pink-300 to-pink-400 rounded-lg shadow-lg">
                        <div className="absolute bottom-3 w-full flex justify-around px-3">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-2 h-6 bg-pink-200 rounded-full" />
                          ))}
                        </div>
                      </div>

                      {/* Top Layer */}
                      <div className="absolute bottom-28 w-48 h-20 left-1/2 -translate-x-1/2 bg-gradient-to-b from-pink-200 to-pink-300 rounded-lg shadow-lg">
                        {/* Candles */}
                        <div className="absolute -top-4 w-full flex justify-around px-4">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                y: [0, -2, 0],
                                rotate: [0, 2, -2, 0]
                              }}
                              transition={{ 
                                duration: 1.5,
                                delay: i * 0.2,
                                repeat: Infinity
                              }}
                              className="relative"
                            >
                              <div className="w-2 h-8 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-full" />
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.8, 1, 0.8]
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity
                                }}
                                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-400 rounded-full blur-sm"
                              />
                            </motion.div>
                          ))}
                        </div>
                        {/* Frosting decoration */}
                        <div className="absolute -top-2 w-full">
                          <div className="flex justify-around px-2">
                            {[...Array(6)].map((_, i) => (
                              <div key={i} className="w-6 h-6 bg-pink-100 rounded-full -mt-2" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className={`${buttonClass} ${
                      isDark ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"
                    }`}
                  >
                    {isDark ? "Lights On" : "Lights Off"}
                  </button>
                </div>
                <button
                  onClick={toggleMusic}
                  className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                >
                  {isMusicPlaying ? <Music2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
                  {isMusicPlaying ? "Pause Music" : "Play Music"}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
            >
              <div className="bg-white/90 p-8 rounded-3xl shadow-2xl relative max-w-md w-full mx-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    <Cake className="w-16 h-16 mx-auto text-pink-500" />
                  </motion.div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    In the last I just wanna say 
                    Happy Birthday Revati Ji!
                  </h3>
                  <p className="text-gray-600 text-lg">
                    May your day be filled with joy, laughter, and wonderful memories!
                    (Ofcourse it will!!)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}