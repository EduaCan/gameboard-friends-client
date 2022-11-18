import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navibar from "./components/Navbar";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import GameList from "./pages/GameList";
import GameDetails from "./pages/GameDetails";
import ChangePassword from "./pages/ChangePassword";
import EventDetails from "./pages/EventDetails";

import { useContext } from "react";
import { AuthContext } from "./context/auth.context";

function App() {
  const { cambiarTema, toggleTheme } = useContext(AuthContext);

  return (
    <div className="App" style={cambiarTema()}>
      <Navibar toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<GameList />} />
        <Route path="/game/:gameid" element={<GameDetails />} />

        {/* rutas privadas */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/event/:eventid" element={<EventDetails />} />

        {/* potenciales errores */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
