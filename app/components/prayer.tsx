import { useState, useCallback } from "react";
import { Image } from "@unpic/react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";

import AudioPlayer from "~/components/audio-player";
import BlessingsCard from "~/components/blessings-card";
import Lyrics from "~/components/lyrics";

import DemoGodImage from "~/assets/demo-god-avatar.avif";
import { Footnote } from "./foot-note";

export default function Prayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [blessingsGranted, setBlessingsGranted] = useState(false);

  const handlePlayStateChange = useCallback((newPlayState: boolean) => {
    setIsPlaying(newPlayState);
  }, []);

  const receiveBlessings = useCallback(() => {
    setShowConfetti(true);
    setBlessingsGranted(true);
    setIsPlaying(false);
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      <AnimatePresence>
        {showConfetti && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            colors={["#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6"]}
            numberOfPieces={200}
            recycle={true}
          />
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-start relative z-10">
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Music Player */}
          <motion.div
            className="w-full bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-8 space-y-6">
              <motion.div
                className="aspect-square relative rounded-xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Image
                  src={DemoGodImage}
                  alt="Mystical Wizard with Purple Magic"
                  width={600}
                  height={600}
                  className="object-cover"
                  priority
                />
              </motion.div>

              <AudioPlayer
                audioSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A%20Prayer%20to%20the%20Demo%20Gods-AOhjTdPNWKzqKEx4CgOUmKKu0I5xd9.mp3"
                isPlaying={isPlaying}
                onPlayStateChange={handlePlayStateChange}
              />
            </div>
          </motion.div>
          {/* Blessings Card */}
          <AnimatePresence mode="wait">
            <BlessingsCard
              blessingsGranted={blessingsGranted}
              onReceiveBlessings={receiveBlessings}
            />
          </AnimatePresence>
          <Footnote />
        </div>
        {/* Lyrics Container */}
        <motion.div
          className="w-full lg:w-1/3 bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700 py-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Lyrics />
        </motion.div>
      </div>
    </main>
  );
}
