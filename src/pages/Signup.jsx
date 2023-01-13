import { signupService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { DarkThemeContext } from "../context/darkTheme.context";
import { useFormHook } from "../hooks/useFormHook";
import SEO from "../components/SEO";

//Muestra un formulario para que el user se registre
function Signup() {
  //hook
  const { handleChange, showData, showErrorMessage, navigateError } =
    useFormHook();
  //context
  const { changeThemeButton } = useContext(DarkThemeContext);
  //to navigate to login after signup
  const navigate = useNavigate();
  //save user signup credentials
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await signupService(showData());
      navigate("/login");
    } catch (error) {
      navigateError(error);
    }
  };

  return (
    <div>
      <SEO
        title="SignUp"
        description="Form to register a new user to Boardgames Friends DataBase"
        name="Boardgame Friends"
        type="website"
      />
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
          Min 8 characters long with 1 capital letter and 1 number and 1 special char
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
        <Button variant={changeThemeButton()} type="submit">
          Submit
        </Button>
        {showErrorMessage && <p style={{color:"red"}}>{showErrorMessage()}</p>}
      </Form>
    </div>
  );
}

export default Signup;
