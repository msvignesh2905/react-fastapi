import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "../styles/home.css"


const Home = () => {
    const { setToken, userDetails } = useContext(UserContext)
    return (
        <>
            <h1>Welcome {userDetails && userDetails.name}</h1>
            <button onClick={() => setToken(null)}>Log out</button>
        </>
    )
}

export default Home