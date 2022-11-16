import { useState } from "react";
import { addEventService } from "../services/event.service";

//Formulario para añadir evento
function AddEventForm({ gameid, getData }) {
  const [location, setLocation] = useState("");

  const handleLocationChange = (event) => setLocation(event.target.value);

  const handleComfirmEvent = async (event) => {
    event.preventDefault();

    const newEvent = {
      location: location,
    };

    try {
      await addEventService(gameid, newEvent);
    } catch (error) {
      console.log(error);
    }
    getData(gameid)
    setLocation("")
  };

  return (
    <div>
      <form onSubmit={handleComfirmEvent}>
        <label>Location: </label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleLocationChange}
        />

        <button typr="submit">Comfirm Event</button>
      </form>
    </div>
  );
}

export default AddEventForm;
