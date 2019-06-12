const Category = require("models/category");
const Joi = require("joi");
const { ObjectId } = require("mongoose").Types;

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
        const category = await Category.find().exec();
        //처음 카테고리를 알 수 없기 떄문에 일단 역순으로 찾아와야할듯
        //아니면 처음 user를 만들떄 디폴트 카테고리 ID를 저장해놓으면 그것부터 찾아도 되겠다.
        ctx.body = category;
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
}

// function getCategoryListByOrder (list) {
//     const categoryList = [];
//     const lastCategory = list.find((category) => {
//         return !category.nextCategery
//     });

//     categoryList.push(lastCategory);

//     function sortByNextCategoryId(current) {
//         const preliminaryCategory = list.find((category)=> {
//             return category.nextCategery === current._id
//         });
//         if(preliminaryCategory) {
//             categoryList.push(preliminaryCategory);
//             sortByNextCategoryId(preliminaryCategory);
//         } else {
//             return;
//         }
//     }

//     sortByNextCategoryId(lastCategory);

//     console.log("categoryList:", categoryList);
// }