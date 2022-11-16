import { gameListService } from "../services/game.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//Muestra la lista de juegos que viene de la API
function GameList() {
  const [errorMessage, setErrorMessage] = useState("");
  const [list, setList] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    handleGameList();
  }, []);

  const handleGameList = async () => {
    try {
      const response = await gameListService();
      setList(response.data);
      setIsFetching(false);
      return;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error");
      }
    }
  };

  if (isFetching === true) {
    return <h3>....buscando</h3>;
  }

  return (
    <div>
      {errorMessage !== "" && <p>{errorMessage}</p>}

      <h2>game list</h2>
      {list.map((eachGame) => {
        return (
          <div key={eachGame.id}>
            <Link to={`/game/${eachGame.id}`}>
              <img src={eachGame.image_url} alt={eachGame.name} width="50vw" />
              <h5>{eachGame.name}</h5>
            </Link>
              <p>Price: {eachGame.price}</p>
              <p>Min Players: {eachGame.min_players}</p>
              <p>Max Players: {eachGame.max_players}</p>
              <p>{eachGame.description}</p>
          </div>
        );
      })}
      {errorMessage !== "" && <p>{errorMessage}</p>}

    </div>
  );
}

export default GameList;
