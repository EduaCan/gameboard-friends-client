import { createContext, useState } from "react";

const DarkThemeContext = createContext();

function DarkThemeWrapper(props) {
  const [darkMode, setDarkMode] = useState(false);
  const [darkModeButton, setDarkModeButton] = useState("success");
  const [darkModeButtonRed, setDarkModeButtonRed] = useState("danger");
  const [darkModeButtonBlue, setDarkModeButtonBlue] = useState("primary");

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
    return darkMode ? darkTheme : lightTheme;
  };

  const cambiarTemaListScroll = () => {
    return darkMode ? darkThemeListScroll : lightThemeListScroll;
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

  const passedContext = {
    toggleTheme,
    darkTheme,
    lightTheme,
    darkThemeListScroll,
    lightThemeListScroll,
    cambiarTema,
    cambiarTemaListScroll,
    cambiarTemaButton,
    cambiarTemaButtonRed,
    cambiarTemaButtonBlue,
  };

  return (
    <DarkThemeContext.Provider value={passedContext}>
      {props.children}
    </DarkThemeContext.Provider>
  );
}

export { DarkThemeContext, DarkThemeWrapper };