import './App.css';
import { Button } from 'react-bootstrap'
function App() {
  return (
   <div id="wrapper">
    <div id="quote-box">
      <h1 id="text">To be or not to be, that is the questions</h1>
      <p id="author">- Someone wise</p>
      <div id="footer">
        <a href="/" id="tweet-quote">Tweet</a>
        <Button id="new-quote">New Quote</Button>
      </div>
    </div>
   </div>
  );
}

export default App;