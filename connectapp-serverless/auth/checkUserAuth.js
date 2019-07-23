'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.check = (event, context, callback) => {
  const params = {
    TableName: process.env.USERS_TABLE,
  };

  let userObject = JSON.parse(event.body);
  console.log(event);

  // fetch todo from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    let exists = {};
    // console.log(result.Items);
    const data = (result.Items);
    data.forEach((element) => {
      if(element.username == userObject.username && element.password === userObject.password){
          exists = element;
      }
    })
    console.log(exists);

    // create a response
    let response = {};
    if(isEmpty(exists)){
      response = {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        },
        body: 'Unauthorized',
      };
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
    console.log(response.body);
    callback(null, response);
  });
};


function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}