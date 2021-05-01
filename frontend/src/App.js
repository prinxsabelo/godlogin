import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './Home';
import LoginGoogle from './LoginGoogle';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth/google" component={LoginGoogle} />
      </Switch>
    </Router>
  );
}

export default App;
