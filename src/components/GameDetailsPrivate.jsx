import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CommentList from "./CommentList";
import EventList from "./EventList";
import { addGameToFavouritesService, removeGameFromFavouritesService, getFavGamesArrayService } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";



//componente que evita que veas info privada si no estas logged
function GameDetailsPrivate({ gameid }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  const navigate = useNavigate();


  const [favorites, setFavorites] = useState(null)
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")



  useEffect(()=>{
     checkFavorites()
  }, [])
  
  

  const handleAddGameToFavourites = (gameid) => {
    addGameToFavouritesService(gameid);
  };

  const handleRemoveGameFromFavourites = (gameid) => {
    removeGameFromFavouritesService(gameid);
  };

  const checkFavorites = async () => {
    try {
      const response = await getFavGamesArrayService();
      setFavorites(response.data)
      setIsFetching(false)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error")
      }
    }
    
  }
  


 

  if (isFetching === true) {
    return <div>

    <ClipLoader
        color={"grey"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
  }

  if (isLoggedIn === true) {
    return (
      <div>
        <CommentList elementId={gameid}/>
        <EventList gameid={gameid}/>
        
        {favorites.some((elem)=> elem===gameid) ? 
        <button onClick={() => handleRemoveGameFromFavourites(gameid)}>
          Remove game from favourites
        </button>
        :
        <button onClick={() => handleAddGameToFavourites(gameid)}>
          Add game to favourite
        </button>
        }
      {errorMessage !== "" && <p>{errorMessage}</p>}

      </div>
    );
  }
}

export default GameDetailsPrivate;
