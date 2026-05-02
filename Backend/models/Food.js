import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    calories: {
        type: Number,
        required: true
    },
    carbohydrates: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    fiber: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export default mongoose.model("Food", foodSchema);