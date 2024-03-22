import { useState } from "react";
import useAuth from "../../Auth/useAuth";
import { Navigate, useNavigate } from "react-router";
import { API_URL } from "../../Auth/contants"


export function SignUp() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorResponse, setErrorResponse] = useState("")

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()
    try{
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password
        })
      })
      if(response.ok){
        console.log("User created successfully")
        setErrorResponse("")

        goTo("/Login")
      } else {
        console.log("Something went wrong")
        const json = await response.json();
        setErrorResponse(json.body.error)
        return;
      }
    } catch(error){
      console.log(error)
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/Login" />
  }

  return (
    <form className="formLogin" onSubmit={handleSubmit}>
      <h1>SignUp</h1>
      {errorResponse && <div className="errorMessage"> {errorResponse}</div>}
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Create User</button>
    </form>
  );
}
