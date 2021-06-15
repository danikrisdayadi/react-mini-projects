import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const initialState = {
    startTimer: false,
    buttonColour: {
      colour: "blue",
      state: "Start"
    },
    hours: 0,
    minutes: 25,
    seconds: 0
  }
  const [startTimer, setStartTimer] = useState(initialState.startTimer)
  const [buttonColour, setButtonColour] = useState(initialState.buttonColour)
  const [hours, setHours] = useState(initialState.hours)
  const [minutes, setMinutes] = useState(initialState.minutes)
  const [seconds, setSeconds ] = useState(initialState.seconds)
  let secTimer;
  useEffect(() => {
    if(startTimer) {
      if(seconds > 0){
        secTimer = setTimeout(() => setSeconds(seconds - 1), 1000);
        console.log("time countdown", seconds, startTimer)
      } else if (seconds === 0 && minutes > 0) {
        setTimeout(() => {
          setSeconds(59)
          setMinutes(minutes - 1)
        }, 1000);
      } else if (seconds === 0 && minutes === 0 && hours > 0) {
          setTimeout(() => {
          setSeconds(59)
          setMinutes(59)
          setHours(hours - 1)
        }, 1000);
      }
    }
    
  }, [startTimer, hours, minutes, seconds])
  const changeTime = (e) => {
    switch(e.target.name) {
      case "increaseMinute":
        minutes >= 0 ? setMinutes(minutes + 1) : setMinutes(0)
        break;
      case "decreaseMinute":
        minutes > 0 ? setMinutes(minutes - 1) : setMinutes(0)
        break;
      case "increaseHour":
        hours >= 0 ? setHours(hours + 1) : setHours(0)
        break;
      case "decreaseHour":
        hours > 0 ? setHours(hours - 1) : setHours(0)
        break;
      default:
        break;
    }
  }
  const changeState = () => {
    clearTimeout(secTimer);
    setStartTimer(!startTimer)
    buttonColour.state === "Start" ? setButtonColour({colour: "red", state: "Pause"}) : setButtonColour({colour: "blue", state: "Start"});
  }

  const resetState = () => {
    setStartTimer(initialState.startTimer)
    setButtonColour(initialState.buttonColour)
    setHours(initialState.hours)
    setMinutes(initialState.minutes)
    setSeconds(initialState.seconds)
  }
  return (
    <div className="App">
      <h1>Podomoro Timer</h1>
      <h2>{hours} : {minutes} : {seconds}</h2>
      <Button onClick={changeTime} name="increaseHour" disabled={buttonColour.state === "Pause"}>Increase Hour</Button>
      <Button onClick={changeTime} name="decreaseHour" disabled={buttonColour.state === "Pause"}>Decrease Hour</Button>
      <Button onClick={changeTime} name="increaseMinute" disabled={buttonColour.state === "Pause"}>Increase Minute</Button>
      <Button onClick={changeTime} name="decreaseMinute" disabled={buttonColour.state === "Pause"}>Decrease Minute</Button>
      <Button style={{backgroundColor: buttonColour.colour, borderColor: buttonColour.colour}} onClick={changeState} active>{buttonColour.state} Timer</Button>
      <Button onClick={resetState} variant="danger" disabled={buttonColour.state === "Pause"}>Reset</Button>
    </div>
  );
}

export default App;
