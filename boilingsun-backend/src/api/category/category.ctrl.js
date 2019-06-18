const Category = require("models/category");
const Joi = require("joi");
const { ObjectId } = require("mongoose").Types;

const sortByNextCategoryId = (list, categoryList, current) => {
    const preliminaryCategory = list.find((category)=> {
        return current._id.equals(category.nextCategery);
    });

    if(preliminaryCategory) {
        categoryList.push(preliminaryCategory);
        sortByNextCategoryId(list, categoryList, preliminaryCategory);
    } else {
        return;
    }
};

const getCategoryListByOrder = (list) => {
    const categoryList = [];
    const lastCategory = list.find((category) => {
        return !category.nextCategery
    });

    categoryList.push(lastCategory);

    sortByNextCategoryId(list, categoryList, lastCategory);

    return categoryList.reverse();
};

exports.write = async (ctx) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
    });

    const result = Joi.validate(ctx.request.body, schema);

    if (result.error) {
        ctx.status = 404;
        ctx.body = result.error;
        return;
    }

    const { name } = ctx.request.body;
    const category = new Category({ name });

    try {
        const lastCategory = await Category.findOne({
            nextCategery: null
        }).exec();

        await category.save()
            .then(async (res) => {
                if(lastCategory) {
                    lastCategory.nextCategery = res._id;
                    await lastCategory.save();
                }
            });
            ctx.body = category;
    } catch (e) {
        ctx.throw(e, 500);
    }
};

//카테고리 목록 조회
exports.list = async (ctx) => {
    try {
        const categories = await Category.find().exec();
        ctx.body = getCategoryListByOrder(categories);
    } catch (e) {
        ctx.throw(e, 500);
    }
};

//특정 카테고리 제거
// DELETE /api/category/:id
exports.remove = async (ctx) => {
    const { id } = ctx.params
    try {
        await Category.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch (e) {
        ctx.throw(e, 500);
    }
};