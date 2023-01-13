import { useEffect, useState } from "react";
import { getAnEventInfoService } from "../services/event.service";
import { gameDetailsService } from "../services/game.service";
import { useParams } from "react-router-dom";
import { useFormHook } from "../hooks/useFormHook";
import CommentListEvent from "../components/CommentListEvent";
import SEO from "../components/SEO";

//details of an event
function EventDetails() {
  //params
  const { eventid } = useParams();
  //hook
  const { showErrorMessage, navigateError, fetchingLoader } = useFormHook();
  //states
  const [details, setDetails] = useState(null);
  const [gameTitle, setGameTitle] = useState(null)
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  //get info of a event
  const getData = async () => {
    try {
      const eventResponse = await getAnEventInfoService(eventid);
      const gameResponse = await gameDetailsService(eventResponse.data.game)
      setDetails(eventResponse.data);
      setGameTitle(gameResponse.data[0].name)
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
        title={`${details.location} for ${gameTitle}`}
        description={`Chat room to talk about ${gameTitle}`}
        name="Boardgame Friends"
        type="website"
      />
      {showErrorMessage && <p style={{color:"red"}}>{showErrorMessage()}</p>}
      <h1>{details.location} for {gameTitle}</h1>
      <CommentListEvent elementId={details._id} players={details.players} />
    </div>
  );
}

export default EventDetails;
