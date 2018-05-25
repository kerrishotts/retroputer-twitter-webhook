const twitterbot = require('./twitterbot');

twitterbot.on('tweet_create_events', function(tweet){
  /*
    See what a tweet object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json

    Documentation for POST statuses/update:
    https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html
  */
  // console.log({tweet});
  
  var text = 'hello 👋';

  twitterbot.twit.post('statuses/update', {
    // status: `@${tweet.user.screen_name} ${text}`,
    status: text,
    in_reply_to_status_id: tweet.id_str,
    auto_populate_reply_metadata: true
  }, function(err, data, response) {
    if (err){
      console.log('Error', err);
    }
  });  
});


twitterbot.on('follow_events', function(follower){
  /*
    See what a 'follower' user object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object.html
  */
  console.log({follower});
});



twitterbot.on('favorite_events', function(favorited_status, user){
  /*
    See what a tweet object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json
  */
  console.log({favorited_status, user});
});

const dashboard = require('./dashboard')(twitterbot);