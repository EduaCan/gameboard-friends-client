import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useContext } from "react"
// import { AuthContext } from "../context/auth.context";
import { changePasswordService } from "../services/auth.service";

//Muestra formulario para que el user cambie su contraseña
function ChangePassword() {
  // const { authenticaUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOldPasswordChange = (event) => setOldPassword(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePassword2Change = (event) => setPassword2(event.target.value);

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const newPassword = {
      oldPassword: oldPassword,
      password: password,
      password2: password2,
    };
    try {
      await changePasswordService(newPassword);
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
      <form onSubmit={handleChangePassword}>
        <label>Old Password:</label>
        <input
          type="password"
          name="oldpassword"
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />

        <label>New Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label>Retype New Password:</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={handlePassword2Change}
        />

        <button type="submit">Change Password</button>

        {errorMessage !== "" && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default ChangePassword;
