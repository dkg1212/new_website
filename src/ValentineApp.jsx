import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const Valentine = () => {
  const [step, setStep] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const [visibleReasons, setVisibleReasons] = useState(1);
  const [openLetter, setOpenLetter] = useState(false);

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
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
  };

  const reasons = [
    { emoji: "✨", text: "Your beautiful smile lights up my whole world" },
    { emoji: "💖", text: "You believe in me even when I doubt myself" },
    { emoji: "🌟", text: "Your kindness makes everything softer" },
    { emoji: "🧸", text: "You are my safest place and my best friend" }
  ];

  return (
    <div className="valentine-container select-none min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-red-200">

      {/* Floating Hearts */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-500 text-xl opacity-60"
          initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
          animate={{ y: "-10vh" }}
          transition={{ duration: 8 + Math.random() * 6, repeat: Infinity }}
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
            className="bg-white/80 backdrop-blur-lg p-12 rounded-[40px] text-center max-w-lg w-full shadow-2xl relative z-10"
          >
            <motion.img 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6Znd6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/cLS1cfxvGOPVpf9g3y/giphy.gif"
              className="w-44 mx-auto mb-8"
              alt="teddy"
            />
            <motion.h1
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-4xl font-black text-rose-600 mb-10"
            >
              Will you be my Valentine? 🌹
            </motion.h1>

            <div className="flex justify-center items-center gap-6 h-24 relative">
              <button
                onClick={handleYes}
                style={{ transform: `scale(${1 + noClicks * 0.1})` }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg transition-all"
              >
                Yes! 💖
              </button>

              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveNo}
                className="bg-white text-rose-500 px-10 py-4 rounded-full font-bold text-xl border-2 border-rose-300 shadow"
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
            className="max-w-md w-full text-center relative z-10"
          >
            <h2 className="text-3xl font-bold text-rose-700 mb-8">
              Why I Love You... 💌
            </h2>

            <div className="space-y-4">
              {reasons.slice(0, visibleReasons).map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-5 rounded-2xl shadow-lg cursor-pointer border-l-4 border-pink-400"
                  onClick={() =>
                    setVisibleReasons((prev) =>
                      prev < reasons.length ? prev + 1 : prev
                    )
                  }
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <p className="mt-2 text-gray-700">{r.text}</p>
                </motion.div>
              ))}
            </div>

            {visibleReasons === reasons.length && (
              <button
                onClick={() => setStep(4)}
                className="mt-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg"
              >
                Open Your Letter 💌
              </button>
            )}
          </motion.div>
        )}

       

         {/* STEP 4: FINAL ENVELOPE */}
        {step === 4 && (
          <motion.div 
            key="envelope"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="valentines"
          >
            <div className="envelope"></div>
            <div className="front"></div>
            <div className="card">
              <div className="card-text">
                Happy<br/>Valentine's Day ❤️
                !<br/>
                <span className="text-red-600 text-2xl"> 💕My Love💕</span>
              </div>
            </div>
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
};

export default Valentine;
