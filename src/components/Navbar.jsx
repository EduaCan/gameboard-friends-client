import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

//Barra de navegacion con info privada, que muestra si estas logged
function Navibar({ toggleTheme }) {
  const { authenticaUser, isLoggedIn, user, cambiarTema, cambiarTemaButton } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // despues de borrar el token, volvemos a invocar la funcion de validarlo
    authenticaUser();
  };

  return (
    <Navbar key={false}  expand={false} className="mb-3" style={ cambiarTema() }>
      <Container fluid style={ cambiarTema() }>
        <Navbar.Brand href="#" style={ cambiarTema() }>
          <NavLink to="/">Boardgame Friends</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} style={ {backgroundColor: "grey" }}/>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="end"
        >
          <Offcanvas.Header closeButton style={ cambiarTema() }>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`} style={ cambiarTema() }>
              {user ?  (<NavLink to="/profile">{user.user.username}</NavLink>) : "Menu"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={ cambiarTema() }>
            <Nav className="d-grid gap-2 pe-3" style={ cambiarTema() }>
              {/* <div id="navbar align-self-end "> */}
                <NavLink to="/game">
                  <Button variant={cambiarTemaButton()} style={{minWidth: "100%"}}>Game List</Button>
                </NavLink>
                <Button variant={cambiarTemaButton()} style={{minWidth: "100%"}}  onClick={toggleTheme}>
                  Switch Night Mode
                </Button>

                {isLoggedIn === true ? (
                  <div className="d-grid gap-2 pe-3">
                    <NavLink to="/changepassword">
                      <Button variant={cambiarTemaButton()} style={{minWidth: "100%"}}>Cambiar password</Button>
                    </NavLink>
                    <NavLink to="/">
                      <Button variant={cambiarTemaButton()} style={{minWidth: "100%"}} onClick={handleLogout}>
                        Cerrar Sesión
                      </Button>
                    </NavLink>
                  </div>
                ) : (
                  <div className="d-grid gap-2 pe-3 padding0" style={{minWidth: "100%", padding: "0px"}}>
                    <NavLink to="/signup">
                      <Button variant={cambiarTemaButton()} style={{minWidth: "100%"}}>Signup</Button>
                    </NavLink>
                    <NavLink to="/login">
                      <Button variant={cambiarTemaButton()} style={{minWidth: "100%"}}>Login</Button>
                    </NavLink>
                  </div>
                )}
              {/* </div> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

    //     <div id="navbar">
    //     <NavLink to="/game" >
    //           <Button variant="primary">Game List</Button>
    //         </NavLink>
    //         <Button variant="primary" style={cambiarTemaBtn()} onClick={toggleTheme}>Switch Night Mode</Button>

    //     {isLoggedIn === true ? (
    //       <div>
    //         <NavLink to="/">
    //           <Button variant="primary" >Home</Button>
    //         </NavLink>
    //         <NavLink to="/profile" >
    //           <Button variant="primary">Perfíl</Button>
    //         </NavLink>
    //         <NavLink to="/changepassword" >
    //           <Button variant="primary">Cambiar password</Button>
    //         </NavLink>
    //         <NavLink to="/" >

    //           <Button variant="primary" onClick={handleLogout}>Cerrar Sesión</Button>
    //           </NavLink>

    //       </div>
    //     ) : (
    //       <div>
    //         <NavLink to="/" >
    //           <Button variant="primary">Home</Button>
    //         </NavLink>
    //         <NavLink to="/signup" >
    //           <Button variant="primary">Signup</Button>
    //         </NavLink>
    //         <NavLink to="/login" >
    //           <Button variant="primary">Login</Button>
    //         </NavLink>
    //       </div>
    //     )
    //   }

    // </div>
  );
}

export default Navibar;
