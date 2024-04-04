const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express()
require("dotenv").config()
// const authenticate = require("../Back-end/auth/authenticate")

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

async function connect(){
    // await mongoose.connect(process.env.DB_CONNECTION_STRING); // Base de datos Ramiro
    await mongoose.connect(process.env.DB_CONNECTION_STRING_SECOND); // Base de datos Jose
    console.log("Connected to MongoDB")
}
connect().catch(console.error)


app.use("/api/signup", require("./Routes/signup") )
app.use("/api/login", require("./Routes/login"));
app.use("/api/user", require("./Routes/user"));
app.use("/api/todos", require("./Routes/todos"));
app.use("/api/refresh-token", require("./Routes/refreshToken"));
app.use("/api/signout", require("./Routes/signout"));

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})