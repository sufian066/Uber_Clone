// backend/middlewares/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error(err.stack ? err.stack : err); // Log error in terminal for debugging
  res.status(err.status || 500).json({
    error: err.message || 'Server error'
  });
}

module.exports = errorHandler;
