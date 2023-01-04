import { gameDetailsService } from "../services/game.service";
import DotLoader from "react-spinners/ClipLoader";
import { useFormHook } from "../hooks/useFormHook"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import GameDetailsPrivate from "../components/GameDetailsPrivate";

//Muestra detalles de un juego
function GameDetails() {
  const { gameid } = useParams();
  const {showErrorMessage, changeErrorMessage} = useFormHook()
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await gameDetailsService(gameid);
      setDetails(response.data[0]);
      setIsFetching(false);
    } catch (error) {
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
    }
  };

  if (isFetching === true) {
    return (
      <div>
        <DotLoader
          color={"grey"}
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
      <img src={details.image_url} alt={details.name} width={100} />
      <h5>{details.name}</h5>
      <p>Price: {details.price}</p>
      <p>Min Players: {details.min_players}</p>
      <p>Max Players: {details.max_players}</p>
      <p>{details.description}</p>
      <GameDetailsPrivate gameid={gameid} gameName={details.name}/>
      {showErrorMessage && <p>{showErrorMessage}</p>}
    </div>
  );
}

export default GameDetails;
