const Card = require("models/card");
const Joi = require("joi");
const { ObjectId } = require("mongoose").Types;

exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params;

    //검증 실패
    if(!ObjectId.isValid(id)) {
        ctx.status = 400;
        return null;
    }

    return next();
};

// 카드 작성
// POST /api/cards
// { title, url, body, categoryId }
exports.write = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        url: Joi.string().required(),
        body: Joi.string(),
        categoryId: Joi.number()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if (result.error) {
        ctx.status = 404;
        ctx.body = result.error;
        return;
    }

    const {
        title,
        url,
        body,
        categoryId
    } = ctx.request.body;


    const card = new Card({
        title, url, body, categoryId
    });

    try {
        await card.save();
        ctx.body = card;
    } catch (e) {
        ctx.throw(e, 500);
    }
};

// 카드 목록 조회
exports.list = async (ctx) => {
    const page = parseInt(ctx.query.page || 1, 10);

    if(page < 1) {
        cgx.status = 400;
        return;
    }

    try {
        const cards = await Card.find()
            .sort({_id: -1})
            .limit(12)
            .skip((page - 1) * 12)
            .lean()
            .exec();
        
        const cardCount = await Card.countDocuments().exec();
        const LimitBodyLength = card => ({
            ...card,
            body: card.body.length < 30 ? card.body : `${card.body.slice(0, 30)}...`
        });
        ctx.body = cards.map(LimitBodyLength);
        ctx.set("Last-Page", Math.ceil(cardCount / 12));
    } catch (e) {
        ctx.throw(e, 500);
    }
};

// 특정 카드 조회
// GET /api/cards/:id
exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const card = await Card.findById(id).exec();
        if (!card) {
            ctx.status = 404;
            return;
        }
        ctx.body = card;
    } catch (e) {
        ctx.throw(e, 500);
    }
};

// 특정 카드 제거
// DELETE /api/cards/:id
exports.remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Card.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(e, 500);
    }
};

// 카드 수정(특정 필드 변경)
// PATCH /api/cards/:id
// { title, url, body, categoryId }
exports.update = async (ctx) => {
    const { id } = ctx.params;
    try {
        const card = await Card.findByIdAndUpdate(id, ctx.request.body, {
            new: true
        }).exec();

        if(!card) {
            ctx.status = 404;
            return;
        }
        ctx.body = card;
    } catch (e) {
        ctx.throw(e, 500);
    }
};