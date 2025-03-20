// import mongoose from "mongoose"

// const productSchema = new mongoose.Schema({
//     name: String,
//     price: String,
//     color: String,
// })

// export const Product = mongoose.models.Product  || mongoose.model("products", productSchema)


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: String, required: true },
    discount: { type: String, required: true },
});

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
