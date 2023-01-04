import { gameListService } from "../services/game.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useFormHook } from "../hooks/useFormHook"
import { useContext } from "react";
import { DarkThemeContext } from "../context/darkTheme.context";

//Muestra la lista de juegos que viene de la API
function GameList() {
  const [list, setList] = useState("");
  const {showErrorMessage, changeErrorMessage} = useFormHook()
  const [isFetching, setIsFetching] = useState(true);
  const { cambiarTema } = useContext(DarkThemeContext);

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
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
    }
  };

  if (isFetching === true) {
    return (
      <div>
        <DotLoader
          color={"grey"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "1vw",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {showErrorMessage !== "" && <p>{showErrorMessage}</p>}

      {list.map((eachGame) => {
        return (
          <Card
            key={eachGame.id}
            style={{ minWidth: "300px", width: "50vw", maxWidth: "500px" }}
          >
            <Card.Img
              variant="top"
              src={eachGame.image_url}
              alt={eachGame.name}
              style={cambiarTema()}
            />
            <Card.Body style={cambiarTema()}>
              <Card.Title style={cambiarTema()}>{eachGame.name}</Card.Title>
              <Card.Text style={cambiarTema()}>
                {eachGame.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" style={cambiarTema()}>
              <ListGroup.Item style={cambiarTema()}>
                Price: {eachGame.price}
              </ListGroup.Item>
              <ListGroup.Item style={cambiarTema()}>
                Min Players: {eachGame.min_players}
              </ListGroup.Item>
              <ListGroup.Item style={cambiarTema()}>
                Max Players: {eachGame.max_players}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body style={cambiarTema()}>
              <Link to={`/game/${eachGame.id}`}>View Details</Link>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default GameList;
