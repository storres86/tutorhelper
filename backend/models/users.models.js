const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tutorUserSchema = new Schema({
    username: {type:String,required:true},
    password: {type:String, required: true},
    userid: {type:Number, required: true}
}, {
    timestamps: true,
})

const UserTutor = mongoose.model("UserTutor",tutorUserSchema )

module.exports = UserTutor;