import { AuthContext } from "../context/auth.context";
import { useEffect, useState, useContext } from "react";
import { useFormHook } from "../hooks/useFormHook";
import { gameDetailsService } from "../services/game.service";
import { eventListJoinedService } from "../services/event.service";
import { getFavGamesArrayService } from "../services/user.service";
import FavGamesList from "../components/FavGamesList";
import JoinedEvents from "../components/JoinedEvents";
import SEO from "../components/SEO";

//show user's relevant info
function Profile() {
  //context
  const { user } = useContext(AuthContext);
  //hook
  const { showErrorMessage, navigateError, fetchingLoader } = useFormHook();
  //states
  const [details, setDetails] = useState(null);
  const [eventList, setEventList] = useState(null);
  const [eventListGames, setEventListGames] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      //get favGames list and joinedEvents list
      const responseFavGames = await getFavGamesArrayService();
      const responseEvents = await eventListJoinedService();
      setEventList(responseEvents.data);
      //get events game pics
      if (responseEvents.data.length !== 0) {
        const finalResponse = await gameDetailsService(
          responseEvents.data.map((eachEvent) => eachEvent.game)
        );
        let gameListImg = finalResponse.data.map(({ id, image_url }) => {
          return { id: id, image_url: image_url };
        });
        setEventListGames(gameListImg);
      }
      //get fav games pics
      if (responseFavGames.data.length !== 0) {
        const finalResponse = await gameDetailsService(responseFavGames.data);
        setDetails(finalResponse.data);
        setIsFetching(false);
      } else {
        setDetails(responseFavGames.data);
        setIsFetching(false);
      }
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
        title={`${user.user.username} Profile Page`}
        description="Personal information of the user"
        name="Boardgame Friends"
        type="website"
      />
      <h2>Hello {user.user.username}</h2>
      <div className="container py-5">
        <div>
          <h1>Fav Games:</h1>
          <FavGamesList details={details} />
        </div>
        <div>
          <h1>Joined Events:</h1>
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
