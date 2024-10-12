import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:
    {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    description:
    {
        type: String,
        trim: true,
        required: 'Description is required'
    },
    price:
    {
        type: Number,
        trim: true,
        required: 'Price is required'
    },
    published:
    {
        type: Boolean,
        required: 'Published is required'
    },
    category:
    {
        type: String,
        required: 'Category is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Product', ProductSchema);
