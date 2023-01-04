import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameDetailsService } from "../services/game.service";
import { useFormHook } from "../hooks/useFormHook"
import DotLoader from "react-spinners/ClipLoader";
import { eventListJoinedService } from "../services/event.service";
import { getFavGamesArrayService } from "../services/user.service";
import FavGamesList from "../components/FavGamesList";
import JoinedEvents from "../components/JoinedEvents";

//Muestra la info personal del usuario
function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState(null);
  const [eventList, setEventList] = useState(null);
  const {showErrorMessage, changeErrorMessage} = useFormHook()
  const [eventListGames, setEventListGames] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const responseFavGames = await getFavGamesArrayService();
      const responseEvents = await eventListJoinedService();
      setEventList(responseEvents.data);
      //get events games pics
      if (responseEvents.data.length !== 0) {
        const finalResponse = await gameDetailsService(
          responseEvents.data.map((eachEvent) => {
            return eachEvent.game;
          })
        );
        let gameListImg = finalResponse.data.map(({ id, image_url }) => {
          return { id: id, image_url: image_url };
        });
        setEventListGames(gameListImg);
      }
      
      if (responseFavGames.data.length !== 0) {
        const finalResponse = await gameDetailsService(responseFavGames.data);
        setDetails(finalResponse.data);
        setIsFetching(false);
      } else {
        setDetails(responseFavGames.data);
        setIsFetching(false);
      }
    } catch (error) {
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
    }
  };

  if (isFetching === true) {
    return (
      <DotLoader
        color={"grey"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div>
      <h2>Hello {user.user.username}</h2>
      <div className="container py-5">
        <div>
          <h3>Fav Games:</h3>
          <FavGamesList details={details} />
        </div>
        <div>
          <h3>Joined Events:</h3>
          <JoinedEvents
            eventList={eventList}
            eventGamesImg={eventListGames}
            getData={getData}
          />
        </div>
      </div>
      {showErrorMessage && <p>{showErrorMessage()}</p>}
    </div>
  );
}

export default Profile;
