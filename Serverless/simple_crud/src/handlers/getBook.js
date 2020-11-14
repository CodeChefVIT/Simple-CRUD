import AWS from 'aws-sdk';
///
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors'
///
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getBook(event, context) {
  //JSON.parse(event.body)
  let book;
  const { id } = event.pathParameters;
  try {

    const result = await dynamodb.get({
      TableName: process.env.CRUD_TABLE_NAME,
      Key: { id }
    }).promise();

    book = result.Item;


  }
  catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  if (!book) {
    throw new createError.NotFound(`Book with ID ${id} not found`)
  }
  return {
    statusCode: 200,
    body: JSON.stringify(book),
  };
}

//export const handler = getBook;

export const handler = middy(getBook)
  .use(httpJsonBodyParser()) // automatically parse
  .use(httpEventNormalizer()) //saves us from room for errors , searches params
  .use(httpErrorHandler());

