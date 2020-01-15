import React from 'react';

const StartButton = (props) => (
  <button id="startButton" onClick={ () => props.addProject() }>Start</button>
);

export default StartButton;