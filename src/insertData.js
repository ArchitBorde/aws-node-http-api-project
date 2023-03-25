"use strict";
const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const insertData = async (event) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const { data } = JSON.parse(event.body);
  const createdAt = new Date().toISOString();
  const id = v4();
  const newData = {
    id,
    data,
    createdAt,
    completed: false
  }
  await dynamoDb.put({
    TableName: "DataTable",
    Item: newData
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newData),
    };
};

module.exports = {
    handler: insertData,
};
