import { addEventService } from "../services/event.service";
import { useFormHook } from "../hooks/useFormHook";
import { useContext } from "react";
import { DarkThemeContext } from "../context/darkTheme.context";
import Button from "react-bootstrap/Button";

function AddEventForm({ gameid, getData, handleCloseEventForm }) {
  //contexts
  const { changeTheme, changeThemeButton } = useContext(DarkThemeContext)
  //hook
  const { showErrorMessage, navigateError, handleChange, showData } =
    useFormHook();
  //create a new event
  const handleComfirmEvent = async (event) => {
    event.preventDefault();
    try {
      await addEventService(gameid, showData());
      handleCloseEventForm();
    } catch (error) {
      navigateError(error);
    }
    getData(gameid);
  };

  return (
    <div style={changeTheme()}>
      <form onSubmit={handleComfirmEvent}>
        <label> Event Name/Location: </label>
        <input
          type="text"
          name="location"
          value={showData.location}
          onChange={handleChange}
        />

<Button variant={changeThemeButton()} type="submit">
              Create Event
            </Button>
      </form>
      {showErrorMessage && <p>{showErrorMessage()}</p>}
    </div>
  );
}

export default AddEventForm;
