// SignOut.jsx
import { useAuth } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router"

export function SignOut() {
  const goTo = useNavigate()
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    console.log("SignOut successfully")
    goTo("/")
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
}
