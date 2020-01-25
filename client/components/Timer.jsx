import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import convertTime from './convertTime.js'

const Timer = (props) => {
// declare timer hooks
  let isRunning = useRef(true);
  let [previousTime, setPreviousTime] = useState(new Date(props.newEntry.timestamp).getTime());
  let [elapsedTime, setElapsedTime] = useState(0);
  let [pauseButton, setPauseButton] = useState(isRunning.current);

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
    isRunning.current = !isRunning.current;
    setPauseButton(isRunning.current);
    if (isRunning.current) {
      setPreviousTime(Date.now());
    }
  }

  function handleSave() {
    props.updateEntry(props.newEntry, elapsedTime, 'elapsedTime');
    props.submitEntry();
  }

  const timeObject = convertTime(elapsedTime);
  let timeString = `
  ${timeObject.hours < 10 ? '0' + timeObject.hours : timeObject.hours } : 
  ${timeObject.minutes < 10 ? '0' + timeObject.minutes : timeObject.minutes } :
  ${timeObject.seconds < 10 ? '0' + timeObject.seconds : timeObject.seconds }
  `;

  return (
    <div>
      <div id="timer">
        {timeString}
      </div>
      <div className="buttonHolder">
        <button 
          id="pausePlay"
          className="mainButton"
          onClick={handlePause}
        >
            {pauseButton ? 'Pause' : 'Continue'}
        </button>
        <Link 
          to="/"
          id="stopSave"
          className="mainButton"
          onClick={handleSave}
        >
            Stop & Save
        </Link>
      </div>
    </div>
  );
}

export default Timer;