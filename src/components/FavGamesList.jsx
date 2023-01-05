import { Link } from "react-router-dom";

//list of games with their pics
function FavGamesList({ details }) {
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
    </div>
  );
}

export default FavGamesList;
