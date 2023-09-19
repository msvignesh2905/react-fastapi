import React, { createContext, useState, useEffect } from "react";

// import { useContext } from "react";


const UserContext = createContext();


const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("userToken"));
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };

            const response = await fetch("/api/users/me", requestOptions);

            if (!response.ok) {
                setToken(null);
            }
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setUserDetails(data)
                localStorage.setItem("userToken", token);
            }

        };
        if (token) {
            fetchUser();
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ token, setToken, userDetails, setUserDetails }}>
            {props.children}
        </UserContext.Provider>
    );

}

export { UserContext, UserProvider }