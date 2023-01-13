import { Link } from "react-router-dom";
import { removePlayerFromEventService } from "../services/event.service";
import { useFormHook } from "../hooks/useFormHook";
import { useContext } from "react";
import { DarkThemeContext } from "../context/darkTheme.context";
import Button from "react-bootstrap/Button";

//user joined events list
function JoinedEvents({ eventList, eventGamesImg, getData }) {
  //hook
  const { showErrorMessage, navigateError } = useFormHook();
  //context
  const { changeTheme, changeThemeButton } = useContext(DarkThemeContext);
  //remove player from an event
  const handleRemovePlayer = async (eventid) => {
    try {
      await removePlayerFromEventService(eventid);
      getData();
    } catch (error) {
      navigateError(error);
    }
  };

  return (
    <ul className="list-group list-group-light " style={changeTheme()}>
      {eventList.map((eachEvent) => {
        return (
          <li
            key={eachEvent._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={changeTheme()}
          >
            <div className="d-flex align-items-center">
              <img
                src={
                  eventGamesImg.find((gameEvent) => {
                    return gameEvent.id === eachEvent.game;
                  }).image_url
                }
                alt=""
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle"
              />
              <div className="ms-3">
                <Link to={`/event/${eachEvent._id}`}>
                  <p className="fw-bold mb-1"> {eachEvent.location}</p>
                </Link>
                <p className="text-muted mb-0 mb-0-left">
                  Players: {eachEvent.players.length}
                </p>
              </div>
            </div>
            <Button
              variant={changeThemeButton()}
              className="btn btn-success btn-rounded btn-sm"
              onClick={() => handleRemovePlayer(eachEvent._id)}
            >
              Leave Group
            </Button>
          </li>
        );
      })}
      {showErrorMessage && <p style={{color:"red"}}>{showErrorMessage()}</p>}
    </ul>
  );
}

export default JoinedEvents;
