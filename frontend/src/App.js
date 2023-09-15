import React, { useContext, useEffect, useState } from "react"
import Register from "./components/Register"
import Login from "./components/Login"
import { UserContext } from "./contexts/UserContext"
import Home from "./components/Home"

import "./App.css"


const App = () => {
  const [isLoginShow, setIsLoginShow] = useState(false)
  const { token } = useContext(UserContext)
  const liveCheck = async () => {
    const requestInfo = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
    const response = await fetch("/api/live", requestInfo)
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    liveCheck();
  }, [])


  if (token !== null) {
    return <Home />
  } else {
    return (isLoginShow ? <Login setIsLoginShow={setIsLoginShow} /> : <Register setIsLoginShow={setIsLoginShow} />)
  }
  // if (isLoginShow) {
  //   return (
  //     <Login setIsLoginShow={setIsLoginShow} />
  //   )
  // } else {
  //   return (
  //     <Register setIsLoginShow={setIsLoginShow} />
  //   )
  // }



}

export default App