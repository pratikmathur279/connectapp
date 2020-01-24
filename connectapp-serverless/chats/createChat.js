'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  var localTime = new Date(); //get your local time
  var utcTime = localTime.getUTCHours(); // find UTC hours
  var estTime = new Date(); // create a new date object for the EST time
  estTime.setHours(utcTime-4); // adjust it for EST hours.
  const date = estTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const data = JSON.parse(event.body);


  //CheckIfChatExists
  const params1 = {
    TableName: process.env.CHATS_TABLE,
  };

  let userObject = JSON.parse(event.body);

  // fetch todo from the database
  dynamoDb.scan(params1, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the chats item.',
      });
      return;
    }

    let exists = {};

    const chatdata = (result.Items);
    chatdata.forEach((element) => {

      if((element.user1_id == userObject.currentUser.id || element.user2_id == userObject.currentUser.id) && (element.user1_id == userObject.selectedUser.id || element.user2_id == userObject.selectedUser.id)){
          exists = element;
      }
    })
    console.log((exists));

    // create a response
    let response = {};

    if(isEmpty(exists)){
      
    //CREATE CHAT
    const params = {
      TableName: process.env.CHATS_TABLE,
      Item: {
        id: uuid.v1(),
        user1_name: data.currentUser.name,
        user1_id: data.currentUser.id,
        user1_email: data.currentUser.email,
        user2_name: data.selectedUser.name,
        user2_email: data.selectedUser.email,
        user2_id: data.selectedUser.id,
        date: date,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
      };
  
        // write the todo to the database
      dynamoDb.put(params, (error) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t create the chat item.',
        });
        return;
      }
  
      // create a response
      response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(params.Item),
      };
    });

    }
    else{
      response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(exists),
      };
  }
    callback(null, response);
    
});

}
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}