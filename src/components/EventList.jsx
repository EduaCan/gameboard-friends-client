import { useState, useEffect, useContext } from "react";
import {
  eventListService,
  addPlayerToEventService,
  removePlayerFromEventService,
  eventDeleteService,
} from "../services/event.service";
import { Link } from "react-router-dom";
import AddEventForm from "./AddEventForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../context/auth.context";
import { DarkThemeContext } from "../context/darkTheme.context";
import { useFormHook } from "../hooks/useFormHook";
import { useUtilsHook } from "../hooks/useUtilsHook";

//list of events for this game
function EventList({ gameid }) {
  //contexts
  const { user } = useContext(AuthContext);
  const { changeTheme, changeThemeButton } = useContext(DarkThemeContext);
  //hooks
  const { createdEdited } = useUtilsHook();
  const { showErrorMessage, navigateError, fetchingLoader } = useFormHook();
  //states
  const [eventList, setEventList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  //event modal handlers
  const handleCloseEventForm = () => setShowEventForm(false);
  const handleShowEventForm = () => setShowEventForm(true);

  useEffect(() => {
    getData();
  }, []);

  //user joins event
  const handleAddPlayer = async (eventid) => {
    try {
      await addPlayerToEventService(eventid);
      getData();
    } catch (error) {
      navigateError(error);
    }
  };

  //user quits event
  const handleRemovePlayer = async (eventid) => {
    try {
      await removePlayerFromEventService(eventid);
      getData();
    } catch (error) {
      navigateError(error);
    }
  };

  //event without players, last player quits event
  const handleDeleteEvent = async (eventid) => {
    await eventDeleteService(eventid);
  };

  //get list of events by gameId
  const getData = async () => {
    try {
      const response = await eventListService(gameid);
      setEventList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigateError(error);
    }
  };

  if (isFetching) {
    return fetchingLoader();
  }

  return (
    <div style={changeTheme()}>
      {eventList.length === 0 ? (
        <h3>No events</h3>
      ) : (
        <div>
          {eventList.map((eachEvent) => {
            return (
              <div
                key={eachEvent._id}
                className="card text-center"
                style={changeTheme()}
              >
                <div className="card-body">
                  <Link to={`/event/${eachEvent._id}`}>
                    <h5 className="card-title">{eachEvent.location}</h5>
                  </Link>
                  <p className="card-text">
                    Number of Players Joined: {eachEvent.players.length}
                  </p>
                  {eachEvent.players.some(
                    (eachPlayer) => eachPlayer.username === user.user.username
                  ) ? (
                    <Button
                      variant={changeThemeButton()}
                      onClick={() => handleRemovePlayer(eachEvent._id)}
                    >
                      Quit Event
                    </Button>
                  ) : (
                    <Button
                      variant={changeThemeButton()}
                      onClick={() => handleAddPlayer(eachEvent._id)}
                    >
                      Join to Event
                    </Button>
                  )}
                  {user.user.role === "admin" && (
                    <Button
                      variant={changeThemeButton()}
                      onClick={() => handleDeleteEvent(eachEvent._id)}
                    >
                      Delete Event
                    </Button>
                  )}
                </div>
                <div className="card-footer text-muted">
                  {createdEdited(eachEvent)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Button variant={changeThemeButton()} onClick={handleShowEventForm}>
        Create an Event
      </Button>
      <Modal show={showEventForm} onHide={handleCloseEventForm}>
        <Modal.Header closeButton style={changeTheme()}>
          <Modal.Title>New event</Modal.Title>
        </Modal.Header>
        <AddEventForm
          gameid={gameid}
          getData={getData}
          handleCloseEventForm={handleCloseEventForm}
        />
      </Modal>
      {showErrorMessage && <p style={{color:"red"}}>{showErrorMessage()}</p>}
    </div>
  );
}

export default EventList;
