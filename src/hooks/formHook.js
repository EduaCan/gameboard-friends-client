import { useState } from "react";

export const formHook = () => {
    
    const [data, setData] = useState(null)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
      };

    

      const [errorMessage, setErrorMessage] = useState("");
      const showErrorMesage = () => errorMessage;
      const handleSetErrorMessage = (error) => setErrorMessage(error);

    

      return {
        handleChange,
        showErrorMesage,
        handleSetErrorMessage
      };

}