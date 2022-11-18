import service from "./config.service";

const eventListService = (gameid) => {
  return service.get(`/event/game/${gameid}`);
};

const addEventService = (gameid, newEvent) => {
  return service.post(`/event/${gameid}`, newEvent);
};

const addPlayerToEventService = (eventid) => {
  return service.patch(`/event/${eventid}/addplayer`);
};

const removePlayerFromEventService = (eventid) => {
  return service.patch(`/event/${eventid}/removeplayer`);
};

const searchPlayerEventsService = (eventid) => {
  return service.get(`/event/${eventid}/addplayer`);
};

const getAnEventInfoService = (eventid) => {
  return service.get(`/event/details/${eventid}/`);
};

const eventListJoinedService = () => {
  return service.get("event/user");
};

const eventDeleteService = (eventid) => {
  return service.delete(`/event/${eventid}`);
};

export {
  eventListService,
  addEventService,
  addPlayerToEventService,
  searchPlayerEventsService,
  getAnEventInfoService,
  eventListJoinedService,
  removePlayerFromEventService,
  eventDeleteService,
};
