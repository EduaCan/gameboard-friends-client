import { useNavigate } from "react-router-dom";
import { useFormHook } from "../hooks/useFormHook";
import { useContext } from "react";
import { DarkThemeContext } from "../context/darkTheme.context";
import { changePasswordService } from "../services/auth.service";
import Button from "react-bootstrap/Button";

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
      await changePasswordService(showData);
      navigate("/profile");
    } catch (error) {
      navigateError(error);
    }
  };

  return (
    <div style={changeTheme()}>
      <form onSubmit={handleChangePassword} style={changeTheme()}>
        <label>Old Password:</label>
        <input
          type="password"
          name="oldPassword"
          value={showData.oldPassword}
          onChange={handleChange}
        />

        <label>New Password:</label>
        <input
          type="password"
          name="password"
          value={showData.password}
          onChange={handleChange}
        />

        <label>Retype New Password:</label>
        <input
          type="password"
          name="password2"
          value={showData.password2}
          onChange={handleChange}
        />

        <Button type="submit" variant={changeThemeButton()}>
          Change Password
        </Button>

        {showErrorMessage && <p>{showErrorMessage()}</p>}
      </form>
    </div>
  );
}

export default ChangePassword;
