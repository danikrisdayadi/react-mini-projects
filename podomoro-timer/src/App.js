import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Logo from './assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import './App.css';

const BREAK = "Break Time"
const STUDY = "Study Time"

function App() {
  const studyState = {
    activityType: STUDY,
    isPlay: false,
    buttonColour: {
      colour: "blue",
      state: "Start"
    },
    hours: 0,
    minutes: 1,
    seconds: 0,
    isCounting: false
  }
  const breakState = {
    activityType: BREAK,
    isPlay: false,
    buttonColour: {
      colour: "blue",
      state: "Start"
    },
    hours: 0,
    minutes: 2,
    seconds: 0,
    isCounting: false
  }
  const [hasFinished, sethasFinished] = useState(false)
  const [numberOfRounds, setnumberOfRounds] = useState(1)
  const [activityType, setactivityType] = useState(studyState.activityType)
  const [isCounting, setisCounting] = useState(studyState.isCounting)
  const [isPlay, setisPlay] = useState(studyState.isPlay)
  const [buttonColour, setButtonColour] = useState(studyState.buttonColour)
  const [hours, setHours] = useState(studyState.hours)
  const [minutes, setMinutes] = useState(studyState.minutes)
  const [seconds, setSeconds ] = useState(studyState.seconds)

  let secTimer;
  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }, [])
  useEffect(() => {
    if(isPlay) {
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
        if (activityType === breakState.activityType) {
          if (numberOfRounds === 0) {
            sethasFinished(true)
            showEndNotification();
            return;
          } else {
            setnumberOfRounds(numberOfRounds - 1);
            showChangeStateNotification(BREAK);
          }
        } else {
          showChangeStateNotification(STUDY);
        }
        // changePlayPause() // Pause the clock
        activityType === studyState.activityType ? resetToBreakState() : resetToStudyState()
        setisCounting(false); // clock has stopped
        setisPlay(true)
        setButtonColour({colour: "red", state: "Pause"})
        setisCounting(true)    
      }
    }
    
  }, [isPlay, hours, minutes, seconds])

  const changeNumberOfRounds = (e) => {
    switch(e.target.name) {
      case "increaseRounds":
        setnumberOfRounds(numberOfRounds + 1)
        break;
      case "decreaseRounds":
        numberOfRounds > 0 ? setnumberOfRounds(numberOfRounds - 1) : setnumberOfRounds(0)
        break;
      default:
        break;
    }
  }

  const changePlayPause = () => {
    clearTimeout(secTimer);
    setisPlay(!isPlay)
    setisCounting(true)
    buttonColour.state === "Start" ? setButtonColour({colour: "red", state: "Pause"}) : setButtonColour({colour: "blue", state: "Start"});
  }

  const cleanReset = () => {
    resetToStudyState()
    setnumberOfRounds(1)
    sethasFinished(false)
  }
  const resetToStudyState = () => {
    setactivityType(STUDY)
    setisPlay(studyState.isPlay)
    setButtonColour(studyState.buttonColour)
    setHours(studyState.hours)
    setMinutes(studyState.minutes)
    setSeconds(studyState.seconds)
    setisCounting(studyState.isCounting)
  }
  
  const resetToBreakState = () => {
    setactivityType(BREAK) 
    setisPlay(breakState.isPlay)
    setSeconds(breakState.seconds)
    setMinutes(breakState.minutes)
    setHours(breakState.hours)
    setButtonColour(breakState.buttonColour)
    setisCounting(breakState.isCounting)
  }

  const showEndNotification = () => {
    const options = {
      silent: true,
      body: 'Congratulations you have finished a session!',
      icon: Logo
    }
    new Notification('Podomoro Session Finished!', options)
  }
  
  const showChangeStateNotification = (state) => {
    const breakDetails = {
      silent: true,
      body: `Time to go back to work!\nRemaining rounds: ${numberOfRounds}`,
      icon: Logo
    }

    const studyDetails = {
      silent: true,
      body: 'Go and enjoy a well-deserved break',
      icon: Logo
    }
    if (state === BREAK) {
      new Notification(`Break Time is up!`, breakDetails)
    } else {
      new Notification('Study Time Finished!', studyDetails)
    }
  }

  const hideButtonCondition = buttonColour.state === "Pause" || isCounting
  return (
    <div className="App">
      <h1>Podomoro Timer</h1>
      <br />
      <h2>{activityType}</h2>
      <Row className="justify-content-center">
        <Col lg="auto">
          <Row>
            <Button 
                className="IncreaseDecreaseButton" 
                style={hideButtonCondition ? {visibility: "hidden"} : {visibility: "visible"}} 
                onClick={() => hours < 23 ? setHours(hours + 1) : setHours(23)}>
              <FontAwesomeIcon icon={faChevronUp}/>
            </Button>
          </Row>
          <Row>
            <h2>{hours < 10 ? "0" : ""}{hours}</h2>
          </Row>
          <Row>
            <Button 
                className="IncreaseDecreaseButton" 
                style={hideButtonCondition ? {visibility: "hidden"} : {visibility: "visible"}}
                onClick={() => hours > 0 ? setHours(hours - 1) : setHours(0)}>
              <FontAwesomeIcon icon={faChevronDown}/>
            </Button>
          </Row>
        </Col>
        <Col lg="auto" className="align-self-center">
          <h2> :</h2>
        </Col>
        
        <Col lg="auto">
          <Row>
            <Button 
                className="IncreaseDecreaseButton" 
                style={hideButtonCondition ? {visibility: "hidden"} : {visibility: "visible"}}
                onClick={() => minutes < 59 ? setMinutes(minutes + 1) : setMinutes(59)}>
              <FontAwesomeIcon icon={faChevronUp} />
            </Button>
          </Row>
          <Row>
            <h2>{minutes < 10 ? "0" : ""}{minutes}</h2>
          </Row>
          <Row>
            <Button 
                className="IncreaseDecreaseButton" 
                style={hideButtonCondition ? {visibility: "hidden"} : {visibility: "visible"}}
                onClick={() => minutes > 0 ? setMinutes(minutes - 1) : setMinutes(0)}>
              <FontAwesomeIcon icon={faChevronDown}/>
            </Button>
          </Row>
        </Col>
        <Col lg="auto" className="align-self-center">
          <h2> :</h2>
        </Col>
        <Col lg="auto">
          <Row>
            <Button 
                className="IncreaseDecreaseButton" 
                style={hideButtonCondition ? {visibility: "hidden"} : {visibility: "visible"}}
                onClick={() => seconds < 59 ? setSeconds(seconds + 1) : setSeconds(59)}>
              <FontAwesomeIcon icon={faChevronUp} />
            </Button>
          </Row>
          <Row>
            <h2>{seconds < 10 ? "0" : ""}{seconds}</h2>
          </Row>
          <Row>
            <Button 
                className="IncreaseDecreaseButton" 
                style={hideButtonCondition ? {visibility: "hidden"} : {visibility: "visible"}}
                onClick={() => seconds > 0 ? setSeconds(seconds - 1) : setSeconds(0)}>
              <FontAwesomeIcon icon={faChevronDown}/>
            </Button>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center" style={{paddingTop: 20}}>
        <Col lg="auto">
          <Button style={{backgroundColor: buttonColour.colour, borderColor: buttonColour.colour}} onClick={changePlayPause} active>{buttonColour.state} Timer</Button>
        </Col>
        <Col lg="auto">
          <Button onClick={resetToStudyState} variant="danger" disabled={buttonColour.state === "Pause"}>Reset</Button>
        </Col>
      </Row>
      <Row className="justify-content-center" style={{marginTop: 40}}>
        <Col className="align-self-center" lg="auto">
          <h4>Number of Rounds Left: </h4>
        </Col>
        <Col lg="auto">
          <Row>
            <Button 
                className="IncreaseDecreaseButton"
                style={isCounting ? {visibility: "hidden"} : {visibility: "visible"}}
                onClick={() => numberOfRounds < 99 ? setnumberOfRounds(numberOfRounds + 1) : setnumberOfRounds(99)}>
              <FontAwesomeIcon icon={faChevronUp} />
            </ Button>
          </Row>
          <Row>
            <h4>{numberOfRounds}</h4> 
          </Row>
          <Row>
            <Button 
                className="IncreaseDecreaseButton"
                style={isCounting ? {visibility: "hidden"} : {visibility: "visible"}}
                onClick={() => numberOfRounds > 0 ? setnumberOfRounds(numberOfRounds - 1) : setnumberOfRounds(0)}>
              <FontAwesomeIcon icon={faChevronDown} />
            </ Button>
          </Row>
          
        </Col>
      </Row>
      
      <Modal show={hasFinished}>
        <Modal.Header>
          <Modal.Title>You did it!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Congatulations! You have finished!!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cleanReset}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
