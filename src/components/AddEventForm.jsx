import { addEventService } from "../services/event.service";
import { useNavigate } from "react-router-dom";
import { useFormHook } from "../hooks/useFormHook";

function AddEventForm({ gameid, getData, handleCloseEventForm }) {
  const {showErrorMessage, changeErrorMessage, handleChange, showData} = useFormHook()

  const navigate = useNavigate();

  const handleComfirmEvent = async (event) => {
    event.preventDefault();
    try {
      await addEventService(gameid, showData());
      handleCloseEventForm();
    } catch (error) {
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
    }
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
      {showErrorMessage && <p>{showErrorMessage}</p>}
    </div>
  );
}

export default AddEventForm;
