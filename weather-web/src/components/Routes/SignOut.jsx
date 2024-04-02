// SignOut.jsx
import { useAuth } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router"
import { API_URL } from "../../Auth/constants";

export function SignOut() {
  const goTo = useNavigate()
  const auth = useAuth();

  async function handleSignOut (e) {
   e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`, 
        },
      })
      if(response.ok) {
        auth.signOut();
        goTo("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );

}