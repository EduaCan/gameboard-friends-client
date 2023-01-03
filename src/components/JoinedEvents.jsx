import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { removePlayerFromEventService } from "../services/event.service";

//Muestra una lista de eventos en los que el user participa
function JoinedEvents({ eventList, eventGamesImg, getData }) {
  const [errorMessage, setErrorMessage] = useState("");
  const { cambiarTema, cambiarTemaButton } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRemovePlayer = async (eventid) => {
    try {
      await removePlayerFromEventService(eventid);
      getData();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error");
      }
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
      {errorMessage !== "" && <p>{errorMessage}</p>}
    </ul>
  );
}

export default JoinedEvents;
