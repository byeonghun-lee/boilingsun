const Router = require("koa-router");
const userCtrl = require("./user.ctrl");

const user = new Router();

user.post("/", userCtrl.write);
user.post("/login", userCtrl.login);
// user.get("/:id", userCtrl.read);
// user.delete("/:id", userCtrl.remove);
// user.patch("/:id", userCtrl.update);

module.exports = user;