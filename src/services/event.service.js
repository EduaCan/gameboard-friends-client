import service from "./config.service";

const eventListService = (gameid) => {
  return service.get(`/event/game/${gameid}`)
}

const addEventService = (gameid, newEvent) => {
    return service.post(`/event/${gameid}`, newEvent)
}

export {
    eventListService,
    addEventService
  }