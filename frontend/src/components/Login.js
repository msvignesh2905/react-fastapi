import React, { useContext, useState } from "react";
import "../styles/login.css"
import { UserContext } from "../contexts/UserContext";

const initialInputs = {
    email: '',
    password: '',
}

const Login = ({ setIsLoginShow }) => {
    const [inputs, setInputs] = useState(initialInputs)
    const [errorMessage, setErrorMessage] = useState('')
    const {setToken, setUserDetails}= useContext(UserContext)
    const handleInputChange = (event) => {
        setErrorMessage("")
        const inputName = event.target.name
        const value = event.target.value

        setInputs({ ...inputs, [inputName]: value })

    }

    const submitUserLogin = async () => {
        const formData = new URLSearchParams();
        formData.append("username", inputs.email);
        formData.append("password", inputs.password);

        const requestInfo = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString()

        }


        const response = await fetch("/api/token", requestInfo)
        const data = await response.json()
        if (!response.ok) {
            setErrorMessage(data.detail)
        } else {
            setToken(data.access_token)
            setUserDetails(data.user_details)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        if (inputs.email === "" || inputs.password === "") {
            setErrorMessage("Please fill all the fields")
        } else {
            submitUserLogin()
        }
    }
    return (
        <>
            <div className="login-form">
                <div className="top-section">
                    <h3>Login </h3>
                    <p className="error-message">{errorMessage}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />

                    <label for="passwor">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={handleInputChange} />



                    <button className="submit-btn">Login</button>
                    <p>Don't have an account? <span id="sign-up" onClick={() => setIsLoginShow(false)}>Sign up</span></p>
                </form>
            </div>
        </>
    )
}

export default Login