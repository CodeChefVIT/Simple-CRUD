const { shield, or } = require('graphql-shield');
const { isAuthenticated } = require('./rule');

const permissions = shield({
  Query: {
    getMe: isAuthenticated
  }
});

module.exports = {
  permissions
};
