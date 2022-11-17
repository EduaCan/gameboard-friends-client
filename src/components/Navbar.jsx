import {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import {AuthContext} from "../context/auth.context"

//Barra de navegacion con info privada, que muestra si estas logged
function Navbar({toggleTheme, cambiarTemaBtn}) {
    const { authenticaUser, isLoggedIn, setUser, setIsLoggedIn } = useContext(AuthContext)
  
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        // despues de borrar el token, volvemos a invocar la funcion de validarlo
        authenticaUser()
         }


  return (
    <div id="navbar">
    <NavLink to="/game" >
          <button>Game List</button>
        </NavLink>
        <button style={cambiarTemaBtn()} onClick={toggleTheme}>Switch Night Mode</button>
      
    {isLoggedIn === true ? (
      <div>
        <NavLink to="/">
          <button >Home</button>
        </NavLink>
        <NavLink to="/profile" >
          <button>Perfíl</button>
        </NavLink>
        <NavLink to="/changepassword" >
          <button>Cambiar password</button>
        </NavLink>
        <NavLink to="/" >
        
          <button onClick={handleLogout}>Cerrar Sesión</button>
          </NavLink>
        
      </div>
    ) : (
      <div>
        <NavLink to="/" >
          <button>Home</button>
        </NavLink>
        <NavLink to="/signup" >
          <button>Signup</button>
        </NavLink>
        <NavLink to="/login" >
          <button>Login</button>
        </NavLink>
      </div>
    )
  }
    

</div>
  )
}

export default Navbar