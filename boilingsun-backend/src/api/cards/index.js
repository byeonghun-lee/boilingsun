const Router = require("koa-router");
const cardsCtrl = require("./cards.ctrl");

const cards = new Router();


cards.get("/", cardsCtrl.list);
cards.post("/", cardsCtrl.write);

module.exports = cards;


