import { dbConnect } from "@/app/lib/db"
import { User } from "@/app/lib/model/user"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        await dbConnect()
        const { email } = await req.json()
        const user = await User.findOne({ email }).select("_id")
        return NextResponse.json({ user })
    } catch (error) {
        console.log(error)
    }

}