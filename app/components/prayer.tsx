import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Image } from "@unpic/react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";

import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import DemoGodImage from "~/assets/demo-god-avatar.avif";

export default function Prayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [disablePlay, setDisablePlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [blessingsGranted, setBlessingsGranted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A%20Prayer%20to%20the%20Demo%20Gods-AOhjTdPNWKzqKEx4CgOUmKKu0I5xd9.mp3"
    );
    audioRef.current.addEventListener("loadedmetadata", () => {
      setDuration(audioRef.current?.duration || 0);
    });
    audioRef.current.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    });
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const receiveBlessings = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setShowConfetti(true);
    setBlessingsGranted(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

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

              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleTimeChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-6">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <SkipBack className="h-6 w-6" />
                </Button>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-16 w-16 text-white bg-purple-600 hover:bg-purple-700 rounded-full"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8" />
                    )}
                  </Button>
                </motion.div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-gray-400" />
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
          {/* Blessings Card */}
          <AnimatePresence mode="wait">
            {!blessingsGranted ? (
              <motion.div
                key="request"
                className="w-full bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-8 flex flex-col items-center space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
                    Prayer for the Demo Gods
                  </h2>
                  <Button
                    onClick={receiveBlessings}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md text-lg"
                  >
                    Receive Blessings
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="granted"
                className="w-full bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700 md:min-h-[170px]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-8 flex flex-col items-start space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
                    Demo Blessings Granted!
                  </h2>
                  <p className="text-purple-400 font-light ">
                    *Conditions Apply
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Lyrics Container */}
        <motion.div
          className="w-full lg:w-1/3 bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700 py-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 space-y-6 text-gray-300 text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Oh demo gods please hear our plea
              <br />
              Guide our hands let troubles flee
              <br />
              In this room with tech and screens
              <br />
              May our code be pure and clean
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Grant us strength to face the test
              <br />
              Let our efforts show our best
              <br />
              In this realm of bits and bytes
              <br />
              Illuminate our darkest nights
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              As we demo let it shine
              <br />
              Flawless flow and sleek design
              <br />
              With each click and keystroke clear
              <br />
              Keep the bugs and glitches steer
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              From the servers to the cloud
              <br />
              Let our work make us proud
              <br />
              Bless our hearts with calm and cheer
              <br />
              Demo gods be always near
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Every demo is a quest
              <br />
              To show the world we are the best
              <br />
              With your blessing in the air
              <br />
              Guide us through with love and care
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              In this moment let us thrive
              <br />
              Keep the spark of hope alive
              <br />
              Demo gods we call your name
              <br />
              Help us win this sacred game
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
