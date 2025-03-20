import { dbConnect } from "@/app/lib/db";
import { User } from "@/app/lib/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        await dbConnect();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        const hashedPassword = await bcrypt.hash(trimmedPassword, 10)
        await User.create({ name: trimmedName, email: trimmedEmail, password: hashedPassword })

        return NextResponse.json({ message: "User Registerd" }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error in User Registration " }, { status: 500 })
    }

}