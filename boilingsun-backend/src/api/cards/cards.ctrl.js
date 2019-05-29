let cardId = 1;

const cards = [
    {
        id: 1,
        title: "구글",
        url: "https://www.google.com",
        body: "구글 홈페이지",
        isRead: false,
        categoryId: 3
    }
];

// 카드 작성
// POST /api/cards
// { title, url, body, categoryId }

exports.write = (ctx) => {
    const {
        title,
        url,
        body,
        categoryId
    } = ctx.request.body;

    cardId += 1;

    const card = { id: cardId, title, url, body, categoryId };
    cards.push(card);
    ctx.body = card;
}

// 카드 목록 조회
exports.list = (ctx) => {
    ctx.body = cards;
}

// 특정 카드 조회
// GET /api/cards/:id
exports.read = (ctx) => {
    const { id } = ctx.params;

    const card = cards.find(c => c.id.toString() === id);

    if(!card) {
        ctx.status = 404;
        ctx.body = {
            message: "카드가 존재하지 않습니다."
        };
        return;
    }

    ctx.body = card;
};

// 특정 카드 제거
// DELETE /api/cards/:id
exports.remove = (ctx) => {
    const { id } = ctx.params;

    const index = cards.findIndex(c => c.id.toString() === id);
    
    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: "카드가 존재하지 않습니다."
        };
        return;
    }

    cards.splice(index, 1);
    ctx.status = 204;
};

// 카드 수정(특정 필드 변경)
// PATCH /api/cards/:id
// { title, url, body, categoryId }
exports.update = (ctx) => {
    const { id } = ctx.params;

    const index = cards.findIndex(c => c.id.toString() === id);

    if(index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: "카드가 존재하지 않습니다."
        };
        return;
    }

    cards[index] = {
        ...cards[index],
        ...ctx.request.body
    };
    ctx.body = cards[index];
};