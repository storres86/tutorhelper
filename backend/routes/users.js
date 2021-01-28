const router = require("express").Router();
const express = require("express")
const UserTutor = require("../models/users.models")
const app = express()
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;


// app.post("/login", (req,res) => {
//     console.log(req.body);
// })

// app.post("/register", (req,res) => {
//     UserTutor.findOne({username: req.body.username}, async(err,doc) => {
//         if (err) throw err;
//         if (doc) alert("User Already Exists. Please choose a different username")
//         if (!doc) {
//             const hashedPassword = await bcrypt.hash(req.body.password,10)
//             const newUser = new UserTutor({
//                 username: req.body.username,
//                 password: hashedPassword
//             })
//             await newUser.save()
//             alert("Thank you for joining")
//             window.location = "/createSession"
//         }
//     })
// })



router.route("/").post((req,res) => {
    UserTutor.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json("error" +err))
    });
//Here is where I would check to make sure an ID is not already being used.
router.route("/add").post((req,res) => {
    UserTutor.findOne({username: req.body.username}, async(err,doc) => {
        if (err) throw err;
        if (doc) console.log("User Already Exists");
        if (!doc) {
            //salt is 10...that is the 10 in the bcrypt
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            const newUser = new UserTutor({
                username: req.body.username,
                password: hashedPassword,
                userid: req.body.userid
            })
            await newUser.save()
            console.log("saved new user");
                // alert("thank you for joining")
                window.location = "/createSession"
            
        }
    })
   
})
//keeps returning can not find user with get method. 
router.route("/login").post((req,res,next) => {
    passport.authenticate("local", (err,user,info) => {
        if (err) throw err;
        if (!user) res.send("No user Exists");
        else {
            req.logIn(user,err => {
                if (err) throw err;
                res.send("Success")
                console.log(req.user);
            })
        }
    })(req,res,next);

})


router.get("/logout",(req,res) => {
  
    
    // console.log("logged out in route ran ")
    // req.session = null;
    // req.logout()
    // res.redirect("/");
    // req.destroy((err) => res.redirect("/"))
    req.session.destroy(function(err){
        if (err){
            console.log(err)
        }else {
            req.logout();
            req.session = null
        }
    })
   
})

//this should hold all of the data about the user after it has been authenticated
router.route("/locker").get((req,res) => {
    res.send(req.user)
})


module.exports = router;

