import service from "./config.service";

 const addGameToFavouritesService = (gameid) => {
    return service.patch(`/user/game/${gameid}`)
 }

 const getFavGamesArrayService = () => {
   return service.get(`/user/favorites`)
 }

 export {
    addGameToFavouritesService,
    getFavGamesArrayService
  }