require("dotenv").config();

import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";

import api from "./api";

const { PORT, MONGO_URI } = process.env;

mongoose.Promise = global.Promise;
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch(e => {
        console.log(e);
    });

const app = new Koa();
const router = new Router();

//라우터 설정
router.use("/api", api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log("listening to port", PORT);
});
