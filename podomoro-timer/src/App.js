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
    minutes: 1,
    seconds: 0,
    isRunning: false
  }
  const breakState = {
    startTimer: false,
    buttonColour: {
      colour: "blue",
      state: "Start"
    },
    hours: 0,
    minutes: 2,
    seconds: 0,
    isRunning: false
  }
  const [numberOfRounds, setnumberOfRounds] = useState(0)
  const [activityType, setactivityType] = useState("Study Time")
  const [isRunning, setisRunning] = useState(initialState.isRunning)
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
      } else if (seconds === 0 && minutes > 0) {
        setTimeout(() => {
          setSeconds(4)
          setMinutes(minutes - 1)
        }, 1000);
      } else if (seconds === 0 && minutes === 0 && hours > 0) {
        setTimeout(() => {
          setSeconds(59)
          setMinutes(59)
          setHours(hours - 1)
        }, 1000);
      } else if (seconds === 0 && minutes === 0 && hours === 0) {
        setisRunning(false); // clock has stopped
        if (activityType === "Study Time") {
          changeState()
          setisRunning(false)
          setactivityType("Break Time") 
          setStartTimer(breakState.startTimer)
          setSeconds(breakState.seconds)
          setMinutes(breakState.minutes)
          setHours(breakState.hours)
          setButtonColour(breakState.buttonColour)
        } else {
          resetState()
          setactivityType("Study Time") 
          setnumberOfRounds(numberOfRounds - 1);
        }
        
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
    setisRunning(true)
    buttonColour.state === "Start" ? setButtonColour({colour: "red", state: "Pause"}) : setButtonColour({colour: "blue", state: "Start"});
  }

  const resetState = () => {
    setactivityType("Study Time")
    setStartTimer(initialState.startTimer)
    setButtonColour(initialState.buttonColour)
    setHours(initialState.hours)
    setMinutes(initialState.minutes)
    setSeconds(initialState.seconds)
    setisRunning(initialState.isRunning)
  }

  return (
    <div className="App">
      <h1>Podomoro Timer</h1>
      <br />
      <h2>{activityType}</h2>
      <h2>{hours < 10 ? "0" : ""}{hours} : {minutes < 10 ? "0" : ""}{minutes} : {seconds < 10 ? "0" : ""}{seconds}</h2>
      <Button onClick={changeTime} name="increaseHour" disabled={buttonColour.state === "Pause" || isRunning}>Increase Hour</Button>
      <Button onClick={changeTime} name="decreaseHour" disabled={buttonColour.state === "Pause" || isRunning}>Decrease Hour</Button>
      <Button onClick={changeTime} name="increaseMinute" disabled={buttonColour.state === "Pause" || isRunning}>Increase Minute</Button>
      <Button onClick={changeTime} name="decreaseMinute" disabled={buttonColour.state === "Pause" || isRunning}>Decrease Minute</Button>
      <br />
      <br />
      <Button style={{backgroundColor: buttonColour.colour, borderColor: buttonColour.colour}} onClick={changeState} active>{buttonColour.state} Timer</Button>
      <Button onClick={resetState} variant="danger" disabled={buttonColour.state === "Pause"}>Reset</Button>
    </div>
  );
}

export default App;
