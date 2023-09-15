import { useContext, useState } from "react"
import "../styles/register.css"
import { UserContext } from "../contexts/UserContext"

const initialInputs = {
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: ""
}
const Register = ({ setIsLoginShow }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [inputs, setInputs] = useState(initialInputs)
    const {setToken} = useContext(UserContext);
    console.log(inputs)
    const handleInputChange = (event) => {
        setErrorMessage("")
        const inputName = event.target.name
        const value = event.target.value
        setInputs({
            ...inputs,
            [inputName]: value
        })

    }

    const submitUserRegistration = async () => {
        console.log(inputs.name)
        const requestInfo = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: inputs.name,
                email: inputs.email,
                gender: inputs.gender,
                date_of_birth: inputs.dob,
                is_active: true,
                hashed_password: inputs.password
            }),
        }

        const response = await fetch("/api/users", requestInfo)
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            inputs.name === "" ||
            inputs.email === "" ||
            inputs.password === "" ||
            // inputs.confirmPassword === "" ||
            inputs.gender === "" ||
            inputs.dob === "") {
            setErrorMessage("Please fill all the fields")
        } else if (inputs.password.length < 5) {
            setErrorMessage("Password length must be greater than 5")
        } else {
            submitUserRegistration();
        }

    }
    return (
        <>
            <div className="register-form">
                {/* <p className="error-message">{errorMessage}</p> */}
                {/* <h3>Register your account <span className="error-message">{errorMessage}</span></h3> */}
                <div className="top-section">
                    <h3>Register your account </h3>
                    <p className="error-message">{errorMessage}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={handleInputChange}
                    />


                    <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />

                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={handleInputChange}

                    />

                    {/* <label for="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={inputs.confirmPassword}
                        onChange={handleInputChange}
                    /> */}


                    <label for="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={inputs.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>

                    <label for="dob">Date of birth</label>
                    <input
                        type="date"
                        name="dob"
                        placeholder="Date of birth"
                        value={inputs.dob}
                        onChange={handleInputChange}
                    />


                    <button className="submit-btn">Submit</button>
                    <p>Already have an account? <span id="login" onClick={() => setIsLoginShow(true)}>Login</span></p>
                </form>
            </div>
        </>
    )
}

export default Register