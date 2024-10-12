import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:
    {
        type: String,
        trim: true,
        required: 'Name is required'
    }
})

export default mongoose.model('categories', CategorySchema);
