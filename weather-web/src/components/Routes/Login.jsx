import { useState } from "react"
import { Navigate } from "react-router"
import { useAuth } from "../../Auth/useAuth"

export function Login () {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const auth = useAuth();

    if(auth.isAuthenticated){
        return <Navigate to="/bienvenido" />
    }

    return (
     
               <form className="form">
        <h1>Login</h1>

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