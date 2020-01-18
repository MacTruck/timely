import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';


const Timer = (props) => {

  // let isRunning = false;
  // let [isRunning, toggleIsRunning] = useState(true);
  let [previousTime, setPreviousTime] = useState(new Date(props.entry.timestamp).getTime());
  let [elapsedTime, setElapsedTime] = useState(0);
  let isRunning = useRef(true);

  useEffect(() => {
    const timerInterval = setInterval(startTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  function startTimer() {
    console.log('previousTime', previousTime);
    console.log('elapsedTime', elapsedTime);
    if (isRunning.current) {
      const now = Date.now();
      setElapsedTime(elapsedTime + (now - previousTime));
      setPreviousTime(now);
    }
  }

  function handlePause() {
    // toggleIsRunning(isRunning => !isRunning);
    isRunning.current = isRunning.current ? false : true
    console.log('isRunning', isRunning.current);
    if (!isRunning.current) {
      setPreviousTime(Date.now());
      console.log(previousTime);
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

  console.log('elapsed-->', elapsedTime);

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