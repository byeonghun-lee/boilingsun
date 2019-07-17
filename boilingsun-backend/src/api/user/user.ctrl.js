const User = require("models/user");
const Joi = require("joi");

// 유저 생성
// POST /api/user
// { userId, password, email }
exports.write = async (ctx) => {
    const schema = Joi.object().keys({
        userId: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 404;
        ctx.body = result.error;
        return;
    }

    const {
        userId,
        password,
        email
    } = ctx.request.body;

    const user = new User({
        userId, password, email
    });

    try {
        await user.save();
        ctx.body = user;
    } catch (e) {
        // ctx.throw(500, e);
        ctx.status = 500;
        ctx.body = e;
        return;
    }
};


// 로그인
// POST /api/user/login
exports.login = async (ctx) => {
    const {
        userId,
        password
    } = ctx.request.body;

    try {
        const user = await User.findByCredentials(userId, password);
        console.log("USER:", user);
        const token = await user.generateAuthToken();

        ctx.body = token;
    } catch (e) {
        ctx.status = 500;
        ctx.body = e;
        return;
    }
}