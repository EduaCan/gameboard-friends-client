
import { signupService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { useFormHook } from "../hooks/useFormHook"
import { DarkThemeContext } from "../context/darkTheme.context";

//Muestra un formulario para que el user se registre
function Signup() {

  const {handleChange, showData, showErrorMessage, navigateError} = useFormHook()

  const { cambiarTemaButton } = useContext(DarkThemeContext);
  const navigate = useNavigate();


  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await signupService(showData());
      navigate("/login");
    } catch (error) {
      navigateError(error)    }
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
            value={showData.username}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">Nice to meet you!</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={showData.email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We don't send you any spam!
          </Form.Text>
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
          <Form.Text className="text-muted">
            Min 8 chars long, 1 capital letter, 1 number, 1 special char
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-type Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password2"
            value={showData.password2}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Please re-type for security reasons.
          </Form.Text>
        </Form.Group>
        <Button variant={cambiarTemaButton()} type="submit">
          Submit
        </Button>
        {showErrorMessage && <p>{showErrorMessage()}</p>}
      </Form>
    </div>
  );
}

export default Signup;
