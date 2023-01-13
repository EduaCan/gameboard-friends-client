import { useNavigate } from "react-router-dom";
import { useFormHook } from "../hooks/useFormHook";
import { useContext } from "react";
import { DarkThemeContext } from "../context/darkTheme.context";
import { changePasswordService } from "../services/auth.service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SEO from "../components/SEO";

//page to let user change its password
function ChangePassword() {
  //context
  const { changeTheme, changeThemeButton } = useContext(DarkThemeContext);
  //hook
  const { handleChange, showData, showErrorMessage, navigateError } =
    useFormHook();
  //navigate, to profile after sucessfuly changet password
  const navigate = useNavigate();
  //form handle, updates user password in DB
  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      await changePasswordService(showData());
      navigate("/profile");
    } catch (error) {
      navigateError(error);
    }
  };

  return (
    <div style={changeTheme()}>
    <SEO
        title="Change your password"
        description="Form to change user's password"
        name="Boardgame Friends"
        type="website"
      />
      <Form onSubmit={handleChangePassword} style={changeTheme()}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            value={showData.oldPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            name="password"
            value={showData.password}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Min 8 characters long with 1 capital letter and 1 number and 1 special char
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Retype New Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Retype New Password"
            name="password2"
            value={showData.password2}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant={changeThemeButton()} type="submit">
        Change Password
        </Button>
        {showErrorMessage && <p>{showErrorMessage()}</p>}
      </Form>
    </div>
  );
}

export default ChangePassword;
