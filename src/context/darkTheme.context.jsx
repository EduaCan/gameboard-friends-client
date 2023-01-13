import { createContext, useState } from "react";
const DarkThemeContext = createContext();
//handler for light/dark theme
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
  //dark theme styles
  const darkTheme = {
    backgroundColor: "rgb(20, 20, 20)",
    color: "wheat",
  };
  //light theme styles
  const lightTheme = {
    backgroundColor: "#ffffff",
    color: "black",
  };
  //dark theme styles for event chatroom
  const darkThemeListScroll = {
    backgroundColor: "rgb(20, 20, 20)",
    color: "wheat",
    maxHeight: "70vh",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column-reverse",
  };
  //light theme styles for event chatroom
  const lightThemeListScroll = {
    backgroundColor: "#ffffff",
    color: "black",
    maxHeight: "70vh",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column-reverse",
  };
  //main theme toggler
  const changeTheme = () => {
    return darkMode ? darkTheme : lightTheme;
  };
  //event chatroom toggler
  const changeThemeListScroll = () => {
    return darkMode ? darkThemeListScroll : lightThemeListScroll;
  };
  //theme for primary buttons toggler
  const changeThemeButton = () => {
    return darkModeButton === "dark" ? "dark" : "success";
  };
  //theme for delete buttons toggler
  const changeThemeButtonRed = () => {
    return darkModeButtonRed === "dark" ? "dark" : "danger";
  };
  //theme for modify buttons toggler
  const changeThemeButtonBlue = () => {
    return darkModeButtonBlue === "dark" ? "dark" : "primary";
  };
  //form error warnings styles
  const blankInputError = {
    borderColor: "red",
    color: "red",
    boxShadow: "0 0 5px 5px red",
  }


  //functions export
  const passedContext = {
    toggleTheme,
    darkTheme,
    lightTheme,
    darkThemeListScroll,
    lightThemeListScroll,
    changeTheme,
    changeThemeListScroll,
    changeThemeButton,
    changeThemeButtonRed,
    changeThemeButtonBlue,
    blankInputError
  };

  return (
    <DarkThemeContext.Provider value={passedContext}>
      {props.children}
    </DarkThemeContext.Provider>
  );
}

export { DarkThemeContext, DarkThemeWrapper };
