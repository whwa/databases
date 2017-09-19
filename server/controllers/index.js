var models = require('../models');

var sendResponse = (res, data, statusCode) => {
  console.log('response', data);
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
      //for actual chatterbox client
      /*
      console.log('req body', req.body);
      var chunks = [];
      req.on('data', (chunk) => {
        chunks.push(chunk);
      });
      req.on('end', () => {
        var data = JSON.parse(chunks.join(''));
        models.messages.post(data, res, sendResponse);
      });
      */
      //for testsrite = true;
      models.messages.post(req.body, res, sendResponse);
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // models.users.get()
    },
    post: function (req, res) {
      // console.log('gettin there', typeof req.body);
      var noWriteToDb = true;
      if (req.body.message) {
        console.log(req.body.messages);
        noWriteToDb = false;
      }
      models.users.post(req.body, res, sendResponse, noWriteToDb);
    }
  }
};