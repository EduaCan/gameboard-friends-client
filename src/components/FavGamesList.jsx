import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gameDetailsService } from "../services/game.service";
import { getFavGamesArrayService } from "../services/user.service";


//Muestra la lista de eventos en los que participa el user
function FavGamesList({ gameid }) {

  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {
    getData();
  }, []);

  

  const getData = async () => {
    try {
      //primero traemos la lista de juegos favoritos
      const response = await getFavGamesArrayService();
      //segundo buscamos esos juegos de la API, todos a la vez
      if (response.data.length !== 0) {
        const finalResponse = await gameDetailsService(response.data);
        setDetails(finalResponse.data);
        setIsFetching(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error")
      }
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
          </div>
        );
      })}
      {errorMessage !== "" && <p>{errorMessage}</p>}

    </div>
  );
}

export default FavGamesList;
