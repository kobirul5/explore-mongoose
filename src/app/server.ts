import { Server } from "http"
import app from "./app";
import mongoose from "mongoose";
import 'dotenv/config'

let server: Server;
const PORT = 5000

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.tkrmtkd.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("connected to mongodb using mongoose")
        server = app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })

    } catch (error) {
        console.log(error)
    }
}

main()