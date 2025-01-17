
import mongoose from "mongoose";
import Product from "../modules/product.model.js";

import mongo from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; // User will send this data

    // Check if all fields are provided
    if (!product) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    // Create a new product object
    const newProduct = new Product(product);

    if(!mongo.Types.ObjectId.isValid(product._id)){
        return res.status(400).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        // Save the product to the database
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const updateProduct = async (req,res) => {
    const {id} = req.params;
    const product = req.body;
    try{
    const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
    res.status(200).json({success:true,data:updatedProduct});
} catch(error){ 
    res.status(500).json({success:false,message:"Internal Server Error"});
}
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params;
    console.log("id",id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }


    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted successfully"});    

    }catch(error){
    
        console.error("Error in deleting product:",error.message);
        res.status(500).json({success:false,message:"Server error"});
    }

}