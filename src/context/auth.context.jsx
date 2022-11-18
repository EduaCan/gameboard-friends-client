import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/auth.service";
import DotLoader from "react-spinners/ClipLoader";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [darkMode, setDarkMode] = useState(false); //setDarkModeButton
  const [darkModeButton, setDarkModeButton] = useState("light");

  useEffect(() => {
    authenticaUser();
  }, []);

  const authenticaUser = async () => {
    // ejecutar para validar el token del usuario y actualizar los estados
    setIsFetching(true);
    try {
      const response = await verifyService();
      // a partir de este punto, el Token está validado en FE
      setIsLoggedIn(true);
      setUser(response.data);
      setIsFetching(false);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      setIsFetching(false);
    }
  };

  const darkTheme = {
    backgroundColor: "rgb(20, 20, 20)",
    color: "wheat",
  };

  const lightTheme = {
    backgroundColor: "#ffffff",
    color: "black",
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    darkModeButton === "light"
      ? setDarkModeButton("dark")
      : setDarkModeButton("light");
  };

  const cambiarTema = () => {
    return darkMode === true ? darkTheme : lightTheme;
  };

  const cambiarTemaButton = () => {
    return darkModeButton === "dark" ? "dark" : "light";
  };

  const passedContext = {
    isLoggedIn,
    user,
    authenticaUser,
    setIsLoggedIn,
    setUser,
    toggleTheme,
    cambiarTema,
    cambiarTemaButton,
  };

  if (isFetching === true) {
    return (
      <div className="App">
        <DotLoader
          color={"grey"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
