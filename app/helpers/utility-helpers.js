exports.tweets = function(data) {
  var results = [];
  for (var item of data) {
    var twit = {};
    twit.id = item.id;
    twit.content = item.text;
    twit.ownerAlias = item.user.screen_name;
    twit.owner = item.user.name;
    twit.ownerId = item.user.id;
    twit.createdAt = item.created_at;
    twit.isRetweet = item.retweeted;

    if (item.entities.urls.length < 1) {
      twit.url = 'http://#NONE';
    } else {
      twit.url = item.entities.urls[0].expanded_url;
    }

    results.push(twit);
  }
  return {total: results.length, data: results};
};

exports.tweetsWithUrl = function(data) {
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

exports.tweetIds = function(data) {
  var results = [];
  for (var twit of data) {
    results.push(twit.id);
  }

  return {total: results.length, data: results};
};

