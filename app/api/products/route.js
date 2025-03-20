import { dbConnect } from "@/app/lib/db";
import { Product } from "@/app/lib/model/product";
// import mongoose from "mongoose";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
    let product = [];
    try {
        // await mongoose.connect(connectionSrt)
        product = await Product.find()
        console.log(product)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed To Get Product", success: false })
    }

    return NextResponse.json(product)
}


export async function POST(request) {

    const { name, price, color, description, category, stock, discount } = await request.json();

    const product = new Product({
        name,
        price,
        color,
        description,
        category,
        stock,
        discount,
    })
    try {
        const createProduct = await product.save();
        const res = NextResponse.json(product, { status: 201 })
        return res;
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Failed To Save Product" }, { status: false })
    }

}