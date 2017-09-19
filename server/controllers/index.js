var models = require('../models');

var sendResponse = (res, data, statusCode) => {
  // console.log('response');
  res.status(statusCode).send(JSON.stringify(data));
};

module.exports = {
  
  // sendResponse: function(res, data, statusCode) {
  //   res.status(statusCode).send(JSON.stringify(data));
  // },
  
  messages: {
    get: function (req, res) {
      models.messages.get(res, sendResponse);
    },
    post: function (req, res) {
      var chunks = [];
      req.on('data', (chunk) => {
        chunks.push(chunk);
      });
      req.on('end', () => {
        var data = JSON.parse(chunks.join(''));
        models.messages.post(data, res, sendResponse);
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // models.users.get()
    },
    post: function (req, res) {}
  }
};