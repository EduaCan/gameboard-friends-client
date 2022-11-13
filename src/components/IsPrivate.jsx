import { Navigate } from "react-router-dom"
import {useContext} from 'react'
import {AuthContext} from "../context/auth.context"

//componente envoltoria para comprobar si el user esta logged, en funcion de eso renderiza...
//... info común o exclusiva

function IsPrivate(props) {
    const { isLoggedIn } = useContext(AuthContext)
    if (isLoggedIn === true) {
        
        return props.children
      } else {
        
        return <Navigate to="/login"/>
       
      }
}

export default IsPrivate