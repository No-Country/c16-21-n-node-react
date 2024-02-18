export const middlewareErrorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // Si el error es un objeto de error personalizado
  if (error instanceof Error) {
    statusCode = error.statusCode || 500;
    message = error.message || 'Internal Server Error';
  }

  res.status(statusCode).json({
    message,
    status: statusCode,
  });
};
