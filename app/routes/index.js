const listRoutes = require('./listRoutes');
const timelineRoutes = require('./timelineRoutes');
const metaTagRoutes = require('./metaTagRoutes');

module.exports = function(app, express) {
  // --- Create the high-level routers
  var listRouter = express.Router();
  var tweetRouter = express.Router();
  var twitterRouter = express.Router();

  // the following app-router will handle all endpoints of the format:
  //    http://IP_ADDRESS:PORT/timeline/:endpoint_path
  var timelineRouter = express.Router();

  // this Router will handle requests for capturing `meta-tag` information from
  //      third-party urls
  var metaTagRouter = express.Router();

  // --- Register (to APP) and map routers to respective sub-paths
  app.use('/lists', listRouter);
  app.use('/tweets', tweetRouter);
  app.use('/twitter', twitterRouter);
  app.use('/timelines', timelineRouter);
  app.use('/meta', metaTagRouter);

  // --- Add endpoint handlers to each router
  listRoutes(listRouter);
  timelineRoutes(timelineRouter);
  metaTagRoutes(metaTagRouter);
};
