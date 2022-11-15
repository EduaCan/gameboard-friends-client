import { useEffect, useState } from "react";
import { getAnEventInfoService } from "../services/event.service";
import { useParams, useNavigate } from "react-router-dom";
import AddComment from "../components/AddComment";
import CommentList from "../components/CommentList";

//Muestra los detalles de un evento
function EventDetails() {
  const { eventid } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
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
      navigate(error);
    }
  };

  if (isFetching === true) {
    return <h3>....buscando</h3>;
  }

  return (
    <div>
      <h3>{details.location}</h3>
      <h2>Aqui faltan unos pequeños detalles del game</h2>
      {details.players.map((eachPlayer) => {
        return <p key={eachPlayer._id}>Player: {eachPlayer.username}</p>;
      })}
      <CommentList elementId={details._id} />
      <AddComment elementId={eventid} />
    </div>
  );
}

export default EventDetails;
