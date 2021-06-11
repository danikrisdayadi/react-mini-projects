import './App.css';
import {useState} from 'react'
import { Button } from 'react-bootstrap'
import {QUOTES as quote}  from './content'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

function App() {
  const [quoteID, setQuoteID] = useState(0);
  const handleClick = () => {
    setQuoteID(Math.floor(Math.random() * 16));
  }
  return (
   <div id="wrapper" style={{backgroundColor: quote[quoteID].colour}}>
    <div id="quote-box" className="shadow-lg">
      <h1 id="text">{quote[quoteID].quote}</h1>
      <p id="author">- {quote[quoteID].author}</p>
      <div id="footer">
        <a href="/" id="tweet-quote"><FontAwesomeIcon size="lg" icon={faTwitter} /></a>
        <Button id="new-quote" onClick={handleClick}>New Quote</Button>
      </div>
    </div>
   </div>
  );
}

export default App;