const express = require("express")
const cors = require("cors")
 const mongoose = require("mongoose")
 const bodyParser = require("body-parser")
 const session = require("express-session")
 const cookieParser = require("cookie-parser")
 const passport = require("passport")


require("dotenv").config();

let app = express()
const port = process.env.PORT || 5000;

// app.use(cors()); adding a new cors function below 
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true})

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Successful");
})

//Auth stuff
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
//this will initialize passport and the session. I also need to bring the file I made of passportConfig and I am gounbg to pass the instance of passport that I made in it
//this will make it so I am using the same instance of passport throughout the server
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// app.get("/logout/poop", function(req,res){
//     req.session.destroy(function (err) {
//         res.redirect("/")
//     })
// })


const clientsRouter = require("./routes/clients");
const sessionsRouter = require("./routes/sessions")
const userRouter = require("./routes/users");


app.use("/clients",clientsRouter);
app.use("/sessions",sessionsRouter);
app.use("/users", userRouter);


app.listen(port,() => {
    console.log(`server is running on port: ${port}`);
})