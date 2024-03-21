import { Outlet, Navigate } from "react-router-dom"

import useAuth from "../../Auth/useAuth";

export function ProtectedRoute () {

    const auth = useAuth();
    return auth.isAuthenticated ? <Outlet /> : <Navigate to ="/"/> 
}