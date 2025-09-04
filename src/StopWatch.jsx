import React, { useState, useEffect, useRef } from "react";

function StopWatch() {
  const [isRunning, setIsRunnning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const interIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isRunning) {
      interIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(interIdRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  function start() {
    setIsRunnning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunnning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunnning(false);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let miliSeconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    miliSeconds = String(miliSeconds).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds} : ${miliSeconds}`;
  }

  return (
    <div>
      <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="stopWatch">
        <div className="display"> {formatTime()} </div>
        <div className="controls">
          <button onClick={start} className="start-button">
            Start
          </button>
          <button onClick={stop} className="stop-button">
            Stop
          </button>
          <button onClick={reset} className="reset-button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default StopWatch;
