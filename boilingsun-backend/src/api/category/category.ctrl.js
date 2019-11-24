import Category from "models/category";
import Joi from "joi";
import mongoose from "mongoose";
import Card from "models/card";

const { ObjectId } = mongoose.Types;

const sortByNextCategoryId = (list, categoryList, current) => {
    const preliminaryCategory = list.find(category => {
        return current._id.equals(category.nextCategery);
    });

    if (preliminaryCategory) {
        categoryList.push(preliminaryCategory);
        sortByNextCategoryId(list, categoryList, preliminaryCategory);
    } else {
        return;
    }
};

const getCategoryListByOrder = list => {
    const categoryList = [];
    const lastCategory = list.find(category => {
        return !category.nextCategery;
    });

    categoryList.push(lastCategory);

    sortByNextCategoryId(list, categoryList, lastCategory);

    return categoryList.reverse();
};

export const write = async ctx => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        owner: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if (result.error) {
        ctx.status = 404;
        ctx.body = result.error;
        return;
    }

    const { name, owner } = ctx.request.body;
    const category = new Category({ name, owner });

    try {
        const lastCategory = await Category.findOne({
            owner: owner,
            nextCategery: null
        }).exec();

        await category.save().then(async res => {
            if (lastCategory) {
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
export const list = async ctx => {
    const { owner } = ctx.params;
    try {
        const categories = await Category.find({ owner }).exec();
        console.log("categories:", categories);
        ctx.body = getCategoryListByOrder(categories);
    } catch (e) {
        ctx.throw(e, 500);
    }
};

//특정 카테고리 제거
// DELETE /api/category/:id
export const remove = async ctx => {
    const { id } = ctx.params;
    //미들웨어에서 인증해주고 userID로 찾으면 되지 않을까?
    try {
        //소속된 카드가 하나라도 있으면 지워지면 안돼
        const cards = await Card.find({
            categoryId: id
        }).exec();

        if (cards) {
            ctx.status = 202;
        } else {
            await Category.findByIdAndRemove(id).exec();
            ctx.status = 204;
        }
    } catch (e) {
        ctx.throw(e, 500);
    }
};

//특정 카테고리 수정
//PATCH /api/category/:id
export const update = async ctx => {
    //미들웨어에서 인증해주고 userID로 찾으면 되지 않을까?
    const { id } = ctx.params;
    const { name } = ctx.request.body;
    try {
        const category = await Category.findByIdAndUpdate(id, name, {
            new: true
        }).exec();

        if (!category) {
            ctx.status = 404;
            return;
        }
        ctx.body = category;
    } catch (e) {
        ctx.throw(e, 500);
    }
};

//카테고리 순서 변경
export const changeOrder = async ctx => {
    //이전 카테고리 ID와 옮기는 위치 카테고리 ID, 옮기는 카테고리정보를 가져온다.
    //이전 카테고리의 다음 카테고리를 옮기는 카테고리의 다음 카테고리 값으로 업데이트해준다.
    //옮긴는 카테고리의 다음 카테고리를 위치의 다음카테고리 아이디를 넣어준다
};
