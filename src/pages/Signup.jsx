import { useState } from "react";
import { signupService } from "../services/auth.service";
import { useNavigate } from "react-router-dom"

function Signup() {

  // configuramos el uso de navigate
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

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
      password2: password2

    }

    try {
      
      // contactar el backend para crear el usuario (servicio)
      await signupService(newUser)

      // redirecciónar a login
      navigate("/login")

    } catch (error) {
      // console.log(error.response.status)
      // console.log(error.response.data.errorMessage)
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error")
      }
    }


  };

  return (
    <div>

      <h1>Sign Up</h1>
    
      <form onSubmit={handleSignup}>

        <label>Username:</label>
        <input
          type="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

<label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

<label>Retype password:</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={handlePassword2Change}
        />

        <button type="submit">Signup</button>

        {errorMessage !== "" && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default Signup;