import { useState } from "react";
import { signupService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { useForm } from "./Login";

//Muestra un formulario para que el user se registre
function Signup() {

  const {handleChange, showData, editData, showErrorMessage, changeErrorMessage} = useForm()

  const { cambiarTemaButton } = useContext(AuthContext);

  // configuramos el uso de navigate
  const navigate = useNavigate();


  const handleSignup = async (event) => {
    event.preventDefault();
    // ... signup logic here

    // recopilar la informacion del usuario

    try {
      // contactar el backend para crear el usuario (servicio)
      await signupService(showData());

      // redirecciónar a login
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        changeErrorMessage(error.response.data.errorMessage);
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error");
      }
    }
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
            We encrypt passwords very very carefully, promise.
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
