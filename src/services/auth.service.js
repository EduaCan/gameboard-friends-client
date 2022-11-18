import service from "./config.service";

const signupService = (newUser) => {
  return service.post("/auth/signup", newUser);
};

const loginService = (userCredentials) => {
  return service.post("/auth/login", userCredentials);
};

const verifyService = () => {
  return service.get("/auth/verify");
};

const changePasswordService = (newPassword) => {
  return service.patch("/auth/newpassword", newPassword);
};

export { signupService, loginService, verifyService, changePasswordService };
