import {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {AuthContext} from "../context/auth.context"

function Navbar() {
    const { authenticaUser, isLoggedIn, setUser, setIsLoggedIn } = useContext(AuthContext)
  const{navigate} = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("authToken")
        // despues de borrar el token, volvemos a invocar la funcion de validarlo
        authenticaUser()
        //y lo dirigimos a home
        navigate("/")
         }


  return (
    <div id="navbar">
    <NavLink to="/game" >
          <button>Game List</button>
        </NavLink>
      
    {isLoggedIn === true ? (
      <div>
        <NavLink to="/">
          <button >Home</button>
        </NavLink>
        <NavLink to="/profile" >
          <button>Perfíl</button>
        </NavLink>
        <span className='nav-inactive'>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </span>
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