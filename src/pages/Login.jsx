import { useState } from "react";
import { loginService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {formHook} from "../hooks/formHook.js"

//Muestra un formulario para que el user haga login
function Login() {
  const { authenticaUser, cambiarTemaButton } = useContext(AuthContext);

  const {handleChange} = formHook()

  // configuramos el uso de navigate
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  

  const handleLogin = async (event) => {
    event.preventDefault();

    // 1. recopilar las credenciales del usuario
    const userCredentials = {
      username: username,
      password: password,
    };

    try {
      // 2. contactar con el backend para validarlo
      const response = await loginService(userCredentials);

      localStorage.setItem("authToken", response.data.authToken);

      // en este punto nosotros tenemos que guardar informacion de que el usuario se ha logeado
      // esta info estará en un estado global (context)
      authenticaUser(); // invocar la funcion de context que valida el Token

      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error");
      }
    }
  };
  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">Nice to see you again!</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant={cambiarTemaButton()} type="submit">
          Submit
        </Button>
        {errorMessage !== "" && <p>{errorMessage}</p>}
      </Form>
    </div>
  );
}

export default Login;
