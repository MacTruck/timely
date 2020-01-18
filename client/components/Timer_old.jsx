import React from 'react';

import { Link } from 'react-router-dom';


class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: true,
      previousTime: new Date(this.props.entry.timestamp).getTime(),
      elapsedTime: 0
    };

    this.startTimer = this.startTimer.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentDidMount() {
    this.timerInstance = setInterval(() => this.startTimer(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInstance);
  }

  startTimer() {
    if (this.state.isRunning) {
      const now = Date.now();
      this.setState(prevState => ({
        previousTime: now,
        elapsedTime: prevState.elapsedTime + (now - prevState.previousTime)
      }));
    }
  }

  handlePause() {
    this.setState(prevState => ({
      isRunning: !prevState.isRunning
    }));
    if (!this.state.isRunning) {
      this.setState({
        previousTime: Date.now()
      });
    }
  }

  render() {
    let hours = 0, minutes = 0, seconds = 0;
    let secondsDiffence, secondsText, minutesText, hoursText;
    secondsDiffence = Math.floor(this.state.elapsedTime / 1000);

    hours = Math.floor(secondsDiffence / 3600);
    minutes = Math.floor((secondsDiffence - (hours * 3600)) / 60);
    seconds = Math.floor(secondsDiffence - (hours * 3600) - (minutes * 60));

    secondsText = seconds < 10 ? `0${seconds}` : `${seconds}`;
    minutesText = minutes < 10 ? `0${minutes}` : `${minutes}`;
    hoursText = hours < 10 ? `0${hours}` : `${hours}`;

    return (
      <div>
        <div id="timer">{`${hoursText}:${minutesText}:${secondsText}`}</div>
        <button id="pausePlay" className="mainButton" onClick={this.handlePause}>{this.state.isRunning ? 'Pause' : 'Continue'}</button>
        <Link to="/" id="stopSave" className="mainButton" onClick={() => {
          props.updateEntry(props.newEntry, this.state.elapsedTime, "elapsedTime");
          props.submitEntry();
        }}>Stop & Save</Link>
      </div>
    );
  }
}

export default Timer;