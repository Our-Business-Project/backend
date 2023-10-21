import { default as authRoutes } from "./auth.routes.js";
import { default as usersRoutes } from "./users.routes.js";

const initRoutes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/users", usersRoutes);
};

export { initRoutes };
