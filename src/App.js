import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import GameList from "./pages/GameList";
import GameDetails from "./pages/GameDetails";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<GameList />} />
        <Route path="/game/:gameid" element={<GameDetails />} />
        "/changepassword"

        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        {/* potenciales errores */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
