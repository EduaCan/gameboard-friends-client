import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { DarkThemeContext } from "../context/darkTheme.context";
import { useFormHook } from "../hooks/useFormHook";
import CommentListGame from "./CommentListGame";
import EventList from "./EventList";
import {
  addGameToFavouritesService,
  removeGameFromFavouritesService,
  getFavGamesArrayService,
} from "../services/user.service";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

//shows info reserved to registered users
function GameDetailsPrivate({ gameid, gameName }) {
  //contexts
  const { isLoggedIn } = useContext(AuthContext);
  const { changeTheme, changeThemeButton } = useContext(DarkThemeContext);
  //hook
  const { showErrorMessage, navigateError, fetchingLoader } = useFormHook();
  //states
  const [isFetching, setIsFetching] = useState(true);
  const [favorites, setFavorites] = useState(null);
  const [showCommentsList, setShowCommentsList] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  //game comments modal handler
  const handleCloseCommentsList = () => setShowCommentsList(false);
  const handleShowCommentsList = () => setShowCommentsList(true);
  //events modal handler
  const handleCloseEventList = () => setShowEventList(false);
  const handleShowEventList = () => setShowEventList(true);

  useEffect(() => {
    checkFavorites();
  }, []);

  //add game to user favorites list handler
  const handleAddGameToFavourites = async (gameid) => {
    setIsFetching(true);
    try {
      await addGameToFavouritesService(gameid);
      await checkFavorites();
    } catch (error) {
      navigateError(error);
    }
  };
  //remove game of user favorites list handler
  const handleRemoveGameFromFavourites = async (gameid) => {
    setIsFetching(true);
    try {
      await removeGameFromFavouritesService(gameid);
      await checkFavorites();
    } catch (error) {
      navigateError(error);
    }
  };
  //check if this game is in favorite game list of the user
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

  //just 3 buttons (plus 2 modals) only alllowed to registered users
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
            Add game to favorites
          </Button>
        )}
        {showErrorMessage() && <p style={{color:"red"}}>{showErrorMessage()}</p>}
      </div>
    );
  }
}

export default GameDetailsPrivate;
