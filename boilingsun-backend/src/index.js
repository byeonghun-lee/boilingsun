const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const api = require("./api/index");

const app = new Koa();
const router = new Router();

//라우터 설정
router.use("/api", api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());
 
app.listen(4000, () => {
    console.log("4000포트 연결됨");
});