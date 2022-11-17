import { useState, useEffect } from "react";
import {
  eventListService,
  addPlayerToEventService,
  removePlayerFromEventService,
  eventDeleteService
} from "../services/event.service";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import AddEventForm from "./AddEventForm";
import DotLoader from "react-spinners/ClipLoader";


//Muestra la lista de eventos de un juego
function EventList({ gameid }) {

  const [eventList, setEventList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")


  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  
  //para añadir el user al evento mediante boton
  const handleAddPlayer = async (eventid) => {
    try {
      await addPlayerToEventService(eventid);
    } catch (error) {
      console.log(error);
    }
  };

  //para quitar al user del evento
  const handleRemovePlayer = async (eventid) => {
    try {
      await removePlayerFromEventService(eventid);
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

  //para que el admin borre el evento
  const handleDeleteEvent = async (eventid) =>{
    await eventDeleteService(eventid)
  }


  const getData = async () => {
    try {
      const response = await eventListService(gameid);
      setEventList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <DotLoader
    color={"grey"}
    loading={true}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />;
  }

  return (
    <div>
      
      <div>
        {eventList.map((eachEvent) => {
          return (
            <div key={eachEvent._id}>
              <Link to={`/event/${eachEvent._id}`}>
                <h5>Location: {eachEvent.location}</h5>
              </Link>
              {eachEvent.players.map((eachPlayer) => {
                return (
                  <p key={eachPlayer._id}>Player: {eachPlayer.username}</p>
                );
              })}
              {eachEvent.players.some(
                (eachPlayer) => eachPlayer.username === user.user.username
              ) ? (
                <button onClick={() => handleRemovePlayer(eachEvent._id)}>
                  Quit Event
                </button>
              ) : (
                <button onClick={() => handleAddPlayer(eachEvent._id)}>
                  Join to Event
                </button>
              )}
              {user.user.role === "admin" &&
              <button onClick={() => handleDeleteEvent(eachEvent._id)}>
                  Delete Event
                </button>
              }
            </div>
          );
        })}
        
      </div>
      <AddEventForm gameid={gameid} getData={getData}/>
      {errorMessage !== "" && <p>{errorMessage}</p>}

    </div>
  );
}

export default EventList;
