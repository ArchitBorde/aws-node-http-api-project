"use strict";
const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const getData = async (event) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  let data;

  try{
  const result = await dynamoDb.scan({
    TableName: "DataTable"
  }).promise();
  data = result.Items;
  }catch(err){
    console.log(err);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    };
};

module.exports = {
    handler: getData,
};
