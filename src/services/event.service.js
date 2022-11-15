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

const searchPlayerEventsService = (eventid) => {
  return service.get(`/event/${eventid}/addplayer`)
}

const getAnEventInfoService = (eventid) => {
  return service.get(`/event/details/${eventid}/`)
}

const eventListJoinedService = () => {
  return service.get("event/user")
}

export {
    eventListService,
    addEventService,
    addPlayerToEventService,
    searchPlayerEventsService,
    getAnEventInfoService,
    eventListJoinedService
  }