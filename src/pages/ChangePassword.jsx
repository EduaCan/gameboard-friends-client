import { useNavigate } from "react-router-dom";
import { useFormHook } from "../hooks/useFormHook"
import Button from "react-bootstrap/Button";
import { useContext } from "react"
import { changePasswordService } from "../services/auth.service";
import { DarkThemeContext } from "../context/darkTheme.context";

function ChangePassword() {

  const { changeTheme, changeThemeButton } = useContext(DarkThemeContext)
  const {handleChange, showData, showErrorMessage, navigateError} = useFormHook()
  const navigate = useNavigate();

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      await changePasswordService(showData);
      navigate("/profile");
    } catch (error) {
        navigateError(error)    }
  };

  return (
    <div style={changeTheme()}>
      <form onSubmit={handleChangePassword} style={changeTheme()} >
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

        <Button type="submit" variant={changeThemeButton()}>Change Password</Button>

        {showErrorMessage && <p>{showErrorMessage()}</p>}
      </form>
    </div>
  );
}

export default ChangePassword;
