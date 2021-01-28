const UserTutor = require("./models/users.models")
const bcrypt = require("bcrypt")
const localStrategy = require("passport-local").Strategy;

//we are going to get a parameter passed to this function when we call it  and we are going to pass the passport libary 
//we want to use the same instance of passport throughout our entire application 
module.exports = function (passport) {
    //we are defining our local strategy for passport. 
    passport.use(
        new localStrategy((username, password, done) => {
            UserTutor.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                // if no user, then return the done method with null and false, null is the error and false is the user
                // we have no error but we have no user 
                if (!user) return done(null, false)
                //if there is a user, lets compare with bycrypt the password thats passed, compare the password thats passed to the
                //password in the database. we are going to get a error or result...if result is true, return that user. 
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            })
        })
    )
//stores a cookie in the broswer, take the user that we found from the localstrategy and create a cookie with the userID in it.
    passport.serializeUser((user,cb) => {
        cb(null,user.id);
    })

    //this takes that cookie and unraveals it. and returns a user from it. (cb is callback)
    passport.deserializeUser((id,cb) => {
        UserTutor.findOne({_id:id}, (err,user)=> {
            cb(err,user)
        })
    })

}