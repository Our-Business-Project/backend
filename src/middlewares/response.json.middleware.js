const responseJsonMiddleware = (_req, res, next) => {
  if (res.locals.data) {
    res.json(res.locals.data);
  }

  next();
};
