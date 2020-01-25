import React from 'react';

const WarningScreen = (props) => {

  return (
    <div class="warningScreen">
      <h3>Hold up...</h3>
      <p>
        Are you sure you want to delete
        <strong> {props.id}</strong>
      </p>
      <div className="buttonHolder">
        <button type="button" className="mainButton">Yep</button>
        <button type="button" className="mainButton" style={{background: 'var(--red)'}}>Whoops...no</button>
      </div>
    </div>
  )
}

export default WarningScreen;