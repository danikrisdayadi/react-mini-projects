import './App.css';
import {useState} from 'react'
import { Button } from 'react-bootstrap'
import {QUOTES as quote}  from './content'

function App() {
  const [quoteID, setQuoteID] = useState(0);
  const [quoteColour, setQuoteColour] = useState(quote[quoteID].colour)
  const handleClick = () => {
    setQuoteID(Math.floor(Math.random() * 5));
  }
  return (
   <div id="wrapper" style={{backgroundColor: quote[quoteID].colour}}>
    <div id="quote-box">
      <h1 id="text">{quote[quoteID].quote}</h1>
      <p id="author">- {quote[quoteID].author}</p>
      <div id="footer">
        <a href="/" id="tweet-quote">Tweet</a>
        <Button id="new-quote" onClick={handleClick}>New Quote</Button>
      </div>
    </div>
   </div>
  );
}

export default App;