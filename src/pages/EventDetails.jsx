import { useEffect, useState } from "react";
import { getAnEventInfoService } from "../services/event.service";
import { useParams } from "react-router-dom";
import CommentListEvent from "../components/CommentListEvent";
import { useFormHook } from "../hooks/useFormHook"

function EventDetails() {
  const { eventid } = useParams();
  const {showErrorMessage, navigateError, fetchingLoader} = useFormHook()


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
        navigateError(error)    }
  };

  if (isFetching) {
    return (
      fetchingLoader()
    );
  }

  return (
    <div>
      {showErrorMessage !== "" && <p>{showErrorMessage()}</p>}
      <h3>Details of this event and game {details.location}</h3>
      <CommentListEvent elementId={details._id} players={details.players}/>
    </div>
  );
}

export default EventDetails;
