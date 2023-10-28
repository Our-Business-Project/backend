const errorJsonMiddleware = (error, _req, res, _next) => {
  const statusCode = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.status(statusCode).json({ error: message });
};

export { errorJsonMiddleware };
