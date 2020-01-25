const convertTime = (elapsedTime) => {
  const timeObject = {};

  // set total number of seconds
  let secondsRemaining = Math.floor(elapsedTime / 1000);
  
  timeObject.hours = Math.floor(secondsRemaining / 3600);
  timeObject.minutes = Math.floor((secondsRemaining - (timeObject.hours * 3600)) / 60);
  timeObject.seconds = Math.floor(secondsRemaining - (timeObject.hours * 3600) - (timeObject.minutes * 60));

  return timeObject;
}

export default convertTime;