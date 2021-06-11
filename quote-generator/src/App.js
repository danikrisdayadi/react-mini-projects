import './App.css';
import {useState} from 'react'
import { Button } from 'react-bootstrap'
import { QUOTES as quote }  from './content'
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from 'react-share'
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
        <div id="icons">
          <TwitterShareButton id="tweet-quote" url={"https://app.interseed.co/"}><TwitterIcon size={32} borderRadius={10}/></TwitterShareButton>
          <FacebookShareButton id="facebook-quote" url={"https://app.interseed.co/"}><FacebookIcon size={32} borderRadius={10}/></FacebookShareButton>
        </div>
        <Button id="new-quote" onClick={handleClick}>New Quote</Button>
      </div>
    </div>
   </div>
  );
}

export default App;