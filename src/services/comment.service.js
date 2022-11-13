import service from "./config.service";

const commentListService = (gameid) => {
  return service.get(`/comment/${gameid}`)
}

const commentAddService = (gameid, newComment) => {
  return service.post(`comment/${gameid}`, newComment)
}



export {
    commentListService,
    commentAddService
  }