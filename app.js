const twitterbot = require('./twitterbot');

twitterbot.on('direct_message_events', function(event){
    twitterbot.send_dm(event.sender_id, 'hello', function(err){
      if (err){
        console.log(err);
      }
    });
});

const dashboard = require('./dashboard')(twitterbot);