import { default as authRoutes } from "./auth.routes.js";
import { default as usersRoutes } from "./users.routes.js";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", usersRoutes);
};

export { initRoutes };
