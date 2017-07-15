// ===================================================
// -- Twitter Lib
// ===================================================
var Twit = require('twit');
var T = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

// =================================================================
// Notes on twitter REST API:
// 1 - navigating the timeline most efficiently, use either of:
//    [ ] max_id ==> provide a count of tweets to return prior
//        to a specified tweet ID (the max_id value)
//    [ ] since_id ==> provide the most recent tweets up until
//        the specified tweet ID (the since_id value)
//
//    ** to implement an API call to return all timeline tweets
//        since a specific date, it seems to require several iterations
//        of the max_id + count call - checking on each twitter
//        retrieval the tweet-date in order to know when to stop asking
//        for more tweets
//
//    ** how best to retrieve all most recent tweets from a
//        specific tweet_id or tweet_date if there are more tweets
//        than twitter will provide due to rate or quantity limits
//
//    ** what is the max_tweet count for any one response?
//        -- 200 tweets per distinct request
//
//    ** current data on Twitter's rate limiting:
//      -- https://dev.twitter.com/rest/public/rate-limiting
//      -- https://dev.twitter.com/rest/public/rate-limits
//      -- HTTP 429 error code used to signal limit reached
//      -- should also check error codes 401, 403, 404 - all failures
//      -- should also check error code 503 and retry up to a
//          set # of times until it succeeds or quit after count reached
//
// =================================================================


module.exports = T;
