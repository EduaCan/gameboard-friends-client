import { gameDetailsService } from "../services/game.service";
import { useFormHook } from "../hooks/useFormHook";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GameDetailsPrivate from "../components/GameDetailsPrivate";
import SEO from "../components/SEO";

//Muestra detalles de un juego
function GameDetails() {
  //params
  const { gameid } = useParams();
  //hook
  const { showErrorMessage, fetchingLoader, navigateError } = useFormHook();
  //states
  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  //get full info of a game
  const getData = async () => {
    try {
      const response = await gameDetailsService(gameid);
      setDetails(response.data[0]);
      setIsFetching(false);
    } catch (error) {
      navigateError(error);
    }
  };

  if (isFetching) {
    return fetchingLoader();
  }

  return (
    <div>
      <SEO
        title={`${details.name}`}
        description={`All the information about the boardgame ${details.name}, ${details.description.replace(/(&quot;\b)|(<\/?[^>]+(>|$))|(\b&quot;)/g, "")}`}
        name="Boardgame Friends"
        type="website"
      />
      <img src={details.image_url} alt={details.name} width={100} />
      <h5>{details.name}</h5>
      <p>Price: {details.price}</p>
      <p>Min Players: {details.min_players}</p>
      <p>Max Players: {details.max_players}</p>
      <p>{details.description.replace(/(&quot;\b)|(<\/?[^>]+(>|$))|(\b&quot;)/g, "")}</p>
      <GameDetailsPrivate gameid={gameid} gameName={details.name} />
      {showErrorMessage && <p>{showErrorMessage}</p>}
    </div>
  );
}

export default GameDetails;
