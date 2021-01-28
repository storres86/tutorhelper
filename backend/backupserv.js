const express = require("express")
const cors = require("cors")
 const mongoose = require("mongoose")

require("dotenv").config();

let app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Successful");
})


const clientsRouter = require("./routes/clients");
const sessionsRouter = require("./routes/sessions")
const userRouter = require("./routes/users")

app.use("/clients",clientsRouter);
app.use("/sessions",sessionsRouter);
app.use("/users", userRouter);


app.listen(port,() => {
    console.log(`server is running on port: ${port}`);
})