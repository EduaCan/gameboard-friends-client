import { useState, useEffect } from "react";
import { eventListJoinedService } from "../services/event.service";
import { Link, useNavigate } from "react-router-dom";

//Muestra una lista de eventos en los que el user participa
function JoinedEvents() {

  const [eventList, setEventList] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await eventListJoinedService();
      setEventList(response.data);
      setIsFetching(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error")
      }
    }
  };

  if (isFetching === true) {
    return <h3>....buscando event list</h3>;
  }

  return (
    <div>
      {eventList.map((eachEvent) => {
        return (
          <div key={eachEvent._id}>
            <Link to={`/event/${eachEvent._id}`}>
              <h5>Location: {eachEvent.location}</h5>
            </Link>
            {eachEvent.players.map((eachPlayer) => {
              return <p key={eachPlayer._id}>Player: {eachPlayer.username}</p>;
            })}
          </div>
        );
      })}
      {errorMessage !== "" && <p>{errorMessage}</p>}

    </div>
  );
}

export default JoinedEvents;
