const Router = require("koa-router");
const cards = require("./cards");
const category = require("./category");
const user = require("./user");

const api = new Router();

api.use("/cards", cards.routes());
api.use("/category", category.routes());
api.use("/user", user.routes());

module.exports = api;