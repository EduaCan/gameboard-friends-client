import service from "./config.service";

const commentListGameService = (gameid) => {
  return service.get(`/comment/game/${gameid}`);
};

const commentListEventService = (eventid) => {
  return service.get(`/comment/event/${eventid}`);
};

const commentAddGameService = (gameid, newComment) => {
  return service.post(`comment/${gameid}`, newComment);
};

const commentAddEventService = (eventid, newComment) => {
  return service.post(`comment/event/${eventid}`, newComment);
};

const commentDeleteService = (commentid) => {
  return service.delete(`/comment/${commentid}`);
};

const commentModifyService = (commentid, updateContent) => {
  return service.patch(`/comment/${commentid}`, updateContent);
};

export {
  commentListGameService,
  commentAddGameService,
  commentListEventService,
  commentAddEventService,
  commentDeleteService,
  commentModifyService,
};
