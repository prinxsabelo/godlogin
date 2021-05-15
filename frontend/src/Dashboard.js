import { useContext } from "react";
import Cookies from "js-cookie";

import AuthApi from "./context/AuthApi";

export const Dashboard = () => {
    const Auth = useContext(AuthApi);
    console.log(Cookies.get("token"));
    const handleLogout = () => {
        Auth.setAuth(false);
        Cookies.remove("token");
    };
    return (
        <div>
            <h3>Dashboard</h3>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    );
};
