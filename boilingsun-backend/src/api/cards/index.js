const Router = require("koa-router");
const cardsCtrl = require("./cards.ctrl");

const cards = new Router();


cards.get("/", cardsCtrl.list);
cards.post("/", cardsCtrl.write);
cards.get("/:id", cardsCtrl.read);
cards.delete("/:id", cardsCtrl.remove);
cards.patch("/:id", cardsCtrl.update);

module.exports = cards;


