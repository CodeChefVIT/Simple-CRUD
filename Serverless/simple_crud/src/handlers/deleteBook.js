import AWS from 'aws-sdk';
///
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors'
///
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function deleteBook(event, context) {
  //JSON.parse(event.body)
  let book;
  const { id } = event.pathParameters;
  try {

    await dynamodb.delete({
      TableName: process.env.CRUD_TABLE_NAME,
      Key: { id }
    }, function (err, data) {
      if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
      }
    }).promise();




  }
  catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }


  return {
    statusCode: 200,
    body: "deleted",
  };
}

//export const handler = deleteBook;

export const handler = middy(deleteBook)
  .use(httpJsonBodyParser()) // automatically parse
  .use(httpEventNormalizer()) //saves us from room for errors , searches params
  .use(httpErrorHandler());

