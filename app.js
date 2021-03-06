if ( !process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET || !process.env.TWITTER_ACCESS_TOKEN || !process.env.TWITTER_ACCESS_TOKEN_SECRET ){
  console.log('Please update your .env file with Twitter API keys.');
  process.exit();
}

const twitterbot = require('./twitterbot');
const fetch = require("cross-fetch");
const PNG = require("pngjs").PNG;
const btoa = require("btoa");
const Entities = require('html-entities').AllHtmlEntities;
 
const entities = new Entities();


const endpoint = process.env.RETROPUTER_ENDPOINT;

if (!endpoint) {
  console.error("No endpoint for Retroputer");
}

async function sendToRetroputer(asm) {
  const r = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      asm,
      timeout: 20000,
      finishScreen: "yes"
    })
  });
  const json = await r.json();
  return json;
}

/*
  See code samples inside the examples folder. Happy tweeting!
*/

twitterbot.on('direct_message_events', async function(dm){
  console.log(dm.sender_id);
  
  const incomingTweet = entities.decode(dm.message_data.text);
  if (incomingTweet.toLowerCase().indexOf("@retroputer") > 0) return; // ignore tweets that aren't directly @ us, like people talking _about_ us
  
  const asm = incomingTweet.replace(/@retroputer/g, "").trim()
                           .replace(/https:\/\/t.co\/[A-Za-z0-9]*/g, "");
  
  const r = await sendToRetroputer(asm);
  console.log(r.error, r.asm);
  
  if (r.error) {
    twitterbot.send_dm(dm.sender_id, `Retroputer tried, but that didn't assemble correctly: ${r.error}`, function(err){
      if (err){
        console.log(err);
      }
    });
    return;
  }

  console.log("Frame", typeof r.frame, r.frame.length, Array.isArray(r.frame));
  
  if (!r.frame) {
    console.log("No frame to render");
    return;
  }
  
  const png = new PNG({ width: 640, height: 480 });
  png.data = r.frame || [];
  const buffer = PNG.sync.write(png);
  
  console.log("Buffer", buffer.length);
  
  twitterbot.send_dm_image(dm.sender_id, "Here you go:", btoa(buffer), function(err){
    if (err){
      console.log(err);
    }
  });
});

twitterbot.on('tweet_create_events', async function(tweet){
  
  const incomingTweet = entities.decode((tweet.extended_tweet && tweet.extended_tweet.full_text) || tweet.text);
  if (incomingTweet.toLowerCase().indexOf("@retroputer") > 0) return; // ignore tweets that aren't directly @ us, like people talking _about_ us

  
  const asm = incomingTweet.replace(/@retroputer/g, "").trim()
                           .replace(/https:\/\/t.co\/[A-Za-z0-9]*/g, "");
  
  const r = await sendToRetroputer(asm);
  console.log(r.error, r.asm);
  
  if (r.error) {
    twitterbot.twit.post('statuses/update', {
      status: `Retroputer tried, but that didn't assemble correctly: ${r.error}`.substr(0, 240),
      in_reply_to_status_id: tweet.id_str,
      auto_populate_reply_metadata: true
    }, function(err, data, response) {
      if (err){
        console.log('Error', err);
      }
    });      
    return;
  }

  console.log("Frame", typeof r.frame, r.frame.length, Array.isArray(r.frame));
  
  if (!r.frame) {
    console.log("No frame to render");
    return;
  }
  
  const png = new PNG({ width: 640, height: 480 });
  png.data = r.frame || [];
  const buffer = PNG.sync.write(png);
  
  console.log("Buffer", buffer.length);
  
  twitterbot.post_image_in_reply_to(tweet.id_str, asm, btoa(buffer), (d) => {
    console.log("sent post", d);
  });

/*  
  
  
  var text;  
 
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
  */
});
const dashboard = require('./dashboard')(twitterbot);