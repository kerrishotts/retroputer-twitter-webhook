const twitterbot = require('./twitterbot');

twitterbot.on('tweet_create_events', function(tweet){
  /*
    See what a tweet object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json

    Documentation for POST statuses/update:
    https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html
  */
  
  var text = 'hello 👋';
  
/*
  You can look at tweet.text to and change your bot's response based on the text from the tweet.
*/  

  twitterbot.twit.post('statuses/update', {
    status: text,
    in_reply_to_status_id: tweet.id_str,
    auto_populate_reply_metadata: true
  }, function(err, data, response) {
    if (err){
      console.log('Error', err);
    }
  });  
});

const dashboard = require('./dashboard')(twitterbot);