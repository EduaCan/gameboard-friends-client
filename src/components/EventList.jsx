import { useState, useEffect } from "react";
import {
  eventListService,
  addPlayerToEventService,
} from "../services/event.service";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function EventList({ gameid }) {
  const [showList, setShowList] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  const [eventList, setEventList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const handleEventList = () => {
    setShowList(true);
  };

  const handleAddEvent = () => {
    setShowEventForm(true);
  };

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
      console.log("EVENTS", response.data);
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
