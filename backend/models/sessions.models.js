const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user: {type:String,required:true},
    userId: {type: Number, required: true},
    currentClient: {type:String,required:true},
    sessionLength: {type:String,required:true},
    startTime: {type:String,required:true},
    sessionDate:{type: Date, required:true},
    // sessionDate: {type: String, required: true},
    sessionPaid: {type: Boolean, required: true},
    // clientId: {type: String,required: false }
}, {
    timestamps: true,
})

const Session = mongoose.model("Sessions", sessionSchema)

module.exports = Session;