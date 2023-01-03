import service from "./config.service";

const gameListService = () => {
  return service.get("/game");
};

const gameDetailsService = (...params) => {
  params.join(",");
  return service.get(`/game/${params}`);
};

export { gameListService, gameDetailsService };
