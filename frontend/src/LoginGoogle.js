import React, { useContext, useEffect, useState } from "react";
import AuthApi from "./context/AuthApi";
import Cookies from "js-cookie";
import { Redirect, useLocation } from "react-router-dom";
const LoginGoogle = () => {
    const location = useLocation();
    const Auth = useContext(AuthApi);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState();
    console.log(location);
    useEffect(() => {
        fetch(`/api/auth/google/callback${location.search}`, {
            headers: new Headers({ accept: "application/json" }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong!");
            })
            .then((data) => {
                console.log(data.token);
                Auth.setAuth(true);
                Cookies.set("token", data.token);
                setLoading(false);
                setUser(data);
                return <Redirect to="/dashboard" />;

                // this.setState({ loading: false, data });
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
                // this.setState({ loading: false, error });
                console.error(error);
            });
    }, [Auth, location.search]);

    if (loading) {
        return <div>Loading....</div>;
    }

    if (error) {
        return (
            <>
                <div>
                    <p>Error:</p>
                    <code className="Code-block">{error.toString()}</code>
                </div>
            </>
        );
    }
    return (
        <>
            {user && <Redirect to="/dashboard" />}

            <div>
                <details>
                    {/* <summary>Welcome {data.user.name}</summary> */}
                    {/* Login for google first here.. */}
                    <p>Here is your info: </p>
                    <code className="Code-block">
                        {JSON.stringify(user, null, 2)}
                    </code>
                </details>
            </div>
        </>
    );
};
export default LoginGoogle;
