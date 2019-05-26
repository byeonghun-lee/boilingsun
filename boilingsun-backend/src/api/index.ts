import * as Router from "koa-router";

const api = new Router();

api.get("/test", (ctx) => {
    ctx.body = "TEST 성공";
});

export { api };