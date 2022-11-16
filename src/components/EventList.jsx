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

//Muestra la lista de eventos de un juego
function EventList({ gameid }) {
  //estados para futuros pop-ups o modals
  const [showList, setShowList] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const [eventList, setEventList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  //para pop-up, que aparezca la lista de eventos
  const handleEventList = () => {
    setShowList(true);
  };

  //para pop-up, que aparezca el formulario de crear eventos
  const handleAddEvent = () => {
    setShowEventForm(true);
  };

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
      console.log(error);
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
    return <h3>....buscando event list</h3>;
  }

  return (
    <div>
      <button onClick={handleEventList}>View Events</button>
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
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <AddEventForm gameid={gameid} getData={getData}/>
    </div>
  );
}

export default EventList;
