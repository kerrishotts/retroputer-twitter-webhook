const twitter = require(__dirname + '/twitter.js'),
      helpers = require(__dirname + '/helpers.js'),
      util = require('util');

module.exports = {
  handle_event: function(event) {
    // console.log(util.inspect(event, false, null));    

    if (event.direct_message_indicate_typing_events){
      event.direct_message_indicate_typing_events.forEach(function(typing_event){
          console.log(`@${event.users[typing_event.sender_id].screen_name} is typing...`);
      });
    }    
    if (event.direct_message_events){
      event.direct_message_events.forEach(function(dm_event){
        console.log(`received new DM from @${event.users[dm_event.message_create.sender_id].screen_name}...`);
        console.log(dm_event.message_create.message_data);
        // twitter.tweet('hello world', function(err){
        //   if (err){
        //     console.log(err);
        //   }
        // });
        
        twitter.send_dm(dm_event.message_create.sender_id, 'hello', function(err){
          if (err){
            console.log(err);
          }
        });
      });
    }
  }
};
