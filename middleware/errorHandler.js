// create error handler
const errorHandler = (error, req, res, next) => {
  const status = res.status ? res.status : 500;

  res.status(status).json({ status, message: error.message });
};

// export
export default errorHandler;
