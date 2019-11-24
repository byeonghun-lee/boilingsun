import Router from "koa-router";
import * as categoryCtrl from "./category.ctrl";

const category = new Router();

category.get("/:owner", categoryCtrl.list);
category.post("/", categoryCtrl.write);
category.patch("/:id", categoryCtrl.update);
category.delete("/:id", categoryCtrl.remove);

export default category;
