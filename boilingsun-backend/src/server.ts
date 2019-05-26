import * as Koa from "koa";
import * as Router from "koa-router";
import { api }from "./api/index"

const app = new Koa();
const router = new Router();

//라우터 설정
router.use("/api", api.routes());

app.use(router.routes()).use(router.allowedMethods());
 
app.listen(4000, () => {
    console.log("4000포트 연결됨");
});