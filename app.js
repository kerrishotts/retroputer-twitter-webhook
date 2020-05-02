if ( !process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET || !process.env.TWITTER_ACCESS_TOKEN || !process.env.TWITTER_ACCESS_TOKEN_SECRET ){
  console.log('Please update your .env file with Twitter API keys.');
  process.exit();
}

const twitterbot = require('./twitterbot');
const fetch = require("cross-fetch");
const endpoint = process.env.RETROPUTER_ENDPOINT;
if (!endpoint) {
  console.error("No endpoint for Retroputer");
}

/*
  See code samples inside the examples folder. Happy tweeting!
*/

twitterbot.on('direct_message_events', function(dm){
    console.log(dm.sender_id);
    twitterbot.send_dm(dm.sender_id, 'Hello!', function(err){
      if (err){
        console.log(err);
      }
    });
});

twitterbot.on('tweet_create_events', function(tweet){
  /*
    See what a tweet object looks like:
    https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/intro-to-tweet-json

    Documentation for POST statuses/update:
    https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html
  */
  
  var text;  

  /*
    tweet.text contains the text from the tweet.
  */  
  
  if (tweet.text.toLowerCase().match(/(hello|hi)/g)){
    text = 'hello 👋';
  }
  else{
    text = '¯\_(ツ)_/¯';
  }
  
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