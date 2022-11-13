import { createContext, useState, useEffect } from "react"
import { verifyService } from "../services/auth.service"

const AuthContext = createContext()

function AuthWrapper(props) {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    authenticaUser()
  }, [])

  const authenticaUser = async () => {
    // ejecutar para validar el token del usuario y actualizar los estados
    setIsFetching(true) 
    try {
      
      const response = await verifyService()
      // a partir de este punto, el Token está validado en FE
      setIsLoggedIn(true)
      setUser(response.data)
      setIsFetching(false)

    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      setUser(null)
      setIsFetching(false)
    }

  }

  const passedContext = {
    isLoggedIn,
    user,
    authenticaUser,
    setIsLoggedIn,
    setUser
  }

  if (isFetching === true) {
    return (
      <div className="App">
        <h3>... Validando al usuario</h3>

      
      </div>
    )
  }

    return (
        <AuthContext.Provider value={passedContext}>
          {props.children}
        </AuthContext.Provider>
      )
}


export {
    AuthContext,
    AuthWrapper
  }