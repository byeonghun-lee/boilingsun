import mongoose from "mongoose";
mongoose.set("useFindAndModify", false);

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    isBasic: {
        type: Boolean,
        default: false
    },
    nextCategery: {
        type: String,
        default: null
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
