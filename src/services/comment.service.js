import service from "./config.service";

const commentListService = (gameid) => {
  return service.get(`/comment/${gameid}`)
}



export {
    commentListService,
  }