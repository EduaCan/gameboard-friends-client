
import { loginService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useFormHook } from "../hooks/useFormHook"
import { DarkThemeContext } from "../context/darkTheme.context";



//Muestra un formulario para que el user haga login
function Login() {
  const { authenticaUser } = useContext(AuthContext);
  const {cambiarTemaButton} = useContext(DarkThemeContext)
  const {handleChange, showData, showErrorMessage, changeErrorMessage} = useFormHook()
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService(showData());
      localStorage.setItem("authToken", response.data.authToken);
      authenticaUser(); 
      navigate("/profile");
    } catch (error) {
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
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
            value={showData.username}
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
            value={showData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant={cambiarTemaButton()} type="submit">
          Submit
        </Button>
        {showErrorMessage && <p>{showErrorMessage()}</p>}
      </Form>
    </div>
  );
}

export default Login;
