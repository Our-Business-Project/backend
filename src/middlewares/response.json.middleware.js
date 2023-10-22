const responseJsonMiddleware = (_req, res, next) => {
  if (res.locals.data) {
    res.status(res.locals.status || 200).json(res.locals.data);
  }

  next();
};

export { responseJsonMiddleware };
