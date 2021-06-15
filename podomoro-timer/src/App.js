import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const [startTimer, setStartTimer] = useState(false)
  const [hours, setHours] = useState(1)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds ] = useState(0)
  useEffect(() => {
    console.log("Usereffect", seconds)
    let secTimer;
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
    } else {
      // setSeconds(seconds + 1);
      console.log("Clear timeout", seconds, startTimer)
      return null;
    }
    
  }, [startTimer, hours, minutes, seconds])
  const changeTime = (e) => {
    if(e.target.name === "minute") {
      setMinutes(minutes + 1)
    }
    
  }
  const start = () => {
    console.log("start is pressed")
    setStartTimer(!startTimer)
  }
  return (
    <div className="App">
      <h1>Podomoro Timer</h1>
      <h2>{hours} : {minutes} : {seconds}</h2>
      <Button onClick={changeTime} name="minute">Increase Minute</Button>
      <Button onClick={start} active>Start/Pause Timer</Button>
    </div>
  );
}

export default App;
