const Book = require('../../models/book');
const JWT = require('jsonwebtoken')
require('dotenv').config()

const book = new Book();

// const parseAuthToken = async ({ request, connection }) => {
//   let value;
//   const AUTHORIZATION_HEADER_NAME = 'authorization';
//   let authorization;
//   if (connection) {
//     authorization = connection.context[AUTHORIZATION_HEADER_NAME];
//   } else {
//     authorization = request.headers[AUTHORIZATION_HEADER_NAME];
//   }
//   if (authorization) {
//     const tokenSplitBy = ' ';
//     let token = authorization.split(tokenSplitBy);
//       let accessToken = token[1];
//       try {
//         JWT.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
//           if (err) {
//             return res.json({
//               success: false,
//               message: 'Token is not valid'
//             });
//           } else {
//             console.log(
//               `utility parseAuthToken decoded=${JSON.stringify(decoded)}`
//             );
//             value = decoded
            
//           }
//         })

//       } catch (err) {
//         // logger.log(level.error, `utility parseAuthToken err=${err}`);
//         return null;
//       }
//     }
//     console.log('value', value)
//     return value
// };


const context = async ({ request, connection }) => ({
  // request,
  // connection,
  book,
  // currentUser: await parseAuthToken({request, connection}),
});

module.exports = {context};
