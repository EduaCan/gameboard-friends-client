import { useState } from "react";
import DotLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
//custom hook for forms + loading spinner
export const useFormHook = () => {
  //change form
  const [data, setData] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  //data
  const showData = () => data;
  const editData = (data) => setData(data);
  //error
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const showErrorMessage = () => errorMessage;
  const changeErrorMessage = (error) => setErrorMessage(error);
  const navigateError = (error) =>
    error.response && error.response.status === 400
      ? changeErrorMessage(error.response.data.errorMessage)
      : navigate("/error");
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
  };
  //form input placeholder warning if empty
  const placeholderWarningIfEmpty = (errorMessage, inputValue, correctString) => {
    return (errorMessage === "You must fill all the fields" && !inputValue) ? errorMessage : correctString
  }
  //form input warning style if empty
  const inputWarningStyleIfEmpty = (errorMessage, inputValue, warningStyles) => {
    return (errorMessage === "You must fill all the fields" && !inputValue) ? warningStyles : {borderColor: "#ced4da"}
  }
  return {
    handleChange,
    showData,
    editData,
    showErrorMessage,
    changeErrorMessage,
    navigateError,
    fetchingLoader,
    placeholderWarningIfEmpty,
    inputWarningStyleIfEmpty
  };
};
