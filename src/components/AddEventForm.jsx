import { addEventService } from "../services/event.service";
import { useFormHook } from "../hooks/useFormHook";

function AddEventForm({ gameid, getData, handleCloseEventForm }) {
  //hook
  const {showErrorMessage, navigateError, handleChange, showData} = useFormHook()
  //create a new event
  const handleComfirmEvent = async (event) => {
    event.preventDefault();
    try {
      await addEventService(gameid, showData());
      handleCloseEventForm();
    } catch (error) {
      navigateError(error)    }
      getData(gameid);
  };

  return (
    <div>
      <form onSubmit={handleComfirmEvent}>
        <label>Location: </label>
        <input
          type="text"
          name="location"
          value={showData.location}
          onChange={handleChange}
        />

        <button typr="submit">Comfirm Event</button>
      </form>
      {showErrorMessage && <p>{showErrorMessage()}</p>}
    </div>
  );
}

export default AddEventForm;
