const twitter = require('twitter'),
      util = require('util');

module.exports = {
  handle_event: function(event) {
    console.log(util.inspect(event, false, null));
    
    
    if (event.direct_message_events){
      event.direct_message_events.forEach(function(dm_event){
      // twitter.send_dm(, 'hello');
      });
    }
    
  }
};
