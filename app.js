const twitterbot = require('./twitterbot');

twitterbot.on('follow_events', function(follower){
  /*
    See what a 'follower' user object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object.html
  */
  console.log({follower});

  twitterbot.twit.post('statuses/update', {
    status: `@${follower.screen_name} Thanks for the follow!`,
  }, function(err, data, response) {
    if (err){
      console.log('Error', err);
    }
  });  

});

twitterbot.on('favorite_events', function(favorited_status, user){
  /*
    See what a tweet object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json
  */
  console.log({favorited_status, user});
});

const dashboard = require('./dashboard')(twitterbot);