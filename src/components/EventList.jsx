import { useState, useEffect } from "react";
import {
  eventListService,
  addPlayerToEventService,
  removePlayerFromEventService,
  eventDeleteService,
} from "../services/event.service";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import AddEventForm from "./AddEventForm";
import DotLoader from "react-spinners/ClipLoader";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//Muestra la lista de eventos de un juego
function EventList({ gameid }) {
  const {  user, createdEdited, cambiarTema, cambiarTemaButton } = useContext(AuthContext);
  const [eventList, setEventList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [showEventForm, setShowEventForm] = useState(false);

  const handleCloseEventForm = () => setShowEventForm(false);
  const handleShowEventForm = () => setShowEventForm(true);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  //para añadir el user al evento mediante boton
  const handleAddPlayer = async (eventid) => {
    try {
      await addPlayerToEventService(eventid);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  //para quitar al user del evento
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

  //para que el admin borre el evento
  const handleDeleteEvent = async (eventid) => {
    await eventDeleteService(eventid);
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
    return (
      <div style={cambiarTema()}>
      <DotLoader
        color={"red"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    );
  }

  return (
    <div style={cambiarTema()}>{eventList.length === 0 ?
      (<h3>No events</h3>):
      (<div >
        {eventList.map((eachEvent) => {
          return (


            <div key={eachEvent._id} class="card text-center" style={cambiarTema()}>
            <div class="card-body">
              <Link to={`/event/${eachEvent._id}`}>
                <h5 class="card-title">{eachEvent.location}</h5>
              </Link>



             
                  <p class="card-text">Number of Players Joined: {eachEvent.players.length}</p>




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
                <div class="card-footer text-muted">{createdEdited(eachEvent)}</div>
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
      {errorMessage !== "" && <p>{errorMessage}</p>}
    </div>
  );
}

export default EventList;
