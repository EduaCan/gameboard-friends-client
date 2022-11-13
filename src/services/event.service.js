import service from "./config.service";

const eventListService = (gameid) => {
  return service.get(`/event/game/${gameid}`)
}

const addEventService = (gameid, newEvent) => {
    return service.post(`/event/${gameid}`, newEvent)
}

const addPlayerToEventService = (eventid) => {
    return service.patch(`/event/${eventid}/addplayer`)
}

export {
    eventListService,
    addEventService,
    addPlayerToEventService
  }