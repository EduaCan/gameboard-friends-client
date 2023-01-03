import { useState, useEffect } from "react";
import { eventListJoinedService } from "../services/event.service";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";


//Muestra una lista de eventos en los que el user participa
function JoinedEvents({eventList, eventGamesImg}) {
  // const [eventList, setEventList] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [isFetching, setIsFetching] = useState(true);
  const { cambiarTema, cambiarTemaButton } = useContext(AuthContext);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const response = await eventListJoinedService();
  //     setEventList(response.data);
  //     setIsFetching(false);
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
  //       setErrorMessage(error.response.data.errorMessage);
  //     } else {
  //       // si el error es otro (500) entonces si redirecciono a /error
  //       navigate("/error");
  //     }
  //   }
  // };

  // if (isFetching === true) {
  //   return (
  //     <div>
  //       <ClipLoader
  //         color={"grey"}
  //         loading={true}
  //         size={150}
  //         aria-label="Loading Spinner"
  //         data-testid="loader"
  //       />
  //     </div>
  //   );
  // }

  return (
   

  <ul className="list-group list-group-light" style={cambiarTema()}>
  







      {eventList.map((eachEvent) => {
        return (

          <li key={eachEvent._id} className="list-group-item d-flex justify-content-between align-items-center" style={cambiarTema()}>
    <div className="d-flex align-items-center">
        
      <img src={eventGamesImg.find((gameEvent) => {
          return gameEvent.id === eachEvent.game
        }).image_url} alt="" style={{width: "45px", height: "45px"}}
        className="rounded-circle" />
      <div className="ms-3">
        <p className="fw-bold mb-1"> {eachEvent.location}</p>
        <p className="text-muted mb-0">Players: {eachEvent.players.length}</p>
      </div>
    </div>
    <Link to={`/event/${eachEvent._id}`}>

    <Button variant={cambiarTemaButton()} className="btn btn-success btn-rounded btn-sm">View</Button>
            </Link>
  </li>


      )})}
          
        
      {/* {errorMessage !== "" && <p>{errorMessage}</p>} */}
      </ul>
  );
}

export default JoinedEvents;
