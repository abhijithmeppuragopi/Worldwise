import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Contexts/UserAuthenticationContext"
import { useEffect } from "react";

function ProtectedRoute({children}){
    const {isAuthenticated}=useUserContext();
    const navigate=useNavigate();

    useEffect(function(){
        if(!isAuthenticated) navigate('/');
    },
    [isAuthenticated,navigate])
   
return isAuthenticated? children :null;
}

export default ProtectedRoute;