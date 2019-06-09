const mongoose = require("mongoose");

const { Schema } = mongoose;

const Card = new Schema({
    title: String,
    url: String,
    body: String,
    isRead: {
        type: Boolean,
        default: false
    },
    categoryId: Number,
    createdDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("Card", Card);