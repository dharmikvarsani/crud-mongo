// const { username, password } = process.env;
// export const connectionSrt = "mongodb+srv://"+username+":"+password+"@cluster0.yxxtq.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0"
import mongoose from "mongoose"

export async function dbConnect() {
    try {
        const { dbConnection } = await mongoose.connect(process.env.MONGODB_URI, { dbName: "productDB" })
        console.log("Db Connected")
        console.log(dbConnection)

    } catch (error) {
        console.log("Failed To Connect");
        console.log(error)
    }
}