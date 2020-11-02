const { rule } = require('graphql-shield');


const isAuthenticated = rule()(
  async (_parent, _args, { currentUser }, _info) => {
    return currentUser ? true : false;
  }
);

module.exports = {
  isAuthenticated
}