import { useEffect, useState } from "react";
import { getAnEventInfoService } from "../services/event.service";
import { useParams, useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/ClipLoader";
import CommentListEvent from "../components/CommentListEvent";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

//Muestra los detalles de un evento
function EventDetails() {
  const { eventid } = useParams();
  const navigate = useNavigate();
  const {  cambiarTema } = useContext(AuthContext);


  const [details, setDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
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
    <div>
      {errorMessage !== "" && <p>{errorMessage}</p>}
      <h3>Details of this event and game {details.location}</h3>
      <CommentListEvent elementId={details._id} players={details.players}/>
    </div>
  );
}

export default EventDetails;
