import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CommentList from "./CommentList";
import EventList from "./EventList";
import { addGameToFavouritesService, removeGameFromFavouritesService, getFavGamesArrayService } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



//componente que evita que veas info privada si no estas logged
function GameDetailsPrivate({ gameid }) {
  const { isLoggedIn, user, cambiarTemaButton } = useContext(AuthContext);

  const navigate = useNavigate();


  const [favorites, setFavorites] = useState(null)
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")

  const [showCommentsList, setShowCommentsList] = useState(false);
  const [showEventList, setShowEventList] = useState(false);

  const handleCloseCommentsList = () => setShowCommentsList(false);
  const handleShowCommentsList = () => setShowCommentsList(true);

  const handleCloseEventList = () => setShowEventList(false);
  const handleShowEventList = () => setShowEventList(true);

  useEffect(()=>{
     checkFavorites()
  }, [])
  
  

  const handleAddGameToFavourites = (gameid) => {
    addGameToFavouritesService(gameid);
    checkFavorites()
  };

  const handleRemoveGameFromFavourites = (gameid) => {
    removeGameFromFavouritesService(gameid);
    checkFavorites()
  };

  const checkFavorites = async () => {
    try {
    // setIsFetching(true)

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
        <Button variant={cambiarTemaButton()} onClick={handleShowCommentsList}>
        See Comments
      </Button>
      <Button variant={cambiarTemaButton()} onClick={handleShowEventList}>
        See Events
      </Button>

       <Modal show={showCommentsList} onHide={handleCloseCommentsList}>
       <Modal.Header closeButton></Modal.Header>

        <CommentList elementId={gameid} />
       </Modal>
       <Modal show={showEventList} onHide={handleCloseEventList}>
       <Modal.Header closeButton></Modal.Header>

        <EventList gameid={gameid} />
        
       </Modal>
        


        
        {favorites.some((elem)=> elem===gameid) ? 
        <Button variant={cambiarTemaButton()} onClick={() => handleRemoveGameFromFavourites(gameid)}>
          Remove game from favourites
        </Button >
        :
        <Button variant={cambiarTemaButton()} onClick={() => handleAddGameToFavourites(gameid)}>
          Add game to favorite
        </Button>
        }
      {errorMessage !== "" && <p>{errorMessage}</p>}

      </div>
    );
  }
}

export default GameDetailsPrivate;
