import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gameDetailsService } from "../services/game.service";
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
  const [eventListGames, setEventListGames] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      //primero traemos la lista de juegos favoritos
      const response = await getFavGamesArrayService();
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
      //segundo buscamos esos juegos de la API, todos a la vez
      if (response.data.length !== 0) {
        const finalResponse = await gameDetailsService(response.data);
        setDetails(finalResponse.data);
        setIsFetching(false);
      } else {
        setDetails(response.data);
        setIsFetching(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error");
      }
    }
    console.log("eventListGames", eventListGames);
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
    </div>
  );
}

export default Profile;
