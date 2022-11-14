import service from "./config.service";

 const addGameToFavouritesService = (gameid) => {
    service.patch(`/user/game/${gameid}`)
 }

 const getFavGamesArrayService = () => {
   service.get(`/user/favorites`)
 }

 export {
    addGameToFavouritesService,
    getFavGamesArrayService
  }