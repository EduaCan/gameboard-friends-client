import { gameDetailsService } from "../services/game.service";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import GameDetailsPrivate from "../components/GameDetailsPrivate";

//Muestra detalles de un juego
function GameDetails() {
  const { gameid } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await gameDetailsService(gameid);
      console.log("RESPONSE GAMEDDETAILS", response);
      setDetails(response.data[0]);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>...buscando</h3>;
  }

  return (
    <div>
      <img src={details.image_url} alt={details.name} width={100} />
      <h5>{details.name}</h5>
      <p>Price: {details.price}</p>
      <p>Min Players: {details.min_players}</p>
      <p>Max Players: {details.max_players}</p>
      <p>{details.description}</p>
      <GameDetailsPrivate gameid={gameid} />
    </div>
  );
}

export default GameDetails;
