import { loginService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormHook } from "../hooks/useFormHook";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { DarkThemeContext } from "../context/darkTheme.context";
import SEO from "../components/SEO";

//form to login a pre-registered user
function Login() {
  //contexts
  const { authenticaUser } = useContext(AuthContext);
  const { changeThemeButton, blankInputError } = useContext(DarkThemeContext);
  //hook
  const { handleChange, showData, showErrorMessage, navigateError, placeholderWarningIfEmpty, inputWarningStyleIfEmpty } =
    useFormHook();
  //to navigate to profile after login
  const navigate = useNavigate();
  //send auth token
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService(showData());
      localStorage.setItem("authToken", response.data.authToken);
      authenticaUser();
      navigate("/profile");
    } catch (error) {
      navigateError(error);
    }
  };
  return (
    <div>
    <SEO
        title="Login"
        description="Login for registered users of Boardgame friends"
        name="Boardgame Friends"
        type="website"
      />
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder={placeholderWarningIfEmpty(showErrorMessage(), showData().username, "Username")}
            name="username"
            value={showData.username}
            onChange={handleChange}
            style={inputWarningStyleIfEmpty(showErrorMessage(), showData().username, blankInputError)}
          />
          <Form.Text className="text-muted">Nice to see you again!</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder={placeholderWarningIfEmpty(showErrorMessage(), showData().username, "Password")}
            name="password"
            value={showData.password}
            onChange={handleChange}
            style={inputWarningStyleIfEmpty(showErrorMessage(), showData().password, blankInputError)}

          />
        </Form.Group>
        <Button variant={changeThemeButton()} type="submit">
          Submit
        </Button>
        {showErrorMessage() && <p style={{color:"red"}}>{showErrorMessage()}</p>} 
      </Form>
    </div>
  );
}

export default Login;
