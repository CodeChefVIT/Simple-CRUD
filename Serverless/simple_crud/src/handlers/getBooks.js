import AWS from 'aws-sdk';
///
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors'
///
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getBooks(event, context) {
  //JSON.parse(event.body)
  let books;

  try {
    const result = await dynamodb.scan({
      TableName: process.env.CRUD_TABLE_NAME,
    }).promise();

    books = result.Items;
  }
  catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return {
    statusCode: 201,
    body: JSON.stringify(books),
  };
}

//export const handler = getBooks;

export const handler = middy(getBooks)
  .use(httpJsonBodyParser()) // automatically parse
  .use(httpEventNormalizer()) //saves us from room for errors , searches params
  .use(httpErrorHandler());

