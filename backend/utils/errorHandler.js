// utils/errorHandler.js
function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

module.exports = { sendError };
