import { default as usersRoutes } from "./users.routes.js";

const initRoutes = (app) => {
  app.use("/users", usersRoutes);
};

export { initRoutes };
