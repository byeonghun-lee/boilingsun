const Router = require("koa-router");

const cards = new Router();

const printInfo = (ctx) => {
    ctx.body = {
        method: ctx.method,
        path: ctx.path,
        params: ctx.params,
    };
};

cards.get("/", printInfo);
cards.post("/", printInfo);
cards.get("/:id", printInfo);

module.exports = cards;


