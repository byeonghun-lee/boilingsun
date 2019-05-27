const Router = require("koa-router");
const cards = require("./cards");

const api = new Router();

api.use("/cards", cards.routes());

module.exports = api;