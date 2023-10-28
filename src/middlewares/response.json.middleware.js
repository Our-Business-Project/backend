const responseJsonMiddleware = (_req, res, next) => {
  if (res.locals.data) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.status(res.locals.status || 200).json(res.locals.data);
  }

  next();
};

export { responseJsonMiddleware };
