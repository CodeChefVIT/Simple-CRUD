import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
///
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors'
///
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createBook(event, context) {
  //JSON.parse(event.body)
  const { title, author, image_url, description } = event.body;

  const book = {
    id: uuid(),
    title,
    author,
    image_url,
    description

  }

  try {
    await dynamodb.put({
      TableName: process.env.CRUD_TABLE_NAME,
      Item: book
    }).promise();
  }
  catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return {
    statusCode: 201,
    body: JSON.stringify(book),
  };
}

//export const handler = createBook;

export const handler = middy(createBook)
  .use(httpJsonBodyParser()) // automatically parse
  .use(httpEventNormalizer()) //saves us from room for errors , searches params
  .use(httpErrorHandler());

