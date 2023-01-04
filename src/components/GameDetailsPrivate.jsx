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
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFormHook } from "../hooks/useFormHook";
import { DarkThemeContext } from "../context/darkTheme.context";

//componente que evita que veas info privada si no estas logged
function GameDetailsPrivate({ gameid, gameName }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { changeTheme, changeThemeButton } = useContext(DarkThemeContext);
  const { showErrorMessage, navigateError, fetchingLoader } = useFormHook();

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
    setIsFetching(true);
    try {
      await addGameToFavouritesService(gameid);
      await checkFavorites();
    } catch (error) {
      navigateError(error);
    }
  };

  const handleRemoveGameFromFavourites = async (gameid) => {
    setIsFetching(true);
    try {
      await removeGameFromFavouritesService(gameid);
      await checkFavorites();
    } catch (error) {
      navigateError(error);
    }
  };

  const checkFavorites = async () => {
    try {
      const response = await getFavGamesArrayService();
      setFavorites(response.data);
      setIsFetching(false);
    } catch (error) {
      navigateError(error);
    }
  };

  if (isFetching) {
    return fetchingLoader();
  }

  if (isLoggedIn === true) {
    return (
      <div>
        <Button variant={changeThemeButton()} onClick={handleShowCommentsList}>
          See Comments
        </Button>
        <Button variant={changeThemeButton()} onClick={handleShowEventList}>
          See Events
        </Button>

        <Modal show={showCommentsList} onHide={handleCloseCommentsList}>
          <Modal.Header closeButton style={changeTheme()}>
            {" "}
            {gameName}{" "}
          </Modal.Header>

          <CommentListGame elementId={gameid} />
        </Modal>
        <Modal show={showEventList} onHide={handleCloseEventList}>
          <Modal.Header closeButton style={changeTheme()}>
            {" "}
            Events{" "}
          </Modal.Header>

          <EventList gameid={gameid} />
        </Modal>

        {favorites.some((elem) => elem === gameid) ? (
          <Button
            variant={changeThemeButton()}
            onClick={() => handleRemoveGameFromFavourites(gameid)}
          >
            Remove game from favourites
          </Button>
        ) : (
          <Button
            variant={changeThemeButton()}
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
