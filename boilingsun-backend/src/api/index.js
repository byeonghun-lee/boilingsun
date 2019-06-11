const Router = require("koa-router");
const cards = require("./cards");
const category = require("./category");

const api = new Router();

api.use("/cards", cards.routes());
api.use("/category", category.routes());

module.exports = api;