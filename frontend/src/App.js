import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import LoginGoogle from "./LoginGoogle";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/auth/google" component={LoginGoogle} />
            </Switch>
        </Router>
    );
}

export default App;
