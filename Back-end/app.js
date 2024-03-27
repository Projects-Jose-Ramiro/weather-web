const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express()
require("dotenv").config()
const authenticate = require("../Back-end/auth/authenticate")

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

async function connect(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB")
}
connect().catch(console.error)

app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
// app.use("/api/user", authenticate, require("./routes/user"));
app.use("/api/todos", authenticate, require("./routes/todos"));
app.use("/api/refresh-token", require("./routes/refreshToken"));
app.use("/api/signout", require("./routes/signout"));

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})