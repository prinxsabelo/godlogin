import "./App.css";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthApi from "./context/AuthApi";
import Cookies from "js-cookie";
import axios from "axios";
import { PublicHomePage } from "./PublicHomePage";
const Login = () => {
    let fetcher = Cookies.get("xxx");
    console.log(fetcher);
    const Auth = useContext(AuthApi);
    const handleLogin = () => {
        Auth.setAuth(true);
        Cookies.set("user", "loginTrue");
    };
    return (
        <div>
            <h1>Welcome to App</h1>

            <button onClick={handleLogin}>Login</button>
        </div>
    );
};
const Dashboard = () => {
    const Auth = useContext(AuthApi);
    const handleLogout = () => {
        Auth.setAuth(false);
        Cookies.remove("user");
    };
    return (
        <div>
            <h3>Dashboard</h3>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    );
};
function App() {
    const [auth, setAuth] = useState(false);
    const readCookie = () => {
        const user = Cookies.get("user");
        if (user) {
            console.log("xxx");
            setAuth(true);
        }
    };
    useEffect(() => {
        readCookie();
    });
    return (
        <>
            <AuthApi.Provider value={{ auth, setAuth }}>
                <Router>
                    <Routes />
                </Router>
            </AuthApi.Provider>
        </>
    );
}
const Routes = () => {
    const Auth = useContext(AuthApi);
    return (
        <Switch>
            <Route exact path="/">
                {Auth.auth ? <Redirect to="/dashboard" /> : <PublicHomePage />}
            </Route>
            <ProtectedLogin path="/login" auth={Auth.auth} component={Login} />

            <ProtectedRoute
                path="/dashboard"
                auth={Auth.auth}
                component={Dashboard}
            />
        </Switch>
    );
};
const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => (auth ? <Component /> : <Redirect to="/login" />)}
        />
    );
};
const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() =>
                !auth ? <Component /> : <Redirect to="/dashboard" />
            }
        />
    );
};
export default App;
