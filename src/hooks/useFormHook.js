import { useState } from "react";
import DotLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";


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
    const navigate = useNavigate();
    const showErrorMessage = () => errorMessage
    const changeErrorMessage = (error) => setErrorMessage(error)
    const navigateError = (error) => error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
    //fetching loader
    const fetchingLoader = () => {
        return (
          <div>
            <DotLoader
              color={"grey"}
              loading={true}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        );
      }
    

    return {
      handleChange,
      showData,
      editData,
      showErrorMessage,
      changeErrorMessage,
      navigateError,
      fetchingLoader
    }
  }

  

