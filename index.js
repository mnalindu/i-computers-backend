
import express from "express"
import mongoose from "mongoose"
import studentRouter from "./routes/studentRouter.js"
import userRouter from "./routes/userRouter.js"
import jwt from "jsonwebtoken"
import authenticateUser from "./middleware/Authencdication.js"

const mongo_url ="mongodb://admin2:5736@ac-l3ytabo-shard-00-00.ex4xk4w.mongodb.net:27017,ac-l3ytabo-shard-00-01.ex4xk4w.mongodb.net:27017,ac-l3ytabo-shard-00-02.ex4xk4w.mongodb.net:27017/?ssl=true&replicaSet=atlas-65jtkc-shard-0&authSource=admin&appName=Cluster0"

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

