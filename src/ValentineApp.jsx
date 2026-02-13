import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const Valentine = () => {
  const [step, setStep] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const [visibleReasons, setVisibleReasons] = useState(1);

  const noTexts = [
    "No",
    "Are you sure? 🥺",
    "Think again 😭",
    "Last chance 😳",
    "You can't escape 😅"
  ];

  const handleYes = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#ff8fab", "#ffc2d1", "#ffffff"]
    });
    setStep(2);
  };

  const moveNo = () => {
    setNoClicks((prev) => prev + 1);
    const x = Math.random() * 160 - 80;
    const y = Math.random() * 160 - 80;
    setNoButtonPos({ x, y });
  };

  const reasons = [
    { emoji: "✨", text: "Your beautiful smile lights up my whole world" },
    { emoji: "💖", text: "You believe in me even when I doubt myself" },
    { emoji: "🌟", text: "Your kindness makes everything softer" },
    { emoji: "🧸", text: "You are my safest place and my best friend" }
  ];

  return (
    <div className="valentine-container select-none min-h-screen w-full overflow-hidden px-4 flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 relative">

      {/* Floating Hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 text-sm sm:text-xl opacity-50"
          initial={{
            y: "100vh",
            x: `${Math.random() * 100}vw`
          }}
          animate={{ y: "-10vh" }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity
          }}
        >
          💕
        </motion.div>
      ))}

      <AnimatePresence mode="wait">

        {/* STEP 1 */}
        {step === 1 && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="bg-white/80 backdrop-blur-lg p-8 sm:p-12 rounded-[40px] text-center max-w-lg w-full shadow-2xl relative z-10"
          >
            <motion.img 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/cLS1cfxvGOPVpf9g3y/giphy.gif"
              className="w-32 sm:w-44 mx-auto mb-6 sm:mb-8"
              alt="teddy"
            />
            <motion.h1
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-2xl sm:text-4xl font-black text-rose-600 mb-8"
            >
              Will you be my Valentine? 🌹
            </motion.h1>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 min-h-[120px] relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                style={{ transform: `scale(${1 + noClicks * 0.1})` }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-lg sm:text-xl shadow-lg transition-all"
              >
                Yes! 💖
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveNo}
                onClick={moveNo}
                onTouchStart={moveNo}
                className="bg-white text-rose-500 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-lg sm:text-xl border-2 border-rose-300 shadow"
              >
                {noTexts[noClicks] || "Okay okay 😅"}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div
            key="reasons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md w-full text-center relative z-10 px-2 sm:px-4"
          >
            <div className="absolute -inset-10 bg-gradient-to-r from-rose-300/30 via-pink-200/20 to-red-300/30 blur-3xl rounded-full"></div>

            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 bg-clip-text text-transparent mb-8"
            >
              Why I Adore You... 💌
            </motion.h2>

            <div className="space-y-5">
              {reasons.slice(0, visibleReasons).map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-xl cursor-pointer border border-white/40"
                  onClick={() =>
                    setVisibleReasons((prev) =>
                      prev < reasons.length ? prev + 1 : prev
                    )
                  }
                >
                  <span className="text-2xl sm:text-3xl">{r.emoji}</span>
                  <p className="mt-3 text-sm sm:text-lg font-medium leading-relaxed text-gray-800">
                    {r.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {visibleReasons === reasons.length && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setStep(4)}
                className="mt-10 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-bold shadow-2xl text-lg"
              >
                Open Your Letter 💌
              </motion.button>
            )}
          </motion.div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <motion.div 
            key="envelope"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="valentines relative flex items-center justify-center"
            onClick={() => {
  confetti({
    particleCount: 150,
    spread: 120,
    origin: { y: 0.5 },
    colors: ["#ff4d6d", "#c9184a", "#ff758f", "#ffffff"]
  });
  setTimeout(() => {
    setStep(5);
  }, 1000);
}}

          >
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-rose-400/30 rounded-full blur-3xl animate-pulse"></div>

            <div className="envelope"></div>
            <div className="front"></div>

            <div className="card">
              <div className="card-text text-center px-4">
                <p className="text-lg sm:text-2xl font-semibold text-rose-600">
                  Happy Valentine's Day ❤️
                </p>

                <div className="text-2xl sm:text-4xl my-4 animate-pulse">
                  My Love 💖
                </div>

                <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                  My Love
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 5 – FINAL LOVE SCREEN */}
{step === 5 && (
  <motion.div
    key="final-step"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-500 via-pink-500 to-red-600 text-white px-6 text-center"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-md"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl sm:text-5xl font-bold mb-6"
      >
        Forever With You ❤️
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm sm:text-lg leading-relaxed mb-6"
      >
        Loving you is the easiest thing I’ve ever done.
        You are my comfort, my happiness, my safe place.
        Every single day with you feels special.
        I am so lucky to call you mine.
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.3 }}
        className="text-4xl sm:text-6xl font-extrabold"
      >
        I Love You So Much 💖
      </motion.div>
    </motion.div>
  </motion.div>
)}


      </AnimatePresence>
    </div>
  );
};

export default Valentine;
