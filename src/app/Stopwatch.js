import React, { Component } from 'react';
import './Stopwatch.css';
import formatTime from './components/formatTime.js';

const refreshRate = 10; //number of milliseconds between screen renders

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleLapClick = this.handleLapClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleClearLaps = this.handleClearLaps.bind(this);

    this.state = {
      startTime: 0,
      running: false,
      elapsed: 0,
      lapTimes: []
    };
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  };

  tick() {
    this.setState((prevState) => ({
      elapsed: Date.now() - prevState.startTime,
    }));
  };

  handleStartClick() {
    if (false === this.state.running) {
      this.setState((prevState) => ({
        // subtract off the elapsed time already accumulated.
        startTime: Date.now() - prevState.elapsed,
        running: true
      }));
      this.timer = setInterval(this.tick, refreshRate);
    }
  };

  handleStopClick() {
    if (this.state.running) {
      clearInterval(this.timer);
      this.setState(() => ({
        running: false
      }));
    }
  };

  handleLapClick() {
    if (this.state.running) {
      this.setState((prevState) => ({
        lapTimes: prevState.lapTimes.concat(this.state.elapsed)
      }));
    }
  };

  handleClearLaps() {
    this.setState(() => ({
      lapTimes: []
    }));
  }

  handleResetClick() {
    if (!this.state.running) {
      this.setState(() => ({
        startTime: 0,
        elapsed: 0,
        lapTimes: []
      }));
    }
  };

  render() {
    return (
      <div className="container">
        <div className="text-center stop-watch panel panel-default">
          <Counter elapsed={this.state.elapsed} />
          <Buttons
            isRunning={this.state.running}
            handleStartClick={this.handleStartClick}
            handleStopClick={this.handleStopClick}
            handleLapClick={this.handleLapClick}
            handleResetClick={this.handleResetClick}
          />
          <LapsList
            lapTimes={this.state.lapTimes}
            handleClearLaps={this.handleClearLaps}
          />
        </div>
      </div>
    );
  };
};

const Counter = (props) => {
  return (
    <h1 className="stopwatch-timer">{formatTime(props.elapsed)}</h1>
  );
};

const Buttons = (props) => {
  return (
    <div className="btn-group" role="group">
      {!props.isRunning && <button type="button" className="btn btn-success" onClick={props.handleStartClick}>Start</button>}
      {props.isRunning && <button type="button" className="btn btn-warning" onClick={props.handleStopClick}>Stop</button>}
      <button type="button" className="btn btn-info" onClick={props.handleLapClick}>Lap</button>
      <button type="button" className="btn btn-danger" onClick={props.handleResetClick}>Reset</button>
    </div>
  );
};

const LapsList = (props) => {
  return (
    <div>
      <div className="text-right">
        {props.lapTimes.length > 0 && <button type="button" className="btn btn-danger btn-sm" onClick={props.handleClearLaps}>Clear Laps</button>}
      </div>
      <ul className="list-group">
        {
          props.lapTimes.map((lapTime) => (
            <LapItem key={lapTime} lapTime={lapTime} />
          ))
        }
      </ul>
    </div>
  );
};

const LapItem = (props) => {
  return (
    <li className="list-group-item">{formatTime(props.lapTime)}</li>
  );
};
