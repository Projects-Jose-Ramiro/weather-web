import { useAuth } from "../../Auth/useAuth";
import { API_URL } from "../../Auth/constants";

export function SignOut() {
    async function handleSignOut(e) {
        e.preventDefault();
        try{
            const response = await fetch (`${API_URL}/signout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getRefreshToken()}`, 
                },
            });

            if (response.ok){
                auth.signOut();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const auth = useAuth();
    return (
        <form className="form" onClick={handleSignOut}>
   
      
        </form>
    )
}