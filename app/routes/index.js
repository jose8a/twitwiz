const listRoutes = require('./listRoutes');
const timelineRoutes = require('./timelineRoutes');

module.exports = function(app, express) {
  // --- Create the high-level routers
  var listRouter = express.Router();
  var tweetRouter = express.Router();
  var twitterRouter = express.Router();

  // the following app-router will handle all endpoints of the format:
  //    http://IP_ADDRESS:PORT/timeline/:endpoint_path
  var timelineRouter = express.Router();

  // --- Register (to APP) and map routers to respective sub-paths
  app.use('/lists', listRouter);
  app.use('/tweets', tweetRouter);
  app.use('/twitter', twitterRouter);
  app.use('/timelines', timelineRouter);

  // --- Add endpoint handlers to each router
  listRoutes(listRouter);
  timelineRoutes(timelineRouter);
};
