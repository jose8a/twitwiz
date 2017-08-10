var Timeline = require('../helpers/timeline-helper');

module.exports = function(router) {
  // Get the logged-in user's home timeline
  router.get('/', (req, res, next) => {
    console.log("TIMELINEROUTER - path: '/timeline'");
    res.status(200).send("I am HOME TIMELINE");
  });

  // Get the logged-in user's timeline for a specified list
  router.get('/:listname', (req, res, next) => {
    const listname = req.params.listname;
    console.log(`TIMELINEROUTER - path: '/timeline/${listname}'`);
    res.status(200).send(`I see timeline for ${listname}`);
  });

  // Get user timeline
  // This method can only return up to 3,200 of a user’s most recent Tweets.
  router.get('/user/mt/:maxtweets', (req, res, next) => {
    // create a new userTimeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'MAXTWEETS', value: req.params.maxtweets});
    uT.fetch.endpoint = 'statuses/user_timeline';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notMaxTweets, res);
    // --- uT.fetchTLMaxTweets(req, res, next);
  });

  router.get('/user/md/:maxdays', (req, res, next) => {
    // create and initialize a new userTimeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'MAXDAYS', value: req.params.maxdays});
    uT.fetch.endpoint = 'statuses/user_timeline';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notMaxDays, res);
    // --- uT.fetchTLMaxDays(req, res, next);
  });

  router.get('/user/sid/:sinceid', (req, res, next) => {
    // create a new userTimeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'SINCEID', value: req.params.sinceid});
    uT.fetch.endpoint = 'statuses/user_timeline';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notSinceId, res);
    // --- uT.fetchTLSinceId(req, res, next);
  });

  router.get('/user/test/maxdays', (req, res, next) => {
    // create a new userTimeline object
    var uT = Object.create(Timeline);
    res.status(200).send(uT.isMaxDays());
  });
};
