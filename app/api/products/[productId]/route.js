import { Product } from "@/app/lib/model/product";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    const { productId } = params;
    const product = await Product.findById(productId);
    return NextResponse.json(product)
}

export async function DELETE(req, { params }) {
    try {
        const { productId } = params;
        await Product.findByIdAndDelete(productId);
        return NextResponse.json({ message: "Product Deleted Successfully", success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ message: "Something Went Wrong, Please Try Again", success: false });
    }
}


export async function PUT(req, { params }) {
    const { productId } = params;

    const { name, price, color, description, category, stock, discount } = await req.json()
    try {
        const product = await Product.findById(productId)

        product.name = name;
        product.color = color;
        product.price = price;
        product.description = description;
        product.category = category;
        product.stock = stock;
        product.discount = discount;

        const updatedProduct = await product.save();
        return NextResponse.json(updatedProduct)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed To Update product", success: false })
    }
}