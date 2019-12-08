import mongoose from "mongoose";

const { Schema } = mongoose;

const CardSchema = new Schema({
    title: String,
    owner: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    body: String,
    isRead: {
        type: Boolean,
        default: false
    },
    readDate: {
        type: Date
    },
    categoryId: String,
    createdDate: {
        type: Date,
        default: new Date()
    }
});

const Card = mongoose.model("Card", CardSchema);
export default Card;
