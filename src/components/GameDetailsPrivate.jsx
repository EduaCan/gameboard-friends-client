import React, { useEffect, useState } from "react";  //si no lo uso, quitalo
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CommentList from "./CommentList";
import EventList from "./EventList";
import { addGameToFavouritesService, removeGameFromFavouritesService, getFavGamesArrayService } from "../services/user.service";
import {
  commentModifyService
} from "../services/comment.service";

//componente que evita que veas info privada si no estas logged
function GameDetailsPrivate({ gameid }) {
  const { isLoggedIn, user } = useContext(AuthContext);

  const [favorites, setFavorites] = useState(null)
  const [isFetching, setIsFetching] = useState(true);


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
      console.log(error)
    }
    
  }
  


 

  if (isFetching === true) {
    return <h3>....buscando event list</h3>;
  }

  if (isLoggedIn === true) {
    return (
      <div>
        <CommentList elementId={gameid}/>
        <EventList gameid={gameid}/>
        {/* <AddEventForm gameid={gameid} /> */}
        
        {favorites.some((elem)=> elem===gameid) ? 
        <button onClick={() => handleRemoveGameFromFavourites(gameid)}>
          Remove game from favourites
        </button>
        :
        <button onClick={() => handleAddGameToFavourites(gameid)}>
          Add game to favourite
        </button>
        }

      </div>
    );
  }
}

export default GameDetailsPrivate;
