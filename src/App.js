import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Survey from './Survey';
import submit from './submit';

function App() {
  return (
    <div className="App">
    <Router>
      <Route path='/' exact component={Survey} />
      <Route path='/submit' exact component={submit} />
    </Router>
    </div>
  );
}

export default App;
