const twitterbot = require('./twitterbot');

twitterbot.on('direct_message_events', function(dm){
    twitterbot.send_dm(dm.sender_id, 'hello', function(err){
      if (err){
        console.log(err);
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

twitterbot.on('tweet_create_events', function(tweet){
  /*
    See what a tweet object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json
  */
  console.log({tweet});
});

twitterbot.on('tweet_create_events', function(favorited_status, user){
  /*
    See what a tweet object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json
  */
  console.log({favorited_status, user});
});

const dashboard = require('./dashboard')(twitterbot);