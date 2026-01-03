
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


export const globelErrorHandler = (err, req, res, next) => {
  const statusCode = err?.cause || 500;
  res.status(statusCode).json({
    message: err?.message || "Something went wrong",
    stack: process.env.NODE_ENV === "development" ? err?.stack : undefined
  });
};
