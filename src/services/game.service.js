import service from "./config.service";

const gameListService = () => {
  return service.get("/game")
}

const gameDetailsService = (params) => {
    return service.get(`/game/${params}`)
  }

export {
    gameListService,
    gameDetailsService
  }