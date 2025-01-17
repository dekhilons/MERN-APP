import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,  // Changed from String to Number
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Timestamps option

const Product = mongoose.model("Product", productSchema);
export default Product;
