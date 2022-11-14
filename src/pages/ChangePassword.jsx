import { useState } from "react";


function ChangePassword() {

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlePassword2Change = (event) => setPassword2(event.target.value);


    const handleChangePassword = async (event) => {
        event.preventDefault();
    }
    
  return (
    <div>
        <form onSubmit={handleChangePassword}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label>Retype Password:</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={handlePassword2Change}
        />

        <button type="submit">Change Password</button>

        {/* {errorMessage !== "" && <p>{errorMessage}</p>} */}
      </form>
    </div>
  )
}

export default ChangePassword