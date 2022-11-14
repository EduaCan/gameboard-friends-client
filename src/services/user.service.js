import service from "./config.service";

 const addGameToFavouritesService = (gameid) => {
    service.patch(`/user/game/${gameid}`)
 }

 export {
    addGameToFavouritesService
  }