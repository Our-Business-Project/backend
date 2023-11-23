const errorJsonMiddleware = (error, _req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });

  next();
};

export { errorJsonMiddleware };
