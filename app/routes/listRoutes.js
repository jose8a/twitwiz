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
// [ ] TODO: filter out only list-name, list-id, list-owner of each list from
// '/lists/ownerships', '/lists/list'
//
// [X] TODO: filter out from list-timeline tweets: id, created_at, retweeted,
// text, entities.urls, entities.hashtags, user.name, user.id,
// user.profile_image_url, user.location
//
// [ ] TODO: update API to return max-days, max-hours, since-last-sync

var T = require('../services/twitter');

var tweets = function(data) {
  var results = [];
  for (var item of data) {
    if (item.entities.urls.length < 1) {
      continue;
    } else {
      var twit = {};
      twit.id = item.id;
      twit.content = item.text;
      twit.url = item.entities.urls[0].expanded_url;
      twit.ownerAlias = item.user.screen_name;
      twit.owner = item.user.name;
      twit.ownerId = item.user.id;
      twit.createdAt = item.created_at;
      twit.isRetweet = item.retweeted;
      results.push(twit);
    }
  }
  return {total: results.length, data: results};
};

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

  // get all 'favorites' tweets
  router.get('/favorites', (req, res, next) => {
    let twits = null;

    console.log(`LISTROUTER - path: '/favorites'`);
    T.get('favorites/list', {count: 200}, function(err, data, response) {
      twits = tweets(data);
      res.status(200).send(twits);
    });
  });

  // get all 'non-favorites' lists' tweets
  router.get('/:listname', (req, res, next) => {
    const listname = req.params.listname;
    let twits = null;

    console.log(`LISTROUTER - path: '/${listname}'`);
    T.get('lists/statuses', {slug: listname, owner_screen_name: 'jose8a', count: 200}, function(err, data, response) {
      twits = tweets(data);
      res.status(200).send(twits);
    });
  });
};
