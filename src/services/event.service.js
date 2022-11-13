import service from "./config.service";

const eventListService = (gameid) => {
  return service.get(`/event/game/${gameid}`)
}

export {
    eventListService
  }