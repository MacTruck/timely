import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';


const Timer = (props) => {
// declare timer hooks
  let [previousTime, setPreviousTime] = useState(new Date(props.entry.timestamp).getTime());
  let [elapsedTime, setElapsedTime] = useState(0);
  let isRunning = useRef(true);

// initiate interval on render
  useEffect(() => {  
    const timerInterval = setInterval(startTimer, 1000);
    return () => clearInterval(timerInterval);
  }, [previousTime]);

  function startTimer() {
    if (isRunning.current) {
      const now = Date.now();
      setElapsedTime(elapsedTime + (now - previousTime));
      setPreviousTime(now);
    }
  }  

  function handlePause() {
    isRunning.current = isRunning.current ? false : true
    if (isRunning.current) {
      setPreviousTime(Date.now());
    }
  }
  
  let hours = 0, minutes = 0, seconds = 0;
  let secondsDiffence, secondsText, minutesText, hoursText;
  secondsDiffence = Math.floor(elapsedTime / 1000);

  hours = Math.floor(secondsDiffence / 3600);
  minutes = Math.floor((secondsDiffence - (hours * 3600)) / 60);
  seconds = Math.floor(secondsDiffence - (hours * 3600) - (minutes * 60));

  secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;
  minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
  hoursText = hours < 10 ? `0${hours}` : `${hours}`;

  return (
    <div>
      <div id="timer">
        {`${hoursText}:${minutesText}:${secondsText}`}
      </div>
      <button 
        id="pausePlay"
        className="mainButton"
        onClick={handlePause}>
          {isRunning.current ? 'Pause' : 'Continue'}
      </button>
      <Link to="/" id="stopSave" className="mainButton" onClick={() => {
        props.updateEntry(props.newEntry, elapsedTime, "elapsedTime");
        props.submitEntry();
      }}>Stop & Save</Link>
    </div>
  );
}

export default Timer;