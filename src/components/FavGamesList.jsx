import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { gameDetailsService } from "../services/game.service";
import { getFavGamesArrayService } from "../services/user.service";

function FavGamesList({ gameid }) {
  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getFavGamesArrayService();
      const finalResponse = await gameDetailsService(response.data);
      console.log(finalResponse.data)
      setDetails(finalResponse.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching === true) {
    return <h3>...buscando</h3>;
  }

  return (
    <div>
      {details.map((eachGame) => {
        return (
          <div key={eachGame.id}>
          <Link to={`/game/${eachGame.id}`}>

            <img src={eachGame.image_url} alt={eachGame.name} width={50} />
            <h5>{eachGame.name}</h5>
            </Link>
            <p>juego favorito</p>
          </div>
        );
      })}
    </div>
  );
}

export default FavGamesList;
