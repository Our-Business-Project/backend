import { default as authRouter } from "./auth.routes.js";
import { default as calculationsRouter } from "./calculations.routes.js";
import { default as mailRouter } from "./mail.routes.js";
import { default as usersRouter } from "./users.routes.js";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/calculations", calculationsRouter);
  app.use("/api/v1/mail", mailRouter);
  app.use("/api/v1/users", usersRouter);
};

export { initRoutes };
