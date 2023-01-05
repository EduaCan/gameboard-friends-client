import { gameListService } from "../services/game.service";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useFormHook } from "../hooks/useFormHook"
import { DarkThemeContext } from "../context/darkTheme.context";

function GameList() {
  //context
  const { changeTheme } = useContext(DarkThemeContext);
  //hook
  const {showErrorMessage, navigateError, fetchingLoader} = useFormHook()
  //states
  const [list, setList] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  
  //get a full game list from external API
  const getData = async () => {
    try {
      const response = await gameListService();
      setList(response.data);
      setIsFetching(false);
      return;
    } catch (error) {
      navigateError(error)    }
  };

  if (isFetching) {
    return (
      fetchingLoader()
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
      {showErrorMessage  && <p>{showErrorMessage}</p>}
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
              style={changeTheme()}
            />
            <Card.Body style={changeTheme()}>
              <Card.Title style={changeTheme()}>{eachGame.name}</Card.Title>
              <Card.Text style={changeTheme()}>
                {eachGame.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush" style={changeTheme()}>
              <ListGroup.Item style={changeTheme()}>
                Price: {eachGame.price}
              </ListGroup.Item>
              <ListGroup.Item style={changeTheme()}>
                Min Players: {eachGame.min_players}
              </ListGroup.Item>
              <ListGroup.Item style={changeTheme()}>
                Max Players: {eachGame.max_players}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body style={changeTheme()}>
              <Link to={`/game/${eachGame.id}`}>View Details</Link>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default GameList;
