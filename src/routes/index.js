import usersRoutes from "./users.routes";

const initRoutes = (app) => {
  app.use("/users", usersRoutes);
};

export default initRoutes;
