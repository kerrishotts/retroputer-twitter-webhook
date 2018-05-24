const twitterbot = require('./twitterbot');

twitterbot.on('direct_message_events', function(dm){
  twitterbot.twit.post('direct_messages/events/new', {
      'event': {
        'type': 'message_create',
        'message_create': {
          'target': {
            'recipient_id': dm.sender_id
          },
          'message_data': {
            'text': 'hello',
            'quick_reply': {
              'type': 'options',
              'options': [
                {
                  'label': 'Tea',
                  'description': 'A description about the red bird.',
                  'metadata': 'drink_preference_tea'
                },
                {
                  'label': 'Coffee',
                  'description': 'A description about the blue bird.',
                  'metadata': 'drink_preference_coffee'
                },
                {
                  'label': 'Water',
                  'description': 'A description about the black bird.',
                  'metadata': 'drink_preference_water'
                }
              ]
            }
          }
        }
      }
    }, function(err, data, response) {
      if (err){
        console.log('ERROR:\n', err);
      }
    });
});

// twitterbot.on('direct_message_events', function(dm){
//     twitterbot.send_dm(dm.sender_id, 'hello', function(err){
//       if (err){
//         console.log(err);
//       }
//     });
// });

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