const twitterbot = require('./twitterbot');

twitterbot.on('tweet_create_events', function(tweet){
  /*
    See what a tweet object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json
  */
  // console.log({tweet});
  
  twitterbot.tweet();

  // tweet: function(text, cb){
  //   T.post('statuses/update', { status: text }, function(err, data, response) {
  //     if (cb){
  //       cb(err, data, response);
  //     }
  //   });    
  // },  
  
//   tweet.user.screen_name
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