import { NavLink } from "react-router-dom";
import useSignUpForm from "./CustomHooks";
import axios from "axios";
import Social from "./Social";

const Register = () => {
    const { inputs, handleInputChange } = useSignUpForm();
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(inputs);
        const { firstname, lastname, email, password } = inputs;
        await axios({
            method: "post",
            url: "/api/register",
            data: {
                firstname,
                lastname,
                email,
                password,
            },
        });
    };
    console.log(inputs);
    return (
        <form className="container" onSubmit={handleRegister}>
            <div className="row justify-content-center my-5 mt-5 pt-5">
                <div className="col-md-4 shadow my-auto">
                    <h4 className="my-4">Register Form</h4>
                    <div>
                        <label>First Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="firstname"
                            onChange={handleInputChange}
                            value={inputs.firstname}
                            required
                        />
                        <label>Last Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="lastname"
                            onChange={handleInputChange}
                            value={inputs.lastname}
                            required
                        />
                    </div>
                    <div>
                        <label>Email Address</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            value={inputs.email}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                            value={inputs.password}
                        />
                    </div>

                    <div className="form-group">
                        <button className="w-100 btn btn-lg btn-primary">
                            Sign In
                        </button>
                    </div>
                    <div className="px-2 font-bold py-2 ">
                        <NavLink to="/login" className="font-weight-bold">
                            Login
                        </NavLink>
                    </div>
                </div>
            </div>
            <Social />
        </form>
    );
};
export default Register;
