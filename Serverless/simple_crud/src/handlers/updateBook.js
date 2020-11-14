import AWS from 'aws-sdk';
///
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors'
///
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function updateBook(event, context) {
  //JSON.parse(event.body)
  const { author, title } = event.body;
  let book;
  const { id } = event.pathParameters;
  var params = {
    TableName: process.env.CRUD_TABLE_NAME,
    Key: { id },
    UpdateExpression: "set author = :a, title = :t",
    ExpressionAttributeValues: {
      ":a": author,
      ":t": title,
    },
    ReturnValues: "UPDATED_NEW"
  };
  try {

    await dynamodb.update(
      params, function (err, data) {
        if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
        }
      }
    ).promise();




  }
  catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }


  return {
    statusCode: 200,
    body: "updated",
  };
}

//export const handler = updateBook;

export const handler = middy(updateBook)
  .use(httpJsonBodyParser()) // automatically parse
  .use(httpEventNormalizer()) //saves us from room for errors , searches params
  .use(httpErrorHandler());

