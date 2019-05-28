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
// POST /cards
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