const { permissions } =  require('./permission');

const middlewares = [permissions];

module.exports = { middlewares };
