import React, { useState } from "react";
import "./StopWatch.css";
import Timer from "./Timer";
import ControlButtons from "./ControlButtons";

function StopWatch() {
  const [isActive, setIsActive] = useState(false); //start
  const [isPaused, setIsPaused] = useState(true); //pause
  const [time, setTime] = useState(0); //reset

  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      //
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  //start버튼(isActive: true / isPause: false)
  const handleStart = () => {
    setIsActive(true); //타이머 시작
    setIsPaused(false); //pause는 사라짐
  };

  //resume버튼(isActive: true / isPause: true)
  const handlePauseResume = () => {
    setIsPaused(!isPaused); //true로 바뀜
    // console.log(("0" + Math.floor((time / 60000) % 60)).slice(-2));
    // console.log(("0" + Math.floor((time / 1000) % 60)).slice(-2));
  };

  //reset버튼(isActive: false / isPause: true)
  const handleReset = () => {
    setIsActive(false);
    setTime(0); //시간을 0으로
  };

  return (
    <div className="stop-watch">
      <Timer time={time} />
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
    </div>
  );
}

export default StopWatch;
