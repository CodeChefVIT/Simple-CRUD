/**
 * API Routes
 */

const { Router } = require('express');

const routes = new Router();

routes.get('/', (_req, res) => {
  return res.status(200).json({ message: 'hello' });
});

module.exports = routes;
