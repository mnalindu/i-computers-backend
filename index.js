
import express from "express"
import mongoose from "mongoose"
import studentRouter from "./routes/studentRouter.js"
import userRouter from "./routes/userRouter.js"
import jwt from "jsonwebtoken"
import authenticateUser from "./middleware/Authencdication.js"
import dotenv from "dotenv"
dotenv.config()

const mongo_url = process.env.MONGO_URI
mongoose.connect(mongo_url)

mongoose.connect(mongo_url).then(
    () => {
        console.log("connected to mongoDB")
    }
)

const app = express()

app.use(express.json())

app.use(authenticateUser)

app.use("/students", studentRouter )
app.use("/users" , userRouter)




/*function go() {
    console.log("sever is running")
}

app.listen(3000, go)

*/
app.listen(3000,
    () => {
        console.log("server is running")
    }
)

app.get("/about", 
    (req, res) => {
        console.log("Get request received")
        console.log(req.body.name)
        res.json(
            {
            message: "Hi Good Morning"
            }
                )
    }
)

