// ===================================================
// -- Client Error Handlers
// --   404 Handler
// ===================================================
var handle404 = function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// ===================================================
// -- Server Error Handlers
// ===================================================
// Development
// Allow Stacktrace
var handleDev5xx = function(error, req, res, next) {
  var status = error.status || 500;
  res.status(status).json('error', {
    message: error.message,
    error: error
  });
};

// Production
// Remove Stacktrace
var handleProd5xx = function(error, req, res, next) {
  var status = error.status || 500;
  res.status(status).json('error', {
    message: error.message,
    error: {}
  });
};

var handleErrors = function(app) {
  app.use(handle404);

  if (app.get('env') === 'development') {
    app.use(handleDev5xx);
  }

  app.use(handleProd5xx);
}

module.exports = handleErrors;

