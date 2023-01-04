import { useState, useEffect } from "react";
import {
  eventListService,
  addPlayerToEventService,
  removePlayerFromEventService,
  eventDeleteService,
} from "../services/event.service";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import AddEventForm from "./AddEventForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DarkThemeContext } from "../context/darkTheme.context";
import { useFormHook } from "../hooks/useFormHook"
import { useUtilsHook } from "../hooks/useUtilsHook";

function EventList({ gameid }) {
  const {  user } = useContext(AuthContext);
  const { cambiarTema, cambiarTemaButton } = useContext(DarkThemeContext)
  const { createdEdited } = useUtilsHook()

  const [eventList, setEventList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const { showErrorMessage, navigateError, fetchingLoader } = useFormHook()
  

  const [showEventForm, setShowEventForm] = useState(false);

  const handleCloseEventForm = () => setShowEventForm(false);
  const handleShowEventForm = () => setShowEventForm(true);

  useEffect(() => {
    getData();
  }, []);

  const handleAddPlayer = async (eventid) => {
    try {
      await addPlayerToEventService(eventid);
      getData();
    } catch (error) {
      navigateError(error)    }
  };

  const handleRemovePlayer = async (eventid) => {
    try {
      await removePlayerFromEventService(eventid);
      getData();
    } catch (error) {
      navigateError(error)    }
  };

  const handleDeleteEvent = async (eventid) => {
    await eventDeleteService(eventid);
  };

  const getData = async () => {
    try {
      const response = await eventListService(gameid);
      setEventList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigateError(error)    }
  };

  if (isFetching) {
    return (
      fetchingLoader()
    );
  }

  return (
    <div style={cambiarTema()}>{eventList.length === 0 ?
      (<h3>No events</h3>):
      (<div >
        {eventList.map((eachEvent) => {
          return (
            <div key={eachEvent._id} className="card text-center" style={cambiarTema()}>
            <div className="card-body">
              <Link to={`/event/${eachEvent._id}`}>
                <h5 className="card-title">{eachEvent.location}</h5>
              </Link>
                  <p className="card-text">Number of Players Joined: {eachEvent.players.length}</p>
              {eachEvent.players.some(
                (eachPlayer) => eachPlayer.username === user.user.username
              ) ? (
                <Button variant={cambiarTemaButton()} onClick={() => handleRemovePlayer(eachEvent._id)}>
                  Quit Event
                </Button>
              ) : (
                <Button variant={cambiarTemaButton()} onClick={() => handleAddPlayer(eachEvent._id)}>
                  Join to Event
                </Button>
              )}
              {user.user.role === "admin" && (
                <Button variant={cambiarTemaButton()} onClick={() => handleDeleteEvent(eachEvent._id)}>
                  Delete Event
                </Button>
              )}
                </div>
                <div className="card-footer text-muted">{createdEdited(eachEvent)}</div>
            </div>
          );
        })}
      </div>)}

      <Button variant={cambiarTemaButton()} onClick={handleShowEventForm}>
        Create an Event
      </Button>
      <Modal show={showEventForm} onHide={handleCloseEventForm}>
        <Modal.Header closeButton><Modal.Title>Start event</Modal.Title></Modal.Header>
        <AddEventForm
          gameid={gameid}
          getData={getData}
          handleCloseEventForm={handleCloseEventForm}
        />
      </Modal>
      {showErrorMessage && <p>{showErrorMessage()}</p>}
    </div>
  );
}

export default EventList;
