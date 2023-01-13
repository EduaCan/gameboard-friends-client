import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Form from "react-bootstrap/Form";
import { useFormHook } from "../hooks/useFormHook";
import { useNavigate } from "react-router-dom";
import SEO from '../components/SEO';


function EmailContactForm () {
  const form = useRef();
  const {  showErrorMessage } = useFormHook();
  const navigate = useNavigate();


  const sendEmail = (e) => {
    e.preventDefault();

     emailjs.sendForm('service_xot1htt', 'template_eaiks3b', form.current, 'VLO1qZ8OFc_natPSV')
      .then(() => {
        alert("Thank you for your feedback!! You will be redirected to Home.");
        navigate("/")
      }, (error) => {
        alert(`ups... It cannot be sent right now. ${error.text}`);
      });
  };

  return (
      <div>
      <SEO
        title="Contact us"
        description="Send an email to the developers"
        name="Boardgame Friends"
        type="website"
      />
      <h1>Contact Me</h1>
      <Form onSubmit={sendEmail} ref={form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <input
            type="text"
            placeholder="Name"
            name="user_name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <input
            type="email"
            placeholder="Email"
            name="user_email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <textarea
            type="text"
            placeholder="Message"
            name="message"
            cols="25"
            rows="10"
          />
        </Form.Group>

        <input type="submit" value="Send" />
        {showErrorMessage() && <p style={{color:"red"}}>{showErrorMessage()}</p>}
      </Form>
    </div>
  );
};

export default EmailContactForm;
     