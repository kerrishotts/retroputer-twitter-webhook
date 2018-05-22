const twitterbot = require('./twitterbot');

twitterbot.on('direct_message_events', function(event){
    twitterbot.send_dm(event.sender_id, 'hello', function(err){
      if (err){
        console.log(err);
      }
    });
});

twitterbot.on('follow_events', function(follower){
  /*
    See what a user object looks like:
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

const dashboard = require('./dashboard')(twitterbot);