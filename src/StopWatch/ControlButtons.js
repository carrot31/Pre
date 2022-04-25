import React from "react";
import "./ControlButtons.css";

export default function ControlButtons(props) {
  // console.log(props);
  //start버튼
  const StartButton = (
    <div className="btn btn-one btn-start" onClick={props.handleStart}>
      Start
    </div>
  );
  //start 후 reset&resume버튼
  const ActiveButtons = (
    <div className="btn-grp">
      <div className="btn btn-two" onClick={props.handleReset}>
        Reset
      </div>
      <div className="btn btn-one" onClick={props.handlePauseResume}>
        {props.isPaused ? "Resume" : "Pause"}
      </div>
    </div>
  );

  return (
    //active가 true면(타이머가 시작되면) reset&resume버튼을 보여져라 아니면 start버튼을 보여줘라
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}
