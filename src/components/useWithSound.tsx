import { useRef, useEffect } from "react";

export const useWithSound = (audioSource:string, onSoundEnded:()=>void) => {
  const soundRef = useRef();

  useEffect(() => {
    soundRef.current = new Audio(audioSource);
    soundRef.current.addEventListener("ended",onSoundEnded);
  }, []);

  const playSound = () => {
    soundRef.current.currentTime = 0;
    soundRef.current.play();
  };

  const pauseSound = () => {
    soundRef.current.pause();
  };

  return {
    playSound,
    pauseSound
  };
};
