import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useFormHook } from "../hooks/useFormHook"
import { useContext } from "react";
import { removePlayerFromEventService } from "../services/event.service";
import { DarkThemeContext } from "../context/darkTheme.context";

//Muestra una lista de eventos en los que el user participa
function JoinedEvents({ eventList, eventGamesImg, getData }) {
  const { showErrorMessage, changeErrorMessage} = useFormHook()
  const { cambiarTema, cambiarTemaButton } = useContext(DarkThemeContext);
  const navigate = useNavigate();

  const handleRemovePlayer = async (eventid) => {
    try {
      await removePlayerFromEventService(eventid);
      getData();
    } catch (error) {
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
    }
  };

  return (
    <ul className="list-group list-group-light " style={cambiarTema()}>
      {eventList.map((eachEvent) => {
        return (
          <li
            key={eachEvent._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={cambiarTema()}
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
              variant={cambiarTemaButton()}
              className="btn btn-success btn-rounded btn-sm"
              onClick={() => handleRemovePlayer(eachEvent._id)}
            >
              Leave Group
            </Button>
          </li>
        );
      })}
      {showErrorMessage !== "" && <p>{showErrorMessage}</p>}
    </ul>
  );
}

export default JoinedEvents;
