export const errorHandler = (err, req, res, next) => {
  // Log detailed error internally for server debugging
  console.error('[Error Middleware]:', err.message);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  // Handle specific known error scenarios
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size exceeds the 5MB limit. Please upload a smaller image.'
      });
    }
    return res.status(400).json({
      success: false,
      error: `Upload error: ${err.message}`
    });
  }

  const statusCode = err.statusCode || 500;
  const userSafeMessage = statusCode === 500
    ? 'Unable to complete the healthcare information request right now. Please try again later or consult a qualified healthcare professional.'
    : (err.message || 'An error occurred while processing your request.');

  res.status(statusCode).json({
    success: false,
    error: userSafeMessage
  });
};
