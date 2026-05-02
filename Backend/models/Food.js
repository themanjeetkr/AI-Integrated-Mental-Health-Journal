import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    calories: {
        calories: Number,
        required: true
    },
    carbohydrates: {
        type: Number,
        required: true
    }
}, { timestamps: true })
export default mongoose.model("Food", foodSchema);
