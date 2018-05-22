const twitterbot = require('./twitterbot');

twitterbot.on('direct_message_events', function(event){
    twitterbot.send_dm(event.sender_id, 'hello', function(err){
      if (err){
        console.log(err);
      }
    });
});

twitterbot.on('follow_events', function(follower){
  console.log({follower});
});

const dashboard = require('./dashboard')(twitterbot);