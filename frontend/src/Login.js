import { useContext } from "react";
import Cookies from "js-cookie";
import useSignUpForm from "./CustomHooks";

import AuthApi from "./context/AuthApi";
import Social from "./Social";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Login = () => {
    let fetcher = Cookies.get("xxx");
    console.log(fetcher);
    const Auth = useContext(AuthApi);
    const handleLogin = async (e) => {
        Auth.setAuth(true);
        Cookies.set("user", "loginTrue");

        e.preventDefault();
        const { email, password } = inputs;
        let response = await axios({
            method: "post",
            url: "/api/login",
            data: {
                email,
                password,
            },
        });
        if (response.data) {
            const { token } = response.data;
            Cookies.set("token", token);
        }
        console.log(response.data);
    };
    const { inputs, handleInputChange } = useSignUpForm();
    return (
        <form className="container" onSubmit={handleLogin}>
            <div className="row justify-content-center my-5 mt-5 pt-5">
                <div className="col-md-4 shadow my-auto">
                    <h4 className="my-4">Login Form</h4>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            // required
                            name="email"
                            value={inputs.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password.."
                            // required
                            autoComplete="true"
                            name="password"
                            value={inputs.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="w-100 btn btn-lg btn-primary">
                            Sign In
                        </button>
                    </div>

                    <div className="px-2 font-bold py-2 ">
                        <NavLink to="/register" className="font-weight-bold">
                            Register
                        </NavLink>
                    </div>
                </div>
            </div>
            <Social />
        </form>
    );
};
export default Login;
