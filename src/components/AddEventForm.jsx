import { useState } from "react";
import { addEventService } from "../services/event.service";
import { useNavigate } from "react-router-dom";


//Formulario para añadir evento
function AddEventForm({ gameid, getData }) {
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate();



  const handleLocationChange = (event) => setLocation(event.target.value);

  const handleComfirmEvent = async (event) => {
    event.preventDefault();

    const newEvent = {
      location: location,
    };

    try {
      await addEventService(gameid, newEvent);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error")
      }
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
