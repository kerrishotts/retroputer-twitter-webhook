const util = require('util');

module.exports = {
  handle_event: function(event) {
    console.log(util.inspect(event, false, null))
  }
};
