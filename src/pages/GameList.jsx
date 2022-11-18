import { gameListService } from "../services/game.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

//Muestra la lista de juegos que viene de la API
function GameList() {
  const [errorMessage, setErrorMessage] = useState("");
  const [list, setList] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const { cambiarTema } = useContext(AuthContext);

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
    return <div>

    <DotLoader
        color={"grey"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
  }

  return (
    <div style={{display: "flex", gap: "1vw", flexWrap: "wrap", justifyContent: "center"}}>
      {errorMessage !== "" && <p>{errorMessage}</p>}

      
      
      {list.map((eachGame) => {
        return (

          <Card key={eachGame.id} style={{ minWidth: '300px', width: "50vw", maxWidth: "500px" }}>
      <Card.Img variant="top" src={eachGame.image_url} alt={eachGame.name} style={cambiarTema()}/>
      <Card.Body style={cambiarTema()}>
        <Card.Title style={cambiarTema()}>{eachGame.name}</Card.Title>
        <Card.Text style={cambiarTema()}>
        {eachGame.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush" style={cambiarTema()}>
        <ListGroup.Item style={cambiarTema()}>Price: {eachGame.price}</ListGroup.Item>
        <ListGroup.Item style={cambiarTema()}>Min Players: {eachGame.min_players}</ListGroup.Item>
        <ListGroup.Item style={cambiarTema()}>Max Players: {eachGame.max_players}</ListGroup.Item>
      </ListGroup>
      <Card.Body style={cambiarTema()}>
      <Link to={`/game/${eachGame.id}`}>
              View Details
            </Link>
      </Card.Body>
    </Card>


        );
      })}
      {errorMessage !== "" && <p>{errorMessage}</p>}

    </div>
  );
}
          

export default GameList;
