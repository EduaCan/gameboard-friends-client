import { useState } from "react";
import { signupService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

//Muestra un formulario para que el user se registre
function Signup() {
  const { cambiarTemaButton } = useContext(AuthContext);

  // configuramos el uso de navigate
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePassword2Change = (event) => setPassword2(event.target.value);

  const handleSignup = async (event) => {
    event.preventDefault();
    // ... signup logic here

    // recopilar la informacion del usuario
    const newUser = {
      email: email,
      username: username,
      password: password,
      password2: password2,
    };

    try {
      // contactar el backend para crear el usuario (servicio)
      await signupService(newUser);

      // redirecciónar a login
      navigate("/login");
    } catch (error) {
      // console.log(error.response.status)
      // console.log(error.response.data.errorMessage)
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
      <h1>Sign Up</h1>

      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Form.Text className="text-muted">Nice to meet you!</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <Form.Text className="text-muted">
            We don't send you any spam!
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Form.Text className="text-muted">
            We encrypt passwords very very carefully, promise.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password2"
            value={password2}
            onChange={handlePassword2Change}
          />
          <Form.Text className="text-muted">
            Please re-type for security reasons.
          </Form.Text>
        </Form.Group>
        <Button variant={cambiarTemaButton()} type="submit">
          Submit
        </Button>
        {errorMessage !== "" && <p>{errorMessage}</p>}
      </Form>
    </div>
  );
}

export default Signup;
