'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.add = (event, context, callback) => {
  const timestamp = new Date().getTime();
  var localTime = new Date(); //get your local time
  var utcTime = localTime.getUTCHours(); // find UTC hours
  var estTime = new Date(); // create a new date object for the EST time
  estTime.setHours(utcTime-4); // adjust it for EST hours.
  const date = estTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const data = JSON.parse(event.body);

  var hashPassword;
  // bcrypt.hash(data.password, 8).then(hash =>{
    // console.log(hash);
    // hashPassword = hash;
    
    const params = {
    TableName: process.env.USERS_TABLE,
    Item: {
      id: uuid.v1(),
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      isAdmin: false,
      // passwordHash: hashPassword,
      favorite_team: data.favorite_team,
      isActive: true,
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
        body: 'Couldn\'t create the message item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
    });
    // });
}
