import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [hours, setHours] = useState(1)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds ] = useState(0)
  useEffect(() => {
    if(seconds > 0){
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (seconds === 0 && minutes !== 0) {
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
  }, [hours, minutes, seconds])
  return (
    <div className="App">
      <h1>Podomoro Timer</h1>
      <h2>{hours} : {minutes} : {seconds}</h2>
      {/* <Button>Reset</Button> */}
    </div>
  );
}

export default App;
