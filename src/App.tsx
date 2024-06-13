import "./App.css";
import timerConfig from "./constants/timer-config";
import TimerButton from "./components/TimerButton";
import { useState } from "react";
import { useEffect } from "react";

function getTimers(onClickHandler: (time: number) => void) {
  return timerConfig.map((time: number, index: number) => {
    return <TimerButton key={index} time={time} onClick={onClickHandler} />;
  });
}
export default function App() {
  const [activeTime, setActiveTime] = useState(-1);
  const [timer, setTimer] = useState(-1);
  const [startTime, setStartTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const stopTimer = function () {
    clearTimeout(timer);
    setTimeLeft(0);
    setTimer(-1);
    setStartTime(0);
    if (activeTime !== -1) {
      setActiveTime(-1);
    }
  };
  const onStartNewTimer = function (newTime: number) {
    if (activeTime !== -1) {
      stopTimer();
    }
    setActiveTime(newTime);
    const currentTime = performance.now();
    setStartTime(currentTime);
  };
  const onTimerComplete = function () {
    setActiveTime(-1);
  };
  const onTicker = function () {
    const currentTime = performance.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const remainingTime = activeTime * 60 - elapsedTime;
    setTimeLeft(remainingTime);
  };

  useEffect(() => {
    let tickerInterval = -1;
    if (activeTime === -1) {
      stopTimer();
    } else {
      const mainTimer = setTimeout(
        () => onTimerComplete(),
        activeTime * 1000 * 60
      );
      setTimer(mainTimer);
      tickerInterval = setInterval(onTicker, 1000);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(tickerInterval);
    };
  }, [activeTime]);

  const formatTime = function (time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <>
      <main>
        <h1>React Pomodoro Timer App</h1>
        <div className="wrapper">
          <div>
            <h2>Click to set a timer</h2>
            <section>{getTimers(onStartNewTimer)}</section>
          </div>
          <aside>
            <div>
              <h2>
                {activeTime === -1
                  ? "Timer Inactive"
                  : `Timer set for:  ${formatTime(activeTime * 60)}`}
              </h2>
            </div>
            <div>
              <h2>{timeLeft ? `Time left: ${formatTime(timeLeft)}` : ""}</h2>
            </div>
            {activeTime === -1 ? null : (
              <button onClick={() => stopTimer()}>Stop Timer</button>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}
