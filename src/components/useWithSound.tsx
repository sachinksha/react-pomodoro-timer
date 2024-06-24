import { useRef, useEffect } from "react";

export const useWithSound = (audioSource:string, onSoundEnded:()=>void) => {
  const soundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
    soundRef.current.addEventListener("ended",onSoundEnded);
    soundRef.current.currentTime = 0;
  }, []);

  const playSound = () => {
    if(soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
    }
  };

  const pauseSound = () => {
    soundRef.current?.pause();
  };

  return {
    playSound,
    pauseSound
  };
};
