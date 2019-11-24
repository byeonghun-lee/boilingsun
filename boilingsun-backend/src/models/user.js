require("dotenv").config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Category from "models/category";

const { Schema } = mongoose;

const User = new Schema({
    userId: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    }
});

User.methods.generateAuthToken = async function() {
    const user = this;
    const token = await jwt.sign(
        { userId: user.userId },
        process.env.STRING_FOR_TOKEN_ISSUANCE,
        { expiresIn: "7d" }
    );

    return token;
};

User.statics.findByCredentials = async function(userId, password) {
    const user = await this.findOne({ userId });

    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
};

User.pre("save", async function(next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

User.post("save", async function(next) {
    const user = this;

    if (!user) return;

    try {
        const basicCategories = await Category.findOne({
            owner: this._id,
            isBasic: true
        }).exec();

        console.log("basicCategories:", basicCategories);

        if (!basicCategories) {
            const trashCategory = new Category({
                name: "trash",
                isBasic: true,
                owner: this._id
            });

            const basicCategory = new Category({
                name: "chocolateCastle",
                isBasic: true,
                owner: this._id
            });

            await basicCategory.save().then(async res => {
                trashCategory.nextCategery = res._id;
                await trashCategory.save();
            });
            console.log("trashCategory:", trashCategory);
            console.log("basicCategory:", basicCategory);
        }
    } catch (e) {
        console.log("user save error:", e);
        ctx.throw(e, 500);
    }
});

export default mongoose.model("User", User);
