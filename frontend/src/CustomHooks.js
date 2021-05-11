import { useState } from "react";

const useSignUpForm = () => {
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });
    
    const handleRegister = (event) => {
        // if (event) {
        //     event.preventDefault();
        //     console.log(inputs);
        //     await fetch('/api/auth/normal/register',{
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify()
        //     })
        // }
    };
    const handleLogin = (event) => {
        if (event) {
            event.preventDefault();
            console.log(inputs);
        }
    };
    const handleInputChange = (event) => {
        console.log("xx");
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };
    return {
        handleRegister,
        handleLogin,
        handleInputChange,
        inputs,
    };
};
export default useSignUpForm;
