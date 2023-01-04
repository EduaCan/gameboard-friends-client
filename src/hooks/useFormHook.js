import { useState } from "react";


  export const useFormHook = () => {

    const [data, setData] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
  
    //change form
    const handleChange = (event) => {
      const  {name, value} = event.target
      setData({...data, [name]: value})
    };
    //data
    const showData = () => data
    const editData = (data) => setData(data)
    //error
    const showErrorMessage = () => errorMessage
    const changeErrorMessage = (err) => setErrorMessage(err)
    
    return {
      handleChange,
      showData,
      editData,
      showErrorMessage,
      changeErrorMessage
    }
  }

  

