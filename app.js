const twitterbot = require('./twitterbot');

twitterbot.on('direct_message_events', function(event){
    // console.log('direct_message_events', event);    
});


const dashboard = require('./dashboard')(twitterbot);