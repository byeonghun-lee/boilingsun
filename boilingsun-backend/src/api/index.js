import Router from "koa-router";
import cards from "./cards";
import category from "./category";
import auth from "./auth";

const api = new Router();

api.use("/cards", cards.routes());
api.use("/category", category.routes());
api.use("/auth", auth.routes());

export default api;
