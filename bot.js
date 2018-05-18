const twitter = require(__dirname + '/twitter.js'),
      helpers = require(__dirname + '/helpers.js'),
      util = require('util');

module.exports = {
  handle_event: function(event) {
    // console.log(util.inspect(event, false, null));
    
    
    if (event.direct_message_events){
      event.direct_message_events.forEach(function(dm_event){
        console.log(dm_event.message_create.sender_id);
      // twitter.send_dm(, 'hello');
      });
    }
  }
};
