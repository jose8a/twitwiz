// =================================================================
let T = require('../services/twitter');
let { tweets } = require('./utility-helpers');
let subDays = require('date-fns/sub_days');
let isBefore = require('date-fns/is_before');

// =================================================================
var Timeline = {
  init(fetchOptions = {}) {
    // fetch options
    //    e.g. ==> {type: 'MAXTWEETS | MAXDAYS | SINCEID', value: VALUE}
    this.fetch = {};
    this.fetch.type = fetchOptions.type;
    this.fetch.value = fetchOptions.value;
    this.fetch.endpoint = fetchOptions.endpoint;
    this.fetch.username = fetchOptions.username;

    // timeline-data information
    this.timelineData = {};
    this.timelineData.tweets = [];
    this.timelineData.maxTweetCount = fetchOptions.value || 400;
    this.timelineData.maxId = '-1';
    this.timelineData.maxDate = '';
    this.timelineData.tweetsPerRequest = 200;
    this.timelineData.pageIndex = 0;

    // Twitter API request options
    this.reqOptions = {};
    this.reqOptions.screen_name = this.fetch.username;
    this.reqOptions.count = this.timelineData.tweetsPerRequest;

    console.log('Timeline object initialized.');
  },

  notMaxTweets() {
    return (this.timelineData.tweets.length < this.timelineData.maxTweetCount);
  },

  notMaxDays() {
    let tlData = this.timelineData;

    let dateToday = new Date();
    let daysAgo = this.fetch.value;
    let dateAgo = subDays(dateToday, daysAgo);

    if (this.timelineData.maxId !== '-1') {
      let dateMarker = tlData.tweets[tlData.tweets.length -1].created_at;
      console.log("MAX DAYS ==> " + dateMarker + "<==>" + dateAgo);
      console.log( "notMaxDays ==> " + isBefore(dateAgo, dateMarker));
      return isBefore(dateAgo, dateMarker);
    } else {
      console.log("MAX DAYS initial pass");
      return true;
    }
  },

  notSinceId() {
    return false;
  },

  async fetchTimeline(obj, notStopCondition, res) {
      var tlData = this.timelineData;

      // request twitter timeline data until `stopCondition` is reached
      while (notStopCondition.call(obj)) {
        console.log("Sending request");
        try {
          // --- let result = await T.get('statuses/user_timeline', this.reqOptions);
          let result = await T.get(this.fetch.endpoint, this.reqOptions);
          this.updateTimelineStore(result.data);

          // update `max_id` for next Twitter API request
          let numTweets = tlData.tweets.length;
          this.reqOptions.max_id = tlData.tweets[numTweets -1].id - 1;
          this.timelineData.maxId = tlData.tweets[numTweets -1].id - 1;

          // --- tweetStore status
          this.printStatus();
        } catch (err) {
          console.log("Async-Await error!");
          console.error(err);
          res.status(500).send({'error': err});
        }
      }
      console.log("TIMELINE: DONE!!");
      res.status(200).send(tweets(tlData.tweets));
  },

  updateTimelineStore(data) {
    var tlData = this.timelineData;

    // merge new data into the results ... if data has at least 1 item
    var numTweets = data.length;
    var tweetStore = tlData.tweets;

    if (numTweets > 0) {
      tlData.tweets = tweetStore.concat(data);

      // get the max_id in the new response
      var oldestTweet = data[numTweets - 1];
      var maxId = oldestTweet.id;
      tlData.maxId = maxId;

      // extract the date of the oldest tweet in the response
      var maxDate = oldestTweet.created_at;
      tlData.maxDate = maxDate;
    } else {
      console.log("Done. Stop pinging the Twitter machine.");
      // var error = new Error("No data returned");
      // TODO: figure out if this is actually an error
    }
  },

  printStatus: function() {
    // output info to the console
    let tweetStore = this.timelineData.tweets;
    let oldestTweet = tweetStore[tweetStore.length -1];

    console.log("Oldest tweet: " + oldestTweet.text.slice(0,20));
    console.log("Num tweets: " + tweetStore.length);
    console.log("ID of oldest tweet: " + oldestTweet.id);
    console.log("Date of oldest tweet: " + oldestTweet.created_at);
  }
};


module.exports = Timeline;


