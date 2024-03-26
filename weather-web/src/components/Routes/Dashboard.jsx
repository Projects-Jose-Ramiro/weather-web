import { useAuth } from "../../Auth/AuthProvider"

export function Dashboard () {
    const auth = useAuth();
    return (
        <h1>Dashboard de {auth.getUser() ?.name || ""} </h1>
    )
} 