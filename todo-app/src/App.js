import './App.css';
import Home from './components/HomeComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store'

function App() {
  return (
    <Provider>
      <Home store={store}/>
    </Provider>
  );
}

export default App;
