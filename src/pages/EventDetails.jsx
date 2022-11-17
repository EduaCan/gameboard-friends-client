import { useEffect, useState } from "react";
import { getAnEventInfoService } from "../services/event.service";
import { useParams, useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/ClipLoader";
import CommentList from "../components/CommentList";

//Muestra los detalles de un evento
function EventDetails() {
  const { eventid } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAnEventInfoService(eventid);
      setDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error")
      }
    }
  };

  if (isFetching === true) {
    return <DotLoader
    color={"grey"}
    loading={true}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />;
  }

  return (
    <div>
      <h3>Players group in {details.location}</h3>
      {details.players.map((eachPlayer) => {
        return <p key={eachPlayer._id}>Player: {eachPlayer.username}</p>;
      })}
      <CommentList elementId={details._id} />
      {errorMessage !== "" && <p>{errorMessage}</p>}

    </div>
  );
}

export default EventDetails;
