import { useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { useAuth } from "../../Auth/useAuth"
import { API_URL } from "../../Auth/constants"

export function Login () {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorResponse, setErrorResponse] = useState("")

    const auth = useAuth();
    const goTo = useNavigate()

    // if(auth.isAuthenticated){
    //     return <Navigate to="/bienvenido" />
    // }

    async function handleSubmit(e) {
      e.preventDefault()
      try{
        const response = await fetch(`${API_URL}/Login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        })
        if(response.ok){
          console.log("Login successfull")
          setErrorResponse("")
          const json = (await response.json())
          if(json.body.accessToken && json.body.refreshToken){
            auth.saveUser(json)
            goTo("/bienvenido")
          }

        } else {
          console.log("Something went wrong")
          const json = await response.json();
          setErrorResponse(json.body.error)
          return;
        }
      } catch(error){
        console.log(error)
      }finally{
        if(auth.isAuthenticated){
          return <Navigate to="/bienvenido" />
      }
      }
    }
    return (

        <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorResponse && <div className="errorMessage"> {errorResponse}</div>}
        <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
         <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

        <button>Login</button>
        </form>

    )
}