import service from "./config.service";

const gameListService = () => {
  return service.get("/game")
}

//!pruebalo
const gameDetailsService = (...params) => {
    if (params.length === 1) {
      return service.get(`/game/${params}`)
    }else {
      params.join(",")
      return service.get(`/game/${params}`)
    }
  }

 

export {
    gameListService,
    gameDetailsService
  }