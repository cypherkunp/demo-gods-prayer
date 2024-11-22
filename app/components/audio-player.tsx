import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import { RenderIf } from "./render-if";

interface AudioPlayerProps {
  audioSrc: string;
  isPlaying: boolean;
  onPlayStateChange: (isPlaying: boolean) => void;
}

const AudioPlayer = ({
  audioSrc,
  isPlaying,
  onPlayStateChange,
}: AudioPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
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
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPlaying]);

  const handleTimeChange = useCallback((value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  }, []);

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0];
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleTimeChange}
          className="w-full dark"
        />
        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6">
        <RenderIf condition={false}>
          <Button
            size="icon"
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            <SkipBack className="h-6 w-6" />
          </Button>
        </RenderIf>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            size="icon"
            variant="ghost"
            className="h-16 w-16 text-white bg-purple-600 hover:bg-purple-700 rounded-full"
            onClick={() => onPlayStateChange(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </Button>
        </motion.div>
        <RenderIf condition={false}>
          <Button
            size="icon"
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            <SkipForward className="h-6 w-6" />
          </Button>
        </RenderIf>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 className="h-5 w-5 text-gray-400" />
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-full dark"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
