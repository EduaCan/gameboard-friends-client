import { createContext, useState, useEffect } from "react";
import { verifyService } from "../services/auth.service";
import DotLoader from "react-spinners/ClipLoader";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [darkMode, setDarkMode] = useState(false); //setDarkModeButton
  const [darkModeButton, setDarkModeButton] = useState("success");
  const [darkModeButtonRed, setDarkModeButtonRed] = useState("danger");
  const [darkModeButtonBlue, setDarkModeButtonBlue] = useState("primary");

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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkModeButton === "success") {
      setDarkModeButton("dark");
      setDarkModeButtonRed("dark");
      setDarkModeButtonBlue("dark");
    } else {
      setDarkModeButton("success");
      setDarkModeButtonRed("danger");
      setDarkModeButtonBlue("primary");
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

  const darkThemeListScroll = {
    backgroundColor: "rgb(20, 20, 20)",
    color: "wheat",
    maxHeight: "70vh",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column-reverse",
  };

  const lightThemeListScroll = {
    backgroundColor: "#ffffff",
    color: "black",
    maxHeight: "70vh",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column-reverse",
  };

  const cambiarTema = () => {
    return darkMode === true ? darkTheme : lightTheme;
  };

  const cambiarTemaListScroll = () => {
    return darkMode === true ? darkThemeListScroll : lightThemeListScroll;
  };

  const cambiarTemaButton = () => {
    return darkModeButton === "dark" ? "dark" : "success";
  };

  const cambiarTemaButtonRed = () => {
    return darkModeButtonRed === "dark" ? "dark" : "danger";
  };

  const cambiarTemaButtonBlue = () => {
    return darkModeButtonBlue === "dark" ? "dark" : "primary";
  };

  const dateFormat = (time) => {
    let date = new Date(time)
    let str = "";
    let min = "";
    let sec = "";
    if (date.getMinutes() < 10) {
      min += "0" + date.getMinutes();
    } else {
      min += date.getMinutes();
    }
    if (date.getSeconds() < 10) {
      sec += "0" + date.getSeconds();
    } else {
      sec += date.getSeconds();
    }
    str =
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      min +
      ":" +
      sec;
    return str;
  };


  const createdEdited = (comment) => {
      if (comment.createdAt >= comment.updatedAt) {
        let strDate = dateFormat(comment.createdAt);
        return "created on " + strDate;
      } else {
        let strDate = dateFormat(comment.updatedAt);
        return "edited on " + strDate;
      }
  }

  const passedContext = {
    isLoggedIn,
    user,
    authenticaUser,
    setIsLoggedIn,
    setUser,
    toggleTheme,
    cambiarTema,
    cambiarTemaListScroll,
    cambiarTemaButton,
    cambiarTemaButtonBlue,
    cambiarTemaButtonRed,
    dateFormat,
    createdEdited
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
