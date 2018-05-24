const twitterbot = require('./twitterbot');

twitterbot.on('direct_message_events', function(dm){
  if (dm.message_data.quick_reply_response){
    twitterbot.send_dm(dm.sender_id, `Okay, I'll get your ${dm.message_data.text.toLowerCase()} 😊`, function(err){
      if (err){
        console.log(err);
      }
    });
  } else {
    twitterbot.twit.post('direct_messages/events/new', {
      'event': {
        'type': 'message_create',
        'message_create': {
          'target': {
            'recipient_id': dm.sender_id
          },
          'message_data': {
            'text': 'What can I get you?'
          }
        }
      }
    }, function(err, data, response) {
      if (err){
        console.log('ERROR:\n', err);
      }
    });
  }
});

/*
  You can also use the send_dm helper function, like this:
*/

twitterbot.on('direct_message_events', function(dm){
    twitterbot.send_dm(dm.sender_id, 'hello', function(err){
      if (err){
        console.log(err);
      }
    });
});