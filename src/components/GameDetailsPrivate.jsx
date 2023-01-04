import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CommentListGame from "./CommentListGame";
import EventList from "./EventList";
import {
  addGameToFavouritesService,
  removeGameFromFavouritesService,
  getFavGamesArrayService,
} from "../services/user.service";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFormHook } from "../hooks/useFormHook"
import { DarkThemeContext } from "../context/darkTheme.context";

//componente que evita que veas info privada si no estas logged
function GameDetailsPrivate({ gameid, gameName }) {
  const { isLoggedIn } = useContext(AuthContext);
  const {cambiarTema, cambiarTemaButton} = useContext(DarkThemeContext)
  const { showErrorMessage, changeErrorMessage} = useFormHook()

  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const [showCommentsList, setShowCommentsList] = useState(false);
  const [showEventList, setShowEventList] = useState(false);

  const handleCloseCommentsList = () => setShowCommentsList(false);
  const handleShowCommentsList = () => setShowCommentsList(true);

  const handleCloseEventList = () => setShowEventList(false);
  const handleShowEventList = () => setShowEventList(true);

  useEffect(() => {
    checkFavorites();
  }, []);

  const handleAddGameToFavourites = async (gameid) => {
    setIsFetching(true)
    try {
      await addGameToFavouritesService(gameid);
      await checkFavorites();
    } catch (error) {
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
    }
  };

  const handleRemoveGameFromFavourites = async (gameid) => {
    setIsFetching(true)
    try {
      await removeGameFromFavouritesService(gameid);
      await checkFavorites();
    } catch (error) {
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
    }
  };

  const checkFavorites = async () => {
    try {
      const response = await getFavGamesArrayService();
      setFavorites(response.data);
      setIsFetching(false);
    } catch (error) {
      error.response && error.response.status === 400 ? changeErrorMessage(error.response.data.errorMessage) : navigate("/error");
    }
  };

  if (isFetching === true) {
    return (
      <div>
        <ClipLoader
          color={"grey"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
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
          <Modal.Header closeButton style={cambiarTema()}> {gameName} </Modal.Header>

          <CommentListGame elementId={gameid} />
        </Modal>
        <Modal show={showEventList} onHide={handleCloseEventList}>
          <Modal.Header closeButton style={cambiarTema()}> Events </Modal.Header>

          <EventList gameid={gameid} />
        </Modal>

        {favorites.some(elem => elem === gameid) ? (
          <Button
            variant={cambiarTemaButton()}
            onClick={() => handleRemoveGameFromFavourites(gameid)}
          >
            Remove game from favourites
          </Button>
        ) : (
          <Button
            variant={cambiarTemaButton()}
            onClick={() => handleAddGameToFavourites(gameid)}
          >
            Add game to favorite
          </Button>
        )}
        {showErrorMessage && <p>{showErrorMessage()}</p>}
      </div>
    );
  }
}

export default GameDetailsPrivate;
