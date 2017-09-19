var db = require('../db');
var controllers = require('../controllers');
var mysql = require('mysql');
var selectQ = 'select users.user_name, rooms.room_name, messages.message, messages.ts from messages left outer join users on messages.user_id = users.id left outer join rooms on messages.room_id = rooms.id;';
var selectUsers = 'select users.user_name, rooms.room_name, messages.message, messages.ts from messages left outer join users on messages.user_id = users.id left outer join rooms on messages.room_id = rooms.id where users.user_name = ';

var insertMessage = (userId, data, res, cb) => {
  // console.log('data to insert', userId, data.message);
  //change data.messages to data.text for actual client
  var quer = 'insert into messages (user_id, room_id, message) values (' + userId + ', 1, "' + data.message + '");';
  var q = db.connection.query(quer, (err, data) => {console.log(data)});
  cb(res, 'posted!', 201);
};

module.exports = {
  messages: {
    get: function (res, cb) {
      var q = db.connection.query(selectQ);
      var rows = [];
      q.on('result', function(row) {
        db.connection.pause();
        rows.push(row);
        db.connection.resume();
      });
      q.on('end', () => {
        cb(res, rows, 200);
      });
    }, 
    post: function (data, res, cb) {
      console.log(data);
      var q = db.connection.query('select * from users where user_name = "' + data.username + '";');
      var result = false;
      q.on('result', (row) => {
        result = row;
      });
      q.on('end', ()=>{
        if (result) {
          userId = result.id;
          insertMessage(userId, data, res, cb);
        } else {
          module.exports.users.post(data, res, cb);
        }
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      var q = db.connection.query(selectUsers /*add username concat*/);
      //send response with selected users
      
    },
    post: function (data, res, cb, noInsert) {
      console.log(data.username);
      var quer = 'insert into users (user_name) value ("' + data.username + '");';
      var q = db.connection.query(quer);
      q.on('end', () => {
        if (noInsert) {
          cb(res, 'posted! javert', 201);
        } else {
          module.exports.messages.post(data, res, cb);
        }
      });
    }
  }
};




