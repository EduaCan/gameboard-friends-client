import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { DarkThemeContext } from "../context/darkTheme.context";

function Navibar({ toggleTheme }) {

  const [expanded, setExpanded] = useState(false)

  const { authenticaUser, isLoggedIn, user } =
    useContext(AuthContext);

    const {changeTheme, changeThemeButton} = useContext(DarkThemeContext)

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticaUser();
  };

  return (
    <Navbar
      key={false}
      expand={false}
      className="mb-3 NavBar"
      style={changeTheme()}
      expanded={expanded}
      
    >
      <Container fluid style={changeTheme()} onClick={() => setExpanded(expanded ? false : "expanded")}>
        <Navbar.Brand href="#" style={changeTheme()}>
          <NavLink to="/" >
            <img
              id="logo-navbar"
              src="https://w7.pngwing.com/pngs/647/116/png-transparent-yahtzee-starcraft-the-board-game-dixit-games-game-text-logo.png"
              alt="Logo"
              style={{ maxWidth: "10vw", height: "auto" }}
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${false}`}
          style={{ backgroundColor: "grey" }}
          
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="end"
        >
          <Offcanvas.Header  style={changeTheme()}>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${false}`}
              style={changeTheme()}
            >
              {user ? (
                <NavLink to="/profile" onClick={() => setExpanded(false)}>
                  <div id="avatar-name-navbar">
                  <img
                    src={`https://i.pravatar.cc/150?u=${user.user._id}`}
                    alt="avatar"
                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                    width="60"
                  />
                  <p>{user.user.username}</p>
                  </div>
                </NavLink>
              ) : (
                "Menu"
              )}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={changeTheme()}>
            <Nav className="d-grid gap-2 pe-3" style={changeTheme()}>
              <NavLink to="/game" onClick={() => setExpanded(false)}>
                <Button
                  variant={changeThemeButton()}
                  style={{ minWidth: "100%" }}
                >
                  Game List
                </Button>
              </NavLink >
              <Button
                variant={changeThemeButton()}
                style={{ minWidth: "100%" }}
                onClick={()=> {toggleTheme() ; setExpanded(false)}}
              >
                Switch Night Mode
              </Button>

              {isLoggedIn === true ? (
                <div className="d-grid gap-2 pe-3 padding0" style={{ minWidth: "100%", padding: "0px" }}>
                  <NavLink to="/changepassword" onClick={() => setExpanded(false)}>
                    <Button
                      variant={changeThemeButton()}
                      style={{ minWidth: "100%" }}
                    >
                      Cambiar password
                    </Button>
                  </NavLink>
                  <NavLink to="/">
                    <Button
                      variant={changeThemeButton()}
                      style={{ minWidth: "100%" }}
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </Button>
                  </NavLink>
                </div>
              ) : (
                <div
                  className="d-grid gap-2 pe-3 padding0"
                  style={{ minWidth: "100%", padding: "0px" }}
                >
                  <NavLink to="/signup" onClick={() => setExpanded(false)}>
                    <Button
                      variant={changeThemeButton()}
                      style={{ minWidth: "100%" }}
                    >
                      Signup
                    </Button>
                  </NavLink>
                  <NavLink to="/login" onClick={() => setExpanded(false)}>
                    <Button
                      variant={changeThemeButton()}
                      style={{ minWidth: "100%" }}
                    >
                      Login
                    </Button>
                  </NavLink>
                </div>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Navibar;
