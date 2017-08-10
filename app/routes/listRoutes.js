// =================================================================
// '/lists/list'          -- Returns all lists the authenticating or specified user subscribes to, including their own
// '/lists/ownerships'    -- lists owned by the specified Twitter user
// '/lists/subscriptions' -- a collection of the lists the specified user is subscribed to
//
// '/lists/statuses'      -- Returns a timeline of tweets authored by members of the specified list
// '/favorites/list'      -- Returns the 20 most recent Tweets favorited by the authenticating or specified user
//
// '/lists/members'       -- Returns the members of the specified list
//
// =================================================================
// [X] TODO: filter out from list-timeline tweets: id, created_at, retweeted,
// text, entities.urls, entities.hashtags, user.name, user.id,
// user.profile_image_url, user.location
//
// [X] TODO: update API to return max-tweets
// [X] TODO: update API to return max-days
// [ ] TODO: update API to return since-last-sync
//
// [ ] TODO: filter out only list-name, list-id, list-owner of each list from
// '/lists/ownerships', '/lists/list'
//

var Timeline = require('../helpers/timeline-helper');

module.exports = function(router) {
  // get a collection of all my lists
  router.get('/', (req, res, next) => {
    console.log("LISTROUTER - path: '/'");
    T.get('lists/ownerships', function(err, data, response) {
      var results = [];
      for (var item of data.lists) {
        results.push({id: item.id, name: item.name, memberCount: item.member_count});
      }
      res.status(200).send({total: results.length, data: results});
    });
  });

  // default 'favorites' endpoint
  router.get('/favorites', (req, res, next) => {
    // create a new Timeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'MAXTWEETS', value: 150});
    uT.fetch.endpoint = 'favorites/list';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notMaxTweets, res);
  });

  // 'favorites' timeline endpoint to retrieve 'max-tweets'-worth of tweets
  router.get('/favorites/mt/:maxtweets', (req, res, next) => {
    // create a new Timeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'MAXTWEETS', value: req.params.maxtweets});
    uT.fetch.endpoint = 'favorites/list';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notMaxTweets, res);
  });

  // 'favorites' timeline endpoint to retrieve 'max-days'-worth of tweets
  router.get('/favorites/md/:maxdays', (req, res, next) => {
    // create a new Timeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'MAXDAYS', value: req.params.maxdays});
    uT.fetch.endpoint = 'favorites/list';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notMaxDays, res);
  });

  // 'favorites' timeline endpoint to retrieve all tweets since 'since-id'
  router.get('/favorites/sid/:sinceid', (req, res, next) => {
    // create a new Timeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'SINCEID', value: req.params.sinceid});
    uT.fetch.endpoint = 'favorites/list';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notSinceId, res);
  });

  // default 'lists' endpoint
  router.get('/:listname', (req, res, next) => {
    // create a new Timeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'MAXTWEETS', value: 150});
    uT.fetch.endpoint = 'lists/statuses';

    // slug and owner_screen_name are required for this endpoint
    uT.reqOptions.slug = req.params.listname;
    uT.reqOptions.owner_screen_name = 'jose8a';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notMaxTweets, res);
  });

  // 'lists' timeline endpoint to retrieve 'max-tweets'-worth of tweets
  router.get('/:listname/mt/:maxtweets', (req, res, next) => {
    // create a new Timeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'MAXTWEETS', value: req.params.maxtweets});
    uT.fetch.endpoint = 'lists/statuses';

    // slug and owner_screen_name are required for this endpoint
    uT.reqOptions.slug = req.params.listname;
    uT.reqOptions.owner_screen_name = 'jose8a';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notMaxTweets, res);
  });

  // 'lists' timeline endpoint to retrieve 'max-days'-worth of tweets
  router.get('/:listname/md/:maxdays', (req, res, next) => {
    // create a new Timeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'MAXDAYS', value: req.params.maxdays});
    uT.fetch.endpoint = 'lists/statuses';

    // slug and owner_screen_name are required for this endpoint
    uT.reqOptions.slug = req.params.listname;
    uT.reqOptions.owner_screen_name = 'jose8a';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notMaxDays, res);
  });

  // 'lists' timeline endpoint to retrieve all tweets since 'since-id'
  router.get('/:listname/sid/:sinceid', (req, res, next) => {
    // create a new Timeline object
    var uT = Object.create(Timeline);
    uT.init({username: 'jose8a', type: 'SINCEID', value: req.params.sinceid});
    uT.fetch.endpoint = 'lists/statuses';

    // slug and owner_screen_name are required for this endpoint
    uT.reqOptions.slug = req.params.listname;
    uT.reqOptions.owner_screen_name = 'jose8a';

    // request from Twitter API endpoint
    uT.fetchTimeline(uT, uT.notSinceId, res);
  });
};



