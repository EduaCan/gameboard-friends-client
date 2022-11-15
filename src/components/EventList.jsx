import { useState, useEffect } from "react";
import {
  eventListService,
  addPlayerToEventService,
} from "../services/event.service";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

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
                <p>You're already in this group</p>
              ) : (
                <button onClick={() => handleAddPlayer(eachEvent._id)}>
                  Join to Event
                </button>
              )}
            </div>
          );
        })}
        <button onClick={handleAddEvent}>Add Event</button>
        {/* {showEventForm=== true && <} */}
      </div>
    </div>
  );
}

export default EventList;
