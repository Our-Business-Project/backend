import { default as authRouter } from "./auth.routes.js";
import { default as calcRouter } from "./calc.routes.js";
import { default as imagesRouter } from "./images.routes.js";
import { default as mailRouter } from "./mail.routes.js";
import { default as usersRouter } from "./users.routes.js";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/calc", calcRouter);
  app.use("/api/v1/images", imagesRouter);
  app.use("/api/v1/mail", mailRouter);
  app.use("/api/v1/users", usersRouter);
};

export { initRoutes };
